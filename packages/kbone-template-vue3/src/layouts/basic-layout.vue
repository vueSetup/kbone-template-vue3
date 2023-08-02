<template>
    <Tab>
        <TabBody>
            <router-view />
        </TabBody>
        <TabBar>
            <TabBarItem v-for="tab in tabs" :key="tab.name" @click="to(tab.name)">
                <TabBarIcon>
                    <img :src="tab.icon" />
                </TabBarIcon>
                <TabBarLabel>{{ tab.label }}</TabBarLabel>
            </TabBarItem>
        </TabBar>
    </Tab>
</template>
<script lang="ts" setup>
import { computed, toRaw, watchEffect } from "vue"
import { useRoute, useRouter } from "vue-router"
import {
    Tab,
    TabBody,
    TabBar,
    TabBarItem,
    TabBarIcon,
    TabBarLabel,
} from "weui-vue"
import { tabbar, tabbar_active } from "@/constants"

const data = [
    {
        name: "sticker",
        label: "表情包",
    },
    {
        name: "song",
        label: "司歌学习",
    },
    {
        name: "suggest",
        label: "宁聚许愿墙",
    },
    {
        name: "show",
        label: "照片墙",
    },
    {
        name: "settings",
        label: "我的",
    },
]

const route = useRoute()
const router = useRouter()

const tabs = computed(() =>
    data.map((item) => ({
        ...item,
        icon: route.name?.toString() === item.name ? tabbar_active[item.name] : tabbar[item.name]
    }))
)

const to = (name: string) => router.push(`/${name}`)
</script>
<style lang="less">

</style>