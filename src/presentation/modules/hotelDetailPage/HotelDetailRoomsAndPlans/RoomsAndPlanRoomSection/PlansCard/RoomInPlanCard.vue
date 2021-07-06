<template>
  <div
    class="rooms-and-plans__sub-card"
    :class="{ 'is-member-only': planRooms.isMemberOnly }"
  >
    <div class="promo-code" v-if="roomsInPlan && roomsInPlan.promoCodeName">
      <span>{{ roomsInPlan && roomsInPlan.promoCodeName }}</span>
    </div>
    <div class="d-flex">
      <div class="rooms-and-plans__sub-card__img">
        <LazyLoadBgrImage
          :img-url="planRooms.image"
          @click.native="$_openSideBox"
        />
        <RoomsAndPlansGallery
          :is-open="sideBoxOpen"
          :gallery="planRooms.roomSliderImages"
          :room-info="planRooms"
          @toggleSideBox="$_toggleSideBox"
          @onSelectRoom="savePlanSelected"
        />
        <div
          class="rooms-and-plans__sub-card__img-count"
          @click="$_openSideBox"
        >
          <span class="icon-Icon-Gallery" />
          1 / {{ planRooms.roomSliderImages.length }}
        </div>
      </div>
      <div class="rooms-and-plans__sub-card__detail">
        <div
          v-if="planRooms.roomLeft < 10"
          class="rooms-and-plans__sub-card__detail-rooms"
        >
          <span class="icon-Icon-Time" />
          {{ roomLeftText }}
        </div>
        <h3 @click="$_changeTab">
          {{ planRooms.roomTitle }} <span class="icon-Arrow-Small-Right" />
        </h3>
        <!-- <span class="rate">{{ planRooms.rate | currency("YEN") }}</span> -->
        <!-- <span class="discount-rate">{{ planRooms.discountRate }}</span> -->
        <div
          v-if="isFullText && planRooms.details"
          v-html="planRooms.details"
        />
        <div
          class="short-desc"
          v-if="!isFullText && planRooms.details"
          v-html="shortDescription"
        />
        <span
          v-if="!isFullText && planRooms.details"
          class="detail"
          @click="$_openFullText"
        >
          {{ getLang.details }}
        </span>
      </div>
      <RoomsAndPlansBooking
        :sub-item="roomsInPlan"
        :member="roomsInPlan && roomsInPlan.discountRate"
        @saveRoomSelected="savePlanSelected"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";

const FilterType = {
  filterByRoom: "room",
  filterByPlan: "plan"
};

export default Vue.extend({
  name: "RoomInPlanCard",
  props: {
    roomsInPlan: {
      type: Object
    },
    isFirstCard: {
      type: Boolean
    }
  },
  data() {
    return {
      isFullText: false,
      sideBoxOpen: false,
      planRooms: this.roomsInPlan
    };
  },
  computed: {
    ...mapGetters({
      fullLang: "appHeader/fullLanguage"
    }),

    ...mapState({
      isMobile: (state: any) => state.general.data.isMobile
    }),

    shortDescription(): String {
      const limitChars = this.isMobile ? 100 : 150;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.isFullText = this.roomsInPlan?.details?.length < limitChars;
      return this.roomsInPlan?.details?.slice(0, limitChars) + "...";
    },

    getLang(): any {
      return {
        only: this.$t("hoteldetail.only"),
        left: this.$t("hoteldetail.left"),
        outOffRoom: this.$t("hoteldetail.outOffRoom"),
        details: this.$t("hoteldetail.details")
      };
    },

    roomLeftText(): any {
      if (this.roomsInPlan?.roomLeft) {
        return `${this.getLang.only} ${this.roomsInPlan.roomLeft} ${this.getLang.left}`;
      } else {
        return "Out Of Room";
      }
    }
  },
  watch: {
    roomsInPlan(newVal) {
      this.planRooms = newVal;
    }
  },
  methods: {
    ...mapActions({
      changeTab: "hotelDetail/changeTab",
      saveGtmData: "general/saveGtmData"
    }),
    $_openFullText(): void {
      this.isFullText = true;
    },

    $_openSideBox() {
      this.sideBoxOpen = true;
      this.$emit("toggleSideBox", true);
      const hotelID = this.$route.params?.hotelID;
      this.saveGtmData({
        event: "viewAllPhotosClick",
        language: this.fullLang,
        pageCategory: "HotelDetailPage",
        hotelID,
        roomID: this.roomsInPlan.roomId,
        planID: this.roomsInPlan.roomPlanCode,
        triggerType: "event"
      });
    },

    $_toggleSideBox(): void {
      (this as any).sideBoxOpen = false;
      this.$emit("toggleSideBox", false);
    },

    $_changeTab(): void {
      this.changeTab({
        currentTab: FilterType.filterByRoom,
        currentId: this.roomsInPlan.roomId.toString()
      });
    },
    savePlanSelected(planSelected: any) {
      this.$emit("savePlan", planSelected);
    }
  }
});
</script>

