<template>
  <section id="plan" class="hotel-detail-rooms-and-plans">
    <div class="container">
      <div
        class="hotel-detail-rooms-and-plans__actions-top mb-2"
        v-if="$nuxt.isOnline"
      >
        <CustomCheckbox
          v-model="isUseDay"
          :is-checked="isUseDay"
          :label-text="$t('hoteldetail.day_use_only')"
          :disabled="isPlanLoading || isRoomLoading"
          @input="$_onSwitchUseDay"
        />
        <CustomCheckbox
          v-model="isAvailable"
          :is-checked="isAvailable"
          :label-text="$t('hoteldetail.show_only_available')"
          :disabled="isPlanLoading || isRoomLoading"
          @input="$_onChangeAvailable"
        />
      </div>
      <HotelDetailRoomsAndPlansTop
        :rooms-length="roomsLength"
        :plans-length="plansLength"
      />
      <RoomsAndPlansSection
        @getRoomsLength="roomsLength = $event"
        @getPlansLength="plansLength = $event"
      />
      <div
        v-show="isShowNoRoomAvailable"
        class="hotel-detail-rooms-and-plans__no-room"
      >
        <span class="icon-Icon-Info" />
        <span>{{ $t("hoteldetail.no_room_available") }}</span>
      </div>
    </div>
    <MyStayPopup
      ref="bookingPopup"
      :modal-class="`modal-booking`"
      :size="`lg`"
      @backdropClick="backdropClick"
    >
      <BookingPopup
        :room-name="roomName"
        :isSameRoom="isSameRoom"
        :isKidsTierSupport="isKidsTierSupport"
        :isRoomValid="isRoomValid"
        @on:BookSameRoom="$_bookSameRoom"
        @on:CloseModal="$_closeModal"
      />
    </MyStayPopup>
    <MyStayPopup
      ref="errorPopup"
      size="lg"
      :modal-class="`modal-error`"
      :no-close-on-backdrop="true"
    >
      <div class="error-popup">
        <div class="error-popup__title">
          Error:
          {{ error && error.text && error.text[0] && error.text[0].title }}
        </div>
        <div>
          <button
            class="m-btn m-btn__yellow error-popup__button"
            @click="bookAgain"
          >
            Book Again
          </button>
        </div>
      </div>
    </MyStayPopup>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default Vue.extend({
  name: "HotelDetailRoomsAndPlans",
  data() {
    return {
      roomsLength: 0,
      plansLength: 0,
      isUseDay: false,
      isAvailable: true,
      error: {}
    };
  },
  computed: {
    ...mapGetters({
      hotelReviews: "hotelDetail/hotelReviews",
      isKidsTierSupport: "hotel/isKidsTierSupport",
      roomLeftFilter: "hotelDetail/roomLeftFilter",
      planLeftFilter: "hotelDetail/planLeftFilter",
      roomDetails: "hotelDetail/roomDetails",
      lang: "appHeader/language",
      fullLang: "appHeader/fullLanguage",
      roomSelectedParams: "booking/roomSelectedParams",
      totalPriceWithoutTax: "hotelDetail/totalPriceWithoutTax",
      numberAdultsInRoomSelected: "booking/numberAdultsInRoomSelected",
      numberChildrenInRoomSelected: "booking/numberChildrenInRoomSelected"
    }),
    ...mapState({
      selectedRoom: (state: any) => state.hotelDetail.selectedRoom,
      hotelID: (state: any) => state.hotel.data.hotelID,
      bookingData: (state: any) => state.booking.bookingData,
      isUpdateBooking: (state: any) => state.hotelDetail.isUpdateBooking,
      roomSelect: (state: any) => state.booking.bookingData.roomList,
      roomIndex: (state: any) => state.hotelDetail.roomIndex,
      roomType: (state: any) => state.hotel.data.roomType,
      useDay: (state: any) => state.hotelDetail.isUseDay,
      isPlanLoading: (state: any) => state.hotelDetail.isPlanLoading,
      isRoomLoading: (state: any) => state.hotelDetail.isRoomLoading,
      allowedSelectOneDay: (state: any) => state.booking.allowedSelectOneDay,
      alertModel: (state: any) => state.hotelDetail.alertModel,
      roomSelectedFromAPI: (state: any) => state.hotelDetail.roomSelectedFromAPI
    }),
    getGuestNumber(): any {
      if (this.roomIndex >= 0) {
        return this.roomSelect[this.roomIndex]?.adults?.number;
      }
      return null;
    },

    isShowNoRoomAvailable(): boolean {
      return (
        !this.roomLeftFilter.length &&
        !this.planLeftFilter.length &&
        (!this.isPlanLoading || !this.isRoomLoading)
      );
    },

    getNextGuestNumber(): any {
      let roomIdx = this.roomIndex + 1;
      if (roomIdx > this.roomSelect.length - 1) {
        roomIdx = this.roomSelect.length - 1;
      }
      return this.roomSelect[roomIdx]?.adults?.number;
    },

    isSameRoom(): any {
      return this.getGuestNumber === this.getNextGuestNumber;
    },

    roomName(): Array<string> {
      return this.selectedRoom.map((room: any) => {
        return ` ${room.room.roomTitle} ${room.plan.title ? "+" : ""} ${
          room.plan.title ? room.plan.title : ""
        }`;
      });
    },

    isRoomValid(): boolean {
      let isRoomValid = true;
      if (this.selectedRoom.length) {
        const length = this.selectedRoom.length;
        const lastRoomSelected = this.selectedRoom[length - 1];
        if (
          lastRoomSelected.room.roomLeft === 1 ||
          lastRoomSelected.plan.roomLeft === 1
        ) {
          isRoomValid = false;
        }
      }

      return isRoomValid;
    },
    roomPlanCode(): any {
      if (this.roomDetails && this.roomDetails.length) {
        return this.roomDetails && this.roomDetails[0].roomPlanCode;
      }
    }
  },
  watch: {
    selectedRoom(selectedRoom) {
      if (selectedRoom?.length) {
        this.getRoomSelected(this.buildParams(this.fullLang));
      }
    },
    fullLang(lang) {
      const params = {
        hotelID: this.hotelID,
        queryString: {
          room_plan_codes: this.roomPlanCode
        },
        fullLang: lang
      };
      if (this.roomPlanCode) {
        this.getCancellationPolicies(params);
        if (!this.isUpdateBooking) {
          this.getRoomSelected(this.buildParams(lang));
        }
      }
    },

    alertModel(error) {
      if (error) {
        this.error = error;
        (this as any).$refs.errorPopup.showModal();
      }
    },

    allowedSelectOneDay(isUseDay) {
      this.isUseDay = isUseDay;
      this.saveUseDayParams({
        isAvailable: this.isAvailable,
        isUseDay
      });
    },

    roomSelectedFromAPI(roomSelected) {
      if (roomSelected.rooms && roomSelected.rooms.length) {
        this.$router.push((this as any).$pageRoute.hotelReview);
      }
    }
  },
  created() {
    this.saveUseDayParams({
      isAvailable: true,
      isUseDay: this.allowedSelectOneDay
    });
  },
  mounted() {
    this.isUseDay = this.allowedSelectOneDay;
    this.setCalendar(this.isUseDay);
  },
  methods: {
    ...mapActions({
      saveRoomInfo: "hotelDetail/a_saveRoomInfo",
      saveRoomIndex: "hotelDetail/saveRoomIndex",
      saveUseDayParams: "hotelDetail/saveUseDayParams",
      setCalendar: "booking/setCalendar",
      getRoomSelected: "hotelDetail/getRoomSelected",
      getCancellationPolicies: "hotelDetail/getCancellationPolicies",
      clearRoomSelected: "hotelDetail/clearRoomSelected"
    }),
    $_closeModal(): void {
      (this as any).$refs.bookingPopup.hideModal();
      this.saveRoomIndx();
    },

    backdropClick() {
      this.saveRoomIndx();
    },

    saveRoomIndx() {
      let roomIndex = this.roomIndex;
      roomIndex += 1;
      if (roomIndex >= this.roomSelect.length - 1) {
        roomIndex = this.roomSelect.length - 1;
      }
      this.saveRoomIndex(roomIndex);
    },

    $_bookSameRoom() {
      const length = this.selectedRoom.length;
      const lastRoomSelected = this.selectedRoom[length - 1];
      this.saveRoomInfo(lastRoomSelected);
      if (this.selectedRoom.length === this.roomSelect.length) {
        this.$router.push((this as any).$pageRoute.hotelReview);
      }
      let roomIdx = this.roomIndex;
      roomIdx += 1;
      this.saveRoomIndex(roomIdx);
      (this as any).$refs.bookingPopup.hideModal();
    },

    $_onChangeAvailable(isAvailable: boolean) {
      this.saveUseDayParams({
        isAvailable,
        isUseDay: this.isUseDay
      });
    },
    $_onSwitchUseDay(isUseDay: boolean) {
      this.saveUseDayParams({
        isAvailable: this.isAvailable,
        isUseDay
      });

      this.setCalendar(isUseDay);
    },
    buildParams(lang: string) {
      return {
        hotelID: this.hotelID,
        queryString: {
          checkin_date: this.bookingData.checkIn,
          checkout_date: this.bookingData.checkOut,
          children: this.numberChildrenInRoomSelected,
          mode: "standard",
          adults: this.numberAdultsInRoomSelected,
          total_price_without_tax: this.totalPriceWithoutTax,
          rooms: this.roomSelectedParams,
          coupon_code: this.bookingData.promoCode
        },
        fullLang: lang
      };
    },
    bookAgain() {
      this.saveRoomIndex(0);
      this.clearRoomSelected();
      (this as any).$refs.errorPopup.hideModal();
    }
  }
});
</script>

<style lang="scss" scoped>
.hotel-detail-rooms-and-plans {
  background: $bg-color-gray-8;
  padding: 30px 0 20px 0;

  @include min-sm {
    padding: 60px 0 50px 0;
  }

  &__no-room {
    width: 100%;
    text-align: center;
    border: 1px solid #dddee0;
    border-radius: 5px;
    padding: 50px 0;
    span {
      display: block;
      color: #767677;

      &:first-child {
        margin-bottom: 10px;
        font-size: 25px;
      }
    }
  }

  &__actions-top {
    display: flex;
    justify-content: space-between;

    @include min-sm {
      justify-content: flex-start;

      .app-checkbox {
        margin-right: 25px;
      }
    }
  }
}
.error-popup {
  font-size: 18px;
  text-align: center;
  color: rgb(70, 70, 70);
  background-color: white;
  padding: 20px 0;
  &__title {
    font-weight: bold;
    color: red;
    margin-bottom: 20px;
  }
  &__message {
    font-size: 15px;
    margin-bottom: 20px;
  }
  &__button {
    padding: 10px 30px;
  }
}
.error {
  background-color: white;
}
</style>
