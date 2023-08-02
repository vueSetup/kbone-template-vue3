<template>
  <div class="suggest">
    <img src="https://static.tinmusic.com.cn/assets/suggest_top.png" class="brand" />
    <!-- <img :src="`${staticUrl}/show_waiting.png`" /> -->
    <div class="chat">
      <template v-for="item in list" :key="item">
        <div class="chat-item">
          <div class="chat-item-avatar">
            <img
              src="https://outin-7aeed7622f3111eea2e800163e10ce6c.oss-cn-beijing.aliyuncs.com/image/default/C041A52DDCEF4DF4A994F056896AE511-6-2.png"
            />
          </div>
          {{ item }}
          <!-- <div class="chat-item-content">{{ item }}</div> -->
        </div>
      </template>
    </div>
    <div class="sticky">
      <van-row>
        <van-col span="14" offset="5">
          <img :src="`${staticUrl}/suggest_btn.png`" alt="" @click="onPost" />
        </van-col>
      </van-row>
    </div>
    <div class="message" v-show="show">
      <div class="message-content">
        <TextArea :max-length="144" :show-counter="true" />
        <van-button class="message-submit">发表</van-button>
      </div>
      <div class="message-close">
        <img :src="`${staticUrl}/song_close.png`" @click="onClose" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { TextArea } from 'weui-vue'
import { isMiniprogram, staticUrl } from '@/shared/context'

const show = ref<boolean>(false)

const list = ref<string[]>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const onLoad = () => {
  setTimeout(() => {
    if (refreshing.value) {
      list.value = []
      refreshing.value = false
    }

    for (let i = 0; i < 10; i++) {
      // list.value.push('哈哈哈')
      list.value.push('发量不变少，发际线不后移，朝九晚五不加班！')
    }
    loading.value = false

    if (list.value.length >= 40) {
      finished.value = true
    }
  }, 1000)
}

watchEffect(() => {
  onLoad()
})

const onRefresh = () => {
  finished.value = false
  loading.value = true
  onLoad()
}

const onPost = () => {
  show.value = true
}

const onClose = () => {
  show.value = false
}
</script>
<style lang="less">
.suggest {
  height: 100%;
  background-color: #b6effa;

  img {
    width: 100%;
  }

  .sticky {
    position: fixed;
    bottom: 80px;
  }

  .chat {
    margin-bottom: 15px;
    // background-attachment: fixed;
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url(https://static.tinmusic.com.cn/assets/chat_bg.png);
    display: flex;
    flex-direction: column;
    padding: 40px 48px 0;
  }

  .chat-item {
    box-sizing: border-box;
    width: 240px;
    min-height: 40px;
    border-radius: 16px;
    margin-bottom: 32px;
    position: relative;
    box-shadow: 0 3px 0 0 #252525;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .chat-item-avatar {
    position: absolute;
    top: -20px;
    width: 64px;
    height: 64px;
    border: 1px solid #9f9162;
    border-radius: 50%;
    background-color: #ffca43;
    box-shadow: 0 3px 0 0 #252525;
  }

  .chat-item-avatar img {
    width: 58px;
    height: 58px;
    transform: translate(2px, 2px);
    border-radius: 50%;
    border: 1px solid #9f9162;
  }

  .chat-item:nth-child(odd) .chat-item-avatar {
    right: -40px;
  }

  .chat-item:nth-child(even) .chat-item-avatar {
    left: -40px;
  }

  .chat-item:nth-child(odd) {
    padding-right: 32px;
    padding-left: 24px;
    background-color: #ffca43;
    align-items: flex-start;
  }

  .chat-item:nth-of-type(even) {
    padding-right: 24px;
    padding-left: 32px;
    background-color: #ffffe9;
    align-self: flex-end;
  }

  .message {
    width: 350px;
    height: 150px;
    margin: 24px;
    position: fixed;
    top: 350px;
    width: calc(100% - 48px);
    border-radius: 6%;
    height: 300px;
    background-color: #ffca43;
    border: 1px solid #252525;
    box-shadow: 0 3px 0 0 #252525;
    box-sizing: border-box;
    padding: 12px;

    &-content {
      width: 100%;
      height: 100%;
      border: 1px solid #252525;
      border-radius: 6%;
      background-color: #d5fefc;
      overflow: hidden;

      textarea {
        height: 230px;
        padding: 12px;
        background-color: #fff;
        overflow: auto;
      }
    }

    &-submit {
      background-color: #eb7373;
      border-radius: 20px;
      border: 1px solid #1f1f1f;
      box-shadow: 0 3px 0 0 #252525;
    }

    &-close {
      position: absolute;
      top: -20px;
      right: -20px;
      width: 45px;
    }
  }
}
</style>
