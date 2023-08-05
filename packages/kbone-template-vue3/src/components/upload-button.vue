<template>
    <van-row>
        <van-col span="14" offset="5">
            <img :src="`${staticUrl}/${props.imageUrl}`" alt="" @click="onChoose" />
        </van-col>
    </van-row>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { isMiniprogram, staticUrl, current } from "@/shared/context";
import { request } from "@/utils";
// import { upload } from "@/utils/upload";

const emits = defineEmits(['finish'])

const props = defineProps({
    action: {
        type: String,
        default: 'stickers'
    },
    imageUrl: {
        type: String,
        default: 'upload_btn.png'
    },
    id: {
        type: Number,
        default: 0
    }
})

const successMessage = computed(() => props.action === 'stickers' ? '表情上传成功' : '照片上传成功')
const errorMessage = computed(() => props.action === 'stickers' ? '已上传十个表情' : '已上传三张照片')

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
    const api = props.id ? `/api/start/${props.action}/${props.id}` : `/api/start/${serialNumber}/${props.action}`;
    // const uploader = await upload(serialNumber, url, async (imageUrl) => {
    //     const payload = await request.put(api, { imageUrl })
    //     if (payload.data) {
    //         wx.showToast({
    //             title: successMessage.value,
    //             icon: 'success',
    //             duration: 2000
    //         })
    //         emits('finish', payload.data)
    //     }
    //     if (payload.status === 204) {
    //         wx.showToast({
    //             title: errorMessage.value,
    //             icon: 'error',
    //             duration: 2000
    //         })
    //     }
    // })
    // uploader.startUpload()
}
</script>