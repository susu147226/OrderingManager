<template>
    <page-view>
        <el-card>
            <template #header>
                <div class="font-bold">用户信息列表</div>
            </template>
            <el-form :model="queryCustomFormData" :inline="true">
                <el-form-item label="用户昵称">
                    <el-input placeholder="请输入用户昵称" v-model="queryCustomFormData.nickName"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="value" :v-model="queryCustomFormData.user_sex" class="m-2" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input placeholder="请输入手机号码" v-model="queryCustomFormData.user_phone"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="queryCustomData">
                        <el-icon>
                            <Search />
                        </el-icon>
                        <span class="ml-[5px]">查询</span>
                    </el-button>
                    <el-button plain type="success" :icon="CirclePlus">新增分类</el-button>
                </el-form-item>
            </el-form>
            <div v-loading="isLoading">
                <el-table :data="resData.listData" border stripe max-height="450">
                    <el-table-column prop="id" label="id" align="center" width="100"></el-table-column>
                    <el-table-column prop="nickName" label="昵称" align="center" width="140"></el-table-column>
                    <el-table-column label="头像" align="center" width="160">
                        <template #default="{ row }">
                            <el-image :src="baseURL + row.user_photo" class="w-[60px] h-[60px]" fit="cover"
                                :preview-src-list="[baseURL + row.user_photo]" :preview-teleported="true" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="user_sex" label="性别" align="center" width="100"></el-table-column>
                    <el-table-column prop="user_phone" label="手机号" align="center" width="240"></el-table-column>
                    <el-table-column prop="user_email" label="邮箱" align="center" width="300"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template #default="{ row }">
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
                    <div class="text-[14px]">
                        当前第{{ queryCustomFormData.pageIndex }}页，共{{ resData.pageCount }}页，共{{ resData.totalCount }}条
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
import { ref, reactive, onMounted, inject } from 'vue'
import API from "../../Utils/API";

const isLoading = ref(false);
const baseURL = inject("baseURL");

const queryCustomFormData = reactive({
    pageIndex: "1",
    nickName: "",
    user_phone: "",
    user_sex: "",
});

const resData = reactive({
    listData: [],
    pageCount: 0,
    totalCount: 0,
});

const queryCustomData = () => {
    isLoading.value = true;
    API.customerInfo.getListByPage(queryCustomFormData)
        .then(res => {
            console.log(res);
            resData.listData = res.listData;
            resData.pageCount = res.pageCount;
            resData.totalCount = res.totalCount;
        }).catch(err => {

        }).finally(() => {
            isLoading.value = false;
        })
}

onMounted(() => {
    queryCustomData();
})

const deletCurrentItem = (id) => {
    API.customerInfo.deleteById(id).then(() => {
        ElNotification({
            type: "success",
            title: "删除成功",
            message: "当前用户信息删除成功"
        });
        queryData()
    }).catch(() => {
        ElNotification({
            type: "error",
            title: "删除失败",
            message: "当前用户信息删除失败,请刷新或者联系管理员"
        })
    })
}

const currentChange = (index) => {
    queryCustomFormData.pageIndex = index;
    queryCustomData();
}

const value = ref("");
//性别选择框
const options = [
    {
        value: '男',
        label: '男',
    },
    {
        value: '女',
        label: '女',
    },
]
</script>
<style scoped lang="scss">

</style>