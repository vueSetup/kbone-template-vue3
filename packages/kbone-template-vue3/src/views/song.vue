<template>
    <div class="song">
        <van-row style="padding-top: 410px;">
            <van-col span="7" offset="5">
                <img :src="`${staticUrl}/song_btn1.png`" @click="onShow" />
            </van-col>
            <van-col span="7" offset="1">
                <img :src="`${staticUrl}/song_btn2.png`" @click="onDownload" />
            </van-col>
        </van-row>
        <van-row style="padding-top: 120px;">
            <van-col span="14" offset="5">
                <img :src="`${staticUrl}/song_${btn}.png`" alt="" @click="onToggle" />
            </van-col>
        </van-row>
        <div class="source" v-show="show">
            <div class="close">
                <img :src="`${staticUrl}/song_close.png`" @click="onClose" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, watchPostEffect } from 'vue';
import { isMiniprogram, staticUrl, songUrl } from "@/shared/context";

const show = ref<boolean>(false)

const audio = ref<wx.InnerAudioContext | null>(null)
const play = ref<boolean>(true)
const btn = computed(() => play.value ? 'pause' : 'play')

watchPostEffect(() => {
    if (!isMiniprogram) return
    const song = wx.createInnerAudioContext()
    song.src = songUrl
    song.autoplay = true
    song.loop = true
    audio.value = song
})

const onDownload = () => {
    if (isMiniprogram) {
        wx.downloadFile({
            url: songUrl,
            success() {
                wx.showToast({
                    title: '下载成功',
                    icon: 'success',
                    duration: 2000
                })
            }
        })
    }
}

const onToggle = () => {
    if (play.value) {
        audio.value?.pause()
    } else {
        audio.value?.play()
    }
    play.value = !play.value
}

const onShow = () => {
    show.value = true
}

const onClose = () => {
    show.value = false
}

</script>
<style lang="less">
.song {
    width: 100%;
    height: 100%;
    background-attachment: fixed;
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('https://static.tinmusic.com.cn/assets/song_bg.png');

    img {
        width: 100%;
    }

    .source {
        width: 350px;
        height: 530px;
        margin: 12px;
        position: fixed;
        top: 160px;
        // background-attachment: fixed;
        background-position: top;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url('https://static.tinmusic.com.cn/assets/song_source.png');


        .close {
            position: absolute;
            top: -10px;
            right: -10px;
            width: 45px;
        }
    }
}
</style>