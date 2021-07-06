<template>
  <button
    type="submit"
    :style="{'width': buttonWidth}"
    class="app-button btb_submit"
    :class="'app-button--' + buttonType"
    :disabled="validated || disabled"
    @click="$emit('onclick')"
  >
    <b-spinner v-if="isLoading" small />
    {{ buttonText }}
  </button>
</template>

<script>

export default {
  name: 'AppButton',
  props: {
    buttonText: {
      type: String,
      required: true
    },
    buttonType: {
      type: String,
      required: true
    },
    buttonWidth: {
      type: String,
      required: true
    },
    validated: {
      type: Boolean,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // validate: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-button {
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 15px 20px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: bold;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &--primary {
    background: $bg-color-yellow;
    color: $text-color-blue;
  }

  &--secondary {
    background: $bg-color-blue-2;
    color: $white;
  }
}
</style>
