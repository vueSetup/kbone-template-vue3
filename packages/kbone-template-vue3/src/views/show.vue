<template>
    <div class="show">
        <img :src="`${staticUrl}/show_top.png`" />
        <img :src="`${staticUrl}/show_waiting.png`" />
        <!-- 
        <div class="sticky">
            <van-row style="padding-top: 120px;">
                <van-col span="14" offset="5">
                    <img :src="`${staticUrl}/upload_btn.png`" alt="" @click="onChoose" />
                </van-col>
            </van-row>
        </div> -->
    </div>
</template>
<script setup lang="ts">
import { isMiniprogram, staticUrl } from "@/shared/context";

</script>
<style lang="less">
.show {
    height: 100%;
    background-color: #b6effa;
    text-align: center;

    img {
        width: 100%;
    }

    .sticky {
        position: fixed;
        bottom: 100px;
    }
}
</style>