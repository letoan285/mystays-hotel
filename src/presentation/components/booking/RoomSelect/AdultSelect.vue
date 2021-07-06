<template>
  <div class="person-select room-detail-custom">
    <div class="person-select__title">
      {{ personSelect && personSelect.title }}
    </div>
    <div class="person-select__actions">
      <button
        class="person-select__actions__minus center m-btn__blue"
        :disabled="disableMinusButton"
        @click="$_minus"
      >
        <span class="icon-Arrow-Minus" />
      </button>
      <div class="person-select__actions__total-count center">
        {{ personSelect && personSelect.number }}
      </div>
      <button
        class="person-select__actions__plus m-btn__blue"
        :disabled="disablePlusButton"
        @click="$_plus"
      >
        <span class="icon-Arrow-Plus" />
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */

import Vue from "vue";
export default Vue.extend({
  name: "AdultSelect",
  components: {},
  props: {
    person: {
      type: Object
    },
    personType: {
      type: String
    },
    roomActive: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      personSelect: { ...this.person },
      maxAdults: this.$constants.MAX_ADULTS,
      minAdults: this.$constants.MIN_ADULTS,
      maxChildren: this.$constants.MAX_CHILDREN,
      minChildren: this.$constants.MIN_CHILDREN
    };
  },
  computed: {
    minAdult() {
      return (
        this.personSelect.number === this.minAdults &&
        this.personType === "Adults"
      );
    },
    minChild() {
      return (
        this.personSelect.number === this.minChildren &&
        this.personType === "Children"
      );
    },
    disableMinusButton() {
      return this.minAdult || this.minChild;
    },
    maxAdult() {
      return (
        this.personSelect.number === this.maxAdults &&
        this.personType === "Adults"
      );
    },
    maxChild() {
      return (
        this.personSelect.number === this.maxChildren &&
        this.personType === "Children"
      );
    },
    disablePlusButton() {
      return this.maxAdult || this.maxChild;
    },
    getTextString() {
      return {
        adults: this.$t("booking.adults"),
        children: this.$t("booking.children")
      };
    }
  },
  watch: {
    person(newPerson) {
      this.personSelect = { ...newPerson };
    }
  },
  created() {},
  methods: {
    $_minus() {
      if (this.roomActive !== 0) {
        this.$emit("on:visibleChange");
      } else {
        this.personSelect.number -= 1;
        this.$emit("on:personChange", {
          isMinus: true,
          data: this.personSelect
        });
      }
    },
    $_plus() {
      if (this.roomActive !== 0) {
        this.$emit("on:visibleChange");
      } else {
        this.personSelect.number += 1;
        this.$emit("on:personChange", {
          data: this.personSelect,
          isMinus: false
        });
      }
    }
  }
});
</script>
<style lang="scss" scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.person-select {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 14px;
  padding-top: 5px;
  align-items: center;
  @include min-md {
    padding-top: 0;
  }
  &__title {
    font-size: 13px;
  }
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
      font-size: 16px;
    }
    &__plus {
      border-radius: 0 2px 2px 0;
    }
  }
  .icon-Arrow-Plus,
  .icon-Arrow-Minus {
    font-size: 10px;
    font-weight: bold;
  }
}
</style>
