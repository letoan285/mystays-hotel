<template>
  <div class="room-detail room-detail-custom">
    <div
      v-b-toggle="`room_${roomDetailSumary.roomIdx}`"
      class="room-detail__collapse"
    >
      <div class="room-detail__name">
        {{ getTextString.room }} {{ roomDetail.roomIdx + 1 }}
      </div>
      <div class="room-detail__stats">
        <span>
          {{ roomDetail.room.adults.number }}
          {{
            roomDetail.room.adults.number > 1
              ? `${getTextString.adults}`
              : `${getTextString.adult}`
          }}
        </span>
        <span v-if="roomDetail.room.children.childrenList.length">
          ,
          {{ roomDetail.room.children.childrenList.length }}
          {{
            roomDetail.room.children.childrenList.length > 1
              ? `${getTextString.children}`
              : `${getTextString.child}`
          }}
        </span>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */

export default {
  name: "RoomDetailSumary",
  components: {},
  props: {
    roomDetailSumary: {
      type: Object,
    },
  },
  data() {
    return {
      roomDetail: this.roomDetailSumary,
    };
  },
  computed: {
    getTextString() {
      return {
        room: this.$t("booking.room"),
        rooms: this.$t("booking.rooms"),
        adult: this.$t("booking.adult"),
        adults: this.$t("booking.adults"),
        child: this.$t("booking.child"),
        children: this.$t("booking.children"),
      };
    },
  },
  watch: {
    roomDetailSumary(newRoomDetail) {
      this.roomDetail = newRoomDetail;
    },
  },

  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.room-detail {
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  border-bottom: 1px solid #dddee0;
  // padding-bottom: 15px;
  &__name {
    font-size: 14px;
    flex-grow: 1;
    outline: none;
  }
  &__stats {
    color: #3b61a7;
    font-size: 12px;
    margin-right: 20px;
    outline: none;
  }
  &__delete {
    cursor: pointer;
    padding-bottom: 15px;
  }

  &__collapse{
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    outline: none;
    padding-bottom: 15px;
  }
}
</style>
