<template>
  <div class="see-more-room-or-plan">
    <div
      v-if="mainCardInfo.promoCodeName"
      class="see-more-room-or-plan top-booking"
    >
      <h6>{{ getLanguage.rateFrom }}</h6>
      <div class="promo-code">
        <span>{{ mainCardInfo.promoCodeName }}</span>
      </div>
      <div class="total-rate">
        <span v-if="$nuxt.isOnline" class="rate">
          {{
            mainCardInfo && mainCardInfo.rateBeforeDiscount | currency("YEN")
          }}
        </span>
        <span class="discount-rate">
          {{ mainCardInfo && mainCardInfo.rate | currency("YEN") }}
        </span>
      </div>
      <p>{{ getGuestText }} / {{ totalNightText }}</p>
      <button
        v-if="mainCardInfo.subContent.length !== 0 && !subContentIsOpen"
        class="button m-btn m-btn__yellow"
        @click="$_togglePlans"
      >
        {{ mainCardInfo.roomId ? getLanguage.seePlan : getLanguage.seeRoom }}
      </button>
      <button
        v-else-if="mainCardInfo.subContent.length !== 0 && subContentIsOpen"
        class="button m-btn m-btn__gray"
        @click="$_togglePlans"
      >
        {{ getLanguage.close }}
      </button>
    </div>

    <div v-else class="see-more-room-or-plan top-booking">
      <h6>{{ getLanguage.rateFrom }}</h6>
      <span v-if="$nuxt.isOnline">
        {{ mainCardInfo && mainCardInfo.rate | currency("YEN") }}
      </span>
      {{ totalNightText }}
      <p>{{ getGuestText }}</p>
      <button
        v-if="mainCardInfo.subContent.length !== 0 && !subContentIsOpen"
        class="button m-btn m-btn__yellow"
        @click="$_togglePlans"
      >
        {{ mainCardInfo.roomId ? getLanguage.seePlan : getLanguage.seeRoom }}
      </button>
      <button
        v-else-if="mainCardInfo.subContent.length !== 0 && subContentIsOpen"
        class="button m-btn m-btn__gray"
        @click="$_togglePlans"
      >
        {{ getLanguage.close }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SeeMoreRoomsOrPlans",
  props: {
    mainCardInfo: {
      type: Object,
      default: () => {}
    },
    subContentIsOpen: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters({
      totalGuest: "booking/totalGuest",
      totalNight: "booking/totalNight",
      cancellationPolicies: "hotelDetail/cancellationPolicies",
      lang: "appHeader/language",
      fullLang: "appHeader/fullLanguage",
      roomStatus: "hotelDetail/roomStatus"
    }),

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
    isHasNoPlanRoom() {
      return this.mainCardInfo && this.mainCardInfo.subContent.length === 0;
    },
    getLanguage() {
      return {
        earn: this.$t("hoteldetail.earn"),
        perNight: this.$t("hoteldetail.per_night"),
        seePlan: this.$t("hoteldetail.see_plan"),
        seeRoom: this.$t("hoteldetail.see_room"),
        close: this.$t("hoteldetail.close"),
        joinToUnlock: this.$t("hoteldetail.join_to_unlock"),
        rateFrom: this.$t("hoteldetail.rate_from"),
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
    $_togglePlans() {
      this.$emit("togglePlans");
    }
  }
};
</script>

<style lang="scss" scoped>
.see-more-room-or-plan {
  flex: 0 1 75px;
  display: none;

  @include min-sm {
    display: block;
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

    span.rate {
      text-decoration: line-through;
      color: $text-color-gray-6;
      font-size: 16px;
      font-weight: normal;
    }

    span.discount-rate {
      color: $text-color-pink;
      font-size: 20px;
      font-weight: bold;
    }

    p {
      margin-bottom: 0;
    }
  }

  .promo-code {
    margin-top: 8px;
    margin-bottom: 5px;
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
}

.active {
  background: #232e48;
  color: #ffd25d;
  border-color: #232e48;
}
</style>
