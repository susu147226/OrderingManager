<template>
    <page-view class="relative flex flex-row justify-center items-center">
        <img src="../assets/img/卡通狗.jpg" class="absolute w-full h-full -z-10" alt="">
        <div class="login-box bg-pink-100">
            <div class="flex flex-row justify-center items-center py-10">
                <el-icon size="36px">
                    <ElementPlus />
                </el-icon>
                <span class="text-[26px] font-bold ml-8">食客斋 点餐后台</span>
            </div>
            <el-form :model="adminInfo" class="box-border px-20 mt-10" :rules="adminInfoRules" ref="loginFormEl">
                <el-form-item prop="zh">
                    <el-input v-model="adminInfo.zh" placeholder="请输入账号">
                        <template #prepend>账号</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="admin_pwd">
                    <el-input v-model="adminInfo.admin_pwd" type="password" placeholder="请输入账号">
                        <template #prepend>密码</template>
                    </el-input>
                </el-form-item>
                <div class="flex flex-row justify-evenly">
                    <el-button :loading-icon="Loading" :loading="isloading" type="primary" class="text-blue-300"
                        @click="submitLoginForm">
                        {{ isloading ? '正在登录...' : '登录系统' }}
                    </el-button>
                    <el-button type="danger" class="text-pink-600">忘记密码</el-button>
                </div>
            </el-form>
        </div>
    </page-view>
</template>
<script setup>
import { reactive, ref } from "vue";

import { ElementPlus, Loading } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";

import API from "../Utils/API";

import { mainStore } from "../store";

import { useRouter } from "vue-router"

//路由管理对象
const router = useRouter();

const isloading = ref(false);
//创建store
const store = mainStore();

const adminInfo = reactive({
    zh: "13811111111",
    admin_pwd: "123456"
});

//验证规则
const adminInfoRules = {
    zh: [
        { required: true, message: "请输入账号", trigger: "blur" }
    ],
    admin_pwd: [
        { required: true, message: "请输入密码", trigger: "blur" }
    ]
}


const loginFormEl = ref(null);

const submitLoginForm = () => {
    loginFormEl.value.validate(valid => {
        if (valid) {
            console.log("验证成功");
            checkLogin();
        }
        else {
            console.log("验证失败");
        }
    });
};

const checkLogin = () => {
    isloading.value = true;
    API.adminInfo.checkLogin(adminInfo).then(res => {
        console.log(res);
        store.setToken(res.token);
        store.setLoginUserInfo(res.loginUserInfo);

        ElNotification({
            title: "提示",
            message: "登录成功",
            type: "success",
        });

        router.replace({
            name: "DataView"
        });
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        isloading.value = false;
    })
};
</script>
<style scoped lang="scss">
.login-box {
    @apply w-[420px] py-20;
    box-shadow: 0 0 25px 10px #ceecce;
}
</style>