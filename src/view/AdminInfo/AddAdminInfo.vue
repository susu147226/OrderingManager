<template>
    <page-view>
        <el-card>
            <template #header>
                <div class="flex flex-row justify-between">
                    <div class="font-bold">新增管理员</div>
                    <el-link type="primary" @click="$router.replace({ name: 'AdminInfoList' })">返回列表</el-link>
                </div>
            </template>
            <!-- 表单 -->
            <el-form label-width="120px" :model="adminInfoData" :rules="adminInfoDataRules" ref="formEl">
                <el-form-item label="管理员姓名" prop="admin_name">
                    <el-input placeholder="请输入管理员名称" v-model="adminInfoData.admin_name" />
                </el-form-item>
                <el-form-item label="管理员密码" prop="admin_pwd">
                    <el-input type="password" placeholder="请输入管理员密码" v-model="adminInfoData.admin_pwd" />
                </el-form-item>
                <el-form-item label="管理员性别" prop="admin_sex">
                    <el-select placeholder="请选择性别" class="w-full" v-model="adminInfoData.admin_sex">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="管理员手机号" prop="admin_tel">
                    <el-input placeholder="请输入管理员手机号" v-model="adminInfoData.admin_tel" />
                </el-form-item>
                <el-form-item label="管理员邮箱" prop="admin_email">
                    <el-input placeholder="请输入管理员邮箱" v-model="adminInfoData.admin_email" />
                </el-form-item>
                <el-form-item label="管理员头像" prop="admin_photo">
                    <el-upload v-loading="isUploadingImg" element-loading-text="正在上传图片"
                        :action="baseURL + '/adminInfo/uploadAdminPhoto'"
                        :headers="{ softeem_ele_admin_token: store.token }" name="admin_photo"
                        class="w-[200px] h-[200px] border border-dashed border-gray-400 flex flex-row justify-center items-center"
                        :before-upload="beforeUpload" :show-file-list="false" :on-success="uploadSuccess">
                        <el-image :src="baseURL + adminInfoData.admin_photo" v-if="adminInfoData.admin_photo"
                            fit="contain" class="w-full h-full" lazy>
                            <template #placeholder>
                                <div
                                    class="text-primaryColor text-[14px] w-full h-full flex flex-row justify-center items-center">
                                    正在加载图片...
                                </div>
                            </template>
                        </el-image>
                        <el-icon size="65px" color="lightgray" v-else>
                            <Picture />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="管理员类型" prop="admin_type">
                    <el-radio-group v-model="adminInfoData.admin_type">
                        <el-radio label="0" name="type">普通管理员</el-radio>
                        <el-radio label="1" name="type">超级管理员</el-radio>
                    </el-radio-group>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="submitForm" :loading="isSubmiting" :loading-icon="Loading">
                        保存数据
                    </el-button>
                    <el-button type="danger" plain @click="resetForm">重置表单</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </page-view>

</template>

<script setup>
import { Picture, Loading } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { reactive, ref, inject } from "vue";
import API from "@/utils/API/index.js";
import { mainStore } from "../../store/index.js";
import { useRouter } from "vue-router";




const store = mainStore();
const baseURL = inject("baseURL");
const router = useRouter();
//表单上面的数据
const adminInfoData = reactive({
    admin_name: "",
    admin_pwd: "",
    admin_sex: "",
    admin_tel: "",
    admin_email: "",
    admin_photo: "",
    admin_type: "",
});

//表单验证的规则
const adminInfoDataRules = {
    admin_name: [{
        required: true,
        message: "请输入管理员姓名",
        trigger: "blur"
    }],
    admin_pwd: [{
        required: true,
        message: "密码不能为空",
        trigger: "blur"
    }],
    admin_sex: [{
        required: true,
        message: "请选择管理员性别",
        trigger: "blur"
    }],
    admin_tel: [{
        required: true,
        regexp: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
        message: "请输入管理员的手机号",
        trigger: "blur"
    }],
    admin_email: [{
        required: true,
        regexp: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
        message: "请输入管理员邮箱",
        trigger: "blur"
    }],
    admin_photo: [{
        required: true,
        message: "请选择图片",
        trigger: "blur",
    }],
    admin_type: [{
        required: true,
        message: "请选择管理员类型",
        trigger: "blur"
    }],
};

//开始上传图片之前的操作
const isUploadingImg = ref(false);
const beforeUpload = (rawFile) => {
    let reg = /^image\/(jpe?g|png|webp|gif|bmp)$/;
    if (reg.test(rawFile.type)) {
        //说明是个图片
        if (rawFile.size / 1024 / 1024 > 5) {
            //说明图片大于5M
            ElNotification({
                type: "error",
                title: "错误",
                message: "图片的大小不能大于5M"
            });
            return false;
        } else {
            //开始上传了
            isUploadingImg.value = true;
        }
    } else {
        //说明不是一个图片
        ElNotification({
            type: "error",
            title: "错误",
            message: "请选择图片文件，图片格式必须是jpg,jpeg,png,webp,gif,bmp格式"
        });
        return false;
    }
}

const uploadSuccess = (result) => {
    console.log(result)
    adminInfoData.admin_photo = result.data;
    isUploadingImg.value = false;
}

//提交表单
const formEl = ref(null);
const submitForm = () => {
    //验证表单的数据是否合格
    // console.log(formEl.value)
    formEl.value.validate(valid => {
        //这个valid就是验证的结果
        if (valid) {
            //表单验证成功，要提交数据
            addAdminInfo();
        } else {
            ElNotification({
                type: "warning",
                title: "提示",
                message: "请正确的填写表单的内容"
            })
        }
    });
}


//编写一个方法，用于新增菜品
const isSubmiting = ref(false);
const addAdminInfo = () => {
    isSubmiting.value = true;
    API.adminInfo.add(adminInfoData)
        .then(result => {
            ElNotification({
                type: "success",
                title: "提示",
                message: "新增管理员成功"
            });
            router.replace({ name: "AdminInfoList" });


        }).catch(error => {
            ElNotification({
                type: "danger",
                title: "失败",
                message: "新增管理员失败，请重试或联系管理员"
            });
            console.log(error);
        }).finally(() => {
            isSubmiting.value = false;
        })
}


//重置表单
const resetForm = () => {
    // console.log(formEl);
    formEl.value.resetFields();
}

</script>

<style>

</style>