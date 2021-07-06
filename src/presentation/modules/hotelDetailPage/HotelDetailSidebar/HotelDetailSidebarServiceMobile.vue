<template>
  <div v-if="roomServices.title" class="hotel-detail-sidebar-mobile">
    <div
      v-b-toggle="`room_${roomID}`"
      class="hotel-detail-sidebar-mobile__title"
    >
      <span>{{ roomServices.title }}</span>
      <span :class="`icon-${isCollapse ? 'Arrow-Minus' : 'Icon-Plus'}`" />
    </div>
    <div class="hotel-detail-sidebar-mobile__content">
      <b-collapse
        :id="`room_${roomID}`"
        accordion="my-accordion"
        :visible="roomID === 'roomFacilities'"
        @input="$_getIsVisible"
      >
        <ul>
          <li v-for="(item, index) in roomServices.serviceList" :key="index">
            <div class="block-more">
              <span :class="item.icon" />
              <span>{{ item.name }}</span>
            </div>
          </li>
        </ul>
      </b-collapse>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'HotelDetailSidebarServiceMobile',
  props: {
    roomServices: {
      type: Object,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    roomID: {
      type: String
    }
  },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    $_getIsVisible (isVisible: boolean) {
      this.isCollapse = isVisible
    }
  }
})
</script>

<style lang="scss" scoped>
.hotel-detail-sidebar-mobile {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin: 20px 0;
  border-bottom: 1px solid rgba(216, 216, 216, 0.2);
  @include min-sm {
    display: none;
  }
  &__title {
    width: 100%;
    margin-right: 30px;
    font-size: 15px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    outline: none;
  }
  &__content {
    width: 100%;
    ul {
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        align-items: center;
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
