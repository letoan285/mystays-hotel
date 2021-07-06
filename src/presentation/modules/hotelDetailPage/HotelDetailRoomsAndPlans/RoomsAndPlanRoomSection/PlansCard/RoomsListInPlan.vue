<template>
  <div class="rooms-and-plans__plan-section room-card">
    <div v-if="windowWidth < 768 && loaded">
      <div class="room-card__gap" />
      <div
        class="room-card__wrapper"
        :class="{ 'last-card': firstPlan.isLastCard }"
      >
        <RoomInPlanCard
          :rooms-in-plan="firstPlan"
          :is-first-card="true"
          @savePlan="savePlan"
          @toggleSideBox="$_toggleSideBox"
        />
      </div>
      <div
        v-if="secondPlan"
        class="room-card__wrapper"
        :class="{ 'last-card': secondPlan.isLastCard }"
      >
        <RoomInPlanCard
          :rooms-in-plan="secondPlan"
          @savePlan="savePlan"
          @toggleSideBox="$_toggleSideBox"
        />
      </div>
    </div>
    <div v-else>
      <dropdown-transition>
        <div v-show="roomIsOpen">
          <div class="room-card__gap" />
          <div
            class="room-card__wrapper"
            :class="{ 'last-card': firstPlan.isLastCard }"
          >
            <RoomInPlanCard
              :rooms-in-plan="firstPlan"
              :is-first-card="true"
              @savePlan="savePlan"
              @toggleSideBox="$_toggleSideBox"
            />
          </div>
          <div
            v-if="secondPlan"
            class="room-card__wrapper"
            :class="{ 'last-card': secondPlan.isLastCard }"
          >
            <RoomInPlanCard
              :rooms-in-plan="secondPlan"
              @savePlan="savePlan"
            />
          </div>
        </div>
      </dropdown-transition>
    </div>
    <dropdown-transition>
      <div v-show="roomIsOpen">
        <div
          v-for="(planRoom, index) in restPlans"
          :key="index"
          class="room-card__wrapper"
          :class="{ 'last-card': planRoom.isLastCard }"
        >
          <RoomInPlanCard :rooms-in-plan="planRoom" @savePlan="savePlan" />
        </div>
      </div>
    </dropdown-transition>
  </div>
</template>

<script>
export default {
  name: "RoomsListInPlan",
  props: {
    roomsListInPlan: {
      type: Array,
      default: () => []
    },
    roomIsOpen: {
      type: Boolean
    }
  },
  data() {
    return {
      sideBoxOpen: false,
      windowWidth: 0,
      loaded: false
    };
  },
  computed: {
    firstPlan() {
      const [firstPlan, secondPlan] = this.roomsListInPlan;
      if (!secondPlan) {
        firstPlan.isLastCard = true;
      }
      return firstPlan;
    },
    secondPlan() {
      const [, secondPlan, ...restPlans] = this.roomsListInPlan;
      if (secondPlan && restPlans.length === 0) {
        secondPlan.isLastCard = true;
      }
      return secondPlan;
    },
    restPlans() {
      const [, , ...restPlans] = this.roomsListInPlan;
      if (restPlans.length !== 0) {
        restPlans[restPlans.length - 1].isLastCard = true;
      }
      return restPlans;
    }
  },
  mounted() {
    window.addEventListener("resize", this.$_resize);
    this.$_resize();
    this.loaded = true;
  },
  destroyed() {
    window.removeEventListener("resize", this.$_resize);
  },
  methods: {
    $_togglePlan() {
      this.$emit("togglePlan");
    },
    $_resize() {
      this.windowWidth = window.innerWidth;
    },
    $_toggleSideBox(isOpen) {
      this.sideBoxOpen = isOpen;
    },
    savePlan(room) {
      this.$emit("savePlanSelected", room);
    }
  }
};
</script>

<style lang="scss" scoped>
.rooms-and-plans__plan-section.room-card {
  padding: 0 20px 26px 20px;
  overflow: hidden;
  position: relative;

  @include min-sm {
    padding: 0;
  }

  .room-card {
    &__gap {
      // height: 20px;
      width: 100%;
    }

    &__wrapper {
      border-bottom: 1px solid $border-color-gray-2;

      &.last-card {
        border-bottom: none;
      }
    }
  }
}
</style>
