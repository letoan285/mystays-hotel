<template>
  <div class="drop-down" :class="{ 'drop-down--mobile': isNavMobileButton }">
    <app-dropdown-box
      :is-show-backdrop="!isNavMobileButton"
      is-header-dropdown="true"
      :is-open="isShowDropDown"
      @toggleBox="$_toggleSideBox"
    >
      <template v-slot:dropdown__button>
        <div class="drop-down__selected">
          <div class="drop-down__selected__icon">
            <img v-if="typeIcon == 'image'" :src="selectedValue.flag" alt="">
            <span v-if="typeIcon == 'icon'" :class="selectedValue.flag" />
          </div>
          <div class="drop-down__selected__value">
            {{ selectedValue.text }}
          </div>
          <div class="drop-down__selected__arrow">
            <span class="icon-Arrow-Small-Down" />
          </div>
        </div>
      </template>
      <template v-if="!isNavMobileButton" v-slot:dropdown__box>
        <div class="drop-down__box">
          <div
            v-for="(dropDownItem, dropDownItemIndex) in notSelectedDropdownData"
            :key="dropDownItemIndex"
            class="drop-down__box__feild"
            @click="selectField(dropDownItem)"
          >
            <div class="icon">
              <img
                v-if="typeIcon == 'image'"
                v-lazy-load
                :data-src="dropDownItem.flag"
                alt
              >
              <span v-if="typeIcon == 'icon'" :class="dropDownItem.flag" />
            </div>
            <div class="value">
              {{ dropDownItem.text }}
            </div>
          </div>
        </div>
      </template>
    </app-dropdown-box>
    <dropdown-transition>
      <div v-if="isShowDropDown && isNavMobileButton" class="drop-down__box">
        <div
          v-for="(dropDownItem, dropDownItemIndex) in notSelectedDropdownData"
          :key="dropDownItemIndex"
          class="drop-down__box__feild"
          @click="selectField(dropDownItem)"
        >
          <div class="icon">
            <img
              v-if="typeIcon == 'image'"
              v-lazy-load
              :data-src="dropDownItem.flag"
              alt
            >
            <span v-if="typeIcon == 'icon'" :class="dropDownItem.flag" />
          </div>
          <div class="value">
            {{ dropDownItem.text }}
          </div>
        </div>
      </div>
    </dropdown-transition>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */

import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import AppDropdownBox from '../app-dropdown-box/AppDropdownBox.vue'
import DropdownTransition from '../dropdown-transition/DropdownTransition.vue'

export default Vue.extend({
  name: 'AppDropDown',
  components: {
    AppDropdownBox,
    DropdownTransition
  },
  props: {
    dropDownData: {
      type: Array,
      required: true
    },
    typeIcon: {
      type: String,
      required: true
    },
    selectedDefault: Object,
    isNavMobileButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShowDropDown: false,
      selectedValue: null
    }
  },
  computed: {
    ...mapGetters({
      language: 'appHeader/language',
      fullLang: 'appHeader/fullLanguage'
    }),
    notSelectedDropdownData () {
      return this.dropDownData.filter(item => item !== this.selectedValue)
    }
  },
  watch: {
    selectedDefault (newValue) {
      this.selectedValue = newValue
    }
  },
  created () {
    this.selectedValue = this.selectedDefault
      ? this.selectedDefault
      : this.dropDownData[0]
  },

  methods: {
    ...mapActions({
      setSearchKeyword: 'booking/setSearchKeyword'
    }),

    selectField (item) {
      if (this.$nuxt.isOnline) {
        const path = this.$route.path
        const lang = localStorage.getItem('lang')
        if (path === this.$pageRoute.hotelsList && lang === 'zh-CN') {
          setTimeout(() => {
            // location.reload(true)
          }, 100)
        }
        this.setSearchKeyword('')
        this.$_toggleSideBox()
        this.selectedValue = item
        this.$emit('selectFieldItem', item)
        this.$nuxt.$emit('onChangeLanguage')

        if (path === this.$pageRoute.hotelsList && this.fullLang === 'zh-CN') {
          setTimeout(() => {
            // location.reload(true)
          }, 100)
        }
      } else {
        alert('You are Offline')
      }
    },
    $_toggleSideBox (isShowDropDown) {
      if (this.isShowDropDown) {
        this.isShowDropDown = false
        this.$scrollBody.enable();
      }
      this.isShowDropDown = isShowDropDown
    }
  }
})
</script>

<style lang="scss" scoped>
.drop-down {
  // margin: 0 15px;
  position: relative;

  &--mobile {
    .drop-down {
      &__selected {
        &__icon {
          margin: 0 1.5rem;
        }

        &__value {
          margin: 0 20px 0 0;
        }
      }

      &__box__feild {
        .icon {
          margin: 0 1.5rem;
        }
      }
    }
  }

  &__selected {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    &__value {
      margin: 0 10px;
    }
    &__arrow {
      font-size: 10px;
    }
    &__icon {
      font-size: 14px;
    }
  }
  &__box {
    width: 120px;
    &__feild {
      min-width: 120px;
      display: flex;
      align-items: center;
      padding: 5px 10px;
      cursor: pointer;
      &:hover {
        background: #dddddd;
      }
      .icon {
        font-size: 14px;
        margin-right: 5px;
      }
      .value {
        font-size: 13px;
        white-space: nowrap;
      }
    }
  }
}

.drop-down:nth-child(2) {
  margin-right: 0;
}
.drop-down:nth-child(1) {
  margin-left: 0;

  .drop-down__box__feild {
    min-width: 80px;
  }
}
</style>
