<template>
    <div class="sticker">
        <img :src="`${staticUrl}/sticker_top.png`" />
        <van-row class="list" gutter="10">
            <van-col v-for="(item, index) in list" :key="item.id" span="12">
                <Stick :id="item.id" :rank="index + 1" :like="item.like" :url="item.imageUrl">
                    <template v-slot:extra>
                        <div class="item_extra">
                            <div class="author">
                                <img :src="`${staticUrl}/avatar.png`"> 杨科
                            </div>
                            <div class="like">
                                <div class="icon">
                                    <van-icon name="like" />
                                </div>
                                <div class="number">
                                    {{ item.like }}
                                </div>
                            </div>
                        </div>
                    </template>
                </Stick>
            </van-col>
        </van-row>
        <div class="sticky">
            <Upload @finish="onLoad" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { isMiniprogram, staticUrl } from "@/shared/context";
import Stick from "@/components/stick.vue";
import Upload from "@/components/upload-button.vue";
import { request } from "@/utils";
import type { Sticker } from "@/types";

const list = ref<Sticker[]>([]);

const onLoad = async () => {
    const payload = await request.get('/api/start/stickers');
    list.value = payload.data as Sticker[];
}

watchEffect(() => {
    onLoad()
})

</script>
<style lang="less">
.sticker {
    height: 100%;
    background-color: #b6effa;
    text-align: center;

    .list {
        margin: 0 20px;

        .van-col {
            margin-bottom: 15px;
        }

        .item_extra {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 0 10px;

            .author {
                display: flex;
                align-items: center;
                font-size: 12px;
                width: 90px;

                img {
                    width: 20px;
                    height: 20px;
                    border: 1px solid #1f1f1f;
                    border-radius: 50%;
                    margin-right: 10px;
                }
            }

            .like {
                width: 32px;
                height: 18px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 10px;
                border-radius: 15px;
                background-color: #eb7373;
                color: #ffffff;
                font-size: 12px;
                font-weight: bold;

                .warpper {
                    // justify-content: space-between;
                    // align-items: center;
                    // height: 18px;
                    // padding: 0 15px;
                    // border-radius: 10px;
                    // background-color: #eb7373;
                    // color: #ffffff;
                    // font-size: 12px;
                    // line-height: 18px;
                }
            }
        }
    }

    img {
        width: 100%;
    }

    .sticky {
        position: fixed;
        bottom: 100px;
    }
}
</style>
