/**
 * axiosInstance请求实例
 */

import axios from "axios";
import { mainStore } from "../store"

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
});

//设置请求拦截器
axiosInstance.interceptors.request.use(config => {
    const store = mainStore();
    config.headers["softeem_ele_admin_token"] = store.token;
    return config;
});

//设置响应拦截器
axiosInstance.interceptors.response.use(res => {
    if (res.data.status === "success") {
        return Promise.resolve(res.data.data);
    } else {
        console.log("请求正确，服务器响应错误", res.data);
        return Promise.reject(res.data);
    }
}, err => {
    console.log("服务器请求错误", err);
    if (err.response.status === 403) {
        //说明没有权限了，用户要重新登录
        router.replace({
            name: "Login"
        })
    }
    return Promise.reject(err);
})


export default axiosInstance;