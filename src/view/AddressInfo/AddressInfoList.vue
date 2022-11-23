<template>
    <page-view>
        <el-card>
            <template #header>
                <div class="font-bold">收货地址列表</div>
            </template>
            <el-form :model="queryAddressFormData" :inline="true">
                <el-form-item label="用户昵称">
                    <el-input placeholder="请输入用户昵称" v-model="queryAddressFormData.nickName"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input placeholder="请输入手机号码" v-model="queryAddressFormData.phone"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="queryAddressData">
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
                    <el-table-column prop="id" label="id" align="center" width="80"></el-table-column>
                    <el-table-column prop="userInfo.nickName" label="所属用户" width="100" align="center"></el-table-column>
                    <el-table-column prop="phone" label="手机号" align="center" width="160"></el-table-column>
                    <el-table-column prop="address" label="地址" align="center" width="400"></el-table-column>
                    <el-table-column prop="person_name" label="联系人" align="center"></el-table-column>
                    <el-table-column label="标签" align="center">
                        <template #default="{ row }">
                            <el-tag class="ml-2" type="success">{{ row.tag }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template #default="{ row }">
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
                        当前第{{ queryAddressFormData.pageIndex }}页，共{{ resData.pageCount }}页，共{{ resData.totalCount }}条
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
import { reactive, ref, onMounted } from "vue";
import API from "../../Utils/API";
import { ElNotification } from "element-plus";


const isLoading = ref(false);

const queryAddressFormData = reactive({
    pageIndex: "1",
    nickName: "",
    phone: "",
});

const resData = reactive({
    listData: [],
    pageCount: 0,
    totalCount: 0,
});

const queryAddressData = () => {
    isLoading.value = true;
    API.addressInfo.getListByPage(queryAddressFormData)
        .then(res => {
            console.log(res);
            resData.listData = res.listData;
            resData.pageCount = res.pageCount;
            resData.totalCount = res.totalCount;
        }).catch(err => {

        }).finally(() => {
            isLoading.value = false;
        })
};

const deleteCurrentItem = (id) => {
    API.addressInfo.deleteById(id).then(() => {
        ElNotification({
            type: "success",
            title: "删除成功",
            message: "当前地址信息删除成功"
        });
        queryData();
    }).catch(() => {
        ElNotification({
            type: "error",
            title: "删除失败",
            message: "当前地址信息删除失败,请刷新或者联系管理员"
        })
    })
}

onMounted(() => {
    queryAddressData();
})

const currentChange = (index) => {
    queryAddressFormData.pageIndex = index;
    queryAddressData();
}
</script>
<style scoped lang="scss">

</style>