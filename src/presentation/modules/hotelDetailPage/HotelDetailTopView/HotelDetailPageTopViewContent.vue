<template>
  <div class="hotel-detail-top-view-content">
    <div class="hotel-detail-top-view-content__desc">
      <!-- <div v-html="hotelOverview"></div> -->
      <div
        class="hotel-detail-top-view-content__desc__text"
        :class="{ 'read-more': isReadMore, 'text-bgr-gradient': !isReadMore }"
      >
        <div id="desc-collapse">
          <p
            class="text-read-more"
            v-for="(overviewItem, index) in hotelOverviewToSeeMore"
            :key="index"
            v-html="overviewItem"
          ></p>
        </div>
      </div>
      <div
        class="hotel-detail-top-view-content__desc__read-more"
        :class="{ 'reduce-bottom': isReadMore }"
      >
        <span @click="$_onCollapse">
          {{
            isReadMore
              ? `- ${getLanguage.readLess}`
              : `+ ${getLanguage.readMore}`
          }}
        </span>
      </div>
    </div>
    <div class="hotel-detail-top-view-content__overview">
      <div class="hotel-detail-top-view-content__overview__booking">
        <HotelDetailOverviewSection :overview-data="checkInOverview" />
      </div>
      <div class="hotel-detail-top-view-content__overview__amenities">
        <div class="amenities">
          <div class="amenities__title">
            {{ getLanguage.amennitiesInclude }}:
          </div>
        </div>
        <div class="amenities__icon">
          <div class="amenities__icon__item d-flex justify-content-between">
            <span
              v-for="(item, index) in amennitiesInclude"
              :key="index"
              v-b-tooltip.hover
              :class="item.icon"
              :title="item.name"
            />
          </div>
          <div class="amenities__icon__see-more d-flex justify-content-end">
            <span
              v-b-toggle.hotel-details-sidebar
              v-b-tooltip.hover
              class="icon-See-More"
              :title="getLanguage.seeMore"
              @click="$_onOpenSidebar"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
  name: "HotelDetailPageTopViewContent",
  props: {
    checkInOverview: {
      type: Array
    },
    hotelOverview: {
      type: String
    }
  },
  data() {
    return {
      isReadMore: false
    };
  },
  computed: {
    ...mapGetters({
      amennitiesInclude: "hotelDetail/amennitiesInclude",
      hotelDetailV2: "hotelDetail/hotelDetailV2"
    }),
    getLanguage() {
      const langs = {
        readMore: this.$t("hoteldetail.read_more"),
        readLess: this.$t("hoteldetail.read_less"),
        amennitiesInclude: this.$t("hoteldetail.amenities_include"),
        transit: this.$t("hoteldetail.transit"),
        breakfast: this.$t("hoteldetail.breakfast"),
        drinks: this.$t("hoteldetail.drinks"),
        offers: this.$t("hoteldetail.offers"),
        seeMore: this.$t("hoteldetail.see_more")
      };
      return langs;
    },

    hotelOverviewToSeeMore() {
      let splitHotelOverviewFormat = this.hotelOverview.split("\n");

      if (this.hotelOverview.includes("\n \n")) {
        splitHotelOverviewFormat = this.hotelOverview.split("\n \n");
      }

      return splitHotelOverviewFormat;
    }
  },
  methods: {
    ...mapActions({
      a_toggleSidebar: "hotelDetail/a_toggleSidebar"
    }),

    $_onCollapse(isReadMore) {
      this.isReadMore = !this.isReadMore;
    },

    $_onOpenSidebar() {
      this.a_toggleSidebar(true);
      this.$scrollBody.disable();
    }
  }
});
</script>

<style lang="scss" scoped>
.hotel-detail-top-view-content {
  order: 4;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0 0 50px;
  @include min-sm {
    flex-direction: row;
    padding: 70px 0 75px;
  }
  &__desc {
    width: 100%;
    margin-bottom: 30px;
    position: relative;
    @include min-sm {
      width: 60%;
      margin-bottom: 0;
    }
    &__title {
      // display: none;
      margin-bottom: 23px;
      h4 {
        font-size: 15px;
        color: $text-color-blue;
        line-height: 31px;

        @include min-sm {
          font-size: 18px;
          display: block;
        }
      }
      @include min-sm {
        display: block;
      }
    }
    &__text {
      font-size: 14px;
      color: $text-color-blue;
      margin-bottom: 30px;
      line-height: 29px;
      height: 230px;
      overflow: hidden;
      position: relative;
      transition: 0.15s;
      text-align: justify;
      p {
        margin-bottom: 0;
      }
      .text-read-more {
        padding-top: 20px;
      }
    }

    .text-bgr-gradient {
      position: relative;
      padding-bottom: 0;
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 50px;
        left: 0;
        right: 0;
        bottom: 0px;
        background: linear-gradient(to top, #fff 0, rgba(255, 255, 255, 0) 60%);
        z-index: 10;
      }
    }

    .read-more {
      height: auto;
    }

    &__read-more {
      font-size: 14px;
      color: $bg-color-blue-2;
      font-weight: bold;
      width: 100px;
      position: absolute;
      left: 0;
      bottom: -15px;

      @include min-sm {
        bottom: 0;
      }

      span {
        outline: none;
        cursor: pointer;
      }
    }

    .reduce-bottom {
      @include min-sm {
        bottom: -20px;
      }
    }
  }
  &__overview {
    width: 100%;
    @include min-sm {
      width: calc(100% / 3);
    }
    &__booking {
      margin-bottom: 34px;
      .booking {
        &--block {
          display: flex;
          align-items: center;
          padding: 14px 0;
          border-bottom: 1px solid #d1d1d1;
          span:first-child {
            margin-right: 10px;
          }
          span:nth-child(2) {
            font-size: 12px;
            font-weight: bold;
            width: 130px;
            @include min-sm {
              font-size: 14px;
            }
          }
          span:last-child {
            font-size: 12px;
            @include min-sm {
              font-size: 13px;
            }
          }
        }
      }
    }
    &__amenities {
      [class^="icon-"]:hover,
      [class*=" icon-"]:hover {
        color: $text-color-blue;
        cursor: pointer;
      }

      .amenities {
        &__title {
          font-size: 12px;
          margin-bottom: 23px;
          @include min-sm {
            font-size: 13px;
          }
        }
        &__icon {
          display: flex;
          justify-content: space-between;

          span {
            font-size: 19px;
            padding: 12px;
            border-radius: 50%;
            border: 1px solid #dddee0;
            outline: none;
            width: 45px;
            height: 45px;
            background: $white;

            &:hover {
              background: $text-color-blue;
              color: white;
            }
          }
          span:last-child {
            margin-right: 0;
          }

          &__item {
            width: 80%;
          }

          &__see-more {
            width: 22%;
          }
        }
      }
    }
  }
}
</style>
