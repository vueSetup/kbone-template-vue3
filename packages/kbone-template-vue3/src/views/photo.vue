<template>
    <div class="photo">
        <img :src="`${staticUrl}/photo_top.png`" />
        <div class="container">
            <div class="column" v-for="(item, index) in list" :key="item.id">
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
            </div>
        </div>
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

const container = ref<HTMLElement | null>(null);

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
        window.addEventListener('reachBottom', () => {
            console.log('触底了')
        })
        window.addEventListener('scroll', () => {
            console.log('滚动啦')
        })
        window.addEventListener('wind', () => {
            console.log('滚动啦')
        })
    }
})

</script>
<style lang="less">
.photo {
    height: 100%;
    background-color: #b6effa;
    text-align: center;

    // 纯 CSS 实现瀑布流式排版
    // https://www.jianshu.com/p/36061b977503
    // 关于双列瀑布流布局的优化思考
    // https://cloud.tencent.com/developer/article/2033767
    // 
    // https://zhuanlan.zhihu.com/p/157329149
    .container {
        columns: 2;
        column-gap: 5px;
        margin: 0 20px;

        >.column {
            width: 100%;
            break-inside: avoid;
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