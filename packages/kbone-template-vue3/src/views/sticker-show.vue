<template>
    <div class="sticker-show">
        <div class="author">
            <div><img :src="sticker?.avatarUrl" class="avatar" /></div>
            <div>{{ sticker?.author }}</div>
        </div>
        <div class="stick">
            <img :src="sticker?.imageUrl" />
        </div>
        <div class="actions">
            <div class="warpper">
                <div class="rank">
                    <van-icon name="fire" />
                    <div class="text">{{ sticker?.rank }}</div>
                </div>
            </div>
            <div class="warpper">
                <div class="like" @click="onLike">
                    <van-icon name="like" />
                    <div class="text">{{ sticker?.like }}</div>
                </div>
            </div>
            <div class="warpper">
                <div class="download" @click="onDownload">
                    <img :src="`${staticUrl}/download_icon.png`" class="van-icon" />
                    <div class="text">下载</div>

                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { isMiniprogram, staticUrl, current } from "@/shared/context";
import { request } from "@/utils";
import type { Sticker } from "@/types";

const props = defineProps<{
    id: string
}>()

const sticker = ref<Sticker>()

const fetchData = async () => {
    const payload = await request.get(`/api/start/stickers/${props.id}`)
    sticker.value = payload.data as Sticker
}

watchEffect(() => {
    fetchData()
})

const onLike = async () => {
    const serialNumber = current.value
    const payload = await request.post(`/api/start/stickers/${props.id}/like`, { serialNumber })
    const success = payload.data as boolean
    if (success) {
        fetchData()
        if (isMiniprogram) {
            wx.showToast({
                title: '点赞成功',
                icon: 'success',
                duration: 2000
            })
        }
    }
}

const onDownload = () => {
    if (isMiniprogram) {
        wx.downloadFile({
            url: sticker.value?.imageUrl || '',
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

</script>
<style lang="less">
.sticker-show {
    width: 100%;
    height: 100%;
    background-attachment: fixed;
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('https://static.tinmusic.com.cn/assets/sticker_show_bg.png');

    .author {
        width: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 120px 0 50px 40px;
        font-weight: bold;
        font-size: 18px;

        img {
            width: 50px;
            border: 1px solid #1f1f1f;
            border-radius: 50%;
        }
    }

    .stick {
        width: 250px;
        height: 250px;
        margin: 0 auto;
        border: 1px solid #1f1f1f;
        border-radius: 15px;
        background-color: #ffcc5e;
        padding: 10px;
        box-shadow: 0 6px 0 0 rgba(0, 0, 0, 6);

        img {
            width: 100%;
            height: 100%;
            border: 1px solid #1f1f1f;
            border-radius: 10px;
        }
    }

    .actions {
        width: 250px;
        margin: 25px auto;
        display: flex;
        align-items: center;

        .warpper {
            flex: auto;
        }


        .rank {
            width: 55px;
            height: 55px;
            margin: 0 auto;
            border: 1px solid #1f1f1f;
            border-radius: 50%;
            background: #ffca5e;
            text-align: center;
            box-shadow: 0 2px 0 0 rgba(0, 0, 0, 1);

            .van-icon {
                font-size: 30px;
                margin-top: 5px;
            }

            .text {
                font-size: 12px;
                font-weight: bold;
                line-height: 5px;
            }
        }

        .like {
            width: 65px;
            height: 65px;
            margin: 0 auto;
            border: 1px solid #1f1f1f;
            border-radius: 50%;
            background: #eb7373;
            text-align: center;
            box-shadow: 0 2px 0 0 rgba(0, 0, 0, 1);

            color: #fff;


            .van-icon {
                font-size: 30px;
                margin-top: 10px;
            }

            .text {
                font-size: 14px;
                font-weight: bold;
                line-height: 14px;
            }
        }

        .download {
            width: 55px;
            height: 55px;
            margin: 0 auto;
            border: 1px solid #1f1f1f;
            border-radius: 50%;
            background: #ffca5e;
            text-align: center;
            box-shadow: 0 2px 0 0 rgba(0, 0, 0, 1);

            .van-icon {
                width: 30px;
                margin-top: 5px;
            }

            .text {
                font-size: 12px;
                font-weight: bold;
                line-height: 5px;
            }
        }
    }
}
</style>
