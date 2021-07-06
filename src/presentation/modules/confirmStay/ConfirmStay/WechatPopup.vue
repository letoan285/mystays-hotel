<template>
  <div v-if="isOpenWechat" class="wechat-popup">
    <div class="wechat-popup__close" @click="$_closeWechat">
      <span class="icon-Icon-Close" />
    </div>
    <div class="wechat-popup__input">
      <input v-model="link" type="text">
    </div>
    <div class="wechat-popup__button">
      <button class="button m-btn m-btn__yellow" @click="$_onCopy">
        {{ isCopied ? "Copied" : "Copy URL" }}
      </button>
      <button
        v-if="isCopied"
        class="button m-btn m-btn__blue"
        @click="$_onOpenWechat"
      >
        Open Wechat
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import constants from '@/api/constants'
export default {
  name: 'WechatPopup',
  data () {
    return {
      isOpenWechat: false,
      link: '',
      isCopied: ''
    }
  },
  computed: {
    ...mapState({
      isMobile: state => state.general.data.isMobile
    })
  },
  mounted () {
    this.$nuxt.$on('on:OpenWechat', this.$_openWechatDialog)
  },
  destroyed () {
    this.$scrollBody.enable();
  },
  methods: {
    $_openWechatDialog () {
      const link = this.$route.fullPath
      const w = 600
      const h = 500
      const left = screen.width / 2 - w / 2
      const top = screen.height / 2 - h / 2

      this.link = `${constants.domain}${link}`
      if (this.isMobile) {
        this.$scrollBody.disable();
        this.isOpenWechat = true
      } else {
        window.open(
          `https://api.qrserver.com/v1/create-qr-code/?size=154x154&data=${constants.domain}${link}`,
          '',
          `top=${top},left=${left},width=${w},height=${h}`
        )
      }
    },

    $_closeWechat () {
      this.isOpenWechat = false
      this.isCopied = false
      this.$scrollBody.enable();
    },

    async $_onCopy () {
      try {
        await this.$copyText(this.link)
        this.isCopied = true
      } catch (e) {
        this.isCopied = false
      }
    },

    $_onOpenWechat () {
      window.open('weixin://')
    }
  }
}
</script>

<style lang="scss" scoped>
.wechat-popup {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.82);
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 30;
    background: white;

    span {
      padding: 15px;
    }
  }

  &__input {
    margin-bottom: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    input {
      width: 80%;
      height: 45px;
      outline: none;
      border: none;
      border-radius: 4px;
      padding: 20px;
    }
  }

  &__button {
    width: 100%;
    display: flex;
    justify-content: center;
    button {
      width: 33%;
      padding: 7px 10px;
      /* margin-right: 10px; */
      margin: 0 10px;
    }
  }
}
</style>
