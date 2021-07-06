<template>
  <div class="hotel-review-summary-change">
    <div class="hotel-review-summary-change__title">
      <h4>{{ getLanguage.summaryOfChange }}</h4>
    </div>
    <div class="hotel-review-summary-change__content">
      <div
        v-show="!isRoomSelectedLoading"
        class="hotel-review-summary-change__content__room"
      >
        <HotelReviewRoomDetail
          v-for="(room, roomId) in roomDetails"
          :key="roomId"
          :room-detail="room"
          :room-idx="roomId"
          @deleteSelectedRoom="data => $_deleteSelectedRoom(data, roomId)"
          @editSelectedRoom="$_editSelectedRoom"
        />
      </div>
      <div v-show="isRoomSelectedLoading" class="loading">
        <div v-for="(room, index) in selectedRoom" :key="index" class="mb-5">
          <b-skeleton animation="fade" width="15%" height="22px" class="mb-3" />
          <b-skeleton animation="fade" width="85%" height="35px" class="mb-3" />
          <b-skeleton animation="fade" width="95%" height="35px" class="mb-3" />
        </div>
      </div>
      <div class="hotel-review-summary-change__content__promo-code">
        <div class="promo-code-mobile">
          <div class="promo-code-mobile__input">
            <span class="icon-Icon-Promo-Codes" />
            <input
              v-model="promoCode"
              type="text"
              :placeholder="`+ ${getLanguage.promoCode}`"
              maxlength="10"
              @focusout="$_onCheckPromo"
            />
            <span
              v-if="promoCode"
              class="icon-Icon-Close"
              @click="$_clearpromoCode"
            />
          </div>
          <div v-show="promoCodeSave" class="promo-code-mobile__save">
            <span>You saved 10% with ‘{{ promoCode }}’</span>
            <span>{{ promoCodeSave | currency("YEN") }}</span>
          </div>
          <div v-show="alertModel" class="promo-code-mobile__save">
            <span>Promo code is invalid or has expired</span>
          </div>
        </div>
        <div v-show="promoCodeSave" class="promo-code-desktop">
          <span>{{ getLanguage.promoCode }} '{{ promoCode }}'</span>
          <span>{{ promoCodeSave | currency("YEN") }}</span>
        </div>
      </div>
      <div class="hotel-review-summary-change__content__tax">
        <AppCollapse
          v-show="!isRoomSelectedLoading"
          :room-detail-info="getTax"
          :room-i-d="'tax'"
          :fw-bold="true"
        />
        <b-skeleton
          v-show="isRoomSelectedLoading"
          animation="fade"
          width="100%"
          height="35px"
          class="mb-4"
        />
      </div>
    </div>
    <MyStayPopup
      ref="confirmDelete"
      :modal-class="`modal-delete`"
      class="popup"
    >
      <div class="confirm-delete">
        <div class="confirm-delete__title">
          {{
            actionType === "delete"
              ? getLanguage.sureToDelete
              : getLanguage.sureToEdit
          }}?
        </div>
        <div class="confirm-delete__button">
          <button class="m-btn m-btn__white" @click="$_cancel">
            {{ getLanguage.cancel }}
          </button>
          <button class="m-btn m-btn__yellow" @click="$_confirm">
            {{ getLanguage.confirm }}
          </button>
        </div>
      </div>
    </MyStayPopup>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default Vue.extend({
  name: "HotelReviewSummaryChange",
  data() {
    return {
      promoCode: "",
      roomIdx: 0,
      actionType: ""
    };
  },
  computed: {
    ...mapState({
      hotelID: state => state.hotel.data.hotelID,
      promotionCode: state => state.booking.bookingData.promoCode,
      fullPathHotelDetail: state => state.hotel.data.fullPathHotelDetail,
      isRoomSelectedLoading: state => state.hotelDetail.isRoomSelectedLoading,
      selectedRoom: state => state.hotelDetail.selectedRoom,
      alertModel: state => state.hotelDetail.alertModel
    }),
    ...mapGetters({
      roomDetails: "hotelDetail/roomDetailFromAPI",
      tax: "hotelDetail/tax",
      promoCodeSave: "hotelDetail/couponDiscount",
      hotelDetailRouteParams: "booking/hotelDetailRouteParams"
    }),

    getTax() {
      const taxName = [
        this.$t("summary.tax"),
        "Coupon discount",
        this.$t("summary.onsen_fee")
      ];
      if (this.tax) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.tax.title = this.$t("summary.tax_and_fee_change");
        this.tax.detail.forEach((t, taxID) => {
          t.time = taxName[taxID];
        });
      }

      return this.tax;
    },

    getLanguage() {
      return {
        summaryOfChange: this.$t("summary.summary_of_charges"),
        promoCode: this.$t("booking.promo_code"),
        sureToDelete: this.$t("summary.sure_delete_room"),
        sureToEdit: this.$t("summary.sure_edit_room"),
        cancel: this.$t("summary.cancel"),
        confirm: this.$t("summary.confirm")
      };
    }
  },
  watch: {
    promotionCode(promoCode) {
      this.promoCode = promoCode;
    }
  },
  mounted() {
    this.promoCode = this.promotionCode;
    // this.promoCode = this.promotionCode;
  },
  methods: {
    ...mapActions({
      deleteRoomSelected: "hotelDetail/a_deleteRoomDetailsSummary",
      a_deleteRoom: "booking/a_deleteRoom",
      delRoomParamsForGetRoomSelected:
        "booking/delRoomParamsForGetRoomSelected",
      getPromoCode: "booking/getPromoCode"
    }),

    $_clearpromoCode() {
      this.promoCode = "";
      this.getPromoCode("");
      this.$emit("on:CheckPromo");
    },

    $_deleteSelectedRoom(type, roomIdx) {
      this.actionType = type;
      this.$refs.confirmDelete.showModal();
      this.roomIdx = roomIdx;
    },

    $_cancel() {
      this.$refs.confirmDelete.hideModal();
    },

    $_confirm() {
      if (this.actionType === "delete") {
        this.deleteRoomSelected(this.roomIdx);
        this.delRoomParamsForGetRoomSelected(this.roomIdx);
      } else {
        this.$router
          .push({
            path: `/hotel/${this.hotelID}`,
            query: this.hotelDetailRouteParams
          })
          .catch(() => {});
      }
      this.$refs.confirmDelete.hideModal();
    },

    $_editSelectedRoom(type) {
      this.actionType = type;
      this.$refs.confirmDelete.showModal();
    },

    $_onCheckPromo() {
      this.getPromoCode(this.promoCode);
      this.$emit("on:CheckPromo");
    }
  }
});
</script>

