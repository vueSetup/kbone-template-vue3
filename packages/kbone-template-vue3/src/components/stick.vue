<template>
    <div class="stick">
        <div class="border">
            <div class="warpper" @click="onShow">
                <img :src="url" />
            </div>
        </div>
        <div class="extra">
            <slot name="extra"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from "vue-router";
const props = defineProps<{
    id: number
    rank: number
    url: string
    like: number
}>();

const router = useRouter();

const onShow = () => {
    router.push(`/sticker/${props.id}`)
}
</script>
<style lang="less">
.stick {
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
    }
}
</style>
