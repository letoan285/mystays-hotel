<template>
  <div class="member-confirmation">
    <HotelNavigationBar />
    <div class="container">
      <div class="member-confirmation__confirmed" v-if="confirmedData">
        <div class="member-confirmation__confirmed__hotel-name mb-5">
          <h2>{{ hotelDetail && hotelDetail.name }}</h2>
        </div>
        <div class="member-confirmation__confirmed__content">
          <div class="title mb-4">
            <h4>E-mail address authentication</h4>
          </div>
          <div class="success mb-2">
            <BIconCheck scale="2" class="mr-3" />
            <span>Successfully registered</span>
          </div>
          <div>Enjoy your stay</div>
        </div>
      </div>
      <div class="member-confirmation__error" v-if="errorData">
        <span class="error mb-4">{{ errorMessage }}</span>
      </div>

      <div class="member-confirmation__login mt-4">
        <button class="m-btn m-btn__yellow" @click="goToLogin">
          Go to Home Page
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import CustomerUserCase from "../domain/usecases/customer";
import { mapActions, mapGetters } from "vuex";
import { BIconCheck } from "bootstrap-vue";

export default Vue.extend({
  name: "MemberConfirmation",
  components: {
    BIconCheck
  },
  data() {
    return {
      confirmedData: null,
      errorData: null
    };
  },

  watch: {
    token: {
      handler(token) {
        if (token.session_token && token.access_token) {
          const query = this.$route.query;
          const path = this.$route.path;

          this.getHotelDetail({ hotelID: query.code, fullLang: this.fullLang });

          if (path.includes("/member-confirmation")) {
            const data = {
              confirmation_token: query.confirmation_token,
              program_id: query.program_id,
              hotel_id: query.hotel_id
            };

            const signupUserUseCase = new CustomerUserCase.MemberConfimationUseCase(
              data
            );

            signupUserUseCase
              .execute()
              .then(res => {
                this.confirmedData = res.data;
              })
              .catch(err => {
                this.errorData = err;
              });
          }
        }
      },
      deep: true
    }
  },

  computed: {
    ...mapGetters({
      fullLang: "appHeader/fullLanguage",
      token: "customer/auth/token",
      hotelDetail: "hotelDetail/hotelDetail"
    }),
    errorMessage() {
      return this.errorData?._message[0].title;
    }
  },

  methods: {
    ...mapActions({
      getHotelDetail: "hotelDetail/getHotelDetail"
    }),
    goToLogin() {
      this.$router.push("/");
    }
  }
});
</script>

<style lang="scss" scoped>
.member-confirmation {
  flex: 1;
  text-align: center;
  position: relative;
  .container {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -15%);

    @include min-sm {
      transform: translate(-50%, -38%);
    }
  }

  button {
    padding: 8px 15px;
  }

  .success {
    color: seagreen;
  }

  &__confirmed {
    margin-top: 30px;

    @include min-sm {
      margin-top: 0;
    }
  }
}
</style>
