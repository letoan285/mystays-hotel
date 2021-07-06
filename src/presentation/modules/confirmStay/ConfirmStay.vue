<template>
  <section class="confirm-stay-section">
    <GeneratePdf :reservations-data="reservationsData" />
    <div class="container">
      <div class="confirm-stay-section__top">
        <div class="confirm-stay-section__top__title">
          <h3 v-if="!isReservationLoading">{{ confirmTitle }}!</h3>
          <div v-else class="title-loading">
            <b-skeleton
              v-if="!isMobile"
              animation="fade"
              width="80%"
              height="36px"
            />
            <b-skeleton
              v-if="isMobile"
              animation="fade"
              width="100%"
              class="mb-3"
              height="36px"
            />
          </div>
        </div>
        <div class="confirm-stay-section__top__actions">
          <ConfirmStayTopActions />
        </div>
      </div>
      <div class="confirm-stay-section__content">
        <div class="confirm-stay-section__content__summary">
          <div class="summary">
            <div v-if="!isReservationLoading" class="summary__booking-id">
              <span
                v-b-tooltip.hover
                class="icon-Icon-Copy"
                placement="right"
                :title="copyText"
                @click="$_onCopy(bookingID)"
              />
              <span>{{ getLanguage.booking }}ID: {{ bookingID }}</span>
            </div>

            <b-skeleton
              v-if="isReservationLoading"
              animation="fade"
              width="100%"
              height="45px"
              class="mb-5"
            />

            <div class="summary__stay">
              <StayInfo v-if="!isReservationLoading" />
              <b-card v-if="isReservationLoading" class="mb-4">
                <b-skeleton
                  animation="fade"
                  width="30%"
                  height="30px"
                  class="mb-4 mt-2"
                />
                <b-skeleton
                  v-if="isMobile"
                  animation="fade"
                  width="100%"
                  height="45px"
                  class="mb-4 mt-2"
                />
                <b-skeleton
                  animation="fade"
                  width="55%"
                  class="mb-4"
                  :height="isMobile ? '18px' : '23px'"
                />
                <b-skeleton
                  animation="fade"
                  width="70%"
                  class="mb-4"
                  :height="isMobile ? '18px' : '23px'"
                />
                <b-skeleton
                  animation="fade"
                  width="70%"
                  class="mb-2"
                  :height="isMobile ? '18px' : '23px'"
                />
              </b-card>
            </div>
            <div class="summary__summary-change">
              <ConfirmStaySummayChange v-if="!isReservationLoading" />
              <b-card v-if="isReservationLoading" class="mb-4">
                <b-skeleton
                  animation="fade"
                  width="30%"
                  height="30px"
                  class="mb-4 mt-2"
                />
                <b-skeleton
                  animation="fade"
                  width="55%"
                  class="mb-4"
                  height="42px"
                />
                <b-skeleton
                  animation="fade"
                  width="98%"
                  class="mb-4"
                  :height="isMobile ? '18px' : '23px'"
                />
                <b-skeleton
                  animation="fade"
                  width="98%"
                  class="mb-2"
                  :height="isMobile ? '18px' : '23px'"
                />
              </b-card>
            </div>
            <div class="summary__elite">
              <ConfirmStayElite />
            </div>
            <div class="summary__grand-total">
              <div class="grand-total">
                <div class="grand-total__title">
                  <h4>{{ getLanguage.yourStay }}:</h4>
                  <span>{{ getLanguage.reviewYourStay }}</span>
                </div>
                <div class="grand-total__price">
                  <h4>{{ reservationsData.total_price | currency("YEN") }}</h4>
                </div>
                <div
                  v-b-tooltip.hover
                  class="grand-total__icon"
                  placement="right"
                  title="Grand Total"
                >
                  <span class="icon-Icon-Info" />
                </div>
              </div>
            </div>
            <div class="summary__cancellation">
              <ConfirmStayCancellation />
            </div>
          </div>
        </div>
        <div class="confirm-stay-section__content__stay-info">
          <ReservationQuestion v-if="!isQuestionLoading" class="mb-4" />
          <b-card v-if="isQuestionLoading" class="mb-4">
            <b-skeleton
              animation="fade"
              width="85%"
              height="30px"
              class="mb-2"
            />
            <b-skeleton
              animation="fade"
              width="55%"
              height="30px"
              class="mb-2"
            />
            <b-skeleton
              animation="fade"
              width="70%"
              height="30px"
              class="mb-2"
            />
            <b-skeleton
              animation="fade"
              width="70%"
              height="30px"
              class="mb-2"
            />
          </b-card>
          <div class="stay-info" v-if="isPageLoaded">
            <div
              v-if="reservationsData.status === 'done'"
              class="stay-info__update-booking"
            >
              <ConfirmStayUpdateBooking />
            </div>
            <div class="stay-info__location">
              <LocationBlock />
            </div>
            <div class="stay-info__overview">
              <div class="stay-info__overview__title">
                <h4>{{ getLanguage.hotelInformation }}</h4>
              </div>
              <div v-if="!isBaiduMap" class="stay-info__overview__map">
                <img
                  v-if="!isShowMap"
                  :src="mapBackgroundMobile"
                  alt
                  @click="$_openMap"
                />
                <VueGoogleMap
                  v-if="isShowMap"
                  class="travel-map"
                  :markers="[hotelPosition]"
                  :init-map-markers="[hotelPosition]"
                  :is-full-screen="true"
                />
              </div>
              <div v-if="isBaiduMap" class="stay-info__overview__map">
                <BaiduMaps
                  class="travel-map"
                  :markers="[hotelPosition]"
                  :init-map-markers="[hotelPosition]"
                  :is-full-screen="true"
                />
              </div>
              <div class="stay-info__overview__button">
                <span class="icon-Icon-Map" />
                <button
                  class="m-btn m-btn__white"
                  @click="$_linkToGoogleMapWeb"
                >
                  {{ getLanguage.getDirection }}
                </button>
              </div>
              <div class="stay-info__overview__text">
                <div
                  class="overview-text"
                  :class="{
                    'read-more': isReadMore,
                    'text-bgr-gradient': !isReadMore
                  }"
                  v-html="hotelOverview"
                ></div>
                <span @click="$_onCollapse">
                  {{
                    isReadMore
                      ? `- ${getLanguage.readLess}`
                      : `+ ${getLanguage.readMore}`
                  }}
                </span>
              </div>
              <div class="stay-info__overview__info">
                <ConfirmStayOverview :overview-data="checkInOverview" />
                <ConfirmStayOverview :overview-data="findUsOverviewData" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <WechatPopup />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapState } from "vuex";
