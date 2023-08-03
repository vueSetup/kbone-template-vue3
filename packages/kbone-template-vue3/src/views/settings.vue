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
                <van-col span="24" v-if="list.length == 0">
                    <van-empty :image="`${staticUrl}/empty-image.png`" image-size="80" description="暂未上传表情" />
                </van-col>
                <van-col v-else v-for="(item, index) in list" :key="item.id" span="8">
                    <Stick :id="item.id" :rank="index + 1" :like="item.like" :url="item.imageUrl">
                        <template v-slot:extra>
                            <div class="item_extra">
                                <Upload :id="item.id" button="settings_upload.png" @finish="onLoad" />
                            </div>
                        </template>
                    </Stick>
                </van-col>
            </van-row>
        </div>
        <div v-else>
            <van-row gutter="10" class="list">
                <van-col v-for="imageUrl in copies" :key="imageUrl" span="8">
                    <StickCopy :imageUrl="imageUrl" />
                </van-col>
            </van-row>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import Stick from "@/components/stick.vue";
import StickCopy from "@/components/stick-copy.vue";
import Upload from "@/components/upload-button.vue";
import { isMiniprogram, staticUrl, current } from "@/shared/context";
import { request } from "@/utils";
import type { Sticker } from "@/types";
// import { upload } from "@/utils/upload";

const avatar = ref(`${staticUrl}/user-unlogin.png`)
const name = ref(`加载中...`)

const list = ref<Sticker[]>([]);
const copies = ref<string[]>([]);

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

const onLoad = async () => {
    const serialNumber = current.value
    const payload = await request.get(`/api/start/${serialNumber}/stickers`);
    list.value = payload.data as Sticker[];
}

// 加载我的表情包
watchEffect(async () => {
    await onLoad()
    if (list.value.length === 0) {
        isSelfShow.value = false
    }
})

// 加载表情包素材
watchEffect(async () => {
    for (let i = 1; i <= 19; i++) {
        copies.value.push(`${staticUrl}/stickers/${i}.png`);
    }
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

            &.active {
                font-weight: bold;
                color: #1f1f1f;
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