<template>
    <div class="settings">
        <wx-button open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
            <div class="avatar">
                <img :src="avatar" />
            </div>
        </wx-button>
        <div class="name">
            {{ name }}
        </div>
        <div class="title">
            <h4 :class="isSelfShow ? 'active' : ''" @click="onToggle">我的表情包</h4>
            <h4 :class="!isSelfShow ? 'active' : ''" @click="onToggle">表情包素材</h4>
        </div>
        <div v-if="isSelfShow">
            <van-row gutter="10" class="list">
                <van-col span="24" v-if="stickers.length == 0">
                    <van-empty :image="`${staticUrl}/empty-image.png`" image-size="80" description="暂未上传表情" />
                </van-col>
                <van-col v-else v-for="(item, index) in stickers" :key="item.id" span="8">
                    <sticker-card :id="item.id" :rank="index + 1" :like="item.like" :url="item.imageUrl">
                        <template v-slot:extra>
                            <div class="item_extra">
                                <upload-button :id="item.id" action="stickers" imageUrl="settings_upload.png"
                                    @finish="onLoadStickers" />
                            </div>
                        </template>
                    </sticker-card>
                </van-col>
            </van-row>
        </div>
        <div v-else>
            <van-row gutter="10" class="list">
                <van-col v-for="imageUrl in sources" :key="imageUrl" span="8">
                    <stick-source :imageUrl="imageUrl" />
                </van-col>
            </van-row>
        </div>
        <div class="title">
            <h4 class="active">我的照片秀</h4>
        </div>
        <van-row gutter="10" class="list">
            <van-col span="24" v-if="photos.length == 0">
                <van-empty :image="`${staticUrl}/empty-image.png`" image-size="80" description="暂未上传照片" />
            </van-col>
            <van-col v-else v-for="(item, index) in photos" :key="item.id" span="8">
                <sticker-card :id="item.id" :rank="index + 1" :like="item.like" :url="item.imageUrl">
                    <template v-slot:extra>
                        <div class="item_extra">
                            <upload-button :id="item.id" action="photos" imageUrl="settings_upload.png"
                                @finish="onLoadPhotos" />
                        </div>
                    </template>
                </sticker-card>
            </van-col>
        </van-row>
    </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import StickerCard from "@/components/sticker-card.vue";
import StickSource from "@/components/sticker-source.vue";
import UploadButton from "@/components/upload-button.vue";
import { isMiniprogram, staticUrl, current } from "@/shared/context";
import { request } from "@/utils";
import type { Photo, Sticker } from "@/types";
// import { upload } from "@/utils/upload";

const avatar = ref(`${staticUrl}/user-unlogin.png`)
const name = ref(`加载中...`)

const sources = ref<string[]>([]);
const stickers = ref<Sticker[]>([]);
const photos = ref<Photo[]>([]);

const isSelfShow = ref<boolean>(true)

watchEffect(async () => {
    const serialNumber = current.value
    const payload = await request.get(`/api/start/${serialNumber}`)
    const { avatarUrl, name: author } = payload.data as { avatarUrl: string, name: string }
    name.value = author
    if (avatarUrl) {
        avatar.value = avatarUrl
    }
})

const onLoadStickers = async () => {
    const serialNumber = current.value
    const payload = await request.get(`/api/start/${serialNumber}/stickers`);
    stickers.value = payload.data as Sticker[];
}

const onLoadPhotos = async () => {
    const serialNumber = current.value
    const payload = await request.get(`/api/start/${serialNumber}/photos`);
    photos.value = payload.data as Photo[];
}

// 加载表情包素材
watchEffect(async () => {
    for (let i = 1; i <= 19; i++) {
        sources.value.push(`${staticUrl}/stickers/${i}.png`);
    }
})

// 加载我的表情包
watchEffect(async () => {
    await onLoadStickers()
    // if (stickers.value.length === 0) {
    //     isSelfShow.value = false
    // }
})

// 加载我的照片
watchEffect(async () => {
    await onLoadPhotos()
})

const onChooseAvatar = async (e: { detail: Record<string, unknown> }) => {
    console.log('onChooseAvatar', e)
    const { avatarUrl } = e.detail as { avatarUrl: string }
    if (isMiniprogram) {
        const serialNumber = current.value
        // const uploader = await upload(serialNumber, avatarUrl, async (imageUrl) => {
        //     const payload = await request.post(`/api/start/${serialNumber}/avatar`, { imageUrl })
        //     if (payload.data) {
        //         avatar.value = payload.data.avatarUrl
        //         wx.showToast({
        //             title: '头像上传成功',
        //             icon: 'success',
        //             duration: 2000
        //         })
        //     }
        // })
        // uploader.startUpload()
    }
}

const onToggle = () => {
    isSelfShow.value = !isSelfShow.value
}

</script>
<style lang="less">
.settings {
    width: 100%;
    height: 100%;
    background-attachment: fixed;
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('https://static.tinmusic.com.cn/assets/settings_bg.png');

    .title {
        padding: 10px 20px;
        font-size: 16px;
        display: flex;
        justify-content: space-between;

        h4 {
            font-weight: normal;
            color: #333333;

            &.active {
                font-weight: bold;
                color: #c8000a;

                &::before {
                    content: '';
                    position: absolute;
                    width: 6px;
                    height: 24px;
                    margin-left: -10px;
                    background: #c8000a;
                }
            }
        }
    }

    .list {
        margin: 0 20px;

        .van-col {
            margin-bottom: 15px;
        }

        .item_extra {
            img {
                width: 65px;
                padding-top: 25px;
                padding-left: 5px;
            }
        }
    }

    .avatar {
        width: 100px;
        margin: 0 auto;
        padding-top: 100px;


        img {
            width: 100%;
            margin-left: -10px;
            border-radius: 50%;
            border: 10px solid #ffcc5e;
            box-shadow: 0px 0px 15px #1f1f1f;
        }
    }

    .name {
        text-align: center;
        color: #ffffff;
        font-weight: bold;
        width: 150px;
        margin: 5px auto;
        padding: 5px;
        background-color: #eb7373;
        border-radius: 20px;
        border: 1px solid #1f1f1f;
        box-shadow: 0 1px 0 0 rgba(0, 0, 0, 1);
    }
}
</style>