<template>
    <page-view>
        <el-card>
            <template #header>
                <div class="font-bold">评论列表</div>
            </template>
            <el-form :model="queryCommentFormData" :inline="true">
                <el-form-item label="菜品名称">
                    <el-input placeholder="请输入菜品名称" v-model="queryCommentFormData.food_name"></el-input>
                </el-form-item>
                <el-form-item label="评论时间">
                    <el-form-item label="时间">
                        <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期" :size="size" />
                    </el-form-item>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="queryCommentData">
                        <el-icon>
                            <Search />
                        </el-icon>
                        <span class="ml-[5px]">查询</span>
                    </el-button>
                </el-form-item>
            </el-form>
            <div v-loading="isLoading">
                <el-table :data="resData.listData" border stripe max-height="450">
                    <el-table-column prop="id" label="id" align="center" width="70"></el-table-column>
                    <el-table-column prop="foodInfo.food_name" label="餐点名称" width="150" align="center">
                    </el-table-column>
                    <el-table-column label="评论时间" align="center" width="200">
                        <template #default="{ row }">
                            {{ formatDataTime(row.create_time) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="userInfo.nickName" label="用户" align="center" width="100"></el-table-column>
                    <el-table-column label="评论内容" align="center" width="280">
                        <template #default="{ row }">
                            <el-link type="primary" @click="open = true">
                                {{ txtEllipsis(row.comment_text) }}
                                <el-icon size="18px" class="ml-5">
                                    <View />
                                </el-icon>
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="星级" align="center" width="175">
                        <template #default="{ row }">
                            <el-rate v-model="row.star" disabled="true" :texts="['1分', '2分', '3分', '4分', '5分']"
                                show-text />
                        </template>
                    </el-table-column>
                    <el-table-column prop="isShow" label="是否显示" align="center" width="120">
                        <template #default="{ row }">
                            <el-switch v-model="row.isShow" class="mb-2" :active-text="row.isShow ? '显示' : '不显示'"
                                inactive-color="#f00" />
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
                    <el-drawer v-model="open" direction="rtl" size="30%" :append-to-body="true">
                        <template #default>
                            <el-table :data="resData.listData" border stripe>
                                <el-table-column prop="foodInfo.food.name" label="餐点名称"></el-table-column>
                                <el-table-column prop="foodInfo.price" label="价格"></el-table-column>
                                <el-table-column prop="comment_time" label="评论时间"></el-table-column>
                                <el-table-column prop="userInfo.nickName" label="客户昵称"></el-table-column>
                                <el-table-column prop="userInfo.user_sex" label="性别"></el-table-column>
                                <el-table-column prop="userInfo.user_phone" label="手机号"></el-table-column>
                                <el-table-column prop="userInfo.user_email" label="邮箱"></el-table-column>
                                <el-table-column label="评分等级">
                                    <template #default="{ row, $index }">
                                        <el-rate v-model="row.star" disabled="true"
                                            :texts="['1分', '2分', '3分', '4分', '5分']" show-text />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="comment_text" label="评论内容"></el-table-column>
                            </el-table>
                        </template>
                    </el-drawer>
                </el-table>
                <div class="flex flex-row justify-between items-center mt-[10px]">
                    <div class="text-[14px]">
                        当前第{{ queryCommentFormData.pageIndex }}页，共{{ resData.pageCount }}页，共{{ resData.totalCount }}条
                    </div>
                    <el-pagination background layout="prev, pager, next" :total="resData.totalCount"
                        @current-change="currentChange" />
                </div>
            </div>
        </el-card>
    </page-view>
</template>
<script setup>
import { Search, Edit, Delete, View } from "@element-plus/icons-vue";
import { ElDrawer } from "element-plus";
import { reactive, ref, onMounted } from "vue";
import API from "../../Utils/API";
import { formatDataTime } from "@/Utils/DateTimeUtils";
import { txtEllipsis } from "@/Utils/StringUtils";

const open = ref(false);
const isLoading = ref(false);

const queryCommentFormData = reactive({
    pageIndex: "1",
    food_name: "",
    start_time: "",
    end_time: "",
});

const resData = reactive({
    listData: [],
    pageCount: 0,
    totalCount: 0,
});

const isShow = ref("");

const getCurrentStatus = () => {

};

const queryCommentData = () => {
    isLoading.value = true;
    API.commentInfo.getListByPage(queryCommentFormData)
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
    API.commentInfo.deleteById(id).then(() => {
        ElNotification({
            type: "success",
            title: "删除成功",
            message: "当前评论信息删除成功"
        });
        queryData();
    }).catch(() => {
        ElNotification({
            type: "danger",
            title: "删除失败",
            message: "当前评论信息删除失败,请刷新或者联系管理员"
        })
    })
}

onMounted(() => {
    queryCommentData();
})

const currentChange = (index) => {
    queryCommentFormData.pageIndex = index;
    queryCommentData();
}

const size = ref < '' | 'large' | 'small' > ('')

const value1 = ref('')
</script>
<style scoped lang="scss">
:deep(.demonstration) {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}
</style>