<template>
  <div class="header-dropdown__language">
    <div
      v-for="language in languages"
      :key="language.alt"
      class="header-dropdown__language-wrapper"
      @click="changeLanguage(language)"
    >
      <img v-lazy-load :data-alt="language.alt" :src="language.flag">
      <span>{{ language.text }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import Utilities from '../../../../../shared/helper/utilities'
import { Languages } from '../../../../../shared/constants'
import { ILanguage } from '../../../../../shared/interfaces/common/locale'

interface ILanguageDropdown {
  languageAlt: string;
  languageSrc: string;
  languageText: string;
}

export default Vue.extend({
  data () {
    return {
      languages: Languages
    }
  },
  methods: {
    ...mapActions({
      handleChangeLanguage: 'general/changeLanguage'
    }),
    changeLanguage (lang: ILanguage) {
      // this.handleChangeLanguage(lang.lang);

      if (this.$i18n.locale !== lang.code) {
        this.$i18n.locale = lang.code

        // get full path url
        const fullPath = this.$route.fullPath
        const fullPathArr = fullPath.split('/')
        const currentLang = fullPathArr[1]
        const checkLang: any = Utilities.getLocale(currentLang) // current lang
        // check current lang from here
        if (checkLang.value === lang.value) {
          return
        }

        const currentPrefix = checkLang.prefix
        const nextPrefix = lang.prefix
        const newPath = fullPath.replace(`${currentPrefix}`, nextPrefix)
        this.$router.push(`${newPath}`)
      }

      this.$emit('clickItem')
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header-dropdown__language {
  min-width: 110px;

  @include min-md {
    min-width: 130px;
  }

  &-wrapper {
    display: flex;
    padding: 7px 13px;
    font-size: 13px;
    cursor: pointer;

    &:hover {
      background: $bg-color-gray-5;
      cursor: pointer;
    }

    img {
      margin-right: 5px;
    }
  }
}
</style>
