<template>
  <div class="room-select-wrapper">
    <!-- <div class="room-select-wrapper__message">Please select chidren age!</div> -->
    <div class="room-select-wrapper__header">
      <span class="icon-Icon-Close" @click="closeModal" />
    </div>
    <div ref="roomContent" class="room-select__content">
      <div>
        <div class="room-select__content__stats">
          <span>{{ $t("booking.you_are_searching_for") }}:</span>
          <div class="total-stats">
            {{ roomList.length }}
            {{ roomList.length > 1 ? $t("booking.rooms") : $t("booking.room") }}
            ,
            {{ totalGuest }}
            {{ totalGuest > 1 ? $t("booking.guests") : $t("booking.guest") }}
          </div>
        </div>
        <div
          v-for="(room, roomIdx) in roomList"
          :key="roomIdx"
          class="room-select__content__detail"
        >
          <RoomDetailSumary
            :room-detail-sumary="{ room, roomIdx }"
            :room-message="roomMessage"
          >
            <div
              v-if="roomList.length > 1"
              class="room-detail__delete"
              @click="$_deleteRoom(roomIdx)"
            >
              <span class="icon-Icon-Delete" />
            </div>
          </RoomDetailSumary>
          <b-collapse
            :id="`room_${roomIdx}`"
            role="tabpanel"
            :visible="roomIdx === visible"
            accordion="my-accordion"
            @show="onCollapes(roomIdx)"
            :class="{ 'room-custom': roomIdx }"
          >
            <AdultSelect
              :person="room.adults"
              :room-active="roomIdx"
              person-type="Adults"
              @on:personChange="data => $_onPersonChange(roomIdx, data)"
              @on:visibleChange="$_onVisibleChange"
            />
            <ChildSelect
              :person="room.children"
              :is-error="isError"
              :room-active="roomIdx"
              @on:changeChild="data => $_onChildChange(roomIdx, data)"
              @on:changeChildAge="data => $_onChildChangeAge(roomIdx, data)"
              @on:changeBedSelect="data => $_onchangeBedSelect(roomIdx, data)"
              @on:scroll="$_onScroll"
              @on:visibleChange="$_onVisibleChange"
            />
          </b-collapse>
        </div>
      </div>
      <div class="room-select__content__footer">
        <div class="btn-add-room">
          <button
            ref="btnAdd"
            :disabled="roomList.length >= maxRoom"
            class="button m-btn m-btn__white"
            @click="$_addRoomList"
          >
            + {{ $t("booking.add_a_room") }}
          </button>
        </div>
        <div class="rules-mobile">
          <p>{{ rules && rules.rulesTitle }}</p>
          <ul class="rules" v-html="rules && rules.rulesContent"></ul>
        </div>
        <div
          class="btn-apply"
          :class="{
            'ios-safari-padding':
              detectIOS() && detectIphoneModel() && !isToolbarOpen,
            'smaller-model':
              detectIOS() && !detectIphoneModel() && !isToolbarOpen
          }"
        >
          <button class="button m-btn m-btn__yellow" @click="applyModal">
            {{ $t("booking.apply") }}
          </button>
        </div>
      </div>
    </div>
    <div class="room-select__rules">
      <p>{{ rules && rules.rulesTitle }}</p>
      <ul class="rules">
        <li class="rules__item">
          大人1名様に対し、添い寝のお子様1名までとします。
        </li>
        <li class="rules__item">
          小学生の添い寝希望のお客様がご朝食をご希望の場合、現地にて別途1,500円（5歳～小学生）を頂戴いたします。
        </li>
        <li class="rules__item">
          小学生の添い寝の場合、幼児欄の「食事・布団不要」に人数をご入力の上、予約画面下の備考欄にお子様の年齢をご記載ください。
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import Vue from "vue";
import AdultSelect from "./AdultSelect.vue";
import ChildSelect from "./ChildSelect.vue";
import RoomDetailSumary from "./RoomDetailSumary.vue";

