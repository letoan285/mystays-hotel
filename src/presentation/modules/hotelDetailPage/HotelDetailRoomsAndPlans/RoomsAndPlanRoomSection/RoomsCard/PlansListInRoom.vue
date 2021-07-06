<template>
  <div class="rooms-and-plans__room-plans">
    <div v-if="windowWidth < 768 && loaded">
      <!-- <div class="rooms-and-plans__room-plans__gap" /> -->
      <PlanInRoomCard
        v-if="firstPlan"
        :plans-in-room="firstPlan"
        @saveRoom="saveRoom"
      />
      <PlanInRoomCard
        v-if="secondPlan"
        :plans-in-room="secondPlan"
        @saveRoom="saveRoom"
      />
    </div>
    <div v-else>
      <dropdown-transition>
        <div v-show="planIsOpen">
          <!-- <div class="rooms-and-plans__room-plans__gap" /> -->
          <PlanInRoomCard
            v-if="firstPlan"
            :plans-in-room="firstPlan"
            @saveRoom="saveRoom"
          />
          <PlanInRoomCard
            v-if="secondPlan"
            :plans-in-room="secondPlan"
            @saveRoom="saveRoom"
          />
        </div>
      </dropdown-transition>
    </div>
    <dropdown-transition>
      <div v-show="planIsOpen">
        <PlanInRoomCard
          v-for="roomPlan in restPlans"
          :key="roomPlan.planId"
          :plans-in-room="roomPlan"
          @saveRoom="saveRoom"
        />
      </div>
    </dropdown-transition>
  </div>
</template>

<script>

export default {
  name: "PlansListInRoom",
  props: {
    plansListInRoom: {
      type: Array,
      default: () => [],
    },
    planIsOpen: {
      type: Boolean,
    },
  },
  data() {
    return {
      windowWidth: 0,
      loaded: false,
    };
  },
  computed: {
    firstPlan() {
      if (this.plansListInRoom.length) {
        const [firstPlan, secondPlan] = this.plansListInRoom;
        if (!secondPlan) {
          firstPlan.isLastCard = true;
        }
        return firstPlan;
      }

      return {};
    },

    secondPlan() {
      if (this.plansListInRoom.length) {
        const [, secondPlan, ...restPlans] = this.plansListInRoom;
        if (secondPlan && restPlans.length === 0) {
          secondPlan.isLastCard = true;
        }
        if (restPlans.length !== 0) {
          restPlans[restPlans.length - 1].isLastCard = true;
        }
        return secondPlan;
      }

      return {};
    },
    restPlans() {
      if (this.plansListInRoom.length) {
        const [, , ...restPlans] = this.plansListInRoom;
        return restPlans;
      }

      return {};
    },
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
    saveRoom(plan) {
      this.$emit("saveRoom", plan);
    },
  },
};
</script>

<style lang="scss" scoped>
.rooms-and-plans__room-plans {
  padding: 0 20px 26px 20px;
  overflow: hidden;
  position: relative;

  @include min-sm {
    padding: 0;
  }

  &__gap {
    height: 10px;
    width: 100%;

    @include min-sm {
      height: 20px;
    }
  }
}
</style>
