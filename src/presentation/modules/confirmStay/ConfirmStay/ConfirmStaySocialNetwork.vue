<template>
  <section class="confirm-stay-social-network">
    <div class="confirm-stay-social-network__header">
      <p>{{ $t("confirmbooking.share_on") }}:</p>
      <span class="icon-Icon-Close" @click="$_closePopup" />
    </div>
    <div class="confirm-stay-social-network__content">
      <ShareNetwork
        v-for="network in socialNetworkList"
        :key="network.name"
        :network="network.name"
        :url="sharing.url"
        :title="sharing.title"
        :description="sharing.description"
        :quote="sharing.quote"
        :hashtags="sharing.hashtags"
        :twitter-user="sharing.twitterUser"
        class="social-network-block"
      >
        <img
          v-lazy-load
          :data-src="require(`@/assets/images/${network.icon}.svg`)"
          alt
        />
        <p>{{ network.name }}</p>
      </ShareNetwork>
      <div class="social-network-block" @click="$_openMessengerDialog">
        <img
          v-lazy-load
          :data-src="require(`@/assets/images/Icon_Messenger.svg`)"
          alt
        />
        <p>Messenger</p>
      </div>
      <div class="social-network-block" @click="$_openWechatDialog">
        <img
          v-lazy-load
          :data-src="require(`@/assets/images/Icon_Whatsapp.svg`)"
          alt
        />
        <p>Wechat</p>
      </div>
    </div>
    <div class="confirm-stay-social-network__link">
      <img
        v-lazy-load
        :data-src="require('@/assets/images/pdf_small.png')"
        alt
      />
      <button class="m-btn m-btn__white" @click="$_onSavePdf">
        <b-spinner v-if="isPdfLoading" small class="mr-2" />
        {{ $t("confirmbooking.download_pdf") }}
      </button>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import constants from "@/api/constants";

export default Vue.extend({
  name: "ConfirmStaySocialNetwork",
  data() {
    return {
      sharing: {
        url: "",
        title: "",
        description: "",
        quote: "",
        hashtags: "",
        twitterUser: ""
      },
      socialNetworkList: [
        { name: "line", icon: "Icon_Line" },
        { name: "whatsapp", icon: "Icon_Whatsapp" }
      ],
      isPdfLoading: false
    };
  },
  computed: {
    ...mapState({
      isMobile: state => state.general.data.isMobile
    })
  },
  mounted() {
    this.sharing = {
      url: `${constants.domain}${this.$route.fullPath}`,
      title:
        "Say hi to Vite! A brand new, extremely fast development setup for Vue.",
      description:
        'This week, I’d like to introduce you to "Vite", which means "Fast". It’s a brand new development setup created by Evan You.',
      quote: "The hot reload is so fast it's near instant. - Evan You",
      hashtags: "",
      twitterUser: ""
    };

    this.$nuxt.$on("on:PdfLoading", isLoading => {
      this.isPdfLoading = isLoading;
    });
  },
  methods: {
    $_closePopup() {
      this.$emit("closePopupSocialNetwork");
    },

    $_onSavePdf() {
      this.isPdfLoading = true;
      this.$nuxt.$emit("savePdfFile");
    },

    $_openMessengerDialog() {
      const link = this.$route.fullPath;
      const w = 600;
      const h = 500;
      const left = screen.width / 2 - w / 2;
      const top = screen.height / 2 - h / 2;
      if (this.isMobile) {
        window.open(
          "fb-messenger://share?link=" +
            encodeURIComponent(`${constants.domain}${link}`) +
            "&app_id=" +
            encodeURIComponent(constants.fb_app_id)
        );
      } else {
        window.open(
          `https://www.facebook.com/dialog/send?app_id=${constants.fb_app_id}&display=popup&link=${constants.domain}${link}&redirect_uri=${constants.domain}${link}`,
          "",
          `top=${top},
           left=${left},
           width=${w},
           height=${h}`
        );
      }
    },

    $_openWechatDialog() {
      this.$nuxt.$emit("on:OpenWechat");
    }
  }
});
</script>

<style lang="scss" scoped>
.confirm-stay-social-network {
  width: 95%;
  position: absolute;
  padding: 20px;
  top: 62px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 2px;
  border: 1px solid $border-color-gray-2;
  z-index: 10;
  box-shadow: 2px 3px 14px 0 rgba(74, 74, 74, 0.25);

  @include min-sm {
    width: 350px;
    left: 14px;
    transform: translateX(0);
  }

  &::before {
    content: "";
    width: 20px;
    height: 20px;
    left: 50%;
    top: -10px;
    position: absolute;
    z-index: 6;
    background: white;
    transform: rotate(-45deg);
    border-top: 1px solid $border-color-gray-2;
    border-right: 1px solid $border-color-gray-2;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    p {
      font-size: 13px;
      font-weight: bold;
    }
    span {
      color: white;
      opacity: 0.25;
      background-color: #000000;
      font-size: 8px;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 2px;
      cursor: pointer;
    }
  }

  &__content {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .social-network-block {
      border: 1px solid $border-color-gray-2;
      border-radius: 4px;
      width: 70px;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      &:hover {
        background: bisque;
      }
      img {
        width: 32px;
        height: 32px;
        margin-bottom: 7px;
      }
      p {
        font-size: 11px;
        margin-bottom: 0;
        text-transform: capitalize;
        color: black;
      }
    }
  }

  &__link {
    position: relative;
    img {
      position: absolute;
      left: 15px;
      top: 13px;
      width: 20px;
      height: 25px;
      cursor: pointer;
      background: white;
    }
    button {
      width: 100%;
      height: 50px;
    }
  }
}
</style>