import moment from "moment";

export default Vue.extend({
  name: "ConfirmStay",
  data() {
    return {
      isShowMap: false,
      mapBackgroundMobile: "",
      isMobile: false,
      copyText: "Copy",
      isQuestionLoading: false,
      isPageLoaded: false,
      isReadMore: false
    };
  },
  computed: {
    ...mapState({
      language: (state: any) => state.appHeader.language,
      isReservationLoading: (state: any) => state.booking.isReservationLoading,
      isReservationQuestionLoading: (state: any) =>
        state.confirmBooking.isReservationQuestionLoading
    }),
    ...mapGetters({
      totalPrice: "hotelDetail/totalPrice",
      hotelDetail: "hotelDetail/hotelDetail",
      mapBackgroundImage: "hotelDetail/mapBackgroundImage",
      bookingID: "booking/bookingID",
      reservationsData: "booking/reservationsData",
      fullLang: "appHeader/fullLanguage",
      hotelDetailV2: "hotelDetail/hotelDetailV2",
      findUsOverviewData: "hotelDetail/findUsOverview",
      checkInData: "hotelDetail/checkInOverview"
    }),

    fileName(): string {
      const fileName = `Booking_Report_${
        this.reservationsData.reservation_number
      }_${moment(new Date()).format("DD/MM/YYYY")}`;

      return fileName;
    },

    checkInOverview(): any {
      const name = [
        this.$t("hoteldetail.check_in_out"),
        this.$t("hoteldetail.call_to_back"),
        this.$t("hoteldetail.contact_us")
      ];
      return this.checkInData.map((c: any, index: number) => {
        c.name = name[index];
        return c;
      });
    },

    getLanguage(): any {
      return {
        confirmTitle: this.$t("confirmbooking.your_stay_is_confirmed"),
        hotelInformation: this.$t("confirmbooking.hotel_information"),
        booking: this.$t("confirmbooking.booking"),
        getDirection: this.$t("hoteldetail.get_directions"),
        yourStay: this.$t("summary.your_stay"),
        reviewYourStay: this.$t("summary.review_your_stay"),
        readMore: this.$t("hoteldetail.read_more"),
        readLess: this.$t("hoteldetail.read_less")
      };
    },

    confirmTitle(): any {
      return this.reservationsData?.message?.title;
    },

    hotelOverview(): string {
      if (this.hotelDetailV2?.overview) {
        const splitOverview = this.hotelDetailV2.overview.replaceAll(
          "\n",
          "<br>"
        );

        return splitOverview;
      }

      return "";
    },

    hotelPosition(): any {
      const lat = Number(this.hotelDetail?.latitude);
      const lng = Number(this.hotelDetail?.longitude);

      return {
        ...this.hotelDetail,
        latitude: lat,
        longitude: lng
      };
    },

    isBaiduMap(): boolean {
      return (this as any).fullLang === "zh-CN";
    }
  },
  watch: {
    hotelDetail(hotelDetail) {
      const width = window.innerWidth;
      const size = `${width - 40}x135`;
      const lat = hotelDetail?.latitude;
      const lng = hotelDetail?.longitude;
      const lang = this.language;
      this.mapBackgroundMobile = this.$_getMapImage(lat, lng, size, lang);
    },
    language(lang) {
      this.isQuestionLoading = true;
      const width = window.innerWidth;
      const size = `${width - 40}x135`;
      const lat = this.hotelDetail?.latitude;
      const lng = this.hotelDetail?.longitude;
      this.mapBackgroundMobile = this.$_getMapImage(lat, lng, size, lang);
    },

    isReservationQuestionLoading(isLoading) {
      this.isQuestionLoading = isLoading;
    },

    isReservationLoading(isLoading) {
      this.isQuestionLoading = isLoading;
    }
  },
  mounted() {
    const width = window.innerWidth;
    this.isMobile = width < 768;
    window.addEventListener("resize", this.$_onResize);
    this.isPageLoaded = true;
  },

  destroyed() {
    window.removeEventListener("resize", this.$_onResize);
  },
  methods: {
    $_openMap(): void {
      this.isShowMap = true;
    },

    $_onCollapse(): void {
      this.isReadMore = !this.isReadMore;
    },

    $_linkToGoogleMapWeb() {
      let link = "";
      if (this.fullLang === "zh-CN") {
        link = `https://map.baidu.com/?latlng=${this.hotelDetail.latitude},${this.hotelDetail.longitude}`;
      } else {
        link = `https://www.google.com/maps?saddr=Current+Location&daddr=${this.hotelDetail.latitude},${this.hotelDetail.longitude}`;
      }
      window.open(link);
    },

    async $_onCopy(bookingID: string) {
      try {
        await (this as any).$copyText(bookingID);
        this.copyText = "Copied";
      } catch (e) {
        this.copyText = e;
      }
    },

    $_onResize(event: any) {
      this.isMobile = event.target.innerWidth < 768;
      const size = `${event.target.innerWidth - 40}x135`;
      const lat = this.hotelDetail?.latitude;
      const lng = this.hotelDetail?.longitude;
      const lang = this.language;
      this.mapBackgroundMobile = this.$_getMapImage(lat, lng, size, lang);
    },

    $_getMapImage(lat: any, lng: any, size: any, lang: any) {
      return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&scale=1&size=${size}&maptype=roadmap&key=AIzaSyD9G3yU6CBFBMhuClWTKYsxZIDk5D44Szs&format=png&visual_refresh=true&markers=icon:https://www.mystays.com/Assets/Mystays/images/ms-zoomout-icon.png|shadow:true|${lat},${lng}&language=${lang}&markers=icon:https://www.mystays.com/Assets/Mystays/images/location-map-hover.png|shadow:true|43.05978,141.347616&markers=icon:https://www.mystays.com/Assets/Mystays/images/location-map-hover.png|shadow:true|43.062577,141.353647&markers=icon:https://www.mystays.com/Assets/Mystays/images/location-map-hover.png|shadow:true`;
    }
  }
});
</script>

