<template>
  <div
    :class="`${getClassCheckbox} ${option === 'filter' ? 'filter-custom' : ''}`"
  >
    <div
      v-for="checkboxData in data"
      :key="checkboxData.value || checkboxData.id"
      :class="
        `${getClassCheckbox}__checkbox ${option === 'sort-by' ? 'custom' : ''}`
      "
    >
      <input
        :id="checkboxData.value || checkboxData.id"
        ref="checkbox"
        v-model="currentSelectedChecbox"
        :value="checkboxData.value || checkboxData.id"
        type="checkbox"
        :class="{ 'checkbox--wrap': isWrapped, 'is-radio': isRadio }"
        @change="$emit('input', currentSelectedChecbox)"
      />
      <label :for="checkboxData.value || checkboxData.id">
        {{ checkboxData.text || checkboxData.name }}
      </label>
      <label :for="checkboxData.value || checkboxData.id">
        <slot />
      </label>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
import Vue from "vue";
export default Vue.extend({
  name: "AppCheckbox",
  props: {
    sortBy: {
      type: Array
    },
    data: {
      type: Array
    },
    isWrapped: {
      type: Boolean
    },
    isRadio: {
      type: Boolean
    },
    isChecked: {
      type: Boolean
    },
    page: {
      type: String
    },
    option: {
      type: String
    },
    currentSelected: {
      type: Array
    }
  },
  data() {
    return {
      value: "",
      currentSelectedChecbox: this.currentSelected
    };
  },
  computed: {
    getClassCheckbox() {
      return this.page ? "custom-checkbox" : "app-checkbox";
    }
  },
  mounted() {
    if (this.isChecked) {
      this.$refs.checkbox.forEach(ele => {
        ele.checked = true;
      });
    }
  }
});
</script>
<style scoped lang="scss">
.app-checkbox {
  &__checkbox {
    display: flex;
  }

  label {
    font-size: 13px;
    color: $text-color-blue-2;
    font-weight: 500;
    -webkit-user-select: none; /* Chrome all / Safari all */
    -moz-user-select: none; /* Firefox all */
    -ms-user-select: none; /* IE 10+ */
    user-select: none;
    display: flex;
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
    margin: 0 10px 0 0;
    border-radius: 3px;
  }

  input[type="checkbox"]:checked + label {
    position: relative;
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

  input[type="checkbox"].checkbox--wrap + label {
    position: relative;
    width: 100%;
  }

  input[type="checkbox"].checkbox--wrap + label::after,
  input[type="checkbox"].checkbox--wrap + label::before {
    position: absolute;
    content: "";
  }

  input[type="checkbox"].checkbox--wrap + label::before {
    height: 30px;
    width: 65px;
    border: 0;
    border-radius: 20px;
    background: $bg-color-gray-7;
    transition: background 0.5s ease;
    right: 0;
    margin: 0;
  }

  input[type="checkbox"]:checked.checkbox--wrap + label::before {
    background: $bg-color-blue;
    border: 0;
  }

  input[type="checkbox"].checkbox--wrap + label::after {
    height: 24px;
    width: 24px;
    background: $white;
    border-radius: 50%;
    top: 3px;
    right: 38px;
    transition: left 0.5s ease;
  }

  input[type="checkbox"]:checked.checkbox--wrap + label::after {
    right: 3px;
    left: auto;
  }

  input[type="checkbox"].is-radio + label:before {
    content: "";
    border: 1px solid $border-color-blue-2;
    background-size: contain;
    display: inline-block;
    vertical-align: -3px;
    width: 19px;
    height: 19px;
    margin: 0 10px 0 0;
    border-radius: 50%;
  }

  input[type="checkbox"].is-radio:checked + label:before {
    background: $white;
  }

  input[type="checkbox"].is-radio:checked + label:after {
    content: "";
    display: block;
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: $bg-color-blue-2;
    top: 3px;
    left: 3px;
    border: none;
  }
}

.custom-checkbox {
  &__checkbox {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .custom {
    margin-bottom: 0;
    padding: 13px 0 10px;
    border-bottom: 1px solid $border-color-gray-2;

    label {
      font-size: 14px;
    }

    input[type="checkbox"] + label:before {
      content: "";
      margin: 0 15px 0 0;
    }
  }

  label {
    font-size: 13px;
    color: $text-color-blue;
    font-weight: 500;
    -webkit-user-select: none; /* Chrome all / Safari all */
    -moz-user-select: none; /* Firefox all */
    -ms-user-select: none; /* IE 10+ */
    user-select: none;
    cursor: pointer;
  }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"] + label:before {
    content: "";
    border: 1px solid $border-color-gray-7;
    background-size: contain;
    display: inline-block;
    vertical-align: -5px;
    width: 20px;
    height: 20px;
    margin: 0 10px 0 0;
    border-radius: 3px;
  }

  input[type="checkbox"]:checked + label {
    position: relative;
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

  input[type="checkbox"].checkbox--wrap + label {
    position: relative;
    width: 100%;
  }

  input[type="checkbox"].checkbox--wrap + label::after,
  input[type="checkbox"].checkbox--wrap + label::before {
    position: absolute;
    content: "";
  }

  input[type="checkbox"].checkbox--wrap + label::before {
    height: 26px;
    width: 55px;
    border: 0;
    border-radius: 20px;
    background: $bg-color-gray-7;
    transition: background 0.5s ease;
    right: 0;
    margin: 0;
    cursor: pointer;
  }

  input[type="checkbox"]:checked.checkbox--wrap + label::before {
    background: $bg-color-blue-2;
    border: 0;
  }

  input[type="checkbox"].checkbox--wrap + label::after {
    height: 24px;
    width: 24px;
    background: $white;
    border-radius: 50%;
    top: 1px;
    right: 29px;
    transition: left 0.5s ease;
  }

  input[type="checkbox"]:checked.checkbox--wrap + label::after {
    right: 2px;
    left: auto;
  }

  input[type="checkbox"].is-radio + label:before {
    content: "";
    border: 1px solid $border-color-blue-2;
    background-size: contain;
    display: inline-block;
    vertical-align: -3px;
    width: 19px;
    height: 19px;
    margin: 0 10px 0 0;
    border-radius: 50%;
  }

  input[type="checkbox"].is-radio:checked + label:before {
    background: $white;
  }

  input[type="checkbox"].is-radio:checked + label:after {
    content: "";
    display: block;
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: $bg-color-blue-2;
    top: 3px;
    left: 3px;
    border: none;
  }
}

.filter-custom {
  display: flex;
  flex-wrap: wrap;

  .custom-checkbox__checkbox {
    width: 50%;
  }
}
</style>
