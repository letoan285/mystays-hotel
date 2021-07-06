<template>
  <div>
    <div v-show="!isCalendarShow" class="calendar-loading-container">
      <CalendarLoader />
    </div>
    <div v-show="isCalendarShow">
      <div class="calendar-desktop" />
      <div
        v-if="isMobile"
        class="calendar__bottom"
        :class="{
          'ios-safari-padding':
            detectIOS() && detectIphoneModel() && !isToolbarOpen,
          'smaller-model':
            detectIOS() && !detectIphoneModel() && !isToolbarOpen,
        }"
      >
        <div class="calendar__bottom__note">
          <span class="selected">{{ getLang.selected }}</span>
          <span class="not-available">{{ getLang.notAvailable }}</span>
          <span class="minimum">{{ getLang.minimunStay }}</span>
        </div>
        <div class="calendar__bottom__btn">
          <div id="startDate" class="button" @click="datePicker('start')">
            {{ bookingData.checkIn ? getCheckinDate : "Check In" }}
          </div>
          <div id="endDate" class="button" @click="datePicker('end')">
            {{ bookingData.checkOut ? getCheckoutDate : "Check Out" }}
          </div>
        </div>
        <div class="calendar__bottom__btn-done" @click="clickDoneBtn">
          {{ getLang.done }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import { mapActions, mapState, mapGetters } from "vuex";
import mobiscroll from "@mobiscroll/javascript";
import CalendarLoader from "../app-loaders/CalendarLoader";
import Calendar from "./calendarHelper";
import Utilities from "../../../shared/helper/utilities";

export default Vue.extend({
  name: "",
  components: {
    CalendarLoader,
  },
  props: {
    isShow: Boolean,
    minimumStay: Array,
    container: String,
    subContainer: String,
    calendarContainer: String,
    date: Array,
    innerHeight: {
      type: Number,
      default: 0,
    },
  },
  data: () => {
    return {
      position: 0,
      calendar: null,
      curentTarget: null,
      showCalendar: false,
      CheckNextDaySetManually: false,
      isSelected: { startDate: false, endDate: false },
      dayUseOnly: false,
      isCalendarShow: false,
      rangeCalendar: null,
      invalidDateCalendar: null,
      isIOSSafari: false,
      isToolbarOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      language: "appHeader/language",
      getCheckinDate: "booking/getCheckinDate",
      getCheckoutDate: "booking/getCheckoutDate",
      numberAdults: "booking/numberAdults",
      numberChildren: "booking/numberChildren",
      totalNight: "booking/totalNight",
      totalGuest: "booking/totalGuest",
    }),
    ...mapState({
      bookingData: (state) => state.booking.bookingData,
      isMobile: (state) => state.general.data.isMobile,
      allowedSelectOneDay: (state) => state.booking.allowedSelectOneDay,
      bookingHotelID: (state) => state.booking.bookingData.hotelID,
      location: (state) => state.booking.bookingData.location,
      checkIn: (state) => state.booking.bookingData.checkIn,
      checkOut: (state) => state.booking.bookingData.checkOut,
      calendarData: (state) => state.general.data.calendarData,
      disabled_dates: (state) => state.general.data.calendarData.disabled_dates,
      isFetching: (state) => state.general.isFetching,
      calendarHotelId: (state) => state.general.data.calendarData.hotelId,
    }),
    getLang() {
      return {
        selected: this.$t("customhtmlcalendar.selected_date"),
        notAvailable: this.$t("customhtmlcalendar.not_available"),
        minimunStay: this.$t("customhtmlcalendar.minimum_stay"),
        done: this.$t("searchhotel.done"),
      };
    },
  },
  watch: {
    isMobile(newValue) {
      if (newValue) {
        this.renderCalendar(this.language, newValue);
      } else {
        this.renderCalendar(this.language);
      }
    },
  },
  destroyed() {
    Calendar.clearCalendar();
  },
  mounted() {
    const query = this.$route.query;
    this.dayUseOnly = !!(query["day-use-only"] === "true") || false;
    this.checkHotelId().then(() =>
      this.renderCalendar(this.language, this.isMobile)
    );

    if (this.innerHeight === window.innerHeight) {
      this.isToolbarOpen = true;
    } else {
      this.isToolbarOpen = false;
    }
  },
  methods: {
    ...mapActions({
      setBooking: "booking/setInitialBooking",
      getBooking: "booking/getInitialBooking",
      showRoomSelect: "booking/showRoomSelect",
      setCalendar: "booking/setCalendar",
      getCalendarData: "general/getCalendarData",
    }),

    detectIOS() {
      const isIOS = /iPhone/.test(navigator.userAgent) && !window.MSStream;
      let safariAgent = false;
      if (isIOS) {
        const userAgentString = navigator.userAgent;
        let chromeAgent =
          userAgentString.indexOf("Chrome") > -1 ||
          userAgentString.match("CriOS");
        safariAgent = userAgentString.indexOf("Safari") > -1;

        if (chromeAgent && safariAgent) safariAgent = false;
      }

      return safariAgent;
    },

    detectIphoneModel() {
      const iHeight = window.screen.height;
      const iWidth = window.screen.width;
      let isXSMax = false;

      if (
        (iWidth === 320 && iHeight === 568) ||
        (iWidth === 375 && iHeight === 667) ||
        (iWidth === 414 && iHeight === 736)
      ) {
        isXSMax = false;
      } else isXSMax = true;

      return isXSMax;
    },

    datePicker(type) {
      Calendar.datePicker(this, type);
    },
    clickDoneBtn() {
      this.$nuxt.$emit("calendar-mobile-click-done");
      this.$emit("clickDoneBtn");
    },
    handelCalendar() {
      if (this.$route.name === "Hotel") {
        this.setCalendar(true);
      }
    },
    calendarParams(y, m) {
      return {
        year: y,
        month: m,
        adults: this.numberAdults,
        children: this.numberChildren,
        nights: this.totalNight,
        hotelID: this.bookingHotelID,
      };
    },
    async checkHotelId() {
      const lastHotelId = (await localStorage.getItem("lastHotelId")) || "";
      if (lastHotelId !== this.bookingHotelID) {
        await localStorage.removeItem("calendarData");
      }
      return;
    },
    async renderCalendar(lang, isMobile) {
      let CheckNextDaySetManually = false;
      const checkIn = new Date(this.bookingData.checkIn);
      const checkOut = new Date(this.bookingData.checkOut);

      const config = isMobile ? Calendar.mobileConfig : Calendar.desktopConfig;
      this.rangeCalendar = await mobiscroll.range(".calendar-desktop", {
        ...Calendar.configDefault,
        ...config,
        defaultValue: [checkIn, checkOut],
        lang: lang || "en-US",
        onInit: (_event, inst) => inst.show(),
        onMarkupReady: (event, inst) => {
          const textByLocale = this.$t("customhtmlcalendar");
          Calendar.customHTML(event, textByLocale);
          if (isMobile) {
            Calendar.customHeaderCalendar(event.target, textByLocale);
          }

          Calendar.showToolTip(inst, this.$t("customhtmlcalendar"));
        },
        onPageLoaded: (event, inst) => {
          const date = new Date(event.firstDay);
          const y = date.getFullYear();
          const m = date.getMonth();
          const payLoad = this.calendarParams(y, m);

          if (payLoad.hotelID) {
            Calendar.getAPICalendar({ ...payLoad, date })
              .then(() => {
                Calendar.renderInventory(inst, date);
                Calendar.renderInvalidDate(inst);
                setTimeout(() => {
                  this.isCalendarShow = true;
                }, 1000);
              })
              .catch((err) => {
                this.isCalendarShow = true;
              });
          } else {
            setTimeout(() => {
              this.isCalendarShow = true;
            }, 1000);
          }

          if (!this.isMobile) {
            Calendar.AddIntermediateHoverLogic(inst, CheckNextDaySetManually); // Hover logic
          }

          if (isMobile) {
            const textByLocale = this.$t("customhtmlcalendar");
            Calendar.customHeaderCalendar(inst.markup, textByLocale);
          }
        },
        onDayChange: (event, inst) => {
          setTimeout(() => {
            Calendar.showToolTip(inst, this.$t("customhtmlcalendar"));
          }, 100);
        },
        onSet: (event, inst) => {
          CheckNextDaySetManually = false;

          CheckNextDaySetManually = Calendar.onSetDate(event, inst);

          if (CheckNextDaySetManually) {
            const startVal = inst.startVal;
            const endVal = inst.endVal;
            const checkIn = moment(startVal).format("YYYY-MM-DD");
            const checkOut = moment(endVal).format("YYYY-MM-DD");

            if (this.allowedSelectOneDay) {
              this.setBooking({ checkIn: checkOut, checkOut });
              this.showRoomSelect();
            } else {
              this.setBooking({ checkIn, checkOut });
            }
          } else {
            const startVal = inst.startVal;
            const endVal = inst.endVal;
            const checkOut = moment(endVal).format("YYYY-MM-DD");
            this.setBooking({ checkOut });

            if (startVal === endVal) {
              this.handelCalendar();
            }
            if (!this.isMobile) {
              this.showRoomSelect();
            }
          }
          this.getBooking();

          if (!this.isMobile) {
            Calendar.AddIntermediateHoverLogic(inst, CheckNextDaySetManually); // Hover logic
          }
        },
      });
    },
  },
});
</script>

