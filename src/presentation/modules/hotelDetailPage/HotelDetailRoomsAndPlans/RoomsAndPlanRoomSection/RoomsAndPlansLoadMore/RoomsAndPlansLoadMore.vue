<template>
  <button class="btn rooms-and-plans__load-more" @click="$_loadMore">
    + {{ getLang.loadMoreText }}
  </button>
</template>

<script>
export default {
  name: "RoomsAndPlansLoadMore",
  data() {
    return {
      currentItemsCount: 8,
    };
  },
  computed: {
    getLang() {
      return {
        loadMoreText: this.$t("hoteldetail.load_more"),
      };
    },
  },
  methods: {
    $_loadMore() {
      const currentItemsCount = (this.currentItemsCount += 5);
      this.$emit("loadMore", currentItemsCount);
    },
  },
};
</script>

<style lang="scss" scoped>
.rooms-and-plans__load-more {
  border: 1px solid $border-color-gray-4;
  border-radius: 2px;
  font-size: 14px;
  padding: 17px;
  color: $text-color-blue;
  width: 100%;
  background: $bg-color-gray-5;
  font-weight: bold;
  display: block;
  margin: 20px auto 0 auto;

  @include min-sm {
    width: 367px;
    margin-top: 80px;
  }
}
</style>
