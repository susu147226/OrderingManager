<template>
    <page-view>
        <el-card>
            <template #header>
                <div class="font-bold">编辑菜品分类</div>
            </template>
            <el-form ref="formEl" :model="categoryInfodata" :rules="categoryInfodataRules">
                <el-form-item label="分类名称" prop="category_name">
                    <el-input v-model="categoryInfodata.category_name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" plain @click="submitForm" :loading="isSubmiting" :loading-icon="Loading">
                        保存数据</el-button>
                    <el-button type="warning" plain @click="resetForm">重置表单</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </page-view>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { ElNotification } from "element-plus";
import { Loading } from "@element-plus/icons-vue"
import { useRouter, useRoute } from "vue-router";
import API from "@/Utils/API";

const router = useRouter();
const route = useRoute();

const categoryInfodata = ref({
    id: "",
    category_name: "",
});

const categoryInfodataRules = {
    category_name: [{
        required: true,
        message: "请编辑分类名称",
        trigger: "blur"
    }],
};

// const isLoading = ref(false);
// const findById = () => {
//     isLoading.value = true;
//     let id = route.params.id;
//     API.categoryInfo.findById(id).then(res => {
//         categoryInfodata.value = res;
//     }).finally(() => {
//         isLoading.value = false;
//     })
// }
// findById();

//编辑餐点分类
const isSubmiting = ref(false);
const EditCategoryInfo = () => {
    isSubmiting.value = true;
    API.categoryInfo.add(categoryInfodata).then(res => {
        ElNotification({
            type: "success",
            title: "提示",
            message: "编辑餐点分类成功"
        });
        router.replace({ name: "CategoryInfoList" })
    }).catch(err => {
        ElNotification({
            type: "error",
            title: "提示",
            message: "编辑餐点分类失败，请重试或联系超级管理员"
        });
        console.log(err);
    }).finally(() => {
        isSubmiting.value = false;
    });
};

//提交表单
const formEl = ref(null)
const submitForm = () => {
    formEl.value.validate(valid => {
        if (valid) {
            EditCategoryInfo();
        } else {
            ElNotification({
                type: "warning",
                title: "提示",
                message: "请检查表单内容是否填写正确"
            });
        }
    });
};

//重置表单
const resetForm = () => {
    formEl.value.resetFields();
}
</script>
<style scoped>

</style>