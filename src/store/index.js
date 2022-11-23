/**
 * pinia的存储区域
 */

import { Flag } from "@element-plus/icons-vue";
import { defineStore } from "pinia";
import WebStorageCache from "web-storage-cache";

const cache = new WebStorageCache({
    storage: window.localStorage,

});

export const mainStore = defineStore("main", {
    state() {
        return {
            token: null,
            loginUserInfo: null,
            isCollapse: false,
            historyList: [],
        }
    },
    actions: {
        setToken(token) {
            this.token = token;
        },
        setLoginUserInfo(loginUserInfo) {
            this.loginUserInfo = loginUserInfo;
        },
        setIsCollapse(Flag) {
            this.isCollapse = Flag;
        },
        logOut() {
            this.token = null;
            this.loginUserInfo = null;
        },
        addHistory(item) {
            //我们希望在添加的时候不要重复
            let index = this.historyList.findIndex(_item => _item.routeName === item.routeName);
            if (index === -1) {
                this.historyList.push(item);
            }
        },
        removeHisotryByRouteName(routeName) {
            let index = this.historyList.findIndex(item => item.routeName === routeName);
            if (index != -1) {
                this.historyList.splice(index, 1);
            }
        }
    },
    //配置状态的持久化
    persist: {
        key: "ele-manager-store",
        storage: {
            getItem: key => cache.get(key),
            setItem: (key, value) => cache.set(key, value, { exp: 60 * 60 * 24 }),
            removeItem: key => cache.delete(key),
            clear: () => cache.clear()
        },
        paths: ["token", "loginUserInfo"],
    }
});