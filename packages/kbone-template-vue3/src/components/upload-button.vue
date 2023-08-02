<template>
    <van-row>
        <van-col span="14" offset="5">
            <img :src="`${staticUrl}/upload_btn.png`" alt="" @click="onChoose" />
        </van-col>
    </van-row>
</template>
<script setup lang="ts">
import { isMiniprogram, staticUrl, current } from "@/shared/context";
// import { upload } from "@/utils/upload";
import { request } from "@/utils";

const emits = defineEmits(['finish'])

const onChoose = () => {
    if (!isMiniprogram) return
    wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album'],
        success(res) {
            // res.tempFilePaths.map((item) => {
            //     console.log(item)
            // })
            if (res.tempFilePaths.length === 1) {
                const url = res.tempFilePaths[0]
                onUpload(url)
            }
        }
    })
}

const onUpload = async (url: string) => {
    if (!isMiniprogram) return
    const serialNumber = current.value
    // const uploader = await upload(serialNumber, url, async (imageUrl) => {
    //     const payload = await request.put(`/api/start/${serialNumber}/stickers`, { imageUrl })
    //     if (payload.data) {
    //         wx.showToast({
    //             title: '表情上传成功',
    //             icon: 'success',
    //             duration: 2000
    //         })
    //         emits('finish', payload.data)
    //     }
    // })
    // uploader.startUpload()
}
</script>