<template>
    <van-row>
        <van-col span="14" offset="5">
            <img :src="`${staticUrl}/${props.button}`" alt="" @click="onChoose" />
        </van-col>
    </van-row>
</template>
<script setup lang="ts">
import { isMiniprogram, staticUrl, current } from "@/shared/context";
// import { upload } from "@/utils/upload";
import { request } from "@/utils";

const emits = defineEmits(['finish'])

const props = defineProps({
    button: {
        type: String,
        default: 'upload_btn.png'
    },
    id: {
        type: Number,
        default: 0
    }
})

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
    const api = props.id ? `/api/start/stickers/${props.id}` : `/api/start/${serialNumber}/stickers`;
    // const uploader = await upload(serialNumber, url, async (imageUrl) => {
    //     const payload = await request.put(api, { imageUrl })
    //     if (payload.data) {
    //         wx.showToast({
    //             title: '表情上传成功',
    //             icon: 'success',
    //             duration: 2000
    //         })
    //         emits('finish', payload.data)
    //     }
    //     if (payload.status === 204) {
    //         wx.showToast({
    //             title: '已上传十个表情',
    //             icon: 'error',
    //             duration: 2000
    //         })
    //     }
    // })
    // uploader.startUpload()
}
</script>