<style lang="scss">
@import "@mobiscroll/javascript/dist/css/mobiscroll.min.css";
.calendar-loading-container {
  width: 100vw;
  height: 100vh;
  transition: 0.3s ease;
  animation-name: mbsc-anim-p-in;
  animation-duration: 0.3s;
  position: relative;
  background: #fff;
  min-height: 450px;

  @include min-sm {
    width: 100%;
    height: auto;
  }
}

.calendar-desktop {
  width: 100%;
  position: relative;
}
.calendar__bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  background: #fff;
  box-shadow: 0 -1px 15px 0 rgba(0, 0, 0, 0.25);
  padding: 15px;

  &__note {
    display: flex;
    margin-bottom: 10px;
    color: #000;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
      font-size: 11px;
      font-weight: 600;
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        border: 1px solid $bg-color-blue-2;
        margin-right: 10px;
      }
    }
    .selected {
      &::before {
        background-color: $bg-color-blue-2;
      }
    }
    .not-available {
      &::before {
        content: "";
        background: linear-gradient(
          to top left,
          #ddd 0%,
          #ddd calc(50% - 0.8px),
          #000 50%,
          #ddd calc(50% + 0.8px),
          #ddd 100%
        );
      }
    }
    .minimum {
      &::before {
        background: coral;
        border: none;
      }
    }
  }
  &__btn {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    color: #000;
    .button {
      width: 45%;
      border: 1px solid #ddd;
      padding: 5px 10px;
      text-align: center;
      font-weight: 500;
    }
    .active {
      border: 2px solid #ffd25d;
    }
  }
  &__btn-done {
    width: 100%;
    text-align: center;
    padding: 10px;
    background-color: #ffd25d;
    font-weight: 500;
    text-transform: capitalize;
    color: #000;
  }
}