<style lang="scss" scoped>
.hotel-review-summary-change {
  margin-bottom: 20px;
  @include min-sm {
    margin-bottom: 55px;
  }
  &__title {
    margin-bottom: 20px;
    h4 {
      font-size: 16px;
      font-weight: 600;
      @include min-sm {
        font-size: 20px;
        margin-bottom: 49px;
      }
    }
  }

  &__content {
    &__promo-code {
      margin-bottom: 30px;
      @include min-sm {
        margin-bottom: 0;
      }
      .promo-code-mobile {
        @include min-sm {
          display: none;
        }
        &__input {
          display: flex;
          align-items: center;
          position: relative;
          padding: 15px 16px;
          border: 1px solid $border-color-gray-2;
          border-radius: 3px;
          margin-bottom: 10px;
          input {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            padding-left: 15px;
            color: #1a489c;
            font-weight: 600;
            text-transform: uppercase;
          }
          span {
            &:first-child {
              font-size: 20px;
            }
            &:last-child {
              position: absolute;
              right: 15px;
              top: 19px;
              font-size: 6px;
              padding: 5px;
              color: white;
              border-radius: 50%;
              background: #8a92a3;
              font-weight: bold;
              @include min-sm {
                right: 10px;
                top: 14px;
              }
            }
          }
        }

        &__save {
          display: flex;
          justify-content: space-between;
          align-content: center;
          span {
            color: #f5455a;
            font-size: 14px;
            font-weight: 600;
          }
        }
      }
      .promo-code-desktop {
        display: none;
        @include min-sm {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 13px 0;
          border-bottom: 1px solid $border-color-gray-2;
        }
        span {
          font-size: 14px;
          color: #f5455a;
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
  }
}

.confirm-delete {
  text-align: center;
  padding: 20px 20px 10px 20px;

  &__title {
    margin-bottom: 30px;
  }

  &__button {
    display: flex;
    justify-content: space-between;
    button {
      padding: 10px 0;
      width: 48%;
    }
  }
}
</style>
