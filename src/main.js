import { createApp } from 'vue';
import App from './App';

import ElementPlus from 'element-plus';
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import 'element-plus/dist/index.css';

import router from "./router";

import { createPinia } from "pinia";
import PiniaPluginPersistedState from "pinia-plugin-persistedstate";

import './assets/scss/comm.scss';
import './assets/css/index.css';

import PageView from "./components/PageView";

const app = createApp(App);
const pinia = createPinia();

pinia.use(PiniaPluginPersistedState);

app.use(pinia);

app.component("page-view", PageView);
app.provide("baseURL", baseURL);

app.use(ElementPlus, {
    locale: zhCn,
});

app.use(router);
app.mount('#app');