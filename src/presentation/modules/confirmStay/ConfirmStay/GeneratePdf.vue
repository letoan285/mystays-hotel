<template>
  <div>
    <img src="../../../../assets/images/people.png" alt="" />
    <img src="../../../../assets/images/room.png" alt="" />
    <img src="../../../../assets/images/time_night.png" alt="" />
    <img src="../../../../assets/images/copy.png" alt="" />
    <img src="../../../../assets/images/hotel.png" alt="" />
  </div>
</template>

<script>
// import jsPDF from 'jspdf'
import moment from "moment";
import CurrencyHelper from "../../../../shared/helper/CurrencyHelper";
import ImageBase64 from "../ImageBase64.js";
import { mapGetters } from "vuex";

export default {
  name: "GeneratePdf",
  props: {
    reservationsData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      pdfWidth: 595,
      pdfHeight: 3000,
      JsPdf: null,
      copyIcon: null,
      mystaysLogo: null,
      mystaysElite: null,
      isLoading: false,
      lineHeight: 1.5
    };
  },
  computed: {
    ...mapGetters({
      fullLang: "appHeader/fullLanguage",
      cancellationPolicies: "hotelDetail/cancellationPolicies"
    }),
    getLanguage() {
      return {
        room: this.$t("booking.room"),
        rooms: this.$t("booking.rooms"),
        guest: this.$t("booking.guests"),
        guests: this.$t("booking.guests"),
        yourStay: this.$t("summary.your_stay"),
        night: this.$t("summary.night"),
        nights: this.$t("customhtmlcalendar.nights"),
        child: this.$t("booking.child"),
        children: this.$t("booking.children"),
        adult: this.$t("booking.adult"),
        adults: this.$t("booking.adults"),
        tax: this.$t("summary.tax"),
        summaryOfCharges: this.$t("summary.summary_of_charges"),
        facilityName: this.$t("confirmbooking.facility_name"),
        issuedAt: this.$t("confirmbooking.issued_at"),
        bookingId: this.$t("forms.booking_id"),
        paymentMethod: this.$t("payment_detail.payment_method"),
        yourTotal: this.$t("summary.your_total"),
        cancellationPolicy: this.$t("summary.cancellation_and_refund_policy"),
        onSite: this.$t("payment_detail.on_site"),
        creditCard: this.$t("payment_detail.credit_card"),
        totalFees: this.$t("summary.tax_and_fee_change")
      };
    },
    bookingTime() {
      const checkin = moment(this.reservationsData.checkin_date)
        .format("MMM DD, YYYY")
        .toString();
      const checkout = moment(this.reservationsData.checkout_date)
        .format("MMM DD, YYYY")
        .toString();

      const totalNights =
        this.reservationsData.nights > 1
          ? this.getLanguage.nights
          : this.getLanguage.night;

      return `${checkin} - ${checkout} / ${this.reservationsData.nights} ${totalNights}`;
    },

    guestAndRoomText() {
      const totalGuest =
        this.reservationsData.adults + this.reservationsData.children;
      return `${this.reservationsData.room_count} ${
        this.reservationsData.room_count > 1
          ? this.getLanguage.rooms
          : this.getLanguage.room
      } , ${totalGuest} ${
        totalGuest > 1 ? this.getLanguage.guests : this.getLanguage.guest
      }`;
    },

    roomSelected() {
      const rooms = this.reservationsData.rooms.map(room => {
        let guestCountText = "";
        if (room.children) {
          guestCountText = `${room.adults} ${
            room.adults > 1 ? this.getLanguage.adults : this.getLanguage.adult
          } & ${room.children} ${
            room.children > 1
              ? this.getLanguage.children
              : this.getLanguage.child
          }`;
        } else {
          guestCountText = `${room.adults} ${
            room.adults > 1 ? this.getLanguage.adults : this.getLanguage.adult
          }`;
        }
        return {
          ...room,
          guestCountText
        };
      });

      return rooms;
    },

    summaryCharges() {
      const roomDetail = this.reservationsData.rooms.map(room => {
        const roomRate = room.room_rates.map((rate, rateIdx) => {
          return {
            price: rate.day_total_rate,
            time: `${this.getLanguage.night} ${rateIdx + 1}`
          };
        });
        let title = "";
        if (room.children) {
          title = `${room.room_type_name} , ${room.room_plan_name} x ${
            room.adults
          } ${
            room.adults > 1 ? this.getLanguage.adults : this.getLanguage.adult
          } & ${room.children} ${
            room.children > 1
              ? this.getLanguage.children
              : this.getLanguage.child
          }`;
        } else {
          title = `${room.room_type_name} , ${room.room_plan_name} x ${
            room.adults
          } ${
            room.adults > 1 ? this.getLanguage.adults : this.getLanguage.adult
          }`;
        }
        const roomDetailInfo = {
          title,
          totalPrice: room.total_price - room.tax,
          detail: roomRate
        };

        return roomDetailInfo;
      });

      return roomDetail;
    }
  },
  watch: {
    isLoading(isLoading) {
      this.$nuxt.$emit("on:PdfLoading", isLoading);
    }
  },
  mounted() {
    import(/* webpackChunkName: "jspdf" */ "jspdf").then(
      ({ default: jspdf }) => {
        this.JsPdf = jspdf;
      }
    );

    const logoUrl = require("@/assets/images/Mystays_logo.png");
    const mystayEliteUrl = require("@/assets/images/Logo-Icon.png");

    this.readImage(logoUrl).then(image => {
      this.mystaysLogo = image;
    });

    this.readImage(mystayEliteUrl).then(image => {
      this.mystaysElite = image;
    });
    this.$nuxt.$on("savePdfFile", this.generatePdf);
  },
  methods: {
    textMarginRight(textWidth) {
      return this.pdfWidth - 60 - textWidth;
    },

    rectWidth(pdRight) {
      return this.pdfWidth - pdRight * 2;
    },

    verticalCenter(height, padding, textWidth) {
      return (height - padding * 2) / 2 - textWidth / 2;
    },

    yourStayHeight() {},

    textCenter(textWidth, pdRight) {
      return (this.pdfWidth - pdRight * 2) / 2 - textWidth / 2;
    },

    readImage(url) {
      return new Promise(resolve => {
        const request = new XMLHttpRequest();
        request.onload = function() {
          const file = new FileReader();
          file.onloadend = function() {
            resolve(file.result);
          };
          file.readAsDataURL(request.response);
        };
        request.open("GET", url);
        request.responseType = "blob";
        request.send();
      });
    },

    getYourStayHeight(titleHeight, roomHeight) {
      return titleHeight + roomHeight * (this.roomSelected.length + 3);
    },

    totalFeesLine(
      doc,
      possiton,
      pleft,
      pLeftBonus,
      textAlign,
      fontSize,
      text,
      price
    ) {
      doc.setFontSize(fontSize);
      doc.setTextColor(0, 0, 0);
      doc.text(text, pleft + pLeftBonus, possiton + 35);

      doc.text(
        price,
        this.textMarginRight(20),
        possiton + 35,
        null,
        null,
        textAlign
      );

      doc.line(pleft + 18, possiton + 53, this.rectWidth(35), possiton + 53);
    },

    formatPrice(price) {
      if (price) {
        return CurrencyHelper.getFormattedPrice("YEN", price);
      }

      return "";
    },

    async generatePdf() {
      this.isLoading = true;
      const HEADER_HEIGHT = 100;
      const PD_LEFT = 50;
      const PD_RIGHT = 50;
      const TITLE_FONT_SIZE = 20;
      const DEFAULT_FONT_SIZE = 13;
      const FONT_SIZE_10 = 10;
      const FONT_SIZE_11 = 11;
      const TITLE_HEIGHT = HEADER_HEIGHT + 40;
      const BOOKING_ID_HEIGHT = 45;
      const STAY_INFO_HEIGHT_ITEM = 25;
      const LINE_HEIGHT = 15;
      const ICON_PADDING = 50;
      const TEXT_ALIGN_RIGHT = "right";
      const doc = new this.JsPdf({
        orientation: "p",
        unit: "pt",
        format: [this.pdfWidth, this.pdfHeight],
        lineHeight: this.lineHeight
      });

      switch (this.fullLang) {
        case "en-US":
          const fontLato = require("@/assets/fonts/Lato/Lato-Regular.ttf");
          await doc.addFont(fontLato, "Lato-Regular", "normal");
          await doc.setFont("Lato-Regular");
          break;
        case "ja-JP":
          const fontJhenghei = require("@/assets/fonts/MicrosoftJhenghei/Microsoft-JhengHei.ttf");
          await doc.addFont(fontJhenghei, "Microsoft-Jhenghei", "normal");
          await doc.setFont("Microsoft-Jhenghei");
          break;
        case "ko-KR":
          const fontMalgun = require("@/assets/fonts/MalgunGothic/malgun.ttf");
          await doc.addFont(fontMalgun, "Malgun", "normal");
          await doc.setFont("Malgun");
          break;
        case "zh-CN":
          const fontYahei = require("@/assets/fonts/MicrosoftYahei/Microsoft-YaHei.ttf");
          await doc.addFont(fontYahei, "Microsoft-Jhenghei", "normal");
          await doc.setFont("Microsoft-Jhenghei");
          break;
        default:
          break;
      }

      // Header
      doc.setFillColor(35, 46, 72);
      doc.rect(0, 0, this.pdfWidth, HEADER_HEIGHT, "F");
      doc.addImage(
        this.mystaysLogo,
        "PNG",
        this.textCenter(150, 0),
        this.verticalCenter(100, 0, 60),
        150,
        60,
        ""
      );

      doc.setFontSize(FONT_SIZE_10);
      doc.setDrawColor(100);
      doc.setTextColor(255, 255, 255);
      doc.text(
        `${this.getLanguage.issuedAt}: ${moment(
          this.reservationsData.booking_date
        ).format("DD/MM/YYYY")}`,
        this.pdfWidth - PD_RIGHT,
        HEADER_HEIGHT - 10,
        null,
        null,
        TEXT_ALIGN_RIGHT
      );

      // Title
      doc.setFontSize(TITLE_FONT_SIZE);
      doc.setTextColor(0, 0, 0);
      doc.setDrawColor(100);
      doc.text(
        `${this.reservationsData.message.title}!`,
        this.pdfWidth / 2,
        HEADER_HEIGHT + 40,
        "center"
      );

      // Booking ID
      doc.setDrawColor(221, 222, 224);
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(
        PD_LEFT,
        TITLE_HEIGHT + 18,
        this.rectWidth(PD_RIGHT),
        BOOKING_ID_HEIGHT,
        1,
        1,
        "FD"
      );

      doc.setFontSize(DEFAULT_FONT_SIZE);
      doc.setTextColor(26, 72, 156);
      doc.text(
        `${this.getLanguage.bookingId}: ${this.reservationsData.reservation_number}`,
        this.pdfWidth / 2,
        TITLE_HEIGHT + BOOKING_ID_HEIGHT,
        "center"
      );

      // Image Copy
      // doc.addImage(
      //   ImageBase64.copy,
      //   "PNG",
      //   this.textCenter(100, PD_LEFT) - 15,
      //   TITLE_HEIGHT + BOOKING_ID_HEIGHT - 20,
      //   32,
      //   32,
      //   ""
      // );

      // Your Stay
      // 1: Your Stay Title
      const YOUR_STAY_HEIGHT = this.getYourStayHeight(50, 45);
      const YOUR_STAY_POSSITION = TITLE_HEIGHT + BOOKING_ID_HEIGHT;
      doc.setDrawColor(221, 222, 224);
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(
        PD_LEFT,
        YOUR_STAY_POSSITION + 60,
        this.rectWidth(PD_RIGHT),
        YOUR_STAY_HEIGHT + 25,
        1,
        1,
        "FD"
      );

      doc.setFontSize(DEFAULT_FONT_SIZE);
      doc.setTextColor(0, 0, 0);
      doc.text(
        `(Mr/Miss/Mrs) ${this.reservationsData.guest.name}`,
        PD_LEFT + 18,
        YOUR_STAY_POSSITION + 65 + STAY_INFO_HEIGHT_ITEM
      );

      doc.setFontSize(DEFAULT_FONT_SIZE);
      doc.setTextColor(0, 0, 0);
      doc.text(
        this.getLanguage.yourStay,
        PD_LEFT + 18,
        YOUR_STAY_POSSITION + 95 + STAY_INFO_HEIGHT_ITEM
      );

      const YOUR_STAY_TITLE_HEIGHT =
        YOUR_STAY_POSSITION + 105 + STAY_INFO_HEIGHT_ITEM;

      // 2: Your Stay Info
      doc.setFontSize(FONT_SIZE_10);
      doc.setTextColor(0, 0, 0);
      doc.text(
        this.bookingTime,
        PD_LEFT + ICON_PADDING,
        YOUR_STAY_TITLE_HEIGHT + 25
      );

      doc.addImage(
        ImageBase64.room,
        "PNG",
        PD_LEFT + 18,
        YOUR_STAY_TITLE_HEIGHT + 7,
        25,
        25,
        ""
      );

      const TIME_HEIGHT = YOUR_STAY_TITLE_HEIGHT + 25;
      doc.line(
        PD_LEFT + 18,
        TIME_HEIGHT + LINE_HEIGHT,
        this.rectWidth(35),
        TIME_HEIGHT + LINE_HEIGHT
      );

      doc.setFontSize(FONT_SIZE_10);
      doc.setDrawColor(221, 222, 224);
      doc.setTextColor(0, 0, 0);
      doc.text(
        this.guestAndRoomText,
        PD_LEFT + ICON_PADDING,
        TIME_HEIGHT + LINE_HEIGHT + STAY_INFO_HEIGHT_ITEM
      );

      doc.addImage(
        ImageBase64.people,
        "PNG",
        PD_LEFT + 18,
        TIME_HEIGHT + LINE_HEIGHT + STAY_INFO_HEIGHT_ITEM - 15,
        28,
        25,
        ""
      );

      const ROOM_INFO_HEIGHT =
        TIME_HEIGHT + LINE_HEIGHT + STAY_INFO_HEIGHT_ITEM;
      doc.setLineWidth(0.1);
      doc.setDrawColor(221, 222, 224);
      doc.line(
        PD_LEFT + 18,
        ROOM_INFO_HEIGHT + LINE_HEIGHT,
        this.rectWidth(35),
        ROOM_INFO_HEIGHT + LINE_HEIGHT
      );

      // 3: Room Selected
      let ROOM_SELECTED_INFO_HEIGHT = 0;
      this.roomSelected.forEach((room, roomIndex) => {
        const roomnName = `${this.getLanguage.room} ${roomIndex + 1} / ${
          room.room_type_name
        } x ${room.guestCountText}`;
        doc.setFontSize(FONT_SIZE_10);
        doc.setTextColor(0, 0, 0);
        doc.text(
          roomnName,
          PD_LEFT + ICON_PADDING,
          ROOM_INFO_HEIGHT +
            (LINE_HEIGHT + STAY_INFO_HEIGHT_ITEM) * (roomIndex + 1)
        );

        doc.addImage(
          ImageBase64.bed,
          "PNG",
          PD_LEFT + 18,
          ROOM_INFO_HEIGHT +
            (LINE_HEIGHT + STAY_INFO_HEIGHT_ITEM) * (roomIndex + 1) -
            15,
          28,
          25,
          ""
        );

        ROOM_SELECTED_INFO_HEIGHT =
          ROOM_INFO_HEIGHT +
          (LINE_HEIGHT + STAY_INFO_HEIGHT_ITEM) * (roomIndex + 1);
        doc.setLineWidth(0.1);
        doc.setDrawColor(221, 222, 224);
        doc.line(
          PD_LEFT + 18,
          ROOM_SELECTED_INFO_HEIGHT + LINE_HEIGHT,
          this.rectWidth(35),
          ROOM_SELECTED_INFO_HEIGHT + LINE_HEIGHT
        );
      });

      // Facility
      const FACILITY_HEIGHT =
        ROOM_SELECTED_INFO_HEIGHT + LINE_HEIGHT + STAY_INFO_HEIGHT_ITEM;

      doc.setFontSize(FONT_SIZE_10);
      doc.setDrawColor(221, 222, 224);
      doc.setTextColor(0, 0, 0);
      doc.text(
        `${this.getLanguage.facilityName}: ${this.reservationsData.hotel.name}`,
        PD_LEFT + ICON_PADDING,
        FACILITY_HEIGHT
      );

      doc.addImage(
        ImageBase64.hotel,
        "PNG",
        PD_LEFT + 19,
        FACILITY_HEIGHT - 17,
        28,
        25,
        ""
      );

      doc.setLineWidth(0.1);
      doc.setDrawColor(221, 222, 224);
      doc.line(
        PD_LEFT + 18,
        FACILITY_HEIGHT + LINE_HEIGHT,
        this.rectWidth(35),
        FACILITY_HEIGHT + LINE_HEIGHT
      );

      // Summary of charges
      const SUMMARY_POSSITION_Y = FACILITY_HEIGHT + LINE_HEIGHT + 65;
      const NIGHT_HEIGHT = 45;
      let SUMMARY_POSSITION_HEIGHT = 0;
      // 1: Title
      doc.setFontSize(DEFAULT_FONT_SIZE);
      doc.setDrawColor(100);
      doc.text(
        this.getLanguage.summaryOfCharges,
        PD_LEFT + 18,
        SUMMARY_POSSITION_Y + 27
      );
      // Content
      doc.setFontSize(FONT_SIZE_10);
      doc.setDrawColor(100);
      let ROOM_PLAN_POSSITION = SUMMARY_POSSITION_Y + 55;
      this.summaryCharges.forEach((room, roomIndex) => {
        let roomPlanTitle = room.title;
        if (this.fullLang == "en-US" || this.fullLang === "en") {
          let chars = {
            "♪": "",
            "【": "[",
            "】": "]",
            "！": "",
            "《": " <",
            "》": "> "
          };
          roomPlanTitle = room.title.replace(
            /♪|【|】|！|《|》/gi,
            m => chars[m]
          );
        }

        const strArr = doc.splitTextToSize(`${roomPlanTitle}`, 350);
        const numberLine = strArr.length;
        const textSize = 15;
        const ROOM_PLAN_TITLE_HEIGHT = textSize * numberLine;
        doc.setFontSize(FONT_SIZE_11);
        doc.setDrawColor(100);
        doc.text(strArr, PD_LEFT + 18, ROOM_PLAN_POSSITION - 2);

        doc.text(
          this.formatPrice(room.totalPrice),
          this.textMarginRight(20),
          ROOM_PLAN_POSSITION + 7,
          null,
          null,
          TEXT_ALIGN_RIGHT
        );

        doc.setLineWidth(0.1);
        doc.setDrawColor(221, 222, 224);
        doc.line(
          PD_LEFT + 18,
          ROOM_PLAN_POSSITION + ROOM_PLAN_TITLE_HEIGHT,
          this.rectWidth(35),
          ROOM_PLAN_POSSITION + ROOM_PLAN_TITLE_HEIGHT
        );

        doc.setFontSize(FONT_SIZE_10);
        doc.setDrawColor(100);

        const roomDetail = room.detail;
        ROOM_PLAN_POSSITION +=
          ROOM_PLAN_TITLE_HEIGHT + NIGHT_HEIGHT * roomDetail.length + 20;

        const ONE_ROOM_HEIGHT =
          SUMMARY_POSSITION_Y +
          55 +
          (ROOM_PLAN_TITLE_HEIGHT + 22) * (roomIndex + 1) +
          NIGHT_HEIGHT * roomDetail.length * roomIndex;

        // Night Detail
        roomDetail.forEach((detail, index) => {
          const ROOM_DETAIL_POSSITION = ONE_ROOM_HEIGHT + NIGHT_HEIGHT * index;
          doc.text(detail.time, PD_LEFT + 25, ROOM_DETAIL_POSSITION);

          doc.text(
            this.formatPrice(detail.price),
            this.textMarginRight(20),
            ROOM_DETAIL_POSSITION,
            null,
            null,
            TEXT_ALIGN_RIGHT
          );

          doc.setLineWidth(0.1);
          doc.setDrawColor(221, 222, 224);
          const LINE_POSSITION = ROOM_DETAIL_POSSITION + 17;
          doc.line(
            PD_LEFT + 18,
            LINE_POSSITION,
            this.rectWidth(35),
            LINE_POSSITION
          );

          SUMMARY_POSSITION_HEIGHT = ROOM_DETAIL_POSSITION + 5;
        });
      });

      // Total Fee
      this.totalFeesLine(
        doc,
        SUMMARY_POSSITION_HEIGHT,
        PD_LEFT,
        18,
        TEXT_ALIGN_RIGHT,
        FONT_SIZE_10,
        this.getLanguage.totalFees,
        this.formatPrice(this.reservationsData.total_price)
      );

      this.totalFeesLine(
        doc,
        SUMMARY_POSSITION_HEIGHT + 42,
        PD_LEFT,
        25,
        TEXT_ALIGN_RIGHT,
        FONT_SIZE_10,
        this.getLanguage.tax,
        this.formatPrice(this.reservationsData.tax)
      );

      const paymentMethodText =
        this.reservationsData.payment_method === "on_site"
          ? this.getLanguage.onSite
          : this.getLanguage.creditCard;

      this.totalFeesLine(
        doc,
        SUMMARY_POSSITION_HEIGHT + 84,
        PD_LEFT,
        18,
        TEXT_ALIGN_RIGHT,
        FONT_SIZE_10,
        this.getLanguage.paymentMethod,
        paymentMethodText
      );

      // Rect
      doc.setDrawColor(221, 222, 224);
      doc.rect(
        PD_LEFT,
        SUMMARY_POSSITION_Y,
        this.rectWidth(PD_RIGHT),
        SUMMARY_POSSITION_HEIGHT + 162 - SUMMARY_POSSITION_Y
      );

      // My Stays Elite
      const MY_STAYS_ELITE_POSSITON = SUMMARY_POSSITION_HEIGHT + 192;

      doc.setDrawColor(221, 222, 224);
      doc.setFillColor(245, 248, 255);
      doc.rect(
        PD_LEFT,
        MY_STAYS_ELITE_POSSITON + 25,
        this.rectWidth(PD_RIGHT),
        55,
        "FD"
      );

      doc.setFontSize(DEFAULT_FONT_SIZE);
      doc.setDrawColor(100);
      doc.text("MyStays Elite", PD_LEFT + 38, MY_STAYS_ELITE_POSSITON + 10);
      doc.addImage(
        this.mystaysElite,
        "PNG",
        PD_LEFT,
        MY_STAYS_ELITE_POSSITON - 7,
        25,
        25,
        ""
      );

      doc.setFontSize(FONT_SIZE_10);
      doc.text(
        `Hi ${this.reservationsData.guest.name}`,
        PD_LEFT + 20,
        MY_STAYS_ELITE_POSSITON + 48
      );

      doc.setFontSize(8);
      doc.setTextColor(26, 72, 156);
      doc.text("Gold Member", PD_LEFT + 20, MY_STAYS_ELITE_POSSITON + 65);

      doc.setFontSize(DEFAULT_FONT_SIZE);
      doc.setTextColor(0, 0, 0);
      doc.text(
        "2,345 miles",
        this.textMarginRight(15),
        MY_STAYS_ELITE_POSSITON + 57,
        null,
        null,
        TEXT_ALIGN_RIGHT
      );

      // Your Total
      const YOUR_TOTAL_POSSITION = MY_STAYS_ELITE_POSSITON + 80;

      doc.setDrawColor(221, 222, 224);
      doc.setFillColor(255, 246, 223);
      doc.rect(
        PD_LEFT,
        YOUR_TOTAL_POSSITION + 20,
        this.rectWidth(PD_RIGHT),
        55,
        "FD"
      );

      doc.text(
        this.getLanguage.yourTotal,
        PD_LEFT + 20,
        YOUR_TOTAL_POSSITION + 52
      );
      doc.text(
        this.formatPrice(this.reservationsData.total_price),
        this.textMarginRight(15),
        YOUR_TOTAL_POSSITION + 52,
        null,
        null,
        TEXT_ALIGN_RIGHT
      );

      // Cancellation Policy
      const CANCELATION_POSSITION = YOUR_TOTAL_POSSITION + 105;
      doc.setFontSize(12);
      doc.text(
        this.getLanguage.cancellationPolicy,
        PD_LEFT,
        CANCELATION_POSSITION
      );

      let startH = 0;
      this.cancellationPolicies.forEach((policy, index) => {
        let policyFormat = policy;
        if (this.fullLang == "en-US" || this.fullLang === "en") {
          let chars = {
            "♪": "",
            "【": "[",
            "】": "]",
            "！": "",
            "《": " <",
            "》": "> "
          };
          policyFormat = policy.replace(/♪|【|】|！|《|》/gi, m => chars[m]);
        }

        doc.setFontSize(FONT_SIZE_10);

        const prevPolicy = this.cancellationPolicies[index - 1];

        if (prevPolicy) {
          const prevArr = doc.splitTextToSize(prevPolicy, 480);
          if (prevArr.length > 1) {
            startH += 8 * prevArr.length;
          }
        }
        const strArr = doc.splitTextToSize(policyFormat, 480);

        doc.text(
          strArr,
          PD_LEFT,
          CANCELATION_POSSITION + 25 * (index + 1) + startH
        );
      });

      // Save File
      const fileName = `Booking_Report_${
        this.reservationsData.reservation_number
      }_${moment(new Date()).format("DD/MM/YYYY")}`;

      setTimeout(() => {
        doc.save(fileName);
        this.isLoading = false;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  display: none;
}
</style>
