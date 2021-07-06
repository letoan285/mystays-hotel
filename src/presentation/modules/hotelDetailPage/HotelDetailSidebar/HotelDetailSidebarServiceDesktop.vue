<template>
  <div v-if="roomServices.title" class="hotel-detail-sidebar-desktop">
    <div class="hotel-detail-sidebar-desktop__title">
      <span>{{ roomServices.title }}:</span>
      <span class="icon-Icon-Plus" />
    </div>
    <div class="hotel-detail-sidebar-desktop__item">
      <ul>
        <li
          v-for="(item, index) in roomServices.serviceList"
          :key="index"
          class="block-more"
        >
          <span :class="item.icon" />
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "HotelDetailSidebarServiceDesktop",
  props: {
    roomServices: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.hotel-detail-sidebar-desktop {
  display: none;
  align-items: flex-start;
  flex-direction: column;
  margin: 20px 0;
  border-bottom: 1px solid rgba(216, 216, 216, 0.2);
  @include min-sm {
    display: flex;
    flex-direction: row;
    margin-top: 25px;
    padding-bottom: 15px;
  }
  &__title {
    width: 100%;
    margin-right: 30px;
    font-size: 15px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include min-sm {
      width: 21.5%;
      margin-bottom: 0;
      span:last-child {
        display: none;
      }
    }
  }
  &__item {
    width: 100%;
    @include min-sm {
      flex: 1;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        display: flex;
        align-items: center;
        width: 48%;
        margin-bottom: 15px;
        span {
          font-size: 18px;
          &:last-child {
            font-size: 14px;
            margin-left: 20px;
            color: #969daa;
          }
        }
        .block-more {
          margin-bottom: 15px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
