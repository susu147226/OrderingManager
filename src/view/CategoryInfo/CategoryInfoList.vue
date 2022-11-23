<template>
    <page-view>
        <el-card>
            <template #header>
                <div class="font-bold">餐点分类信息列表</div>
            </template>
            <el-form :model="queryCategoryFormData" :inline="true">
                <el-form-item label="分类名称">
                    <el-input placeholder="请输入分类名称" v-model="queryCategoryFormData.category_name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="queryCategoryData">
                        <el-icon>
                            <Search />
                        </el-icon>
                        <span class="ml-[5px]">查询</span>
                    </el-button>
                    <el-button plain type="success" :icon="CirclePlus"
                        @click="$router.push({ name: 'AddCategoryInfo' })">新增分类</el-button>
                </el-form-item>
            </el-form>
            <div v-loading="isLoading">
                <el-table :data="resData.listData" border stripe max-height="450">
                    <el-table-column label="id" prop="id" align="center"></el-table-column>
                    <el-table-column label="分类名称" prop="category_name" align="center"></el-table-column>
                    <el-table-column label="餐点总数" prop="foodInfoList.length" align="center"></el-table-column>
                    <el-table-column label="添加时间" align="center">
                        <template #default="{ row, column, $index }">
                            {{ formatDataTime(row.create_time) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template #default="{ row }">
                            <el-button type="warning" plain size="small"
                                @click="$router.push({ name: 'EditCategoryInfo', params: { id: row.id } })">
                                <el-icon>
                                    <Edit />
                                </el-icon>
                                <span class="ml-[3px]">编辑</span>
                            </el-button>
                            <el-popconfirm title="你确定要删除吗?" @confirm="deletCurrentItem(row.id)">
                                <template #reference>
                                    <el-button type="danger" plain size="small">
                                        <el-icon>
                                            <Delete />
                                        </el-icon>
                                        <span class="ml-[3px]">删除</span>
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="flex flex-row justify-between items-center mt-[10px]">
                    <div class="text-[14px]">当前第{{ queryCategoryFormData.pageIndex }}页，共{{
                            resData.pageCount
                    }}页，共{{ resData.totalCount }}条
                    </div>
                    <el-pagination background layout="prev, pager, next" :total="resData.totalCount"
                        @current-change="currentChange" />
                </div>
            </div>
        </el-card>
    </page-view>
</template>
<script setup>
import { Search, CirclePlus, Edit, Delete } from "@element-plus/icons-vue";
import API from "@/Utils/API/index.js";
import { reactive, ref } from "vue";
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { formatDataTime } from "@/Utils/DateTimeUtils"
import { ElNotification } from "element-plus";


const router = useRouter();
const isLoading = ref(false);

const queryCategoryFormData = reactive({
    pageIndex: "1",
    category_name: "",
});

const resData = reactive({
    listData: [],
    pageCount: 0,
    totalCount: 0,
});



const queryCategoryData = () => {
    isLoading.value = true;
    API.categoryInfo.getListByPage(queryCategoryFormData)
        .then(res => {
            console.log(res);
            resData.listData = res.listData;
            resData.pageCount = res.pageCount;
            resData.totalCount = res.totalCount;
        }).catch(err => {

        }).finally(() => {
            isLoading.value = false;
        });
};

//页码发生变化
const currentChange = (index) => {
    queryCategoryFormData.pageIndex = index;
    queryCategoryData();
};

//删除操作
const deleteCurrentItem = () => {
    API.categoryInfo.deleteById(id).then(res => {
        ElNotification({
            type: "success",
            title: "删除成功",
            message: "当前餐点信息删除成功"
        });
        queryCategoryData();
    }).catch(err => {
        ElNotification({
            type: "error",
            title: "删除失败",
            message: "当前餐点信息删除失败，请刷新重试或联系超级管理员"
        });
    })
}

onMounted(() => {
    queryCategoryData();
})

</script>
<style scoped>

</style>