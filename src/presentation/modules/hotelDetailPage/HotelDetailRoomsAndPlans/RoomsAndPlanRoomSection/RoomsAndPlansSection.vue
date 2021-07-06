<template>
  <div class="hotel-detail-rooms-and-plans__room-section demo-class">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <component
          :is="currentFilterSection.component"
          :info="currentSectionData"
        />
      </keep-alive>
    </transition>

    <MyStayPopup
      ref="cancelationPolicies"
      :modal-class="`modal-cancelation`"
      :size="'lg'"
      :centered="false"
      :is-close-icon="true"
    >
      <div class="cancelation-policies">
        <h3>{{ $t("hoteldetail.cancellation_policy") }}</h3>
        <div v-if="!isLoading" class="cancelation-policies__content">
          <div
            v-for="(item, index) in cancellationPolicies"
            :key="index"
            v-html="item"
            class="cancelation-policies__content__item"
          />
        </div>
        <div v-else class="loading-item">
          <b-skeleton class="mb-4" animation="fade" width="90%" height="24px" />
          <b-skeleton class="mb-3" animation="fade" width="65%" height="24px" />
          <b-skeleton class="mb-3" animation="fade" width="70%" height="24px" />
          <b-skeleton class="mb-3" animation="fade" width="65%" height="24px" />
          <b-skeleton class="mb-3" animation="fade" width="70%" height="24px" />
        </div>
      </div>
    </MyStayPopup>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapState } from "vuex";
import RoomsList from "./RoomsCard/RoomsList.vue";
import PlansList from "./PlansCard/PlansList.vue";

const FilterType = {
  filterByRoom: "room",
  filterByPlan: "plan"
};

export interface IRoomInfo {
  roomId: string;
  roomLeft: number;
  picture: string;
  roomSliderImages: Array<string>;
  details: string;
  roomTitle: string;
  roomAmenities: Array<IRoomAmenity>;
  rate: string;
  subContent: Array<Object>;
}

export interface IPlanRoom {
  isMemberOnly: boolean;
  roomId: string;
  roomLeft: number;
  image: string;
  roomSliderImages: Array<string>;
  roomTitle: string;
  rate: string;
  earn: number;
  details: string;
}

export interface IRoomAmenity {
  type: string;
  text: string;
}

const filterSections = {
  room: {
    name: "RoomsList",
    component: RoomsList
  },
  plan: {
    name: "PlansList",
    component: PlansList
  }
};

export default Vue.extend({
  name: "RoomsAndPlansSection",
  data() {
    return {
      filterSection: filterSections
    };
  },
  computed: {
    ...mapState({
      isLoading: (state: any) => state.hotelDetail?.isLoading
    }),
    ...mapGetters({
      currentFilter: "hotelDetail/currentTab",
      plansInfo: "hotelDetail/planLeftFilter",
      roomsInfo: "hotelDetail/roomLeftFilter",
      cancellationPolicies: "hotelDetail/cancellationPolicies"
    }),
    currentFilterSection(): any {
      return this.currentFilter.currentTab === FilterType.filterByRoom
        ? this.filterSection.room
        : this.filterSection.plan;
    },
    currentSectionData(): any {
      return this.currentFilter.currentTab === FilterType.filterByRoom
        ? this.roomsInfo
        : this.plansInfo;
    }
  },
  mounted() {
    this.$emit("getRoomsLength", this.roomsInfo && this.roomsInfo.length);
    this.$emit("getPlansLength", this.plansInfo && this.plansInfo.length);
    this.$nuxt.$on("on:ShowCancellationPoliciesPopup", () => {
      (this as any).$refs?.cancelationPolicies?.showModal();
    });
  }
});
</script>

<style lang="scss" scoped>
.cancelation-policies {
  padding: 10px 0;
  font-size: 14px;

  @include min-sm {
    padding: 0 10px;
    font-size: 16px;
  }
  h3 {
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: bold;
  }

  &__content {
    font-size: 14px;

    &__item {
      margin-bottom: 15px;
    }
  }
}
</style>