.ios-safari-padding {
  padding-bottom: calc(10px + 2 * env(safe-area-inset-bottom));
}

.ios-safari-padding-with-toolbar {
  padding-bottom: 70px; // highest in IP
}

.smaller-model {
  padding-bottom: 40px;
}

.smaller-model-with-toolbar {
  padding-bottom: 0;
}

.calendar-mobile {
  .calendar {
    &__header {
      display: block;
      margin-bottom: 10px;

      span {
        padding: 5px 10px;
        border-radius: 2px;
        border: 1px solid #dddee0;
        background-color: #ffffff;
        font-weight: 600;
      }
    }
  }

  .mbsc-fr-overlay {
    display: none;
  }

  .mystays-bookingwidget-header {
    padding-bottom: 10px;

    .days {
      font-size: 15px;
      display: flex;
      justify-content: space-between;

      span {
        font-size: 13px;
        color: #737272;
        display: block;
        text-align: center;
        width: 100%;
      }
    }
  }

  .mbsc-range-btn-t {
    display: none;
  }

  .mbsc-cal-days-c {
    display: none;
  }

  .mbsc-fr-persp {
    height: 100vh !important;
  }

  .mbsc-cal-scroll-c {
    overflow: inherit;
  }

  .mbsc-cal-table {
    height: auto;
  }

  .mbsc-cal-body {
    height: 100vh;
  }

  .mbsc-cal-hdr {
    display: none;
  }

  .mbsc-fr-c {
    background-color: #fff;
  }

  .mbsc-fr-w {
    border: none !important;
    background: none;
  }

  .mbsc-cal-row {
    .mbsc-cal-day {
      &:last-child {
        .mbsc-cal-cell-i {
          border-right: 0.5px solid #ddd;
        }
      }

      .mbsc-cal-cell-i {
        border-bottom: 0.5px solid #ddd;
        border-left: 0.5px solid #ddd;
      }
    }
  }

  .mbsc-cal-row {
    &:first-child {
      .mbsc-cal-day {
        .mbsc-cal-cell-i {
          border-top: 0.5px solid #ddd;
        }
      }
    }
  }

  .mbsc-cal-row {
    &:nth-child(2) {
      .mbsc-cal-day {
        .mbsc-cal-cell-i {
          border-top: 0.5px solid #ddd;
        }
      }
    }
  }

  .mbsc-cal-row {
    &:last-child {
      .mbsc-cal-day {
        .mbsc-cal-cell-i {
          border-right: 0.5px solid #ddd;
        }
      }
    }
  }

  .mbsc-cal-day-last {
    .mbsc-cal-cell-i {
      border-right: 0.5px solid #ddd;
    }
  }
}

