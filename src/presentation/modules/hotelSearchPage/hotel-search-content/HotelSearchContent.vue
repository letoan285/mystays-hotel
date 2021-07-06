<template>
  <div class="hotel-search-content">
    <div class="container">
      <div class="hotel-search-content__hotel-list">
        <div class="hotel-list">
          <div v-show="!isHotelLoading && !isGetLocationLoading" class="row">
            <div
              v-for="(hotel, index) in hotelList"
              :key="index"
              class="col-sm-6 col-md-6 col-lg-4"
            >
              <HotelSearchResults
                v-if="index < getItemPage"
                :hotel-detail="hotel"
              />
            </div>
          </div>
          <div v-show="isHotelLoading || isGetLocationLoading" class="row">
            <div
              v-for="(item, index) in hotelItem"
              :key="index"
              class="col-sm-6 col-md-6 col-lg-4"
            >
              <div class="hotel-item">
                <b-card>
                  <b-skeleton
                    animation="wave"
                    width="100%"
                    height="160px"
                    class="mb-5"
                  />
                  <b-skeleton animation="throb" width="55%" class="mb-3" />
                  <b-skeleton animation="throb" width="55%" class="mb-3" />
                  <b-skeleton animation="throb" width="75%" />
                </b-card>
              </div>
            </div>
          </div>
        </div>
        <div
          v-show="
            hotelList &&
              hotelList.length > itemPerPage &&
              hotelList.length !== getItemPage
          "
          class="load-more"
        >
          <button @click="$_onLoadMore">
            +{{ $t("hoteldetail.load_more") }}
          </button>
        </div>
      </div>
      <div class="hotel-search-content__filter-section">
        <HotelFilter />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapState } from "vuex";

export default Vue.extend({
  name: "HotelSearchContent",
  data() {
    return {
      currentPage: 1,
      itemPerPage: 9
    };
  },
  computed: {
    ...mapState({
      isHotelLoading: state => state.hotel.isHotelLoading,
      isPriceLoading: state => state.hotel.isPriceLoading,
      isGetLocationLoading: state => state.general.data.isGetLocationLoading
    }),
    ...mapGetters({
      hotelList: "hotel/hotelFilter"
    }),

    getItemPage() {
      let itemInPage = this.currentPage * this.itemPerPage;
      if (itemInPage > this.hotelList.length) {
        itemInPage = this.hotelList.length;
      }
      return itemInPage;
    },

    hotelItem() {
      const hotelItem = [];
      let i = 0;
      while (i < 9) {
        hotelItem.push(i);
        i++;
      }

      return hotelItem;
    }
  },
  methods: {
    $_onLoadMore() {
      this.currentPage += 1;
      const totalPage = Math.ceil(this.hotelList.length / this.itemPerPage);
      if (this.currentPage > totalPage) {
        this.currentPage = totalPage;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.hotel-search-content {
  background: #f3f3f3;

  @include min-sm {
    padding-bottom: 50px;
  }

  .container {
    display: flex;
    justify-content: space-between;
  }

  &__hotel-list {
    width: 100%;
    @include min-sm {
      width: 60%;
    }
    @include min-lg {
      width: 74.6%;
    }
    .row {
      margin: 0 -10px;

      [class*="col-"] {
        padding-left: 10px;
        padding-right: 10px;
      }
    }

    .load-more {
      margin-top: 10px;
      button {
        width: 100%;
        padding: 15px 0;
        font-weight: bold;
        border: 1px solid $border-color-gray-2;
        background: #f3f3f3;
        outline: none;
        color: $text-color-blue;
        font-size: 14px;
      }
    }
  }

  &__filter-section {
    display: none;
    @include min-sm {
      display: block;
      width: 35%;
    }

    @include min-lg {
      display: block;
      width: 23.8%;
    }
  }
}

.hotel-item {
  min-height: 350px;
  width: 100%;
  margin-bottom: 30px;
  background: white;

  .card {
    border: none;
  }

  &__img {
    height: 167px;
    box-shadow: 2px 3px 14px 0 rgba(74, 74, 74, 0.25);
    @include background-shimmer($base-color: white, $shimmer-color: #f3f3f3);
  }

  &__name {
    box-shadow: 2px 3px 14px 0 rgba(74, 74, 74, 0.25);
    padding: 10px;
    @include background-shimmer($base-color: white, $shimmer-color: #f3f3f3);
  }
}
</style>
