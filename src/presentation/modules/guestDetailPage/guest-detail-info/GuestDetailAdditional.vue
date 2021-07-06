<template>
  <div>
    <div
      v-for="(extras, extrasIdx) in extrasListItem"
      :key="extras.id"
      class="guest-detail__additional"
    >
      <div class="guest-detail__additional-detail">
        <h2>{{ extras.name }}</h2>
        <div class="guest-detail__additional-detail-text">
          <p>{{ extras.description }}</p>
          <div class="guest-detail__additional-detail-text-image">
            <img
              v-lazy-load
              :data-src="
                extras.chatbot_images_attributes[0] &&
                extras.chatbot_images_attributes[0].fullSize
              "
              alt
            />
          </div>
        </div>
      </div>
      <div
        v-for="(dinnerTime, index) in extras.prices"
        :key="dinnerTime.date"
        class="guest-detail__additional-form"
      >
        <div class="guest-detail__additional-form__name">
          <span>{{ `Day ${index + 1}` }}</span>
          <span>{{ `: ${dinnerTime.date}` }}</span>
        </div>
        <div class="guest-detail__additional-form__unit">
          <span>{{
            `${$_format(dinnerTime.price_without_tax)} / ${extras.unit}`
          }}</span>
          <span>(Tax excluded)</span>
        </div>
        <div
          class="guest-detail__additional-form__time"
          :class="{
            'guest-detail__additional-form--time-active': !extras.delivery_times_active,
          }"
        >
          <AppSelect2
            v-if="extras.delivery_times_active"
            :disabled="true"
            :fix-padding="`true`"
            select-id="guest-detail__additional-dining-select"
            :label-text="`Day ${index + 1}: ${dinnerTime.date}`"
            :options="deliveryTime(extras.delivery_times)"
            :default-value="deliveryTime(extras.delivery_times)[0].text"
            @input="
              (value) => getExtrasValue(value, dinnerTime, extras.id, extrasIdx)
            "
          />
          <AppSelect2
            select-id="guest-detail__additional-dining-select"
            :label-text="`Day ${index + 1}: ${dinnerTime.date}`"
            :options="listOptions(extras.min_unit, extras.max_unit)"
            :default-value="`${extras.min_unit}`"
            @input="
              (value) => getExtrasValue(value, dinnerTime, extras.id, extrasIdx)
            "
          >
            <span class="icon-Icon-Time" />
          </AppSelect2>
          <div class="additional-form-unit">
            <span>{{
              `${$_format(dinnerTime.price_without_tax)} / ${extras.unit}`
            }}</span>
            <span>(Tax excluded)</span>
          </div>
        </div>
      </div>
      <div v-if="extras.question_active" class="guest-detail__additional-form">
        <AppInput
          v-if="textarea.name"
          value=""
          :placeholder="textarea.placeholder"
          :input-name="textarea.name"
          :input-type="textarea.type"
          :input-label="extras.question"
          :input-icon="textarea.icon"
          :required="textarea.required"
          validation-input-name="textarea"
          :validations="{}"
          @input="(value) => $_getAnswer(value, extras.id, extrasIdx)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapState, mapActions } from "vuex";
import { FormLabel } from "../../../../shared/constants/index";
import CurrencyHelper from "../../../../shared/helper/CurrencyHelper";