export default Vue.extend({
  name: "RoomSelectContent",
  components: {
    AdultSelect,
    ChildSelect,
    RoomDetailSumary
  },
  props: {
    rules: {
      type: Object,
      default: () => {}
    },

    innerHeight: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      maxRoom: this.$constants.MAX_ROOM,
      visible: 0,
      isError: false,
      isToolbarOpen: false,
      roomMessage: []
    };
  },
  computed: {
    ...mapState({
      roomList: state => state.booking.bookingData.roomList
    }),
    ...mapGetters({
      totalGuest: "booking/totalGuest",
      isSelectedAge: "booking/isSelectedAge",
      hotelDetail: "hotelDetail/hotelDetail",
      isKidsTierSupport: "hotel/isKidsTierSupport"
    }),

    getRoomList() {
      return this.roomList.map(r => {
        r.adults.title = this.getTextString.adults;
        r.children.title = this.getTextString.children;

        return r;
      });
    },

    getTextString() {
      return {
        adults: this.$t("booking.adults"),
        children: this.$t("booking.children"),
        add_a_room: this.$t("booking.add_a_room"),
        room: this.$t("booking.room"),
        rooms: this.$t("booking.rooms"),
        guest: this.$t("booking.guest"),
        guests: this.$t("booking.guests"),
        apply: this.$t("booking.apply")
      };
    }
  },
  watch: {
    isSelectedAge(isSelect) {
      if (isSelect) {
        this.isError = false;
      }
    },
    isKidsTierSupport(isSupport) {
      if (!isSupport) {
        this.isError = false;
      }
    },
    // roomList(roomList) {
    //   this.visible = roomList.length - 1;
    // }
  },
  created() {
    this.$nuxt.$on("onCloseOverlay", this.$_handler);
  },
  mounted() {
    if (this.innerHeight === window.innerHeight) {
      this.isToolbarOpen = true;
    } else {
      this.isToolbarOpen = false;
    }
  },
  destroyed() {
    this.$nuxt.$off("onCloseOverlay", this.$_handler);
  },
  methods: {
    ...mapActions({
      a_saveRoomList: "booking/a_saveRoomList",
      a_addRoom: "booking/a_addRoom",
      a_deleteRoom: "booking/a_deleteRoom",
      a_onChildChange: "booking/a_onChildChange",
      a_onPersonChange: "booking/a_onPersonChange",
      a_onChildChangeAge: "booking/a_onChildChangeAge",
      closeAll: "booking/closeAll",
      a_onChangeBedSelect: "booking/a_onChangeBedSelect"
    }),
    closeModal() {
      this.checkKidTiersSupport("close");
    },
    applyModal() {
      this.checkKidTiersSupport("apply");
    },
    checkKidTiersSupport() {
      if (this.isKidsTierSupport) {
        if (!this.isSelectedAge) {
          this.isError = true;
        } else {
          this.isError = false;
          this.$emit("on:apply");
          this.$emit("on:close");
        }
      } else {
        this.isError = false;
        this.$emit("on:apply");
        this.$emit("on:close");
      }
    },

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

    onCollapes(visible) {
      this.visible = visible;
      this.$refs["roomContent"].scrollTop = visible * 50;
    },

    $_onVisibleChange() {
      this.visible = 0;
    },

    $_apply() {
      this.a_saveRoomList(this.roomList);
      this.$_closePopup();
      this.closeAll();
    },
    $_addRoomList() {
      this.a_addRoom();
      this.visible = this.roomList.length - 1;
    },

    $_onPersonChange(roomIndx, person) {
      this.a_onPersonChange({ roomIndx, person });
    },

    $_onChildChange(roomIndx, child) {
      this.a_onChildChange({ roomIndx, child });
    },

    $_onChildChangeAge(roomIdx, data) {
      this.a_onChildChangeAge({ roomIdx, data });
    },

    $_onchangeBedSelect(roomIdx, data) {
      this.a_onChangeBedSelect({ roomIdx, data });
    },

    $_deleteRoom(roomIdx) {
      this.a_deleteRoom(roomIdx);
    },

    $_closePopup() {
      this.$emit("on:showRoom");
    },

    $_onScroll(possiton) {
      const paddingTop = 15;
      this.$refs.roomContent.scrollTop = possiton - paddingTop;
    },

    $_scrollToEnd() {
      const roomContent = this.$refs.roomContent;
      roomContent.scrollTop = roomContent.scrollHeight;
    },

    $_handler() {
      this.isError = true;
    }
  }
});
</script>

