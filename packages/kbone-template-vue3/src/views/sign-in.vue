<template>
    <div class="sign-in">
        <div class="form">
            <CellsTitle>员工编号</CellsTitle>
            <Form>
                <FormCell>
                    <CellBody>
                        <Input type="number" placeholder="请输入员工编号" v-model="state.serialNumber" />
                    </CellBody>
                </FormCell>
            </Form>
            <CellsTitle>手机尾号</CellsTitle>
            <Form>
                <FormCell>
                    <CellBody>
                        <Input type="number" placeholder="请输入手机尾号后四位" v-model="state.phoneNumber" />
                    </CellBody>
                </FormCell>
            </Form>
            <van-button round block type="success" @click="login">登录</van-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { CellsTitle, CellBody, Form, FormCell, Input } from "weui-vue";
import { isMiniprogram, current } from "@/shared/context";
import { request } from "@/utils";

const state = reactive<{
    serialNumber?: string,
    phoneNumber?: string
}>({})

const router = useRouter()

const login = async () => {
    const payload = await request.post('/api/signin/login', { ...state })
    const success = payload.data as boolean
    if (success) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        current.value = state.serialNumber!
        router.push('sticker')
    } else {
        if (!isMiniprogram) return
        wx.showToast({
            title: '登录失败',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            icon: 'error',
            duration: 2000
        })
    }
}
</script>
<style lang="less">
.sign-in {
    width: 100%;
    height: 100%;
    background-attachment: fixed;
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('https://static.tinmusic.com.cn/assets/sign-in_bg.png');

    .form {
        padding-top: 420px;
        margin-left: 50px;
        margin-right: 50px;

        .weui-cells__title {
            color: #ffffff;
            font-weight: bold;
            padding-left: 0;
        }

        .weui-cells {
            background-color: transparent;

            .weui-cell {
                border: 1px solid #8c8c8c;
                border-radius: 15px;
                padding: 10px 10px 5px 10px;
                font-size: 14px;
                background-color: #ffffff;
            }
        }

        .van-button {
            margin-top: 20px;
            font-size: 18px;
            font-weight: bold;
        }
    }


}
</style>