export default Vue.extend({
  name: "GuestDetailAdditional",
  data() {
    return {
      textarea: {
        name: "user-comment",
        value: "",
        type: "textarea",
        label: FormLabel.add_comment,
        placeholder: FormLabel.comment,
      },
      selectOt: [],
      extrasListItem: [],
      extrasParams: [],
    };
  },
  computed: {
    ...mapState({
      additionalList: (state: any) => state.guestDetail.additionalList,
      extrasList: (state: any) => state.guestDetail.extrasList,
    }),
    ...mapGetters({
      diningTime: "guestDetail/diningTime",
    }),
  },
  watch: {
    extrasList(extrasList) {
      this.extrasListItem = extrasList;
    },

    extrasParams: {
      handler(_extras) {},
      deep: true,
    },
  },
  mounted() {
    this.extrasListItem = this.extrasList;
    this.extrasParams = this.extrasList.map((_extras: any) => {
      return {
        extra_id: "",
        quantity: 0,
        delivery_times: [
          {
            delivered_at: "",
            quantity: 0,
          },
        ],
        answer: "",
      };
    });

    this.$nuxt.$on("saveExtrasParams", () => {
      this.saveExtrasParams(this.extrasParams);
    });
  },
  methods: {
    ...mapActions({
      saveExtrasParams: "guestDetail/saveExtrasParams",
      saveExtrasAnswer: "guestDetail/saveExtrasAnswer",
    }),

    listOptions(minUnit: number, maxUnit: number) {
      const listOption = [];
      for (let unit = minUnit; unit <= maxUnit; unit++) {
        listOption.push({
          value: unit,
          text: unit,
        });
      }
      return listOption;
    },

    deliveryTime(listTime: any) {
      if (listTime.length) {
        return listTime.map((time: any) => {
          return {
            text: time,
            value: time,
          };
        });
      }
    },

    groupBy(objectArray: any, property: any) {
      return objectArray.reduce(function (acc: any, obj: any) {
        const key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    },

    getExtrasValue(
      value: any,
      dinnerTime: any,
      extrasId: number,
      listId: number
    ): any {
      if (this.selectOt.length) {
        this.selectOt.forEach((opt: any, index: number) => {
          if (opt.dinnerTime === dinnerTime.date && opt.extrasId === extrasId) {
            this.selectOt.splice(index, 1);
          }
        });
      }
      (this as any).selectOt.push({
        extrasId,
        dinnerTime: dinnerTime.date,
        value,
      });
      const newSelectOt = this.groupBy(this.selectOt, "extrasId");

      const delivery_times = newSelectOt[extrasId].map((extras: any) => {
        return {
          delivered_at: extras.dinnerTime,
          quantity: +extras.value,
          price: dinnerTime.price_without_tax,
        };
      });

      const quantity = delivery_times
        .map((time: any) => time.quantity)
        .reduce((a: any, b: any) => a + b);

      (this as any).extrasParams[listId] = {
        ...(this as any).extrasParams[listId],
        extra_id: extrasId,
        quantity,
        delivery_times,
      };
    },

    $_getAnswer(value: string, extrasId: number, index: number) {
      (this as any).extrasParams[index] = {
        ...(this as any).extrasParams[index],
        extra_id: extrasId,
        answer: value,
      };
    },

    $_format(price: number) {
      if (price) {
        return CurrencyHelper.getFormattedPrice("YEN", price);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.guest-detail__additional {
  border: 1px solid $border-color-gray-2;
  padding: 25px;
  border-radius: 2px;
  margin-bottom: 20px;

  @include min-sm {
    padding: 40px 30px 35px 30px;
  }

  &-form {
    .is-textarea {
      textarea {
        width: 100%;
        @include min-sm {
          width: 295px;
        }
      }
    }
  }

  &-detail {
    position: relative;

    h2 {
      font-size: 18px;
      color: $bg-color-blue;
      font-weight: bold;
      margin-bottom: 24px;
      padding-right: 150px;
      min-height: 75px;

      @include min-sm {
        padding-right: 0;
        min-height: 0;
      }
    }

    &-text {
      display: flex;
      justify-content: space-between;

      p {
        margin-right: 32px;
      }

      &-image {
        height: 75px;
        position: absolute;
        top: 0;
        right: 0;

        @include min-sm {
          height: auto;
          position: static;
        }

        img {
          width: 100%;
        }
      }
    }
  }

  &-form {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 20px;

    @include min-sm {
      flex-direction: row;
      align-items: center;
      margin-bottom: 10px;
    }

    label {
      margin-bottom: 5px;
      font-weight: bold;

      @include min-sm {
        margin-bottom: 0;
      }
    }

    .app-select {
      margin-right: 7px;
    }

    .is-textarea {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      width: 100%;
      margin-bottom: 0;

      @include min-sm {
        flex-direction: row;
      }
    }

    &__name {
      flex-grow: 1;
      margin-bottom: 5px;
      @include min-sm {
        margin-bottom: 0;
      }
      span {
        &:first-child {
          font-weight: bold;
        }
      }
    }

    &__unit {
      font-size: 14px;
      margin-bottom: 7px;
      @include min-sm {
        display: none;
      }
    }

    &__time {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      @include min-sm {
        width: 295px;
      }

      .app-select {
        width: 48%;

        @include min-sm {
          width: 35%;
        }
      }

      .additional-form-unit {
        display: none;
        font-size: 14px;
        width: 25%;
        @include min-sm {
          width: 30%;
          display: block;
        }
        span {
          &:last-child {
            font-size: 12px;
          }
        }
      }
    }

    &--time-active {
      justify-content: start;
    }
  }
}
</style>
