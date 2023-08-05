<template>
    <div class="photo">
        <img :src="`${staticUrl}/photo_top.png`" />
        <van-row class="list" gutter="10">
            <van-col v-for="(item, index) in list" :key="item.id" span="12">
                <photo-card :id="item.id" :rank="index + 1" :like="item.like" :url="item.imageUrl">
                    <template v-slot:extra>
                        <div class="item_extra">
                            <div class="author">
                                <img :src="item.avatarUrl"> {{ item.author }}
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
                </photo-card>
            </van-col>
        </van-row>
        <div class="sticky">
            <upload-button @finish="onLoad" action="photos" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { isMiniprogram, staticUrl } from "@/shared/context";
import PhotoCard from "@/components/photo-card.vue";
import UploadButton from "@/components/upload-button.vue";
import { request } from "@/utils";
import type { Photo } from "@/types";

const list = ref<Photo[]>([]);

const onLoad = async () => {
    const payload = await request.get('/api/start/photos');
    list.value = payload.data as Photo[];
}

watchEffect(() => {
    onLoad()
})

watchEffect(() => {
    if (isMiniprogram) {
        console.log('可以在这里写wx.xxx的代码')
    }
})

</script>
<style lang="less">
.photo {
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