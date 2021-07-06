<template>
  <div class="app-collapse" :class="{ 'app-collapse-summary': guestDetail }">
    <div v-b-toggle="roomID" class="app-collapse__total">
      <span :class="{ 'fw-bold': fwBold }">
        {{ roomDetail && roomDetail.title }} {{ guestText }}
      </span>
      <span>
        {{ roomDetail && roomDetail.totalPrice | currency("YEN") }}
      </span>
      <span
        :class="
          `icon-Arrow-xSmall-Up ${
            isVisible ? 'rotate-arrow-up' : 'rotate-arrow-down'
          }`
        "
      />
    </div>
    <b-collapse :id="roomID" @input="$_collapseGuest">
      <div
        v-for="(item, index) in roomDetails"
        :key="index"
        class="app-collapse__detail"
      >
        <span>{{ item.time }}</span>
        <span>{{ item.price | currency("YEN") }}</span>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts">
/* eslint-disable vue/require-default-prop */

import Vue from "vue";

export default Vue.extend({
  name: "AppCollapse",
  components: {},
  props: {
    roomDetailInfo: {
      type: Object,
      default: () => {}
    },
    roomID: {
      type: String
    },
    guestDetail: {
      type: String
    },
    fwBold: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      isVisible: false,
      roomDetail: this.roomDetailInfo
    };
  },
  computed: {
    roomDetails(): any {
      return this.roomDetail?.detail;
    },

    getLang(): any {
      return {
        child: this.$t("booking.child"),
        children: this.$t("booking.children"),
        adult: this.$t("booking.adult"),
        adults: this.$t("booking.adults")
      };
    },

    guestText(): string {
      let childrenText = "";
      const numberAdults = this.roomDetailInfo?.numberAdults;
      if (this.roomDetailInfo?.numberChildren > 0) {
        childrenText = `& ${this.roomDetailInfo?.numberChildren} ${
          this.roomDetailInfo?.numberChildren > 1
            ? this.getLang.children
            : this.getLang.child
        }`;
      } else {
        childrenText = "";
      }

      if (this.roomID === "tax") {
        return "";
      }

      return `x ${numberAdults} ${
        numberAdults > 1 ? this.getLang.adults : this.getLang.adult
      } ${childrenText}`;
    }
  },
  watch: {
    roomDetailInfo(newData) {
      this.roomDetail = newData;
    }
  },

  methods: {
    $_collapseGuest(isVisible: boolean) {
      this.isVisible = isVisible;
    }
  }
});
</script>

<style lang="scss" scoped>
.app-collapse {
  &__total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 0;
    border-bottom: 1px solid $border-color-gray-2;
    outline: none;
    font-weight: 500;
    span {
      &:first-child {
        flex-grow: 1;
        font-size: 12px;
        padding-right: 10px;
        @include min-sm {
          font-size: 14px;
          padding-right: 15px;
        }
      }
      &:nth-child(2) {
        font-weight: 600;
        font-size: 14px;
      }
      &:last-child {
        font-size: 10px;
        margin-left: 10px;
        font-size: 11px;
      }
    }

    .rotate-arrow-up {
      transform: rotate(360deg);
      transition: 0.3s;
    }

    .rotate-arrow-down {
      transform: rotate(180deg);
      transition: 0.3s;
    }

    .fw-bold {
      font-weight: 600;
    }
  }

  &__detail {
    display: flex;
    justify-content: space-between;
    padding: 13px 0;
    border-bottom: 1px solid $border-color-gray-2;
    span {
      font-size: 14px;
      &:first-child {
        font-size: 12px;
        @include min-sm {
          font-size: 14px;
        }
      }
    }
  }
}

.app-collapse-summary {
  .app-collapse__total {
    span {
      &:first-child {
        font-size: 13px;
      }
    }
  }
}
</style>
