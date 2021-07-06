<template>
  <div>
    <!-- <b-button id="show-btn" @click="showModal">Open Modal</b-button> -->
    <b-modal
      id="modal-xl"
      ref="my-modal"
      :dialog-class="modalClass ? modalClass : 'mystay-popup'"
      hide-header
      hide-footer
      :size="size"
      :centered="centered"
      :no-close-on-backdrop="noCloseOnBackdrop"
      @hide="onHide"
    >
      <div class="close">
        <span v-if="isCloseIcon" class="icon-Icon-Close" @click="hideModal" />
      </div>
      <div v-if="waitingPopup" class="text-center">
        <div class="popup-waiting-icon" />
      </div>
      <div v-if="successfulPopup" class="text-center">
        <div class="successful-icon" />
      </div>
      <div v-if="failedPopup" class="text-center">
        <div class="failed-icon" />
      </div>
      <slot />
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable vue/require-prop-type-constructor */
import { mapState } from "vuex";

export default {
  name: "MyStayPopup",
  props: {
    fields: {
      type: Object,
      default: () => ({})
    },
    picturePopup: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: () => "xl"
    },
    centered: {
      type: Boolean,
      default: () => true
    },
    type: {
      type: String,
      default: () => ""
    },
    modalClass: {
      type: String,
      default: () => ""
    },
    isCloseIcon: {
      type: Boolean,
      default: () => false
    },
    noCloseOnBackdrop: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      waitingPopup: false,
      successfulPopup: false,
      failedPopup: false
    };
  },
  computed: {
    ...mapState({
      isMobile: state => state.general.data.isMobile
    })
  },
  destroyed() {
    this.scrollBody(false);
  },
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
      this.scrollBody(true);
    },
    hideModal() {
      this.$refs["my-modal"].hide();
      setTimeout(() => {
        this.scrollBody(false);
      }, 200);
    },
    toggleModal() {
      this.$refs["my-modal"].toggle("#toggle-btn");
    },
    scrollBody(isScroll) {
      if(isScroll){
        this.$scrollBody.disable();
      }else{
        this.$scrollBody.enable();
      }
      const body = document.body;
      body.style.paddingRight = isScroll && !this.isMobile ? "17px" : "";
    },
    onHide(evt) {
      setTimeout(() => {
        this.scrollBody(false);
      }, 200);
      if (evt.trigger === "backdrop") {
        // evt.preventDefault();
        this.handleBackdrop();
      }
    },
    handleBackdrop() {
      this.$emit("backdropClick");
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .modal-booking {
  color: white;
  text-align: center;
  border-radius: 4px;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: $text-color-blue-2;
  margin: 0;
  max-width: 650px;
  .modal-content {
    border: none;
    background: $text-color-blue;
    border-radius: 3px;
  }
  @include min-sm {
    position: initial;
    padding: 10px;
    margin: 0 auto;
    background: none;
  }

  .modal-body {
    border: 8px solid white;
  }
}
.mystay-popup {
  .modal-content {
    border: none;
  }
}

>>> .modal-dialog {
  padding: 25px 15px 44px;
  margin: 0;

  @include min-sm {
    margin: 0 auto;
  }
}

>>> .modal-body {
  .btn-close-modal {
    display: block;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      background-position: center;
      background-repeat: no-repeat;
      right: 2px;
      top: -40px;
      width: 15px;
      height: 21px;
      background-size: 15px;

      @include min-lg {
        right: -8px;
        top: -30px;
        width: 32px;
        background-size: 32px;
        height: 31px;
      }
    }
  }
}

.close {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  span {
    cursor: pointer;
    font-size: 18px;
  }
}
</style>
