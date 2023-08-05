<template>
    <div class="sticker_source">
        <div class="border">
            <div class="warpper" @click="onPreview">
                <img :src="imageUrl" />
            </div>
        </div>
        <div class="extra">
            <van-button type="warning" size="mini" @click="onDownload">下载素材</van-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { isMiniprogram } from "@/shared/context";

const props = defineProps<{
    imageUrl: string
}>();

const onPreview = ()=>{
    if (isMiniprogram) {
        wx.previewImage({
            urls: [props.imageUrl]
        })
    }
}

const onDownload = () => {
    if (isMiniprogram) {
        wx.showLoading({
            title: '下载中...',
            mask: true
        })
        wx.downloadFile({
            url: props.imageUrl,
            success({ tempFilePath }: { tempFilePath: string }) {
                wx.hideLoading()
                wx.saveImageToPhotosAlbum({
                    filePath: tempFilePath,
                    success() {
                        wx.showToast({
                            title: '已保存至相册',
                            icon: 'success',
                            duration: 2000
                        })
                    },
                    fail() {
                        wx.showToast({
                            title: '保存失败',
                            icon: 'error',
                            duration: 2000
                        })
                    }
                })
            }
        })
    }
}
</script>
<style lang="less">
.sticker_source {
    border: 1px solid #1f1f1f;
    border-radius: 15px;
    background-color: #ffcc5e;
    box-shadow: 0 2px 0 0 rgba(0, 0, 0, 5);

    .border {
        width: 100%;
        position: relative;

        &:after {
            content: '';
            display: block;
            padding-bottom: 100%;
        }

        .warpper {
            position: absolute;
            width: 100%;
            height: 100%;

            img {
                width: 90%;
                height: 90%;
                border-radius: 5px;
                margin: 7px 5px 0 5px;
            }
        }
    }

    .extra {
        height: 50px;
        border-top: 1px solid #1f1f1f;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
