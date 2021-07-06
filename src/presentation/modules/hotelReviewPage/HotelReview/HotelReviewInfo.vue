<template>
  <section class="hotel-review-info">
    <div class="hotel-review-info__title">
      <h4>{{ getLanguage.yourStay }}</h4>
    </div>
    <div v-show="!isRoomSelectedLoading" class="hotel-review-info__block">
      <div class="hotel-review-info__block__icon">
        <span class="icon-Icon-Calendar" />
      </div>
      <div class="hotel-review-info__block__text">
        <span>{{ checkin }} - {{ checkout }}</span>
        <span class="block">/</span>
        <span>
          {{ totalNight }}
          {{ totalNight > 1 ? getLanguage.nights : getLanguage.night }}
        </span>
      </div>
      <div class="hotel-review-info__block__edit">
        <span @click="editRoomInfo">{{ getLanguage.edit }}</span>
      </div>
    </div>
    <div v-show="isRoomSelectedLoading" class="mt-3">
      <b-skeleton animation="wave" width="100%" height="25px" class="mb-3" />
    </div>
    <div v-show="!isRoomSelectedLoading" class="hotel-review-info__block">
      <div class="hotel-review-info__block__icon">
        <span class="icon-Icon-Group" />
      </div>
      <div class="hotel-review-info__block__text">
        <span>
          {{ roomSelected && roomSelected.length }}
          {{
            roomSelected && roomSelected.length > 1
              ? getLanguage.rooms
              : getLanguage.room
          }}
          ,
          {{ totalGuest }}
          {{ totalGuest > 1 ? getLanguage.guests : getLanguage.guest }}
        </span>
      </div>
      <div class="hotel-review-info__block__edit">
        <span @click="editRoomInfo">{{ getLanguage.edit }}</span>
      </div>
    </div>
    <div v-show="isRoomSelectedLoading" class="mt-3">
      <b-skeleton animation="wave" width="100%" height="25px" class="mb-3" />
    </div>
    <div class="hotel-review-info__your-stay">
      <div
        v-for="(room, index) in roomSelected"
        v-show="!isRoomSelectedLoading"
        :key="index"
        class="hotel-review-info__block hotel-review-info--room"
      >
        <div class="hotel-review-info__block__icon">
          <span class="icon-Icon-Bed" />
        </div>
        <div class="hotel-review-info__block__text">
          <span
            >{{ getLanguage.room }} {{ index + 1 }} / {{ room.title }} x
            {{ getGuestText(room.numberAdults, room.numberChildren) }}</span
          >
        </div>
        <div class="hotel-review-info__block__edit">
          <span @click="editRoomInfo">{{ getLanguage.edit }}</span>
        </div>
      </div>
    </div>
    <div v-show="isRoomSelectedLoading" class="mt-3">
      <b-skeleton
        v-for="(item, index) in selectedRoom"
        :key="index"
        animation="wave"
        width="100%"
        height="25px"
        class="mb-3"
      />
    </div>
    <MyStayPopup ref="confirmDelete" :modal-class="`modal-delete`">
      <div class="confirm-delete">
        <div class="confirm-delete__title">{{ getLanguage.sureToEdit }}?</div>
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
  </section>
</template>

<script>
import Vue from "vue";
import { mapState, mapGetters } from "vuex";
export default Vue.extend({
  name: "HotelReviewInfo",
  computed: {
    ...mapState({
      hotelID: state => state.hotel.data.hotelID,
      bookingData: state => state.booking.bookingData,
      roomList: state => state.booking.bookingData.roomList,
      fullPathHotelDetail: state => state.hotel.data.fullPathHotelDetail,
      isRoomSelectedLoading: state => state.hotelDetail.isRoomSelectedLoading,
      selectedRoom: state => state.hotelDetail.selectedRoom
    }),
    ...mapGetters({
      totalNight: "booking/totalNight",
      checkin: "booking/getCheckinDate",
      checkout: "booking/getCheckoutDate",
      roomSelected: "hotelDetail/roomSelected",
      hotelDetailRouteParams: "booking/hotelDetailRouteParams"
    }),
    getLanguage() {
      return {
        taxAndHotelFee: this.$t("summary.tax_and_fee_change"),
        yourStay: this.$t("summary.your_stay"),
        edit: this.$t("summary.edit"),
        room: this.$t("booking.room"),
        rooms: this.$t("booking.rooms"),
        guest: this.$t("booking.guest"),
        guests: this.$t("booking.guests"),
        night: this.$t("summary.night"),
        nights: this.$t("customhtmlcalendar.nights"),
        sureToDelete: this.$t("summary.sure_delete_room"),
        sureToEdit: this.$t("summary.sure_edit_room"),
        cancel: this.$t("summary.cancel"),
        confirm: this.$t("summary.confirm"),
        child: this.$t("booking.child"),
        children: this.$t("booking.children"),
        adult: this.$t("booking.adult"),
        adults: this.$t("booking.adults")
      };
    },
    totalGuest() {
      let numnerGuests = 0;
      if (this.roomSelected) {
        this.roomSelected.forEach(room => {
          numnerGuests += room.numberAdults + room.numberChildren;
        });
      }

      return numnerGuests;
    }
  },
  methods: {
    editRoomInfo() {
      this.$refs.confirmDelete.showModal();
    },

    $_confirm() {
      this.$router
        .push({
          path: `/hotel/${this.hotelID}`,
          query: this.hotelDetailRouteParams
        })
        .catch(() => {});
    },

    $_cancel() {
      this.$refs.confirmDelete.hideModal();
    },

    getGuestText(numberAdults, numberChildren) {
      let childrenText = "";
      if (numberChildren > 0) {
        childrenText = `& ${numberChildren} ${
          numberChildren > 1
            ? this.getLanguage.children
            : this.getLanguage.child
        }`;
      } else {
        childrenText = "";
      }

      return `${numberAdults} ${
        numberAdults > 1 ? this.getLanguage.adults : this.getLanguage.adult
      } ${childrenText}`;
    }
  }
});
</script>

<style lang="scss" scoped>
.hotel-review-info {
  background: #ffffff;
  margin-bottom: 30px;
  @include min-sm {
    padding: 27px 30px 30px 30px;
    border: 1px solid $border-color-gray-2;
    border-radius: 0 0 4px 4px;
  }
  &__title {
    display: none;
    @include min-sm {
      display: block;
      margin-bottom: 13px;
      h4 {
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
  &__block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 0;
    border-bottom: 1px solid $border-color-gray-2;
    &__icon {
      margin-right: 12px;
      color: #9196a3;
      font-size: 17px;
    }

    &__text {
      font-size: 12px;
      color: $text-color-blue;
      font-weight: bold;
      flex: 1;
      padding-right: 10px;

      .block {
        padding: 0 10px;
      }
    }

    &__edit {
      color: $text-color-blue-2;
      font-size: 11px;
      font-weight: bold;
      text-align: right;
      cursor: pointer;
    }
  }

  &--room {
    display: none;
    @include min-sm {
      display: flex;
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
