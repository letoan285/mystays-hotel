<template>
  <div
    class="app-month-year-selector"
    :class="{ 'has-error': isNotValidated && isFocused }"
  >
    <div class="app-month-year-selector__month">
      <app-select
        ref="selectMonth"
        v-model="selectedMonth"
        select-id="credit-card-month"
        :label-text="getLang.cardExpiredDate"
        :options="months"
        is-vertical-dropdown="true"
        place-holder="MM"
        @focus="$_focus"
      />
      <span v-if="isFocused && isNotValidated" class="app-input__validation">{{
        getLang.required
      }}</span>
    </div>
    <div class="app-month-year-selector__year">
      <app-select
        ref="selectYear"
        v-model="selectedYear"
        select-id="credit-card-year"
        label-text
        :options="years"
        is-vertical-dropdown="true"
        place-holder="YYYY"
        @focus="$_focus"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AppSelect from '../app-select/AppSelect.vue'

export default {
  name: 'AppMonthYearSelector',
  components: {
    AppSelect
  },
  data () {
    return {
      hasError: false,
      isFocused: false,
      selectedMonth: '',
      selectedYear: '',
      years: [],
      months: [
        {
          value: '1',
          text: 'January'
        },
        {
          value: '2',
          text: 'February'
        },
        {
          value: '3',
          text: 'March'
        },
        {
          value: '4',
          text: 'April'
        },
        {
          value: '5',
          text: 'May'
        },
        {
          value: '6',
          text: 'June'
        },
        {
          value: '7',
          text: 'July'
        },
        {
          value: '8',
          text: 'August'
        },
        {
          value: '9',
          text: 'September'
        },
        {
          value: '10',
          text: 'October'
        },
        {
          value: '11',
          text: 'November'
        },
        {
          value: '12',
          text: 'December'
        }
      ]
    }
  },
  computed: {
    ...mapActions({
      changeMonthYearSelectorStatus:
        'paymentDetail/changeMonthYearSelectorStatus'
    }),

    isNotValidated () {
      return !(this.selectedMonth && this.selectedYear)
    },
    getLang () {
      return {
        cardExpiredDate: this.$t('forms.card_expired_date'),
        required: this.$t('forms.required')
      }
    }
  },
  watch: {
    isNotValidated () {
      this.changeMonthYearSelectorStatus({ isMonthYearSelected: true })
    }
  },
  mounted () {
    const currentYear = new Date().getFullYear()
    for (let year = currentYear; year <= currentYear + 50; year++) {
      this.years.push({
        value: year,
        text: year
      })
    }
    this.changeMonthYearSelectorStatus({ isMonthYearSelected: false })
  },
  methods: {
    $_focus () {
      this.isFocused = true
    }
  }
}
</script>

<style lang="scss" scoped>
.app-month-year-selector {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  &__month {
    width: 45%;

    @include min-sm {
      width: 165px;
    }
  }

  &__year {
    width: 45%;
    margin-top: 17px;

    @include min-sm {
      width: 130px;
    }
  }
}
</style>