.calendar-desktop {
  .note {
    display: flex;
    padding: 0 30px 20px 30px;
    background-color: #fff;
    border-bottom: 4px solid #ffd25d;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
      font-size: 11px;
      font-weight: 600;

      &::before {
        content: "";
        width: 10px;
        height: 10px;
        margin-right: 10px;
      }
    }

    .selected {
      &::before {
        border: 1px solid $bg-color-blue-2;
        background-color: $bg-color-blue-2;
      }
    }

    .not-available {
      &::before {
        content: "";
        border: 1px solid $bg-color-blue-2;
        background: linear-gradient(
          to top left,
          #ddd 0%,
          #ddd calc(50% - 0.8px),
          #000 50%,
          #ddd calc(50% + 0.8px),
          #ddd 100%
        );
      }
    }
    .minimum {
      &::before {
        content: "";
        background: coral;
      }
    }
  }

  .mbsc-ic::before {
    // content: "";
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 5px 10px;
  }

  .mbsc-range-btn-t {
    display: none;
  }

  .mbsc-fr-overlay {
    display: none;
  }

  .mbsc-fr-c {
    background-color: #fff;
    padding: 20px 20px 0 20px;
  }

  .mbsc-cal-row {
    .mbsc-cal-day {
      &:last-child {
        .mbsc-cal-cell-i {
          border-right: 0.5px solid #ddd;
        }
      }

      .mbsc-cal-cell-i {
        border-bottom: 0.5px solid #ddd;
        border-left: 0.5px solid #ddd;
      }
    }

    &:first-child {
      .mbsc-cal-day {
        .mbsc-cal-cell-i {
          border-top: 0.5px solid #ddd;
        }
      }
    }

    &:nth-child(2) {
      .mbsc-cal-day {
        .mbsc-cal-cell-i {
          border-top: 0.5px solid #ddd;
        }
      }
    }

    &:last-child {
      .mbsc-cal-day {
        .mbsc-cal-cell-i {
          border-right: 0.5px solid #ddd;
        }
      }
    }

    .mbsc-disabled {
      .mbsc-cal-day-i {
        background: linear-gradient(
          to top left,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0) calc(50% - 0.8px),
          #ddd 50%,
          rgba(0, 0, 0, 0) calc(50% + 0.8px),
          rgba(0, 0, 0, 0) 100%
        );
      }
    }
  }

  .mbsc-cal-day-last {
    .mbsc-cal-cell-i {
      border-right: 0.5px solid #ddd;
    }
  }

  .animate {
    transition: left 0.3s ease-out;
  }

  .mystays-hover-intermediate {
    background: rgba(26, 72, 156, 0.8);
    color: #fff;
  }

  .mbsc-cal-table {
    .mbsc-cal-row {
      &:first-child {
        .mbsc-cal-day {
          .mbsc-cal-cell-i {
            border-bottom: none;
          }
        }
      }
    }
  }
}

