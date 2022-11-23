<template>
    <page-view>
        <el-card header="分类信息汇总">
            <div class="flex flex-row justify-around h-[100px] ">
                <div class="box">
                    <div class="text-[18px]">用户总数</div>
                    <div class="inner-number">{{ totalInfo.userTotalCount }}</div>
                </div>
                <div class="box">
                    <div class="text-[18px]">餐点总数</div>
                    <div class="inner-number">{{ totalInfo.categoryGoodCount }}</div>
                </div>
                <div class="box">
                    <div class="text-[18px]">订单总数</div>
                    <div class="inner-number">{{ totalInfo.orderTotalCount }}</div>
                </div>
                <div class="box">
                    <div class="text-[18px]">总交易额</div>
                    <div class="inner-number">{{ totalInfo.moneyTotalInfo }}</div>
                </div>
            </div>
        </el-card>
        <el-card header="订单信息展示">
            <div class="flex flex-row justify-between justify-center items-center">
                <div ref="main" class="h-[480px] w-[850px] border border-gray-300"></div>
                <div ref="main1" class="h-[480px] w-[750px]  border border-gray-300"></div>
            </div>
        </el-card>
    </page-view>
</template>
<script setup>
import API from "@/utils/API/index.js";
import { onMounted, reactive, ref } from "vue";
import * as echarts from 'echarts';

const main = ref();
const main1 = ref();

const queryFormData = reactive({
    nickName: "",
    user_phone: "",
    user_sex: "",
    pageIndex: 1
});
const totalInfo = reactive({
    userTotalCount: 0,
    orderTotalCount: 0,
    moneyTotalInfo: 0,
    categoryGoodCount: 0
})
const queryFormData1 = reactive({
    start_time: "",
    end_time: "",
    order_status: "",
    uid: "",
    pageIndex: 1
});

const getCount = () => {
    API.adminInfo.getTotalInfo().then((result) => {
        console.log(result)
        totalInfo.moneyTotalInfo = result.money_total;
        totalInfo.categoryGoodCount = result.food_total;
        totalInfo.orderTotalCount = result.order_total;
        totalInfo.userTotalCount = result.user_total;
    })
}

const animations = (option, main, arr) => {
    let currentIndex = -1;
    const myChart = echarts.init(main.value);
    setInterval(() => {
        let dataLen = option.series[0].data.length;
        // 取消之前高亮的图形
        myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen;
        // 高亮当前图形
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
        // 显示 tooltip
        myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
    }, 1000);
    API.adminInfo.getCategoryFoodCount().then(result => {
        result.forEach(item => {
            let obj = {
                value: item.category_food_count,
                name: item.category_name
            };
            option.series[0].data.push(obj);
        })
    }).finally(() => {
        myChart.setOption(option);
    })
}

const init = () => {
    const myChart = echarts.init(main.value);
    let option1 = {
        title: {
            text: '餐点分类环形图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '餐点分类 </br>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: []
        },
        series: [
            {
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: {
                    show: false
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '20',
                        fontWeight: 'bold'
                    },
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                data: []
            }
        ]
    }
    animations(option1, main, option1.legend);
};
const init1 = () => {
    const myChart = echarts.init(main1.value);
    let option2 = {
        title: {
            text: '餐点分类柱形图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}'
        },
        xAxis: {
            data: []
        },
        yAxis: {},
        series: [
            {
                type: 'bar',
                data: [],
                barWidth: '50%'
            }
        ],
        emphasis: {
            label: {
                show: true,
                fontSize: '10',
                fontWeight: 'bold'
            },
            itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        },
    }
    animations(option2, main1, option2.xAxis);
}
onMounted(() => {
    getCount();
    init();
    init1();
})
</script>
  
<style scoped lang="scss">
:deep(.box) {
    @apply bg-pink-200 flex flex-col justify-center items-center w-[400px] h-full;

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 5px 2px #ececec;
    }

    :deep(.inner-number) {
        @apply flex flex-row justify-center items-center;
    }
}
</style>