<template>
    <page-view>
        <el-card>
            <template #header>
                <div class="font-bold">管理员信息列表</div>
            </template>
            <el-form :model="queryAdminFormData" :inline="true">
                <el-form-item label="姓名">
                    <el-input placeholder="请输入姓名" v-model="queryAdminFormData.admin_name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="value" :v-model="queryAdminFormData.admin_sex" class="m-2" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input placeholder="请输入手机号码" v-model="queryAdminFormData.admin_tel"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input placeholder="请输入邮箱" v-model="queryAdminFormData.admin_email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="queryAdminData">
                        <el-icon>
                            <Search />
                        </el-icon>
                        <span class="ml-[3px]">查询</span>
                    </el-button>
                    <el-button plain type="success" :icon="CirclePlus" @click="$router.push({ name: 'AddAdminInfo' })">
                        新增</el-button>
                </el-form-item>
            </el-form>
            <div v-loading="isLoading">
                <el-table :data="resData.listData" border stripe max-height="450">
                    <el-table-column prop="id" label="id" align="center" width="80"></el-table-column>
                    <el-table-column prop="admin_name" label="姓名" align="center" width="120"></el-table-column>
                    <el-table-column label="性别" align="center" width="90">
                        <template #default="{ row }">
                            <el-tag type="danger" v-if="row.admin_sex == '女'">{{ row.admin_sex }}</el-tag>
                            <el-tag type="primary" v-else>{{ row.admin_sex }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="admin_tel" label="手机号" align="center" width="180"></el-table-column>
                    <el-table-column label="邮箱" align="center" width="250">
                        <template #default="{ row }">
                            <el-link type="primary">
                                {{ row.admin_email }}
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="头像" align="center" width="220">
                        <template #default="{ row }">
                            <el-image :src="baseURL + row.admin_photo" class="w-[80px] h-[60px]" fit="cover"
                                :preview-src-list="[baseURL + row.user_photo]" :preview-teleported="true" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="admin_type" label="类型" align="center">
                        <template #default="{ row }">
                            <el-tag type="primary" v-if="row.admin_type == '0'">普通管理员</el-tag>
                            <el-tag type="danger" v-else>超级管理员</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template #default>
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
                <div class="flex flex-row justify-between items-center mt-[10px]">
                    <div class="text-[14px]">
                        当前第{{ queryAdminFormData.pageIndex }}页，共{{ resData.pageCount }}页，共{{ resData.totalCount }}条
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

const queryAdminFormData = reactive({
    pageIndex: "1",
    admin_name: "",
    admin_sex: "",
    admin_tel: "",
    admin_email: "",
});

const resData = reactive({
    listData: [],
    pageCount: 0,
    totalCount: 0,
});

const queryAdminData = () => {
    isLoading.value = true;
    API.adminInfo.getListByPage(queryAdminFormData)
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

const deleteCurrentItem = (id) => {
    API.adminInfo.deleteById(id)
        .then(result => {
            ElNotification({
                type: "success",
                title: "删除成功",
                message: "管理员信息删除成功"
            });
            queryData();
        })
        .catch(error => {
            ElNotification({
                type: "danger",
                title: "删除失败",
                message: "管理员信息删除失败，请刷新重试或联系管理员"
            });
        })
}

onMounted(() => {
    queryAdminData();
})

const currentChange = (index) => {
    queryAdminFormData.pageIndex = index;
    queryAdminData();
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