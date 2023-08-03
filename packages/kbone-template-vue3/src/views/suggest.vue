<template>
  <div class="suggest">
    <img src="https://static.tinmusic.com.cn/assets/suggest_top.png" class="brand" />
    <div class="chat-container">
      <img src="https://static.tinmusic.com.cn/assets/suggest_rabbit.png" alt="兔子装饰" />
      <div class="chat">
        <template v-for="item in list" :key="item">
          <div class="chat-item">
            <div class="chat-item-avatar">
              <img :src="item.avatarUrl" />
            </div>
            <div class="chat-item-username">{{ item.author }}</div>
            {{ item.message }}
          </div>
        </template>
      </div>
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
        <TextArea v-model="msg" :max-length="144" :show-counter="true" />
        <van-button class="message-submit" @click="onSubmit">发表</van-button>
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
import { isMiniprogram, staticUrl, current } from '@/shared/context'
import { request } from '@/utils'
import type { Suggest } from '@/types'

const show = ref<boolean>(false)

const list = ref<Suggest[]>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const msg = ref<string>('')

const onLoad = async () => {
  const payload = await request.get('/api/start/suggests')
  list.value = payload.data
  // list.value = []
  // setTimeout(() => {
  //   if (refreshing.value) {
  //     list.value = []
  //     refreshing.value = false
  //   }

  //   for (let i = 0; i < 10; i++) {
  //     // list.value.push('哈哈哈')
  //     list.value.push('发量不变少，发际线不后移，朝九晚五不加班！')
  //   }
  //   loading.value = false

  //   if (list.value.length >= 40) {
  //     finished.value = true
  //   }
  // }, 1000)
}

watchEffect(() => {
  onLoad()
})

const onPost = () => {
  show.value = true
}

const onClose = () => {
  show.value = false
}

const onSubmit = async () => {
  const serialNumber = current.value
  console.log('submit', msg.value)
  const payload = await request.put(`/api/start/suggests/${serialNumber}`, { message: msg.value })
  if (payload.data) {
    show.value = false
    onLoad()
    if (isMiniprogram) {
      wx.showToast({
        title: '已成功许愿',
        icon: 'success',
        duration: 2000
      })
    }
  }
}
</script>
<style lang="less">
.suggest {
  height: 100%;
  background-color: #a6f1fc;

  img {
    width: 100%;
  }

  .sticky {
    position: fixed;
    bottom: 80px;
  }

  .chat-container {
    position: relative;
    box-sizing: border-box;
    min-height: calc(100% - 371px);
    // height: calc(100% - 371px);
    margin: 0 20px;
    padding: 8px 8px 0;
    border: 1px solid #b3a864;
    border-bottom: unset;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    background-color: #ffcb42;

    & > img {
      position: absolute;
      width: 80px;
      top: -35px;
      right: 20px;
      z-index: 99;
    }
  }

  .chat {
    min-height: 100%;
    background-color: #d5fefc;
    border: 1px solid #b3a864;
    border-bottom: unset;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    display: flex;
    flex-direction: column;
    padding: 40px 24px 0;
    overflow: auto;
  }

  .chat-item {
    box-sizing: border-box;
    width: 240px;
    // min-height: 40px;
    border-radius: 16px;
    margin-bottom: 32px;
    position: relative;
    box-shadow: 0 3px 0 0 #252525;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .chat-item:last-child {
    margin-bottom: 64px;
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

  .chat-item-username {
    position: absolute;
    top: 48px;
    width: 42px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    text-align: center;
  }

  .chat-item:nth-child(odd) {
    padding-right: 32px;
    padding-left: 24px;
    background-color: #ffca43;
    align-items: flex-start;

    .chat-item-avatar {
      right: -40px;
    }
    .chat-item-username {
      right: -28px;
    }
  }

  .chat-item:nth-child(even) {
    padding-right: 24px;
    padding-left: 32px;
    background-color: #ffffe9;
    align-self: flex-end;

    .chat-item-avatar {
      left: -40px;
    }
    .chat-item-username {
      left: -32px;
    }
  }

  // .chat-item:nth-child(odd) {
  //   padding-right: 32px;
  //   padding-left: 24px;
  //   background-color: #ffca43;
  //   align-items: flex-start;
  // }

  // .chat-item:nth-of-type(even) {
  //   padding-right: 24px;
  //   padding-left: 32px;
  //   background-color: #ffffe9;
  //   align-self: flex-end;
  // }

  .message {
    margin: 24px;
    position: fixed;
    top: 280px;
    width: calc(100% - 48px);
    border-radius: 6%;
    height: 262px;
    background-color: #ffca43;
    border: 1px solid #252525;
    box-shadow: 0 3px 0 0 #252525;
    box-sizing: border-box;
    padding: 12px;
    z-index: 100;

    &-content {
      position: relative;
      width: 100%;
      height: 100%;
      border: 1px solid #252525;
      border-radius: 6%;
      background-color: #d5fefc;
      overflow: hidden;

      textarea {
        height: 140px;
        padding: 12px;
        background-color: #fff;
        overflow: auto;
        font-size: 16px;
      }
    }

    &-submit {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 64px;
      height: 28px;
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