.mbsc-cal-txt,
.mbsc-cal-txt-ph,
.mbsc-cal-txt-more {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.mbsc-windows .mbsc-cal-txt {
  border: 1px solid $bg-color-blue-2;
  color: #fff;
  background: none;
}

.mbsc-windows .mbsc-cal-day:not(.mbsc-disabled):hover {
  .mbsc-cal-day-i {
    @media (min-width: 1200px) {
      background: rgba(26, 72, 156, 1) !important;
      color: #fff;
    }
  }
}

.mbsc-windows
  .mbsc-cal
  .mbsc-cal-day.mbsc-selected:not(.mbsc-disabled)
  .mbsc-cal-cell-i.mbsc-cal-day-i,
.mbsc-windows.mbsc-range
  .mbsc-cal
  .mbsc-cal-today.mbsc-cal-day-hl
  .mbsc-cal-day-date {
  background-color: #1a4699;
  color: #fff;
}

.mbsc-windows .mbsc-cal-day-date {
  line-height: 2.8em;
}

.mystays-custom-invalid {
  cursor: not-allowed;
  position: relative;
  pointer-events: none;

  .mbsc-cal-day-i {
    background: linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) calc(50% - 0.8px),
      #ddd 50%,
      rgba(0, 0, 0, 0) calc(50% + 0.8px),
      rgba(0, 0, 0, 0) 100%
    );

    .mbsc-cal-day-date {
      opacity: 0.2;
    }
  }
}

.mbsc-selected {
  .mbsc-cal-day-i {
    .mbsc-cal-day-date {
      opacity: 1 !important;
    }
  }
}

.open-invalid {
  pointer-events: all;
  cursor: pointer;

  .mbsc-cal-day-i {
    border: 0.5px solid #000 !important;
  }
  .mbsc-cal-day-date {
    opacity: 1 !important;
  }
}

.tool-tip {
  animation-name: mbsc-anim-p-in;
  animation-duration: 0.5s;
  width: 86px;
  height: 35px;
  text-align: center;
  padding-top: 6px;
  background: #232e48;
  color: #fff;
  position: absolute;
  bottom: calc(100% + 15px);
  right: -20px;
  border: 1px solid #232e48;
  border-radius: 2px;
  z-index: 3;
  &::after {
    content: "";
    width: 14px;
    height: 14px;
    position: absolute;
    background: #232e48;
    bottom: -7px;
    left: 35px;
    z-index: -1;
    transform: rotate(45deg);
  }
}

.tool-tip-show-bottom {
  animation-name: mbsc-anim-p-in;
  animation-duration: 0.5s;
  width: 86px;
  height: 35px;
  text-align: center;
  padding-top: 6px;
  background: #232e48;
  color: #fff;
  position: absolute;
  top: calc(100% + 15px);
  right: -20px;
  border: 1px solid #232e48;
  border-radius: 2px;
  z-index: 3;
  &::after {
    content: "";
    width: 14px;
    height: 14px;
    position: absolute;
    background: #232e48;
    top: -7px;
    left: 35px;
    z-index: -1;
    transform: rotate(45deg);
  }
}

.tool-tip-right {
  right: -5px;
  &::after {
    left: 55px;
  }
}

.tool-tip-left {
  right: -35px;
  &::after {
    left: 15px;
  }
}

.inventory {
  position: absolute;
  right: 0;
  top: 0;
  width: 12px;
  height: 12px;
  display: flex;
  background: coral;
  font-size: 10px;
  justify-content: center;
  color: #fff;
  align-items: center;
  line-height: 2.2;
  animation-name: mbsc-anim-inventory-in;
  animation-timing-function: ease-out;
  animation-duration: 0.5s;
  z-index: 2;
}
</style>
