<template>
    <page-view class="flex flex-row">
        <MenuList />
        <div class="flex flex-col flex-1 overflow-auto">
            <div class="nav-bar h-[55px] border border-solid bg-white flex items-center justify-between px-10">
                <el-icon size="20px" @click="toggleIsCollapse" class="cursor-pointer">
                    <Hide v-if="!isActive" @click="isActive = true" class="hover:text-primaryColor transition-all" />
                    <View v-else @click="isActive = false" class="hover:text-primaryColor transition-all" />
                </el-icon>
                <div class="history-list space-x-[5px]">
                    <router-link :to="{ name: item.routeName }" custom v-for="item in historyList" :key="item.routeName"
                        #default="{ navigate, isActive }">
                        <div class="history-item" :class="{ active: isActive }" @click="navigate">
                            {{ item.title }}
                            <span v-if="item.routeName != 'DataView'" class="close"
                                @click.stop="store.removeHisotryByRouteName(item.routeName)">x</span>
                        </div>
                    </router-link>
                </div>
                <!-- 右边用户下拉菜单 -->
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="text-primaryColor">
                        欢迎登录：{{ loginUserInfo?.admin_name }}
                        <el-icon class="text-primaryColor">
                            <ArrowDown />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>我的信息</el-dropdown-item>
                            <el-dropdown-item>修改密码</el-dropdown-item>
                            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <div class="bg-[#f5f7f9] flex-1 overflow-auto box-border p-5">
                <router-view></router-view>
            </div>
        </div>
    </page-view>
</template>
<script setup>
import { ArrowDown, Hide, View } from "@element-plus/icons-vue"
import MenuList from "../components/MenuList.vue";
import { computed, ref } from "vue";
import { mainStore } from "../store";
import { storeToRefs } from "pinia";
import { ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

const isActive = ref(true)

const store = mainStore();

const { isCollapse, historyList, loginUserInfo } = storeToRefs(store);

const router = useRouter();

const toggleIsCollapse = () => {
    store.setIsCollapse(!store.isCollapse);
};

const handleCommand = (command) => {
    switch (command) {
        case "logOut":
            logOut();
            break;
    }
};

const logOut = () => {
    ElMessageBox.confirm("你确定要退出吗", "系统提示", {
        confirmButtonText: '确定退出',
        cancelButtonText: '我点错了',
        type: 'warning',
    }).then(() => {
        store.logOut();
        router.replace({
            name: "Login"
        });
    }).catch(() => {
    });
};

</script>
<style scoped lang="scss">
.collapse-width {
    width: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2)
}

.history-list {
    @apply box-border px-[4px] flex-1 h-full flex flex-row items-center;

    .history-item {
        @apply text-gray-700 relative rounded border-current h-[26px] px-[5px] text-[12px] flex flex-row justify-center items-center cursor-pointer;

        &:hover {
            @apply text-primaryColor;

            .close {
                display: flex;
            }
        }

        .close {
            border: 1px solid currentColor;
            @apply w-[10px] h-[10px] absolute -right-[5px] -top-[5px] rounded-full flex flex-row justify-center items-center bg-white;
            display: none;

            &:hover {
                @apply text-red-500;
            }

        }

        &.active {
            @apply bg-primaryColor text-white border-gray-700;
        }
    }
}
</style>