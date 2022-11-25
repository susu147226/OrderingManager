<template>
    <el-menu background-color="#304156" text-color="#ffffff" class="el-menu-vertical-demo" :unique-opened="true"
        :collapse-transition="false" :router="true" :collapse="isCollapse">
        <el-menu-item>
            <el-icon size="28px" class="is-loading">
                <Sunny />
            </el-icon>
            <span class="ml-[5px] italic" v-show="!isCollapse">食味斋·后台管理平台</span>
        </el-menu-item>
        <el-sub-menu index="a">
            <template #title>
                <el-icon>
                    <ForkSpoon />
                </el-icon>
                <span>餐点分类</span>
            </template>
            <el-menu-item index="/Manager/AddCategoryInfo">
                <el-icon>
                    <CirclePlus />
                </el-icon>
                <template #title>新增分类</template>
            </el-menu-item>
            <el-menu-item index="/Manager/CategoryInfoList">
                <el-icon>
                    <Expand />
                </el-icon>
                <template #title>分类列表</template>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="b">
            <template #title>
                <el-icon>
                    <Tickets />
                </el-icon>
                <span>餐点名称</span>
            </template>
            <el-menu-item index="/Manager/AddFoodInfo">
                <el-icon>
                    <FirstAidKit />
                </el-icon>
                <template #title>新增餐点</template>
            </el-menu-item>
            <el-menu-item index="/Manager/FoodInfoList">
                <el-icon>
                    <Memo />
                </el-icon>
                <template #title>餐点列表</template>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="c">
            <template #title>
                <el-icon>
                    <User />
                </el-icon>
                <span>用户信息</span>
            </template>

            <el-menu-item index="/Manager/CustomerInfoList">
                <el-icon>
                    <Position />
                </el-icon>
                <template #title>用户信息列表</template>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="d">
            <template #title>
                <el-icon>
                    <Location />
                </el-icon>
                <span>收货地址信息</span>
            </template>
            <el-menu-item index="/Manager/AddressInfoList">
                <el-icon>
                    <MapLocation />
                </el-icon>
                <template #title>收货地址列表</template>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="e">
            <template #title>
                <el-icon>
                    <Tickets />
                </el-icon>
                <span>订单管理</span>
            </template>
            <el-menu-item index="/Manager/OrderInfoList">
                <el-icon>
                    <Coin />
                </el-icon>
                <template #title>订单列表</template>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="f">
            <template #title>
                <el-icon>
                    <ChatDotRound />
                </el-icon>
                <span>评论管理</span>
            </template>
            <el-menu-item index="/Manager/CommentInfoList">
                <el-icon>
                    <TakeawayBox />
                </el-icon>
                <template #title>评论列表</template>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="g">
            <template #title>
                <el-icon>
                    <Setting />
                </el-icon>
                <span>管理员信息</span>
            </template>
            <el-menu-item index="/Manager/AddAdminInfo">
                <el-icon>
                    <CirclePlus />
                </el-icon>
                <template #title>新增管理员</template>
            </el-menu-item>
            <el-menu-item index="/Manager/AddAdminInfo">
                <el-icon>
                    <Edit />
                </el-icon>
                <template #title>修改密码</template>
            </el-menu-item>
            <el-menu-item index="/Manager/AdminInfoList">
                <el-icon>
                    <CollectionTag />
                </el-icon>
                <template #title>管理员列表</template>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>
<script setup>
import { ref, computed } from 'vue';
import {
    Menu,
    Loading,
    ForkSpoon,
    Tickets,
    User,
    Location,
    ChatDotRound,
    Setting,
    CirclePlus,
    Expand,
    FirstAidKit,
    Memo,
    UserFilled,
    MapLocation,
    Position,
    Coin,
    TakeawayBox,
    Edit,
    CollectionTag,
    Sunny,
} from '@element-plus/icons-vue';

import { mainStore } from "../store";
import { storeToRefs } from "pinia"
const store = mainStore();

//用计算属性得到这个值
// const isCollapse = computed(() => store.isCollapse);

const { isCollapse } = storeToRefs(store);

</script>
<style scoped lang="scss">
:deep(.el-menu-vertical-demo:not(.el-menu--collapse)) {
    width: 200px;
    min-height: 400px;
}

:deep(.el-menu) {
    border-right: none !important;
}
</style>