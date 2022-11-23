<template>
    <page-view>
        <el-card>
            <template #header>
                <div class="flex flex-row justify-between">
                    <div class="font-bold">编辑餐点</div>
                    <el-link type="primary" @click="$router.back()">返回列表</el-link>
                </div>
            </template>
            <el-skeleton :rows="6" animated :loading="isLoading">
                <!--表单-->
                <el-form label-width="120px" :model="foodInfoData" :rules="foodInfoDataRules" ref="formEl">
                    <el-form-item label="餐点名称" prop="food_name">
                        <el-input placeholder="请输入餐点名称" v-model="foodInfoData.food_name" />
                    </el-form-item>
                    <el-form-item label="餐点价格" prop="price">
                        <el-input-number :min="0" v-model="foodInfoData.price" />
                    </el-form-item>
                    <el-form-item label="餐点分类" prop="cid">
                        <el-select placeholder="请选择餐点分类" class="w-full" v-model="foodInfoData.cid">
                            <el-option v-for="item in allCategoryInfoList" :key="item.id" :value="item.id"
                                :label="item.category_name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="餐点图片" prop="food_img">
                        <el-upload :action="baseURL + '/foodInfo/uploadFoodImg'"
                            :headers="{ softeem_ele_admin_token: store.token }" name="food_img"
                            class="w-[200px] h-[200px] border border-dashed border-gray-400 flex flex-row justify-center items-center"
                            :before-upload="beforeUpload" :show-file-list="false" :on-success="uploadSuccess">
                            <el-image :src="baseURL + foodInfoData.food_img" v-if="foodInfoData.food_img" fit="contain"
                                class="w-full h-full"></el-image>
                            <el-icon size="65px" color="#808080" v-else>
                                <Picture />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="餐点描述" prop="food_desc">
                        <el-input placeholder="请输入餐点描述信息" type="textarea" :rows="5" v-model="foodInfoData.food_desc" />
                    </el-form-item>
                    <el-form-item label="餐点权重" prop="weight">
                        <div class="w-[350px] flex flex-row items-center">
                            <el-slider v-model="foodInfoData.weight" :min="0" :max="100" :step="0.1" />
                            <el-tag class="w-[30px] ml-10">{{ foodInfoData.weight }}</el-tag>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm" :loading="isSubmiting" :loading-icon="Loading">
                            保存数据
                        </el-button>
                        <el-button type="danger" @click="resetForm">重置表单</el-button>
                    </el-form-item>
                </el-form>
            </el-skeleton>
        </el-card>
    </page-view>
</template>
  
<script setup>
import { Picture, Loading } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { reactive, ref, inject } from "vue";
import API from "@/utils/API/index.js";
import { mainStore } from "../../store/index.js";
import { useRouter, useRoute } from "vue-router";


const store = mainStore();
const baseURL = inject("baseURL");
//路由管理对象
const router = useRouter();
//路由单体对象
const route = useRoute();


//表单上面的数据
const foodInfoData = ref({
    id: "",
    food_name: "",
    price: 0,
    cid: "",
    food_desc: "",
    food_img: "",
    weight: 0
});
//表单验证的规则
const foodInfoDataRules = {
    food_name: [{ required: true, message: "请输入餐点名称", trigger: "blur" }],
    price: [{ required: true, message: "价格不能为空", trigger: "blur" }],
    cid: [{ required: true, message: "请选择餐点分类", trigger: "blur" }],
    food_desc: [{ required: true, message: "请输入餐点的描述信息", trigger: "blur" }],
    food_img: [{ required: true, message: "请选择餐点图片", trigger: "blur" }],
    weight: [{ required: true, message: "请设置餐点的权重", trigger: "blur" }],
}

const isLoading = ref(false);
const findById = () => {
    isLoading.value = true;
    let id = route.params.id;
    API.foodInfo.findById(id)
        .then(result => {
            foodInfoData.value = result;
        })
        .finally(() => {
            isLoading.value = false;
        })
}
findById();


//需要请求接口，获取所有的餐点分类信息
const allCategoryInfoList = ref([]);
API.categoryInfo.getAllList().then(result => allCategoryInfoList.value = result);


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
    foodInfoData.value.food_img = result.data;
}


//提交表单
const formEl = ref(null);
const submitForm = () => {
    //验证表单的数据是否合格
    // console.log(formEl.value)
    formEl.value.validate(valid => {
        //这个valid就是验证的结果
        if (valid) {
            //表单验证成功，我们要提交数据
            updateFoodInfo();
        } else {
            ElNotification({
                type: "warning",
                title: "提示",
                message: "请正确的填写表单的内容"
            })
        }
    });
}

//编写一个方法，用于新增餐点
const isSubmiting = ref(false);
const updateFoodInfo = () => {
    isSubmiting.value = true;
    API.foodInfo.update(foodInfoData.value)
        .then(result => {
            ElNotification({
                type: "success",
                title: "修改成功",
                message: "餐点信息修改成功"
            });
            router.replace({ name: "FoodInfoList" });
        })
        .catch(error => {
            ElNotification({
                type: "success",
                title: "修改失败",
                message: "请重试或联系管理员"
            });
        })
        .finally(() => {
            isSubmiting.value = false;
        });
}

//重置表单

const resetForm = () => {
    // console.log(formEl);
    formEl.value.resetFields();
}

</script>
  
<style scoped lang="scss">
:deep(.el-upload) {
    @apply w-full h-full overflow-hidden;
}
</style>