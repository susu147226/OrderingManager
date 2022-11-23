<template>
    <page-view>
        <el-card>
            <template #header>
                <div class="font-bold">订单列表</div>
            </template>
            <el-form :model="queryOrderFormData" :inline="true">
                <el-form-item label="时间">
                    <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期" :size="size" />
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select v-model="value" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="queryOrderData">
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
                    <el-table-column type="expand" align="center" width="30">
                        <template #default="props">
                            <!-- ElementPlus 描述列表 -->
                            <el-descriptions title="Customized style list" :column="3" border>
                                <el-descriptions-item label="Username" label-align="right" align="center"
                                    label-class-name="my-label" class-name="my-content" width="150px">kooriookami
                                </el-descriptions-item>
                                <el-descriptions-item label="Telephone" label-align="right" align="center">18100000000
                                </el-descriptions-item>
                                <el-descriptions-item label="Place" label-align="right" align="center">Suzhou
                                </el-descriptions-item>
                                <el-descriptions-item label="Remarks" label-align="right" align="center">
                                    <el-tag size="small">School</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item label="Address" label-align="right" align="center">No.1188,
                                    Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                                    Province</el-descriptions-item>
                            </el-descriptions>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="id" align="center" width="60"></el-table-column>
                    <el-table-column prop="userInfo.id" label="用户编号" width="85" align="center"></el-table-column>
                    <el-table-column prop="userInfo.nickName" label="用户昵称" align="center" width="125"></el-table-column>
                    <el-table-column label="订单生成时间" align="center" width="165">
                        <template #default="{ row }">
                            {{ formatDataTime(row.submit_time) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="order_money" label="总金额" align="center" width="75"></el-table-column>
                    <el-table-column prop="orderDetailList.length" label="餐点总数" align="center" width="85">
                    </el-table-column>
                    <el-table-column label="订单状态" align="center" width="85">
                        <template #default="{ row }">
                            <el-tag v-if="row.order_status === '已发货'" class="ml-2" type="warning">{{ row.order_status }}
                            </el-tag>
                            <el-tag v-else-if="row.order_status === '已取消'" class="ml-2" type="info">{{ row.order_status
                            }}
                            </el-tag>
                            <el-tag v-else-if="row.order_status === '未付款'" class="ml-2" type="danger">{{
                                    row.order_status
                            }}</el-tag>
                            <el-tag v-else-if="row.order_status === '已付款'" class="ml-2" type="success">{{
                                    row.order_status
                            }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pay_time" label="付款时间" align="center" width="165">
                        <template #default="{ row }">
                            {{ formatDataTime(row.pay_time) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="deliver_time" label="发货时间" align="center" width="165">
                        <template #default="{ row }">
                            {{ formatDataTime(row.deliver_time) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="addressInfo.address" label="收货地址" align="center">
                        <template #default="{ row }">
                            <el-popover placement="top-start" title="收货地址详情" width="400" trigger="hover"
                                :content="row.addressInfo.address">
                                <template #reference>
                                    <el-link type="success" :underline="false">
                                        {{ txtEllipsis(row.addressInfo.address, 18) }}
                                    </el-link>
                                </template>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="100">
                        <template #default>
                            <el-button type="warning" plain size="small">
                                <el-icon>
                                    <Position />
                                </el-icon>
                                <span class="ml-[3px]">发货</span>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="flex flex-row justify-between items-center mt-[10px]">
                    <div class="text-[14px]">
                        当前第{{ queryOrderFormData.pageIndex }}页，共{{ resData.pageCount }}页，共{{ resData.totalCount }}条
                    </div>
                    <el-pagination background layout="prev, pager, next" :total="resData.totalCount"
                        @current-change="currentChange" />
                </div>
            </div>
        </el-card>
    </page-view>
</template>
<script setup>
import { Search, CirclePlus, Position } from "@element-plus/icons-vue";
import { reactive, ref, onMounted } from "vue";
import API from "../../Utils/API";
import { formatDataTime } from "@/Utils/DateTimeUtils"
import { txtEllipsis } from "@/Utils/StringUtils"


const isLoading = ref(false);

const queryOrderFormData = reactive({
    pageIndex: "1",
    start_time: "",
    end_time: "",
    order_status: "",
    uid: ""
});

const resData = reactive({
    listData: [],
    pageCount: 0,
    totalCount: 0,
});

const queryOrderData = () => {
    isLoading.value = true;
    API.orderInfo.getListByPage(queryOrderFormData)
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

onMounted(() => {
    queryOrderData();
})

const currentChange = (index) => {
    queryOrderFormData.pageIndex = index;
    queryOrderData();
}

const size = ref < '' | 'large' | 'small' > ('')

const value1 = ref('');

const value = ref('')
const options = [
    {
        value: '未付款',
        label: '未付款',
    },
    {
        value: '已付款',
        label: '已付款',
    },
    {
        value: '已发货',
        label: '已发货',
    },
]
</script>
<style scoped lang="scss">
:deep(.demonstration) {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}
</style>