<template>
  <div
    :class="[
      plansInRoom && plansInRoom.isMemberOnly
        ? 'rooms-and-plans__room__sub-card--member'
        : 'rooms-and-plans__room__sub-card--non-member',
      { 'last-card': plansInRoom && plansInRoom.isLastCard }
    ]"
  >
    <div class="promo-code" v-if="plansInRoom && plansInRoom.promoCodeName">
      <span>{{ plansInRoom && plansInRoom.promoCodeName }}</span>
    </div>
    <div class="rooms-and-plans">
      <div
        v-if="plansInRoom && !plansInRoom.isMemberOnly"
        class="rooms-and-plans__room__sub-card--non-member-img"
      >
        <LazyLoadBgrImage
          :img-url="plansInRoom && plansInRoom.image"
          :numberRect="3"
        />
      </div>
      <RoomsSubCardDetail
        :plans-in-room="plansInRoom"
        :member="plansInRoom && plansInRoom.isMemberOnly"
      />
      <RoomsAndPlansBooking
        :sub-item="plansInRoom"
        :member="plansInRoom && plansInRoom.discountRate"
        @saveRoomSelected="saveRoomSelected"
      />
    </div>
    <div class="rooms-and-plans-cancellation">
      <div class="rooms-and-plans-cancellation__text">
        <span class="icon-Icon-Info" />
        <p
          v-if="!plansInRoom.cancellationFreeDeadline"
          @click="$_openCancellationPolices"
        >
          {{ $t("hoteldetail.cancellation_policy") }}
        </p>
        <p v-else @click="$_openCancellationPolices">
          {{ $t("hoteldetail.free_cancellation_until") }}
          {{ plansInRoom.cancellationFreeDeadline }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable vue/require-default-prop */

import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default Vue.extend({
  name: "PlanInRoomCard",
  props: {
    plansInRoom: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      fullLang: "appHeader/fullLanguage"
    })
  },
  methods: {
    ...mapActions({
      getCancellationPolicies: "hotelDetail/getCancellationPolicies",
      saveGtmData: "general/saveGtmData"
    }),
    saveRoomSelected(room: Object) {
      this.$emit("saveRoom", room);
    },

    $_openCancellationPolices() {
      const hotelID = this.$route.params?.hotelID;
      const params = {
        hotelID,
        queryString: {
          room_plan_codes: this.plansInRoom?.roomPlanCode
        },
        fullLang: this.fullLang
      };
      if (this.plansInRoom?.roomPlanCode) {
        this.$nuxt.$emit("on:ShowCancellationPoliciesPopup");
        this.getCancellationPolicies(params);
      }

      const gtmData = {
        event: "cancellationPolicyInfoClick",
        language: this.fullLang,
        pageCategory: "HotelDetailPage",
        hotelID,
        roomID: this.plansInRoom?.roomId,
        planID: this.plansInRoom?.roomPlanCode,
        triggerType: "event"
      };

      this.saveGtmData(gtmData);
    }
  }
});
</script>

<style lang="scss" scoped>
.rooms-and-plans__room__sub-card {
  &--member,
  &--non-member {
    display: flex;
    font-size: 11px;
    color: $text-color-blue;
    justify-content: space-between;
    padding: 13px 0 13px 0;
    border-bottom: 1px solid $border-color-gray-2;
    // align-items: center;
    flex-direction: column;

    &.last-card {
      border-bottom: none;
    }

    @include min-sm {
      align-items: flex-start;
      padding: 17px 0 17px 0;
    }

    &.last-card {
      @include min-sm {
        border-bottom: none;
      }
    }
  }

  &--non-member {
    &-img {
      display: none;

      @include min-sm {
        display: block;
        width: 175px;
        height: 105px;
        margin-right: 20px;
        overflow: hidden;
        position: relative;
      }

      img {
        position: absolute;
        top: -9999px;
        bottom: -9999px;
        left: -9999px;
        right: -9999px;
        margin: auto;
      }
    }
  }
}

.rooms-and-plans {
  display: flex;
  width: 100%;
}

.promo-code {
  margin-top: 8px;
  margin-bottom: 15px;

  @include min-sm {
    display: none;
  }

  span {
    font-size: 12px;
    display: inline;
    padding: 5px 15px;
    border-radius: 20px;
    background: #e6ee9c;
    font-weight: 700;
  }
}

.rooms-and-plans-cancellation {
  width: 100%;
  @include min-sm {
    display: none;
  }
  &__text {
    display: flex;
    align-items: center;
    margin-top: 10px;
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
      margin-bottom: 0;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
