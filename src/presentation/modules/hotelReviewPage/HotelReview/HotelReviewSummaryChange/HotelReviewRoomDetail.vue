<template>
  <div class="hotel-review-room-detail">
    <div class="hotel-review-room-detail__name">
      <span>{{ getLanguage.room }} {{ roomIdx + 1 }}</span>
    </div>
    <div class="hotel-review-room-detail__title">
      <h5>
        {{ roomDetail && roomDetail.roomTitle }}
      </h5>
      <div
        class="hotel-review-room-detail__title__actions"
        :class="{ 'flex-end': selectedRoom.length === 1 }"
      >
        <span @click="$_editRoom">{{ getLanguage.edit }}</span>
        <span v-if="selectedRoom.length > 1"> / </span>
        <span v-if="selectedRoom.length > 1" @click="$_deteleSelectedRoom">
          {{ getLanguage.delete }}
        </span>
      </div>
    </div>
    <div class="hotel-review-room-detail__info-guest">
      <AppCollapse
        :room-detail-info="roomDetailInfo"
        :room-i-d="`${roomIdx}`"
      />
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable vue/require-default-prop */

import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "HotelReviewRoomDetail",
  props: {
    roomDetail: {
      type: Object
    },
    roomIdx: {
      type: Number
    }
  },
  data() {
    return {
      isVisible: false
    };
  },
  computed: {
    ...mapState({
      selectedRoom: (state: any) => state.hotelDetail.selectedRoom
    }),
    getLanguage(): any {
      return {
        room: this.$t("hoteldetail.room"),
        edit: this.$t("summary.edit"),
        delete: this.$t("summary.delete")
      };
    },

    roomDetailInfo(): any {
      const roomDetail = this.roomDetail?.roomInfo;
      // eslint-disable-next-line no-unused-expressions
      roomDetail?.detail?.forEach((r: any, index: number) => {
        r.time = `${this.$t("customhtmlcalendar.night")} ${index + 1}`;
      });

      return roomDetail;
    }
  },
  methods: {
    $_collapseGuest(isVisible: boolean) {
      this.isVisible = isVisible;
    },

    $_deteleSelectedRoom() {
      this.$emit("deleteSelectedRoom", "delete");
    },

    $_editRoom() {
      this.$emit("editSelectedRoom", "edit");
    }
  }
});
</script>

<style lang="scss" scoped>
.hotel-review-room-detail {
  margin-bottom: 30px;
  @include min-sm {
    margin-bottom: 49px;
  }
  &__name {
    font-size: 10px;
    color: #7b7b85;
    margin-bottom: 8px;
    font-weight: 500;
    @include min-sm {
      text-transform: uppercase;
      margin-bottom: 15px;
    }
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 13px;
    border-bottom: 1px solid $border-color-gray-2;
    @include min-sm {
      padding-bottom: 21px;
    }
    h5 {
      font-size: 14px;
      margin-bottom: 0;
      flex-grow: 1;
      font-weight: bold;
      margin-right: 10px;
      @include min-sm {
        font-size: 16px;
      }
    }

    &__actions {
      display: flex;
      justify-content: space-between;
      width: 65px;
      span {
        font-size: 11px;
        color: $text-color-blue-2;
        font-weight: bold;
        cursor: pointer;

        @include min-sm {
          font-size: 12px;
        }
      }
    }

    .flex-end {
      justify-content: flex-end;
    }
  }
}
</style>
