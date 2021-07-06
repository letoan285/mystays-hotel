<template>
  <div class="children-select">
    <AdultSelect
      :person="childSelect"
      :room-active="roomActive"
      person-type="Children"
      @on:personChange="$_onPersonChange"
      @on:visibleChange="$_onVisibleChange"
    />
    <!-- <div
      class="children-select__view-info"
      v-if="isShowAgeSelect && person && person.childrenList.length"
    >
      <span @click="$_openTiersInfo">{{ $t("booking.view_child_tier_information") }}</span>
      <span class="icon-Icon-Info"></span>
    </div> -->
    <div
      v-show="
        person.childrenList && person.childrenList.length && isKidsTierSupport
      "
      class="children-select__title"
    >
      <div class="children-select__title__child" />
      <div class="children-select__title__age">
        {{ $t("booking.age") }}
      </div>
      <div class="children-select__title__bed">
        {{ $t("booking.bed") }}
      </div>
    </div>
    <ChildAgeSelect
      v-for="(childAge, index) in personSelect.childrenList"
      :key="index"
      :children="childAge"
      :child-index="index"
      :is-show-age-select="isShowAgeSelect"
      :child-age-error="childAgeError"
      :room-active="roomActive"
      @on:changeAge="age => $_onChangeAge(index, age)"
      @on:changeBed="bed => $_onChangeBed(index, bed)"
      @on:fixScrolling="$_onFixScrolling"
      @on:clickBedSwitch="$_onVisibleChange"
    />
    <div v-if="childAgeError && isRoomError" class="children-select__message">
      {{ $t("booking.please_select_child_tier") }}!
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */

import { mapGetters } from "vuex";
import ChildAgeSelect from "./ChildAgeSelect";
import AdultSelect from "./AdultSelect";

export default {
  name: "ChildSelect",
  components: {
    ChildAgeSelect,
    AdultSelect
  },
  props: {
    person: {
      type: Object
    },
    isError: {
      type: Boolean
    },
    roomActive: {
      type: Number,
      default: 0
    }
  },
  data() {
    const number =
      (this.person.childrenList && this.person.childrenList.length) || 0;
    return {
      childSelect: {
        title: this.person.title,
        number
      },
      personSelect: { ...this.person },
      childAgeError: this.isError
    };
  },
  computed: {
    ...mapGetters({
      tiers: "hotel/tiers",
      hotelDetail: "hotelDetail/hotelDetail",
      roomList: "booking/roomList",
      isKidsTierSupport: "hotel/isKidsTierSupport",
      hasChildren: "booking/hasChildren"
    }),

    isShowAgeSelect() {
      if (this.isKidsTierSupport && this.hasChildren) {
        return true;
      } else {
        return false;
      }
    },

    isRoomError() {
      const childrenList =
        this.personSelect && this.personSelect.childrenList.map(p => p.age);
      return childrenList.includes("Select Tier");
    }
  },
  watch: {
    person(newPerson) {
      const number =
        (newPerson.childrenList && newPerson.childrenList.length) || 0;
      this.personSelect = { ...newPerson };
      this.childSelect = {
        title: newPerson.title,
        number
      };
    },
    isError(error) {
      this.childAgeError = error;
    }
  },
  methods: {
    $_onPersonChange(person) {
      this.$emit("on:changeChild", person);
    },

    $_onChangeAge(index, age) {
      this.$emit("on:changeChildAge", {
        index,
        age
      });
    },

    $_onVisibleChange() {
      this.$emit("on:visibleChange");
    },

    $_onChangeBed(index, bed) {
      this.$emit("on:changeBedSelect", {
        index,
        bed
      });
    },

    $_onFixScrolling(possiton) {
      this.$emit("on:scroll", possiton);
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin select-person {
  &__actions {
    display: flex;
    height: 40px;
    text-align: center;
    vertical-align: middle;
    button {
      width: 35px;
    }
    &__minus {
      border-radius: 2px 0 0 2px;
    }
    &__total-count {
      border: 1px solid #e4e4e7;
      width: 46px;
    }
    &__plus {
      border-radius: 0 2px 2px 0;
    }
  }
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.person-select {
  @include select-person;
}

.children-select {
  &__message {
    color: red;
    font-size: 14px;
    text-align: center;
    margin-bottom: 10px;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 10px;

    &__child {
      width: 40%;
    }

    &__age {
      margin-right: 20px;
    }

    &__bed {
      width: 60px;
      text-align: center;
    }
  }
}

.tiers-info {
  .table {
    font-size: 14px;
    @include min-sm {
      font-size: 16px;
    }
  }
}
</style>
