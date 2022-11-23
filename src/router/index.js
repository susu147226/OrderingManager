import { createRouter, createWebHashHistory } from "vue-router";
import { mainStore } from "../store/index.js";
import { ElNotification } from 'element-plus';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: {
                name: "Login"
            },
        },
        {
            path: "/Login",
            name: "Login",
            component: () => import("../view/Login.vue"),
        },
        {
            path: "/Manager",
            name: "Manager",
            component: () => import("../view/Manager.vue"),
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: "AddCategoryInfo",
                    name: "AddCategoryInfo",
                    component: () => import("../view/CategoryInfo/AddCategoryInfo.vue"),
                    meta: {
                        title: "新增分类",
                        requireAuth: true,
                        autoClose: true,
                    },
                },
                {
                    path: "CategoryInfoList",
                    name: "CategoryInfoList",
                    component: () => import("../view/CategoryInfo/CategoryInfoList.vue"),
                    meta: {
                        title: "分类列表",
                        requireAuth: true
                    },
                },
                {
                    path: "FoodInfoList",
                    name: "FoodInfoList",
                    component: () => import("../view/FoodInfo/FoodInfoList.vue"),
                    meta: {
                        title: "餐点列表",
                        requireAuth: true
                    },
                },
                {
                    path: "CustomerInfoList",
                    name: "CustomerInfoList",
                    component: () => import("../view/CustomerInfo/CustomerInfoList.vue"),
                    meta: {
                        title: "用户列表",
                        requireAuth: true
                    },
                },
                {
                    path: "AddressInfoList",
                    name: "AddressInfoList",
                    component: () => import("../view/AddressInfo/AddressInfoList.vue"),
                    meta: {
                        title: "地址列表",
                        requireAuth: true
                    },
                },
                {
                    path: "OrderInfoList",
                    name: "OrderInfoList",
                    component: () => import("../view/OrderInfo/OrderInfoList.vue"),
                    meta: {
                        title: "订单列表",
                        requireAuth: true
                    },
                },
                {
                    path: "CommentInfoList",
                    name: "CommentInfoList",
                    component: () => import("../view/CommentInfo/CommentInfoList.vue"),
                    meta: {
                        title: "评论列表",
                        requireAuth: true
                    },
                },
                {
                    path: "AdminInfoList",
                    name: "AdminInfoList",
                    component: () => import("../view/AdminInfo/AdminInfoList.vue"),
                    meta: {
                        title: "管理员列表",
                        requireAuth: true
                    },
                },
                {
                    path: "AddFoodInfo",
                    name: "AddFoodInfo",
                    component: () => import("../view/FoodInfo/AddFoodInfo.vue"),
                    meta: {
                        requireAuth: true,
                        title: "新增餐点",
                        autoClose: true,
                    },
                },
                {
                    path: "EditFoodInfo",
                    name: "EditFoodInfo",
                    component: () => import("../view/FoodInfo/EditFoodInfo.vue"),
                    meta: {
                        requireAuth: true,
                        title: "编辑餐点",
                        autoClose: true,
                    },
                },
                {
                    path: "EditCategoryInfo",
                    name: "EditCategoryInfo",
                    component: () => import("../view/CategoryInfo/EditCategoryInfo.vue"),
                    meta: {
                        requireAuth: true,
                        title: "编辑分类",
                        autoClose: true,
                    },
                },
                {
                    path: "AddAdminInfo",
                    name: "AddAdminInfo",
                    component: () => import("../view/AdminInfo/AddAdminInfo"),
                    meta: {
                        requireAuth: true,
                        title: "新增管理员",
                        autoClose: true,
                    },
                },
                {
                    path: "/DataView",
                    name: "DataView",
                    component: () => import("../view/DataView.vue"),
                    meta: {
                        title: "首页",
                        requireAuth: true,
                    }
                },
            ]
        },
    ]
});

router.beforeEach((to, from, next) => {
    const store = mainStore();
    if (to.meta.requireAuth) {
        //需要登录以后才能进
        if (store.token) {
            //说明有token，放行
            next();
        } else {
            ElNotification({
                type: "warning",
                title: "系统提示",
                message: "您还没有登录，请选去登录"
            });
            next({
                name: "Login"
            });
        }

    } else {
        //不需要登录
        next();
    }
});


//跳转页面之后的看你咯
router.afterEach((to, from) => {
    const store = mainStore();
    if (to.meta.title) {
        store.addHistory({
            title: to.meta.title,
            routeName: to.name
        });
    }

    if (from.meta.autoClose) {
        store.removeHisotryByRouteName(from.name);
    }

});

export default router;