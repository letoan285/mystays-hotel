<template>
  <div class="app-checkbox">
    <input
      ref="checkbox"
      v-model="currentSelectedChecbox"
      type="checkbox"
      :disabled="disabled"
      @change="$emit('input', currentSelectedChecbox)"
    />
    <label @click="$refs.checkbox.click()" :style="{ color, fontSize }">{{
      labelText
    }}</label>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
export default {
  name: "CustomCheckbox",
  props: {
    isChecked: {
      type: Boolean
    },
    labelText: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    fontSize: {
      type: String,
      default: "13px"
    },
    color: {
      type: String,
      default: "#1a489c"
    }
  },
  data() {
    return {
      value: null,
      currentSelectedChecbox: this.isChecked
    };
  },
  watch: {
    isChecked(isChecked) {
      this.currentSelectedChecbox = isChecked;
    }
  }
};
</script>

<!-- Add 'scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-checkbox {
  display: flex;
  align-items: center;
  position: relative;
  label {
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    font-size: 13px;
    color: $text-color-blue-2;
    font-weight: 500;
    -webkit-user-select: none; /* Chrome all / Safari all */
    -moz-user-select: none; /* Firefox all */
    -ms-user-select: none; /* IE 10+ */
    user-select: none;
  }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"] + label:before {
    content: "";
    border: 1px solid $border-color-gray-6;
    background-size: contain;
    display: inline-block;
    vertical-align: -3px;
    width: 20px;
    height: 20px;
    margin: 0 8px 0 0;
    border-radius: 3px;
  }

  input[type="checkbox"]:checked + label:before {
    background: $bg-color-blue;
  }

  input[type="checkbox"]:checked + label:after {
    content: "";
    display: block;
    position: absolute;
    top: 2px;
    left: 7px;
    width: 7px;
    height: 12px;
    -ms-transform: rotate(40deg);
    transform: rotate(40deg);
    border-bottom: 2px solid $white;
    border-right: 2px solid $white;
  }
}
</style>
