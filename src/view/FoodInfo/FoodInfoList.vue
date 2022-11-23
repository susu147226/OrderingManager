<template>
    <page-view>
        <el-card>
            <template #header>
                <div class="font-bold">餐点列表</div>
            </template>
            <el-form :model="queryFormData" :inline="true">
                <el-form-item label="餐点名称">
                    <el-input placeholder="请输入餐点名称" v-model="queryFormData.food_name"></el-input>
                </el-form-item>
                <el-form-item label="分类名称">
                    <el-input placeholder="请输入分类名称" v-model="queryFormData.category_name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="queryData" :loading="isLoading">
                        <el-icon>
                            <Search />
                        </el-icon>
                        <span class="ml-[5px]">查询</span>
                    </el-button>
                    <el-button plain type="success" :icon="CirclePlus" @click="$router.push({ name: 'AddFoodInfo' })">
                        新增餐点
                    </el-button>
                </el-form-item>
            </el-form>
            <div v-loading="isLoading">
                <!--要展示数据了-->
                <el-table :data="resultData.listData" border stripe max-height="450">
                    <el-table-column label="id" prop="id" width="70" align="center"></el-table-column>
                    <el-table-column label="餐点名称" prop="food_name" width="150" align="center"></el-table-column>
                    <el-table-column label="餐点分类" prop="categoryInfo.category_name" align="center" width="120">
                    </el-table-column>
                    <el-table-column label="价格" prop="price" width="100" align="center"></el-table-column>
                    <el-table-column label="销售数量" prop="saleCount" width="100" align="center"></el-table-column>
                    <el-table-column label="餐点图片" width="120" align="center">
                        <template #default="{ row }">
                            <el-image :src="baseURL + row.food_img" class="w-[60px] h-[60px]" fit="cover"
                                :preview-src-list="[baseURL + row.food_img]" :preview-teleported="true" />
                        </template>
                    </el-table-column>
                    <el-table-column label="餐点简述" align="center">
                        <template #default="{ row, column, $index }">
                            <el-popover placement="top-start" title="餐点详情" width="300" trigger="hover"
                                :content="row.food_desc">
                                <template #reference>
                                    <el-link type="info" :underline="false">
                                        {{ txtEllipsis(row.food_desc, 15) }}
                                    </el-link>
                                </template>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column label="餐点权重" width="330">
                        <template #default="{ row }">
                            <div class="flex flex-row justify-between items-center">
                                <el-slider :min="0" :max="100" :step="0.1" v-model="row.weight" class="w-[250px]"
                                    @change="val => weightChange(val, row.id)" />
                                <span class="ml-[10px] w-[80px] text-[12px]">{{ row.weight }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="170px" align="center">
                        <template #default="{ row }">
                            <el-button type="warning" plain size="small"
                                @click="$router.push({ name: 'EditFoodInfo', params: { id: row.id } })">
                                <el-icon>
                                    <Edit />
                                </el-icon>
                                <span class="ml-[3px]">编辑</span>
                            </el-button>
                            <el-popconfirm title="你确定要删除吗?" @confirm="deleteCurrentItem(row.id)">
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
                <!--页码-->
                <div class="flex flex-row justify-between items-center mt-[10px]">
                    <div class="text-[14px]">当前第{{ queryFormData.pageIndex }}页，共{{
                            resultData.pageCount
                    }}页，共{{ resultData.totalCount }}条
                    </div>
                    <el-pagination background layout="prev, pager, next" :total="resultData.totalCount"
                        @current-change="currentChange" />
                </div>
            </div>
        </el-card>
    </page-view>
</template>
  
<script setup>
import { reactive, ref } from "vue";
import { Search, CirclePlus, Edit, Delete } from "@element-plus/icons-vue";
import API from "@/utils/API/index.js";
import { txtEllipsis } from "@/utils/StringUtils.js";
import { onMounted, inject } from "vue";

const baseURL = inject("baseURL");
const isLoading = ref(false);

const queryFormData = reactive({
    food_name: "",
    category_name: "",
    pageIndex: 1
});

const resultData = reactive({
    listData: [],
    pageCount: 0,
    totalCount: 0
})

//查询操作
const queryData = () => {
    isLoading.value = true;
    API.foodInfo.getListByPage(queryFormData)
        .then(result => {
            resultData.listData = result.listData;
            resultData.pageCount = result.pageCount;
            resultData.totalCount = result.totalCount;
        })
        .finally(() => {
            isLoading.value = false;
        })
}

//页码发生变化
const currentChange = (index) => {
    queryFormData.pageIndex = index;
    queryData();

}

const weightChange = (value, id) => {
    API.foodInfo.setFoodInfoWeight({ id, weight: value });
}

//删除按钮操作
const deleteCurrentItem = (id) => {
    API.foodInfo.deleteById(id)
        .then(result => {
            ElNotification({
                type: "success",
                title: "删除成功",
                message: "当前菜品删除成功"
            });
            queryData();
        })
        .catch(error => {
            ElNotification({
                type: "danger",
                title: "删除失败",
                message: "当前菜品删除失败，请刷新重试或联系管理员"
            });
        })
}
onMounted(() => {
    queryData();
})

</script>
  
<style scoped lang="scss">

</style>