<style lang="scss" scoped>
.confirm-stay-section {
  padding: 60px 0 20px 0;
  @include min-sm {
    padding: 60px 20px;
  }

  .container {
    padding: 0 20px;
    @include min-sm {
      padding: 0;
    }
  }

  &__top {
    @include min-sm {
      display: flex;
      justify-content: space-between;
    }
    &__title {
      @include min-sm {
        width: 57.6%;
      }
      h3 {
        font-size: 20px;
        font-weight: normal;
        text-align: center;
        margin-bottom: 20px;
        text-transform: capitalize;
        @include min-sm {
          text-align: left;
          font-size: 30px;
          font-weight: 600;
          margin-bottom: 42px;
        }
      }

      .title-loading {
        width: 100%;
      }
    }

    &__actions {
      width: 100%;
      @include min-sm {
        width: fit-content;
      }
      @include min-xl {
        display: block;
        width: 34%;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @include min-xl {
      flex-direction: row;
    }
    &__summary {
      width: 100%;
      @include min-xl {
        width: 57.5%;
      }
      .summary {
        &__booking-id {
          padding: 13px 20px;
          border: 2px solid rgba(26, 72, 156, 0.5);
          border-radius: 4px;
          margin-bottom: 50px;
          font-size: 14px;
          color: #232e48;
          font-weight: bold;
          text-align: center;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          @include min-sm {
            padding: 13px;
            border: 1px solid $border-color-gray-2;
            color: $text-color-blue-2;
            font-size: 16px;
            justify-content: center;
          }
          span {
            &:first-child {
              order: 2;
              color: $text-color-blue-2;
              font-size: 20px;
              @include min-sm {
                order: 1;
                margin-right: 20px;
              }
            }

            &:last-child {
              order: 1;
              @include min-sm {
                order: 2;
              }
            }
          }
        }
        &__grand-total {
          display: none;
          margin-bottom: 30px;
          border: 1px solid $border-color-gray-2;
          border-radius: 4px;
          padding: 12px 20px;
          background: #fff6df;
          margin-bottom: 30px;
          @include min-sm {
            display: block;
          }
          .grand-total {
            display: flex;
            justify-content: space-between;
            align-items: center;
            h4 {
              font-size: 16px;
              margin-bottom: 0;
              font-weight: bold;
            }

            &__title {
              flex-grow: 1;
              span {
                font-size: 12px;
                color: $text-color-blue-2;
              }
            }

            &__price {
              margin-right: 10px;
              h4 {
                font-size: 18px;
              }
            }

            &__icon {
              font-size: 13px;
              cursor: pointer;
            }
          }
        }
      }
    }

    &__stay-info {
      width: 100%;
      @include min-sm {
        width: 50%;
        margin: 0 auto;
      }
      @include min-xl {
        width: 35%;
        margin: 0;
      }
      .stay-info {
        margin-bottom: 25px;
        &__location {
          display: none;
          @include min-sm {
            display: block;
          }
        }
        &__overview {
          display: flex;
          flex-direction: column;
          @include min-sm {
            padding: 30px;
            border: 1px solid $border-color-gray-2;
            border-radius: 4px;
          }

          &__title {
            margin-bottom: 20px;
            @include min-sm {
              display: none;
            }
            h4 {
              font-size: 18px;
              font-weight: 600;
            }
          }

          &__map {
            margin-bottom: 20px;
            @include min-sm {
              display: none;
            }
            .travel-map {
              height: 135px;
            }
            img {
              width: 100%;
              height: auto;
            }
          }
          &__button {
            order: 1;
            position: relative;
            span {
              position: absolute;
              left: 30px;
              top: 17px;
              color: $text-color-blue-2;
              @include min-sm {
                left: 25px;
                top: 12px;
              }
            }

            &:hover {
              span {
                color: white;
              }
            }
            button {
              width: 100%;
              padding: 16px 0;
              margin-bottom: 20px;
              text-transform: uppercase;
              letter-spacing: 1px;
              font-size: 11px;
              border: 1px solid $text-color-blue-2;
              @include min-sm {
                padding: 10px;
                font-size: 12px;
                border: 1px solid #d1d1d1;
              }
            }
          }

          &__text {
            order: 4;
            margin-bottom: 10px;
            font-size: 13px;
            line-height: 24px;
            @include min-sm {
              order: 2;
              line-height: 22px;
            }
            .overview-text {
              height: 180px;
              margin-bottom: 10px;
              overflow: hidden;
            }

            .read-more {
              height: auto;
              margin-bottom: 15px;
            }
          }

          span {
            font-size: 13px;
            color: $bg-color-blue-2;
            font-weight: bold;
            width: 100px;

            @include min-sm {
              bottom: 0;
            }

            outline: none;
            cursor: pointer;
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
              background: linear-gradient(
                to top,
                #fff 0,
                rgba(255, 255, 255, 0) 60%
              );
              z-index: 10;
            }
          }

          &__info {
            order: 3;
            margin-bottom: 30px;
            @include min-sm {
              margin-bottom: 0;
            }
            button {
              width: 100%;
              padding: 10px;
            }
          }
        }
      }

      .reservation-question {
        border: 1px solid $border-color-gray-2;
        border-radius: 4px;
        padding: 20px;
        font-size: 14px;

        @include min-sm {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
