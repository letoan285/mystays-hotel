<template>
  <div class="hotel-detail-rooms-and-plans__room-section-plan">
    <div v-if="!isPlanLoading">
      <div v-for="planInfo in memberOnlyPlans" :key="planInfo.planId">
        <PlanCard
          ref="planCards"
          :plan-info="planInfo"
          :member="planInfo.isMemberOnly"
        />
      </div>
      <div v-for="planInfo in nonMemberPlans" :key="planInfo.planId">
        <PlanCard
          ref="planCards"
          :plan-info="planInfo"
          :member="planInfo.isMemberOnly"
        />
      </div>
    </div>
    <PlansCardLoader v-else />
    <RoomsAndPlansLoadMore
      v-if="currentItemsCount < info.length"
      :current-cards="info.length"
      @loadMore="$_loadMore"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "PlansList",
  props: {
    info: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentItemsCount: 8
    };
  },
  computed: {
    ...mapState({
      isPlanLoading: state => state.hotelDetail.isPlanLoading
    }),
    ...mapGetters({
      currentTab: "hotelDetail/currentTab"
    }),

    currentCards() {
      return this.info && this.info.slice(0, this.currentItemsCount);
    },

    memberOnlyPlans() {
      return this.currentCards.filter(plan => plan.isMemberOnly);
    },

    nonMemberPlans() {
      return this.currentCards.filter(plan => !plan.isMemberOnly);
    }
  },
  activated() {
    if (this.currentTab.currentId.toString()) {
      let planIndex = 0;
      this.info.some((plan, id) => {
        if (plan.planId.toString() === this.currentTab.currentId.toString()) {
          return (planIndex = id + 1);
        }
      });
      if (planIndex > this.currentItemsCount) {
        this.currentItemsCount = planIndex;
      }
      this.scrollIntoCard(planIndex - 1);
    }
  },
  methods: {
    scrollIntoCard(cardIndex = 0) {
      this.$nextTick(() => {
        const currentFocusedCard = this.$refs.planCards[cardIndex];
        if (currentFocusedCard) {
          currentFocusedCard.roomIsOpen =
            currentFocusedCard &&
            currentFocusedCard.planInfo &&
            !currentFocusedCard.planInfo.isMemberOnly;
          currentFocusedCard.$refs.card.scrollIntoView();
        }
      });
    },
    $_loadMore(currentItemsCount) {
      this.currentItemsCount =
        currentItemsCount >= this.info.length
          ? this.info.length
          : currentItemsCount;
    }
  }
};
</script>