<style lang="scss" scoped>
.rooms-and-plans__sub-card {
  // display: flex;
  font-size: 11px;
  color: $text-color-blue;
  justify-content: space-between;
  padding: 13px 0 13px 0;
  align-items: center;

  @include min-sm {
    align-items: flex-start;
    padding: 20px 0 20px 0;
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

  &.is-member-only {
    h3 {
      color: $text-color-blue-2;
    }

    span.rate {
      text-decoration: line-through;
      color: #7b7b85;
      font-size: 13px;
      font-weight: normal;
    }

    span.discount-rate {
      font-size: 18px;
      color: $text-color-blue-2;
      display: inline;
    }
  }

  &.last-card {
    @include min-sm {
      border-bottom: none;
      padding-bottom: 10px;
    }
  }

  &__img {
    cursor: pointer;
    display: none;

    @include min-sm {
      display: block;
      width: 175px;
      height: 105px;
      margin-right: 32px;
      position: relative;
      background-position-x: center;
      background-position-y: center;
      background-size: cover;
    }

    &-count {
      position: absolute;
      bottom: 0;
      right: 0;
      background: $bg-color-blue;
      padding: 6px 9px;
      color: $white;
      border-radius: 2px;
      display: none;

      @include min-sm {
        display: flex;
        align-items: center;
      }

      [class^="icon-"],
      [class*=" icon-"] {
        font-size: 17px;
        margin-right: 13px;
      }
    }

    img {
      visibility: hidden;
      width: 0;
      height: 0;

      @include min-sm {
        visibility: visible;
        width: 100%;
        height: 100%;
      }
    }
  }

  &__detail {
    flex: 1;
    margin-right: 25px;

    h3 {
      font-size: 13px;
      margin-bottom: 0;
      cursor: pointer;
      font-weight: bold;
      color: $text-color-blue-2;

      @include min-sm {
        margin-bottom: 0.5rem;
      }

      [class^="icon-"],
      [class*=" icon-"] {
        font-size: 7px;
        display: inline-block;

        @include min-sm {
          font-size: 9px;
        }
      }

      @include min-sm {
        font-size: 16px;
      }
    }

    .short-desc {
      display: inline;
    }

    p {
      display: none;
      margin: 0;

      @include min-sm {
        display: inline;
      }

      span {
        cursor: pointer;
        color: $text-color-blue-2;
        font-weight: bold;
      }
    }

    .detail {
      font-weight: bold;
      color: $text-color-blue-2;
      cursor: pointer;
    }

    span {
      font-weight: bold;
      &.rate {
        font-size: 18px;

        @include min-sm {
          display: none;
        }
      }

      &.discount-rate {
        display: none;
      }
    }

    &-rooms {
      display: none;
      color: $text-color-pink;

      @include min-sm {
        display: block;
      }
    }
  }
}
</style>
