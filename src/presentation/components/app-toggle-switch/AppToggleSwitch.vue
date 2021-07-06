<template>
  <input
    v-model="isSelected"
    type="checkbox"
    class="toggle"
    @change="$_onChangSwitch"
    :disabled="isDisable"
  />
</template>

<script>
export default {
  name: "AppToggleSwitch",
  props: {
    bedSelected: {
      type: Boolean
    },
    isDisable: {
      type: Boolean
    }
  },
  data() {
    return {
      isSelected: this.bedSelected
    };
  },
  watch: {
    bedSelected(bedSelected) {
      this.isSelected = bedSelected;
    }
  },
  methods: {
    $_onChangSwitch() {
      this.$emit("on:ChangeBedStatus", this.isSelected);
    }
  }
};
</script>

<style lang="scss" scoped>
input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
}

.toggle {
  height: 24px;
  width: 57px;
  border-radius: 20px;
  display: inline-block;
  position: relative;
  margin: 0;
  background: #8a92a3;
  transition: all 0.2s ease;
  &:after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 1px 2px rgba(44, 44, 44, 0.2);
    transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);
  }
  &:checked {
    background: #1a489c;
    &:after {
      transform: translatex(33px);
    }
  }
}
</style>
