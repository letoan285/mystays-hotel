<template>
  <div v-if="isKidsTierSupport" class="select-children-age">
    <div class="select-children-age__title">
      {{ $t("booking.child") }} {{ childIndex + 1 }}
    </div>
    <div
      id="tooltip-1"
      ref="selectChildrenAge"
      class="select-children-age__age-dropdown"
      :class="{ error: ageError && children.age === 'Select Tier' }"
      @click="$_onClick"
    >
      <AppSelectDesktop
        :list-options="listCode"
        :selected-value="`${ageSelect}`"
        :is-auto-complete="false"
        class="select-children-age__age-dropdown__desktop"
        @onClickItem="$_getChildAge"
      />

      <select
        v-if="isShowAgeSelect"
        id=""
        v-model="ageSelect"
        name="selectMobile"
        @change="$_getChildAgeMobile()"
      >
        <option v-for="(item, index) in 12" :key="index" :value="item">
          {{ item }}
        </option>
      </select>
      <span>歳</span>
    </div>
    <div class="select-children-age__switch" @click="$_clickSwitch">
      <AppToggleSwitch
        :bed-selected="childrenAge.bed"
        @on:ChangeBedStatus="$_onSelectBed"
        :is-disable="isDisableSwitch"
      />
      <div class="select-children-age__switch__label">
        {{ childrenAge.bed ? $t("booking.with_bed") : $t("booking.no_bed") }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ChildAgeSelect",
  props: {
    children: {
      type: Object,
      default: () => {}
    },
    childIndex: {
      type: Number,
      default: () => 0
    },
    isShowAgeSelect: {
      type: Boolean
    },
    childAgeError: {
      type: Boolean
    },
    roomActive: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      childrenAge: this.children,
      ageSelect: this.children.age,
      ageError: this.childAgeError
    };
  },
  computed: {
    ...mapGetters({
      isKidsTierSupport: "hotel/isKidsTierSupport",
      roomList: "booking/roomList"
    }),

    getLang() {
      return {
        selectTier: this.$t("booking.select_tier")
      };
    },

    listCode() {
      const listAge = [];
      for (let age = 1; age <= 12; age++) {
        listAge.push({
          text: age,
          value: age
        });
      }

      return listAge;
    },

    isDisableSwitch() {
      return this.roomList.length > 1 && this.roomActive !== 0;
    }
  },
  watch: {
    children(children) {
      this.ageSelect = children.age;
      this.childrenAge = children;
      this.ageSelect =
        children.age === "Select Tier"
          ? this.$t("booking.select_tier")
          : children.age;
    },
    childAgeError(error) {
      this.ageError = error;
    }
  },
  mounted() {
    this.ageSelect =
      this.children.age === "Select Tier"
        ? this.$t("booking.select_tier")
        : this.children.age;
  },
  methods: {
    $_getChildAge(code) {
      this.$emit("on:changeAge", code);
    },

    $_getChildAgeMobile() {
      this.$emit("on:changeAge", this.ageSelect);
    },

    $_onClick() {
      const childAgePossition = this.$refs.selectChildrenAge.offsetTop;
      this.$emit("on:fixScrolling", childAgePossition);
    },

    $_onSelectBed(value) {
      this.$emit("on:changeBed", value);
    },

    $_clickSwitch() {
      this.$emit("on:clickBedSwitch");
    }
  }
};
</script>

<style lang="scss" scoped>
.select-children-age {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 30px;
  }
  @include min-md {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 25px;
    }
  }

  &__title {
    width: 40%;
  }

  select[name="selectMobile"] {
    border: 1px solid $border-color-gray-2;
    background: $white;
    padding: 7px 15px;
    outline: none;
    height: 40px;
    border-radius: 3px;

    @include min-sm {
      display: none;
    }

    &::-ms-expand {
      display: none;
    }

    option {
      width: 100%;

      // &:first-child {
      //   display: none;
      // }
    }
  }

  &__age-dropdown {
    width: 100px;
    display: flex;
    align-items: center;
    @include min-sm {
      width: 80px;
    }
    span {
      margin-left: 10px;
    }
    &__desktop {
      display: none;
      @include min-sm {
        display: block;
      }
    }
  }

  &__switch {
    margin-top: 5px;
    &__label {
      font-size: 12px;
      text-align: center;
      margin-top: -4px;
    }
  }

  .error {
    border: 2px solid red;
    border-radius: 3px;
  }
}
</style>
