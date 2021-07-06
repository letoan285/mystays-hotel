<template>
  <div class="search-box__bottom__result">
    <div class="title">{{ title }}</div>
    <slot />
    <div
      v-for="(item, index) in data"
      :key="index"
      class="place"
      @click="$_selectField(item)"
    >
      <div class="place__address">{{ item.name }}</div>
      <div class="place__properties">
        <strong>{{ item.address || item.prefecture }}</strong>
      </div>
    </div>
    <div v-if="isShowSeeAll" class="see-all-btn" @click="$_seeAll()">
      {{ textSeeAll }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    textSeeAll: String,
    data: {
      type: Array,
      required: true
    },
    isShowSeeAll: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    $_selectField(item) {
      this.$emit("on:click", { ...item });
    },
    $_seeAll(item) {
      this.$emit("on:clickSeeAllBtn", { ...item });
    }
  }
};
</script>

<style lang="scss" scoped>
.search-box__bottom {
  position: absolute;
  width: 100vw;
  top: 90px;
  left: -20px;
  z-index: 10;

  @include min-md {
    width: 950px;
    height: auto;
    top: calc(100% + 28px);
    bottom: -10px;
    left: -37px;
    padding: 0 35px;

    &::after {
      content: "";
      width: 14px;
      height: 14px;
      top: -7px;
      left: calc(287px / 2 + 30px);
      position: absolute;
      border-top: 1px solid $border-color-light-gray;
      border-left: 1px solid $border-color-light-gray;
      background-color: $bg-color-white;
      transform: rotate(45deg);
    }
  }

  &__container {
    background-color: $bg-color-white;
    border-top: 1px solid $border-color-gray-2;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 500px;
    padding: 20px;
    overflow: auto;
    box-shadow: 0 0 1px 0;
    @include scrollbar;
    @include min-md {
      flex-direction: row;
    }
  }

  &__result {
    width: 100%;
    margin-bottom: 10px;

    .title {
      text-transform: uppercase;
      font-size: 11px;
      font-weight: bold;
      line-height: 10px;
      letter-spacing: 1.2px;
      margin-bottom: 15px;
    }

    .place {
      border-bottom: 1px solid $border-color-gray-2;
      padding: 12px 30px 12px 1px;
      position: relative;
      cursor: pointer;
      transition: all 0.5s ease;

      &:hover {
        padding-left: 20px;
      }

      &::after {
        content: "";
        background-image: url("~assets/images/icons/Icon-Hotel.svg");
        position: absolute;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        width: 20px;
        height: 100%;
        right: 10px;
        top: 0;
      }

      &__address {
        font-size: 14px;
        font-weight: bold;
        line-height: 17px;
        margin-bottom: 10px;
        cursor: pointer;
      }

      &__properties {
        font-size: 11px;
        line-height: 8px;
        color: $text-color-gray;
      }

      &:hover {
        background-color: $bg-color-yellow-3;
      }
    }

    @include min-md {
      padding: 0 10px;
    }
  }
}

.see-all-btn {
  border: 1px solid $border-color-light-gray;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 15px 0;
  text-transform: capitalize;
  font-size: 14px;
  font-weight: bold;
  color: $bg-color-blue-2;
  cursor: pointer;
}
</style>
