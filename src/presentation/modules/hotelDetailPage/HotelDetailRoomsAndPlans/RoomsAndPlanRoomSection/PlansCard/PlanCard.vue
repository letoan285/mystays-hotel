<template>
  <RoomsAndPlansCard :member="member">
    <RoomsAndPlansCardImage :info="planInfo" />
    <div ref="card" class="rooms-and-plans__plan-section">
      <div class="rooms-and-plans__plan-section__info-top">
        <div class="rooms-and-plans__plan-section__info-top-content">
          <h2>
            {{ planInfo.title }}
            <span class="icon-Arrow-Small-Right" />
          </h2>
          <div class="full-text" v-if="isFullText" v-html="planInfo.details" />
          <div
            v-if="planInfo.details && planInfo.details.length"
            class="info-top-content"
          >
            <div
              class="info-top-content__desc"
              v-if="!isFullText"
              v-html="shortDescription"
            />
            <span @click="$_openFullText">
              {{ isFullText ? getLang.hide : getLang.details }}
            </span>
          </div>
        </div>
        <div class="rooms-and-plans__plan-section__image">
          <LazyLoadBgrImage :img-url="planInfo.picture" :numberRect="3" />
        </div>
        <SeeMoreRoomsOrPlans
          top-booking
          :main-card-info="planInfo"
          :member="member"
          :sub-content-is-open="roomIsOpen"
          @togglePlans="$_togglePlans"
        />
      </div>
      <div v-if="planInfo && planInfo.roomPlanCode" class="cancellation">
        <span class="icon-Icon-Info" />
        <p
          v-if="!planInfo.cancellationFreeDeadline"
          @click="$_openCancellationPolices"
        >
          {{ $t("hoteldetail.cancellation_policy") }}
        </p>
        <p v-else @click="$_openCancellationPolices">
          {{ $t("hoteldetail.free_cancellation_until") }}
          {{ planInfo.cancellationFreeDeadline }}
        </p>
      </div>
      <RoomsListInPlan
        v-if="planInfo.subContent.length"
        :rooms-list-in-plan="planInfo.subContent"
        :member="member"
        :room-is-open="roomIsOpen"
        @savePlanSelected="savePlanSelected"
      />
      <button
        v-if="roomIsOpen && shouldRenderToggleButton"
        class="button m-btn m-btn__yellow rooms-and-plans__plan-section__toggle"
        @click="$_togglePlans"
      >
        {{ getLang.seeLess }}
        <span class="icon-Arrow-Small-Up" />
      </button>
      <button
        v-else-if="roomIsOpen && member"
        class="button m-btn m-btn__pink rooms-and-plans__plan-section__toggle"
      >
        {{ getLang.seeLess }}
        <span class="icon-Arrow-Small-Up" />
      </button>
      <button
        v-else-if="!roomIsOpen && member"
        class="button m-btn m-btn__pink rooms-and-plans__plan-section__toggle see-more-btn"
      >
        {{ getLang.seeMore }}
        <span class="icon-Arrow-Small-Down" />
      </button>
      <button
        v-else-if="!roomIsOpen && shouldRenderToggleButton"
        class="button m-btn m-btn__yellow rooms-and-plans__plan-section__toggle see-more-btn"
        @click="$_togglePlans"
      >
        {{ getLang.seeMore }}
        <span class="icon-Arrow-Small-Down" />
      </button>
    </div>
  </RoomsAndPlansCard>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "PlanCard",
  props: {
    // eslint-disable-next-line vue/require-default-prop
    planInfo: {
      type: Object
    },
    member: {
      type: Boolean
    }
  },
  data(): any {
    return {
      roomIsOpen: false,
      isFullText: false,
      roomInPlan: {}
    };
  },
  computed: {
    ...mapState({
      selectedRoom: (state: any) => state.hotelDetail.selectedRoom,
      roomSelect: (state: any) => state.booking.bookingData.roomList,
      roomIndex: (state: any) => state.hotelDetail.roomIndex,
      isMobile: (state: any) => state.general.data.isMobile
    }),
    ...mapGetters({
      roomStatus: "hotelDetail/roomStatus",
      isKidsTierSupport: "hotel/isKidsTierSupport",
      lang: "appHeader/language",
      fullLang: "appHeader/fullLanguage"
    }),

    shortDescription(): String {
      const limitChars = this.isMobile ? 60 : 150;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.isFullText =
        this.planInfo.details && this.planInfo.details.length < limitChars;
      return (
        this.planInfo.details &&
        this.planInfo.details.slice(0, limitChars) + "..."
      );
    },

    shouldRenderToggleButton(): any {
      return this.planInfo.subContent.length > 2;
    },

    getLang(): any {
      return {
        seeMore: this.$t("hoteldetail.see_more_room"),
        seeLess: this.$t("hoteldetail.see_less_room"),
        details: this.$t("hoteldetail.details"),
        hide: this.$t("hoteldetail.hide")
      };
    }
  },
  methods: {
    ...mapActions({
      saveRoomInfo: "hotelDetail/a_saveRoomInfo",
      saveRoomIndex: "hotelDetail/saveRoomIndex",
      getCancellationPolicies: "hotelDetail/getCancellationPolicies",
      saveGtmData: "general/saveGtmData"
    }),
    $_openCancellationPolices() {
      const hotelID = this.$route.params?.hotelID;
      const params = {
        hotelID,
        queryString: {
          room_plan_codes: this.planInfo?.roomPlanCode
        },
        fullLang: this.fullLang
      };
      if (this.planInfo?.roomPlanCode) {
        this.$nuxt.$emit("on:ShowCancellationPoliciesPopup");
        this.getCancellationPolicies(params);
      }

      const gtmData = {
        event: "cancellationPolicyInfoClick",
        language: this.lang,
        pageCategory: "HotelDetailPage",
        hotelID: this.$route.params?.hotelID,
        roomID: this.roomInPlan?.roomId,
        planID: this.planInfo?.roomPlanCode,
        triggerType: "event"
      };

      this.saveGtmData(gtmData);
    },

    $_togglePlans(): void {
      this.roomIsOpen = !this.roomIsOpen;
      if (this.roomIsOpen) {
        const hotelID = this.$route.params?.hotelID;
        this.saveGtmData({
          event: "viewAllPlansClick",
          language: this.fullLang,
          pageCategory: "HotelDetailPage",
          hotelID,
          roomID: "",
          planID: this.planInfo?.roomPlanCode,
          triggerType: "event"
        });
      }
    },

    $_openFullText(): void {
      this.isFullText = !this.isFullText;
    },

    savePlanSelected(roomSeleted: any) {
      this.roomInPlan = roomSeleted || {};
      const selectedByPlan = {
        room: roomSeleted,
        plan: {
          ...this.planInfo,
          roomRate: roomSeleted.roomRate,
          planCode: roomSeleted.planCode,
          tax: roomSeleted.tax,
          roomPlanCode: roomSeleted.roomPlanCode
        }
      };

      if (this.selectedRoom.length < this.roomSelect.length) {
        this.saveRoomInfo(selectedByPlan);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.rooms-and-plans__plan-section {
  overflow: hidden;
  width: 100%;
  &__info {
    @include min-sm {
      flex-basis: 800px;
    }

    &-top {
      display: flex;
      // flex-direction: column;
      justify-content: space-between;
      padding: 23px 20px 20px 20px;

      @include min-sm {
        flex-direction: row;
        padding: 20px 0;
        padding-left: 220px;
      }

      @include min-md {
        padding-left: 0;
      }

      h2 {
        font-size: 14px;
        line-height: 17px;
        color: $text-color-blue;
        font-weight: bold;

        @include min-sm {
          font-size: 18px;
          line-height: 24px;
          margin-right: 20px;
          flex: 0 1 250px;
        }

        [class^="icon-"],
        [class*=" icon-"] {
          font-size: 7px;
          margin-left: 5px;

          @include min-sm {
            font-size: 10px;
          }
        }
      }

      &-content {
        position: relative;
        width: 60%;
        @include min-sm {
          width: initial;
          flex: 1 1 320px;
          margin-right: 40px;

          .full-text {
            display: inline;
            font-size: 13px;
          }
        }

        p {
          margin: 0;
          font-size: 12px;

          @include min-sm {
            display: block;
            font-size: 14px;
          }

          span {
            cursor: pointer;
            color: $text-color-blue-2;
            font-weight: bold;
            position: absolute;
            left: 0;
            bottom: -35px;

            @include min-sm {
              position: static;
            }
          }
        }
      }
    }
  }

  &__image {
    width: 110px;
    height: 120px;
    @include min-sm {
      display: none;
    }
    .image-wrapper {
      cursor: pointer;
      min-height: 100px;
      position: relative;
      margin-bottom: 20px;
      height: 100%;
      background-size: cover;
      background-position-x: center;
      background-position-y: center;

      @include min-sm {
        margin-bottom: 0;
        height: 146px;
        z-index: 1;
      }
    }
  }

  &__toggle {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 27px;
    border-radius: 0;
    border: none;

    @include min-sm {
      display: none;
    }

    [class^="icon-"],
    [class*=" icon-"] {
      font-size: 10px;
      margin-left: 5px;
    }
  }

  .info-top-content {
    display: inline;
    span {
      color: $text-color-blue-2;
      cursor: pointer;
      font-size: 13px;
    }

    &__desc {
      font-size: 11px;
      display: inline;

      @include min-sm{
        font-size: 13px;
      }
    }
  }

  .full-text {
    font-size: 13px;
    display: inline;
  }
}

.cancellation {
  align-items: center;
  display: flex;
  padding: 0 20px;
  @include min-sm {
    display: none;
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
    margin-bottom: 0;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