<style lang="scss" scoped>
.room-select-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 5;
  animation-name: mbsc-anim-p-in;
  animation-duration: 0.3s;
  color: #000;
  display: flex;

  @include min-sm {
    animation-duration: 0.5s;
    width: 720px;
    border-top: 1px solid #e4e4e7;
    border-bottom: 4px solid #ffd25d;
    position: absolute;
    // left: -139%;
    left: -172px;
    top: calc(100% + 28px);
    height: auto;
    @include scrollbar;
    &::before {
      content: "";
      width: 0;
      height: 0;
      border-width: 10px 10px;
      border-style: solid;
      margin-left: -9px;
      border-color: transparent transparent #fff transparent;
      left: 50%;
      top: -20px;
      position: absolute;
      z-index: 6;
      display: none;
      @include min-sm {
        display: block;
      }
    }
  }

  &__header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 30px;
    position: absolute;
    right: 0;
    span {
      cursor: pointer;
      margin-right: 15px;
      margin-top: 15px;
    }
  }

  &__message {
    height: 40px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: chocolate;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
}

.room-select {
  &__content {
    max-height: 100vh;
    height: 100%;
    overflow: overlay;
    margin-top: 45px;
    // box-shadow: 2px 0px 0px 0 rgba(74, 74, 74, 0.25);
    width: 100%;
    @media screen and (min-width: 0\0) {
      overflow: auto;
    }
    @include min-sm {
      width: 50%;
      margin-top: 30px;
      max-height: 367px;
      min-height: 320px;
      scroll-behavior: smooth;
      @include scrollbar;
      display: -webkit-flex;
      flex-direction: column;
      justify-content: space-between;

      @media screen and (min-width: 0\0) {
        overflow: auto;
      }
    }
    &__stats {
      text-align: center;
      margin-bottom: 50px;
      span {
        font-size: 12px;
        color: #7b7b85;
      }
      .total-stats {
        font-size: 20px;
        color: #232e48;
        font-weight: normal;
      }
      @include min-sm {
        display: none;
      }
    }
    // &__header {
    //   display: flex;
    //   justify-content: flex-end;
    //   margin-bottom: 30px;
    //   span {
    //     cursor: pointer;
    //     margin-right: 20px;
    //     margin-top: 20px;
    //   }
    // }
    &__detail {
      // margin-bottom: 30px;
      padding: 0 40px;
      @include min-sm {
        border-bottom: none;
        padding: 0 30px;
        // margin-bottom: 10px;
      }
      .room-detail-custom {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        font-size: 14px;
        align-items: center;
      }
    }

    .room-custom {
      opacity: 0.5;
      cursor: not-allowed;
    }
    &__footer {
      align-items: center;
      padding-top: 15px;
      .m-btn__white {
        width: 48%;
        height: 46px;
        width: 280px;

        @include min-sm {
          height: 46px;
        }
      }
      .m-btn__yellow {
        width: 320px;
        padding: 10px 0;
        // box-shadow: 1px 2px 5px 3px rgba(0, 0, 0, 0.2);
      }
      .btn-add-room {
        @include min-sm {
          width: 48%;
        }
      }
      .btn-apply {
        padding: 15px;
        position: fixed;
        bottom: 0;
        width: 100%;
        background: white;
        @include min-sm {
          width: 48%;
          margin-bottom: 0;
          padding: 0;
          position: static;
          @media not all and (min-resolution: 0.001dpcm) {
            @supports (-webkit-appearance: none) {
              .safari_only {
                padding-bottom: initial;
              }
            }
          }
          button {
            width: 100%;
          }
        }
      }

      .ios-safari-padding {
        padding-bottom: 70px; // highest in IP
        // padding-bottom: calc(10px + 2 * env(safe-area-inset-bottom));
      }

      .smaller-model {
        padding-bottom: 40px;
      }

      .w-initial {
        @include min-sm {
          width: 140px;
        }
      }
      @include min-sm {
        display: flex;
        padding: 30px;
        padding-top: 15px;
        justify-content: space-between;
        align-items: initial;
        flex-direction: row;
        .m-btn {
          width: 100%;
          outline: none;
          padding: 10px 0;
          box-shadow: none;
        }
      }

      /deep/ .rules-mobile {
        padding: 30px 25px 25px 25px;
        text-align: left;
        margin-bottom: 120px;
        @include min-sm {
          display: none;
        }
        @include rules;
      }
    }
  }

  /deep/ &__rules {
    width: 50%;
    padding: 0 18px 18px 18px;
    margin-top: 36px;
    text-align: left;
    display: none;
    // box-shadow: 2px 3px 14px 0 rgba(74, 74, 74, 0.25);
    @include min-sm {
      display: block;
      max-height: 370px;
      overflow: auto;
      @include scrollbar;
    }
    @include rules;
  }
}
</style>
