<template>
  <div class="hotel-detail__booking">
    <div
      v-if="member"
      class="hotel-detail__booking sub-content--member-booking"
    >
      <div class="rate-from">
        <h6>{{ getLanguage.rateFrom }}</h6>
      </div>
      <div class="promo-code">
        <span>{{ roomInfo.promoCodeName }}</span>
      </div>
      <div class="total-rate">
        <span class="rate">
          {{ this.subItem && this.subItem.rate | currency("YEN") }}
        </span>
        <span class="discount-rate">
          {{ roomInfo.discountRate | currency("YEN") }}
        </span>
      </div>
      <p>
        {{ getGuestText }} / {{ totalNight }}
        {{ totalNight > 1 ? getLanguage.nights : getLanguage.night }}
      </p>
      <button
        class="button m-btn m-btn__yellow"
        :class="{ active: roomInfo && roomInfo.isBooked }"
        @click="$_onShowModalBooking"
      >
        <b-spinner
          v-if="isRoomSelectedLoading && roomInfo.isBooked && isShowSpinner"
          small
        />
        {{
          roomInfo && roomInfo.isBooked ? getLanguage.booked : getLanguage.book
        }}
      </button>

      <div v-if="subItem && subItem.roomPlanCode" class="cancellation">
        <span class="icon-Icon-Info" />
        <p
          v-if="!subItem.cancellationFreeDeadline"
          @click="$_openCancellationPolices"
        >
          {{ $t("hoteldetail.cancellation_policy") }}
        </p>
        <p v-else @click="$_openCancellationPolices">
          {{ $t("hoteldetail.free_cancellation_until") }}
          {{ subItem.cancellationFreeDeadline }}
        </p>
      </div>
    </div>
    <div
      v-else-if="!member"
      class="hotel-detail__booking sub-content--non-member-booking"
    >
      <h6>
        {{ getLanguage.earn }} {{ roomInfo && roomInfo.earn }}
        {{ getLanguage.miles }}
      </h6>
      <span v-if="$nuxt.isOnline">
        {{ this.subItem && this.subItem.rate | currency("YEN") }}
      </span>
      <span class="per-night-rate" v-if="$nuxt.isOnline">
        {{ totalNight }}
        {{ totalNight > 1 ? getLanguage.nights : getLanguage.night }}
      </span>
      <h4 v-if="$nuxt.isOnline">
        {{ this.subItem && this.subItem.rate | currency("YEN") }}
      </h4>
      <p>{{ getGuestText }}</p>
      <button
        v-if="roomInfo && roomInfo.planId"
        class="button m-btn m-btn__yellow"
        :class="{ active: roomInfo && roomInfo.isBooked }"
        @click="$_onShowModalBooking"
      >
        <b-spinner
          v-if="isRoomSelectedLoading && roomInfo.isBooked && isShowSpinner"
          small
        ></b-spinner>
        {{
          roomInfo && roomInfo.isBooked ? getLanguage.booked : getLanguage.book
        }}
      </button>
      <button
        v-else-if="roomInfo && !roomInfo.planId && roomInfo.discountRate"
        class="button m-btn m-btn__yellow"
      >
        <span class="icon-Icon-Amenity-Safety-Box" />
        {{ getLanguage.join }}
      </button>
      <button
        v-else
        class="button m-btn m-btn__yellow"
        :class="{ active: roomInfo && roomInfo.isBooked }"
        @click="$_onShowModalBooking"
      >
        <b-spinner
          v-if="isRoomSelectedLoading && roomInfo.isBooked && isShowSpinner"
          small
        ></b-spinner>
        {{
          roomInfo && roomInfo.isBooked ? getLanguage.booked : getLanguage.book
        }}
      </button>
      <div v-if="subItem && subItem.roomPlanCode" class="cancellation">
        <span class="icon-Icon-Info" />
        <p
          v-if="!subItem.cancellationFreeDeadline"
          @click="$_openCancellationPolices"
        >
          {{ $t("hoteldetail.cancellation_policy") }}
        </p>
        <p v-else @click="$_openCancellationPolices">
          {{ $t("hoteldetail.free_cancellation_until") }}
          {{ subItem.cancellationFreeDeadline }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import CurrencyHelper from "../../../../../../shared/helper/CurrencyHelper";

export default {
  name: "RoomsAndPlansBooking",
  props: {
    subItem: {
      type: Object,
      default: () => {}
    },
    subContentIsOpen: {
      type: Boolean
    },
    member: {
      type: Number || Boolean
    }
  },
  data() {
    return {
      isActive: false
    };
  },
  computed: {
    ...mapState({
      selectedRoom: state => state.hotelDetail.selectedRoom,
      isRoomSelectedLoading: state => state.hotelDetail.isRoomSelectedLoading
    }),
    ...mapGetters({
      totalGuest: "booking/totalGuest",
      totalNight: "booking/totalNight",
      lang: "appHeader/language",
      fullLang: "appHeader/fullLanguage",
      roomStatus: "hotelDetail/roomStatus"
    }),

    isShowSpinner() {
      const lastRoom = this.selectedRoom[this.selectedRoom.length - 1];

      if (lastRoom) {
        return lastRoom.plan.planCode === this.subItem.planCode;
      }

      return false;
    },

    totalNightText() {
      let text = "";
      if (this.totalNight) {
        text = `${this.totalNight} ${
          this.totalNight > 1 ? this.getLanguage.nights : this.getLanguage.night
        }`;
      } else {
        text = "";
      }
      return text;
    },

    roomInfo() {
      const planCode = this.subItem && this.subItem.planCode;
      const planCodeList = this.selectedRoom.map(s => {
        return s.plan.planCode;
      });
      if (planCode) {
        planCodeList.forEach(code => {
          if (planCode === code) {
            this.subItem.isBooked = true;
          }
        });
      }

      return this.subItem;
    },

    getGuestText() {
      const numberAdult = this.roomStatus && this.roomStatus.adults.number;
      const numberChildren =
        this.roomStatus && this.roomStatus.children.childrenList.length;

      let childrenText = "";
      const adultText =
        numberAdult > 1 ? this.getLanguage.adults : this.getLanguage.adult;

      if (numberChildren) {
        childrenText = `, ${numberChildren} ${
          numberChildren > 1
            ? this.getLanguage.children
            : this.getLanguage.child
        }`;
      } else {
        childrenText = "";
      }

      return `${numberAdult} ${adultText} ${childrenText}`;
    },
    getLanguage() {
      return {
        earn: this.$t("hoteldetail.earn"),
        miles: this.$t("hoteldetail.miles"),
        book: this.$t("hoteldetail.book"),
        booked: this.$t("hoteldetail.booked"),
        perNight: this.$t("hoteldetail.per_night"),
        seePlan: this.$t("hoteldetail.see_plan"),
        seeRoom: this.$t("hoteldetail.see_room"),
        plan: this.$t("hoteldetail.plan"),
        close: this.$t("hoteldetail.close"),
        joinToUnlock: this.$t("hoteldetail.join_to_unlock"),
        rateFrom: this.$t("hoteldetail.rate_from"),
        join: this.$t("hoteldetail.join"),
        night: this.$t("customhtmlcalendar.night"),
        nights: this.$t("customhtmlcalendar.nights"),
        guest: this.$t("booking.guest"),
        guests: this.$t("booking.guests"),
        children: this.$t("booking.children"),
        child: this.$t("booking.child"),
        adult: this.$t("booking.adult"),
        adults: this.$t("booking.adults")
      };
    }
  },
  methods: {
    ...mapActions({
      getCancellationPolicies: "hotelDetail/getCancellationPolicies",
      saveGtmData: "general/saveGtmData",
      saveRoomParamsForGetRoomSelected:
        "booking/saveRoomParamsForGetRoomSelected"
    }),

    $_onShowModalBooking() {
      this.isActive = true;
      this.$emit("saveRoomSelected", this.subItem);
      this.saveRoomParamsForGetRoomSelected();
    },
    $_openCancellationPolices() {
      const hotelID = this.$route.params.hotelID;
      const params = {
        hotelID,
        queryString: {
          room_plan_codes: this.subItem.roomPlanCode
        },
        fullLang: this.fullLang
      };
      if (this.subItem && this.subItem.roomPlanCode) {
        this.$nuxt.$emit("on:ShowCancellationPoliciesPopup");
        this.getCancellationPolicies(params);
      }

      const gtmData = {
        event: "cancellationPolicyInfoClick",
        language: this.fullLang,
        pageCategory: "HotelDetailPage",
        hotelID: this.$route.params.hotelID,
        roomID: this.subItem && this.subItem.roomId,
        planID: this.subItem && this.subItem.roomPlanCode,
        triggerType: "event"
      };

      this.saveGtmData(gtmData);
    }
  }
};
</script>

<style lang="scss" scoped>
.hotel-detail__booking {
  flex: 0 1 75px;

  @include min-sm {
    flex: 0 1 170px;
  }

  &.booking-top {
    display: none;

    @include min-sm {
      flex: 0 1 170px;
      display: block;
    }
  }

  &.no-plan {
    display: block;
    margin-top: 10px;

    @include min-sm {
      margin-top: 0;
    }
  }

  &.sub-content--member,
  &.sub-content--non-member {
    &-booking {
      .button {
        width: 100%;
        font-size: 14px;
        padding: 7px;
        display: flex;
        justify-content: center;
        align-items: center;

        @include min-sm {
          padding: 10px;
          margin-top: 10px;
        }
      }

      h6 {
        font-size: 10px;
        font-weight: bold;
        margin: 0;
        display: none;
        text-transform: uppercase;

        @include min-sm {
          display: block;
        }
      }

      span {
        font-size: 20px;
        font-weight: bold;
        margin-right: 6px;

        &[class^="icon-"],
        &[class*=" icon-"] {
          display: inline-block;
          font-weight: normal;
          font-size: 17px;
          margin-right: 5px;
        }

        @include min-sm {
          display: inline;
        }
      }

      .spinner-border {
        display: block;
      }

      .spinner-border-sm {
        width: 13px;
        height: 13px;
        border-width: 2px;
      }

      span.per-night-rate {
        font-size: 11px;
        font-weight: normal;
      }

      h4 {
        font-size: 18px;
        font-weight: bold;

        @include min-sm {
          display: none;
        }
      }

      p {
        margin-bottom: 5px;
      }
    }
  }

  &.sub-content--non-member {
    &-booking {
      span {
        display: none;

        @include min-sm {
          display: inline;
        }
      }
    }
  }

  .promo-code {
    margin-top: 8px;
    margin-bottom: 5px;
    display: none;

    @include min-sm {
      display: block;
    }

    span {
      font-size: 11px;
      display: inline;
      padding: 5px 7px;
      border-radius: 5px;
      background: #e6ee9c;
    }
  }

  .total-rate {
    @include min-sm {
      padding: 4px 0;
    }
  }

  &.sub-content--member {
    &-booking {
      .button {
        [class^="icon-"],
        [class*=" icon-"] {
          display: inline-block;
          margin-right: 5px;
          font-weight: normal;
          font-size: 17px;
        }

        &--desktop {
          display: none;

          @include min-sm {
            display: flex;
          }
        }

        &--mobile {
          display: flex;

          @include min-sm {
            display: none;
          }
        }
      }

      span.rate {
        text-decoration: line-through;
        color: $text-color-gray-6;
        font-size: 16px;
        font-weight: normal;
      }

      span.discount-rate {
        color: $text-color-pink;
        font-size: 18px;
        font-weight: bold;

        @include min-sm {
          font-size: 20px;
        }
      }
    }
  }

  &.sub-content--non-member {
    &-booking {
      h6 {
        color: $text-color-pink;

        @include min-sm{
          margin-bottom: 5px;
        }
      }
    }
  }

  &.top-booking {
    font-size: 11px;
    color: $text-color-blue;

    .button {
      width: 100%;
      font-size: 14px;
      padding: 10px;
      margin-top: 5px;
    }

    h6 {
      font-size: 10px;
      font-weight: bold;
      margin: 0;
      text-transform: uppercase;
    }

    span {
      font-size: 20px;
      font-weight: bold;
      margin-right: 6px;
    }

    p {
      margin-bottom: 0;
    }
  }
}

.cancellation {
  margin-top: 10px;
  display: none;
  align-items: center;
  @include min-sm {
    display: flex;
  }
  span {
    font-size: 12px !important;
    color: #c0900cf7;
    margin-right: 10px;
  }
  p {
    font-size: 12px;
    color: #c0900cf7;
    cursor: pointer;
    font-weight: bold;
    margin-bottom: 0 !important;
    &:hover {
      text-decoration: underline;
    }
  }
}

.active {
  background: #232e48;
  color: #ffd25d;
  border-color: #232e48;
}
</style>
