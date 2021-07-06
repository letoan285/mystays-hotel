<template>
  <div class="question-form">
    <div class="question-form__question">
      <div
        v-for="(item, additionalIndex) in additionalQuestions"
        :key="item.position"
        class="question-form__question__form mb-3"
      >
        <div v-if="item.answer_type === 'text'" class="form-text mb-2">
          <div class="question mb-1">
            {{ item.question }}
          </div>
          <b-form-textarea
            id="textarea-small"
            v-model="item.answer.text"
            size="lg"
          />
        </div>
        <div v-if="item.answer_type === 'time'" class="form-text mb-2">
          <div class="question mb-1">
            {{ item.question }}
          </div>
          <AppSelectDesktop
            v-if="item.question_type === 'checkout'"
            :list-options="
              getTimeArray(
                item.settings.started_at,
                item.settings.ended_at,
                item.settings.time_interval_value
              )
            "
            :selected-value="
              `${
                item.answer.rooms[0].checkout_time
                  ? item.answer.rooms[0].checkout_time
                  : '-'
              }`
            "
            :max-height="350"
            :is-auto-complete="false"
            @onClickItem="data => onChangeCheckout(data, additionalIndex)"
          />
          <AppSelectDesktop
            v-if="item.question_type === 'checkin'"
            :list-options="
              getTimeArray(
                item.settings.started_at,
                item.settings.ended_at,
                item.settings.time_interval_value
              )
            "
            :selected-value="
              `${
                item.answer.rooms[0].checkin_time
                  ? item.answer.rooms[0].checkin_time
                  : '-'
              }`
            "
            :max-height="350"
            :is-auto-complete="false"
            @onClickItem="data => onChangeCheckin(data, additionalIndex)"
          />
        </div>
        <div
          v-if="item.answer_type === 'number_of_men_women_per_room'"
          class="mb-2"
        >
          <div class="question mb-1">
            {{ item.question }}
          </div>
          <div
            v-for="(room, roomIndex) in item.answer.rooms"
            :key="roomIndex"
            class="question-form__question__form mb-2"
          >
            <div class="room mb-2">
              {{ $t("booking.room") }} {{ roomIndex + 1 }}
            </div>
            <div class="gender row">
              <div class="col-4">
                <span>Male</span>
                <AppSelectDesktop
                  class="mt-1"
                  :list-options="getAgeArray(rooms[roomIndex].adults)"
                  :selected-value="
                    `${
                      roomInAdditonal[roomIndex] &&
                      roomInAdditonal[roomIndex].men_count !== null
                        ? roomInAdditonal[roomIndex].men_count
                        : '-'
                    }`
                  "
                  :is-auto-complete="false"
                  @onClickItem="
                    data => onChangeMenCount(data, roomIndex, additionalIndex)
                  "
                />
              </div>
              <div class="col-4">
                <span>Female</span>
                <AppSelectDesktop
                  class="mt-1"
                  :list-options="getAgeArray(rooms[roomIndex].adults)"
                  :selected-value="
                    `${
                      roomInAdditonal[roomIndex] &&
                      roomInAdditonal[roomIndex].women_count !== null
                        ? roomInAdditonal[roomIndex].women_count
                        : '-'
                    }`
                  "
                  :is-auto-complete="false"
                  @onClickItem="
                    data => onChangeWomenCount(data, roomIndex, additionalIndex)
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="question-form__button">
      <button class="m-btn m-btn__blue" @click="onSubmit">
        <b-spinner
          v-if="isUpdateBatchLoading"
          small
          label="Small Spinner"
          class="mr-3"
        />
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "QuestionForm",
  props: {
    additionalQuestion: {
      type: Array,
      default: () => []
    },
    rooms: {
      type: Array,
      default: () => []
    },
    isEditedForm: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      additionalQuestions: [...this.additionalQuestion],
      roomInAdditonal: []
    };
  },
  computed: {
    ...mapGetters({
      reservationsData: "booking/reservationsData",
      byPassToken: "booking/byPassToken",
      reservationID: "booking/bookingID",
      fullLang: "appHeader/fullLanguage"
    }),

    ...mapState({
      isUpdateBatchLoading: state => state.confirmBooking.isUpdateBatchLoading,
      isMobile: state => state.general.data.isMobile
    }),

    additionalParams() {
      return this.additionalQuestions
        .filter(add => add.answer_type !== "none")
        .map(additional => {
          return {
            answer: additional.answer,
            id: additional.id
          };
        });
    },

    updateBatchParams() {
      return {
        hotelID: this.reservationsData.hotel.id,
        reservationID: this.reservationID,
        fullLang: this.fullLang,
        body: {
          additional_questions: this.additionalParams,
          email: this.reservationsData.email,
          bypass_token: this.byPassToken
        }
      };
    }
  },
  watch: {
    isUpdateBatchLoading(isLoading) {
      if (!isLoading) {
        this.$emit("on:Submit");
      }
    },

    additionalQuestion(additionalQuestion) {
      this.additionalQuestions = additionalQuestion;
    },

    isEditedForm(isEditedForm) {
      this.roomInAdditonal = this.rooms.map(room => {
        return {
          adults: room.adults,
          men_count: isEditedForm ? room.men_count : null,
          women_count: isEditedForm ? room.women_count : null
        };
      });
    }
  },
  mounted() {
    this.roomInAdditonal = this.rooms.map(room => {
      return {
        adults: room.adults,
        men_count: this.isEditedForm ? room.men_count : null,
        women_count: this.isEditedForm ? room.women_count : null
      };
    });
  },
  methods: {
    ...mapActions({
      updateBatch: "confirmBooking/updateBatch"
    }),
    onSubmit() {
      this.updateBatch(this.updateBatchParams);
    },

    getTimeArray(start, end, timeInterval) {
      const startTime = Moment(start, "HH:mm");
      const endTime = Moment(end, "HH:mm");
      if (endTime.isBefore(startTime)) {
        endTime.add(1, "day");
      }
      const timeArray = [];
      while (startTime <= endTime) {
        timeArray.push({
          text: new Moment(startTime).format("HH:mm"),
          value: new Moment(startTime).format("HH:mm")
        });
        startTime.add(timeInterval, "minutes");
      }
      return timeArray;
    },

    getAgeArray(ageValue) {
      const listAges = [];
      for (let ageIndex = 0; ageIndex <= ageValue; ageIndex++) {
        listAges.push({
          text: ageIndex,
          value: ageIndex
        });
      }

      return listAges;
    },

    onChangeCheckout(checkout, addIdx) {
      const checkoutRooms = this.additionalQuestions[addIdx].answer.rooms;
      checkoutRooms.forEach(c => {
        c.checkout_time = checkout;
      });
    },

    onChangeCheckin(checkin, addIdx) {
      const checkinRooms = this.additionalQuestions[addIdx].answer.rooms;
      checkinRooms.forEach(c => {
        c.checkin_time = checkin;
      });
    },

    onChangeMenCount(ageValue, roomIdx, addIdx) {
      const numberAdults = this.rooms[roomIdx].adults;
      this.additionalQuestions[addIdx].answer.rooms[
        roomIdx
      ].men_count = ageValue;
      this.roomInAdditonal[roomIdx].men_count = ageValue;
      this.roomInAdditonal[roomIdx].women_count = numberAdults - ageValue;
      this.additionalQuestions[addIdx].answer.rooms[roomIdx].women_count =
        numberAdults - ageValue;
    },

    onChangeWomenCount(ageValue, roomIdx, addIdx) {
      const numberAdults = this.rooms[roomIdx].adults;
      this.additionalQuestions[addIdx].answer.rooms[
        roomIdx
      ].women_count = ageValue;
      this.roomInAdditonal[roomIdx].men_count = numberAdults - ageValue;
      this.roomInAdditonal[roomIdx].women_count = ageValue;
      this.additionalQuestions[addIdx].answer.rooms[roomIdx].men_count =
        numberAdults - ageValue;
    }
  }
};
</script>

<style lang="scss" scoped>
.question-form {
  &__button {
    width: 100%;
    margin-top: 25px;
    button {
      width: 100%;
      padding: 8px;
    }
  }

  &__question {
    &__form {
      .room {
        color: #767677;
      }
      .gender {
        span {
          font-weight: bold;
          font-size: 15px;
        }
      }
    }
  }

  .question {
    font-weight: bold;
    font-size: 14px;

    @include min-sm {
      font-size: 15px;
    }
  }

  textarea {
    outline: none;
    font-size: 15px;
    height: 70px;
  }
}
</style>
