<template>
  <div class="reservation-question" v-if="additionalQuestion && additionalQuestion.length">
    <div class="reservation-question__about-stay">
      <strong>{{ $t("confirmbooking.about_your_stay_title") }}</strong>
      <p>{{ $t("confirmbooking.additional_question") }}</p>
    </div>
    <div v-if="!isShowQuestionForm" class="reservation-question__answer-desc">
      <div
        v-for="item in reservationCustom"
        :key="item.position"
        class="answer-desc"
      >
        <div v-if="item.answer_type === 'text'" class="mb-2">
          <div class="question">
            {{ item.question }}
          </div>
          <span class="answer ml-2">
            {{ item.answer.text ? item.answer.text : "-" }}
          </span>
        </div>
        <div v-if="item.answer_type === 'time'" class="row mb-2">
          <div class="question col-6">
            {{
              item.question_type === "checkout"
                ? $t("confirmbooking.checkout_time")
                : $t("confirmbooking.checkin_time")
            }}
            :
          </div>

          <span class="answer">
            {{
              item.question_type === "checkout"
                ? item.answer.rooms &&
                  item.answer.rooms[0].checkout_time !== null
                  ? item.answer.rooms[0].checkout_time
                  : "-"
                : item.answer.rooms &&
                  item.answer.rooms[0].checkin_time !== null
                  ? item.answer.rooms[0].checkin_time
                  : "-"
            }}
          </span>
        </div>
        <div v-if="item.answer_type === 'number_of_men_women_per_room'">
          <div
            v-for="(room, index) in item.answer.rooms"
            :key="room.reservation_hotel_room_id"
            class="answer-desc row"
          >
            <div class="room col-4 col-lg-3 mb-2">
              {{ $t("booking.room") }} {{ index + 1 }} :
            </div>
            <span>
              {{ room.men_count !== null ? room.men_count : "-" }}
              {{ $t("confirmbooking.male") }} ,
              {{ room.women_count !== null ? room.women_count : "-" }}
              {{ $t("confirmbooking.female") }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <QuestionForm
        v-if="isShowQuestionForm"
        :rooms="rooms"
        :additional-question="reservationCustom"
        :is-edited-form="isEditedForm"
        @on:Submit="onSubmit"
      />
    </div>
    <div
      v-if="!isShowQuestionForm && reservationsData.status !== 'cancelled'"
      class="reservation-question__button"
    >
      <button class="m-btn m-btn__yellow" @click="showQuestionForm">
        Edit
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ReservationQuestion',
  data () {
    return {
      additionalQuestion: [],
      rooms: [],
      isShowQuestionForm: false,
      isEditedForm: false
    }
  },
  computed: {
    ...mapGetters({
      reservationQuestion: 'confirmBooking/reservationQuestion',
      reservationsData: 'booking/reservationsData'
    }),

    reservationCustom () {
      return (
        this.additionalQuestion &&
        this.additionalQuestion.map((revervation) => {
          if (revervation.answer_type === 'text') {
            if (!revervation.answer.text) {
              revervation.answer = {
                text: null
              }
            }
          }

          if (revervation.question_type === 'checkout') {
            if (!revervation.answer.rooms) {
              revervation.answer.rooms = this.rooms.map((room) => {
                return {
                  reservation_hotel_room_id: room.reservation_hotel_room_id,
                  checkout_time: null
                }
              })
            }
          }

          if (revervation.question_type === 'checkin') {
            if (!revervation.answer.rooms) {
              revervation.answer.rooms = this.rooms.map((room) => {
                return {
                  reservation_hotel_room_id: room.reservation_hotel_room_id,
                  checkin_time: null
                }
              })
            }
          }

          if (revervation.answer_type === 'number_of_men_women_per_room') {
            if (!revervation.answer.rooms) {
              revervation.answer.rooms = this.rooms.map((room) => {
                return {
                  reservation_hotel_room_id: room.reservation_hotel_room_id,
                  men_count: null,
                  women_count: null,
                  adults: room.adults
                }
              })
            }
          }

          return revervation
        })
      )
    }
  },
  watch: {
    reservationQuestion (reservationQuestion) {
      const personCount = reservationQuestion.additional_questions.filter(
        add => add.answer_type === 'number_of_men_women_per_room'
      )[0]
      if (personCount && personCount.answer.rooms) {
        this.isEditedForm = true
      }
      this.additionalQuestion = reservationQuestion.additional_questions || []
      this.rooms = reservationQuestion.rooms
    },

    reservationsData (data) {
      if (data.status === 'cancelled') {
        this.isShowQuestionForm = false
      }
    }
  },
  mounted () {
    this.additionalQuestion = this.reservationQuestion.additional_questions || []
    this.rooms = this.reservationQuestion.rooms
  },
  methods: {
    showQuestionForm () {
      this.isShowQuestionForm = true
    },

    onSubmit () {
      this.isShowQuestionForm = false
    }
  }
}
</script>

<style lang="scss" scoped>
.reservation-question {
  &__answer-desc {
    .question {
      font-weight: bold;
      font-size: 15px;
    }

    .room {
      font-size: 15px;
      font-weight: bold;
    }
  }
  &__button {
    width: 100%;
    display: flex;
    align-items: center;
    button {
      width: 100%;
      padding: 8px;
    }
  }
}
</style>
