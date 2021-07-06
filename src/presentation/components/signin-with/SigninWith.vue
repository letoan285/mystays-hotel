<template>
  <div class="signin-with">
    <div class="signin-with__header">
      <!-- <hr class="mt-4 mb-5"> -->
      <!-- <p>or sign in with</p>
      <SigninWithCards :signin-withs="signinWiths" />-->
      <div class="text-center signin-with__reference-links">
        <div>
          {{ getLang.makeChanges }}
          <NuxtLink :to="referenceLinks.chatConcierge">
            {{ getLang.chatConcierge }}
          </NuxtLink>
        </div>
        <div>{{ getLang.agree }}</div>
        <div>
          <NuxtLink :to="referenceLinks.termsAndConditions">
            {{ getLang.termsAndConditions }}
          </NuxtLink>
          {{ getLang.and }}
          <NuxtLink :to="referenceLinks.privacyStatement">
            {{ getLang.privacyStatement }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SigninWith',
  components: {},
  data () {
    return {
      signinWiths: [
        {
          signinWithIcon: 'Icon-Social-LoginFB.svg',
          signinWithText: 'Facebook',
          signinWithHref: '/'
        },
        {
          signinWithIcon: 'Icon-Social-LoginGoogle.svg',
          signinWithText: 'Google',
          signinWithHref: '/'
        },
        {
          signinWithIcon: 'Icon-Social-LoginYahoo.svg',
          signinWithText: 'Yahoo Japan',
          signinWithHref: '/'
        }
      ],
      referenceLinks: {
        chatConcierge: '/',
        termsAndConditions: '/',
        privacyStatement: '/'
      }
    }
  },
  computed: {
    getLang () {
      return {
        chatConcierge: this.$t('login_signup.chat_concierge'),
        termsAndConditions: this.$t('login_signup.terms_and_conditions'),
        privacyStatement: this.$t('login_signup.privacy_statement'),
        agree: this.$t('login_signup.agree'),
        makeChanges: this.$t('login_signup.make_changes'),
        and: this.$t('login_signup.and')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.signin-with {
  &__header {
    position: relative;

    p {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px 40px;
      background: $white;
      font-size: 12px;
      color: $text-color-blue;
    }
  }

  &__reference-links {
    color: $text-color-blue;
    font-size: 11px;

    a {
      color: $text-color-blue;
      font-weight: bold;
      text-decoration: underline;
      display: inline;
    }
  }
}
</style>
