<template>
   <div class="suggest">
      <img src="https://static.tinmusic.com.cn/assets/suggest_top.png" class="brand" />
      <!-- <img :src="`${staticUrl}/show_waiting.png`" /> -->
      <div class="chat">
         <div v-for="item in list" :key="item">
            <span>{{ item }}</span>
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
         <TextArea :max-length="144" :show-counter="true" />
         <van-button>发表</van-button>
         <div class="close">
            <img :src="`${staticUrl}/song_close.png`" @click="onClose" />
         </div>
      </div>
   </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { TextArea } from "weui-vue";
import { isMiniprogram, staticUrl } from "@/shared/context";

const show = ref<boolean>(false)

const list = ref<number[]>([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = () => {
   setTimeout(() => {
      if (refreshing.value) {
         list.value = [];
         refreshing.value = false;
      }

      for (let i = 0; i < 10; i++) {
         list.value.push(list.value.length + 1);
      }
      loading.value = false;

      if (list.value.length >= 40) {
         finished.value = true;
      }
   }, 1000);
};

watchEffect(() => { onLoad() })

const onRefresh = () => {
   finished.value = false;
   loading.value = true;
   onLoad();
};

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
      bottom: 100px;
   }

   .chat {
      margin-bottom: 15px;
      // background-attachment: fixed;
      background-position: top;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url(https://static.tinmusic.com.cn/assets/chat_bg.png);
   }

   .message {
      width: 350px;
      height: 150px;
      margin: 12px;
      position: fixed;
      top: 350px;
      background-position: top;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url('https://static.tinmusic.com.cn/assets/message_source.png');

      div {
         padding: 15px 25px;

         textarea {
            height: 150px;
         }
      }

      .close {
         position: absolute;
         top: -40px;
         right: -40px;
         width: 45px;
      }
   }
}
</style>