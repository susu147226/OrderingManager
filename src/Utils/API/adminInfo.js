import axiosInstance from "../axiosInstance";

const adminInfo = {
    /**
     * 管理员登录检测
     * @param {{zh,admin_pwd}} param0
     * @returns {Promise<Object>}
     */
    checkLogin({ zh, admin_pwd }) {
        return axiosInstance.post(`/adminInfo/checkLogin`, {
            zh, admin_pwd
        })
    },

    /**
     * 分页获取管理员信息
     * @param {Object} param0 
     * @returns {Promise<AxiosResponse<any>>}
     */
    getListByPage({ pageIndex, admin_name, admin_sex, admin_tel, admin_email }) {
        return axiosInstance.get(`/adminInfo/getListByPage`, {
            params: {
                pageIndex, admin_name, admin_sex, admin_tel, admin_email
            }
        })
    },

    /**
     * 新增管理员信息
     * @param {Object} param0 
     * @returns {Promise<AxiosResponse<any>>}
     */
    add({ admin_name, admin_pwd, admin_sex, admin_tel, admin_email, admin_photo, admin_type }) {
        return axiosInstance.post(`/adminInfo/add`, {
            admin_name, admin_pwd, admin_sex, admin_tel, admin_email, admin_photo, admin_type
        });
    },

    /**
     * 根据id删除管理员信息
     * @param {Object} id 
     * @returns {Promise<AxiosResponse<any>>}
     */
    deleteById(id) {
        return axiosInstance.get(`/adminInfo/deleteById`, {
            params: {
                id
            }
        });
    },

    /**
  * 获取总计信息
  * @returns {Promise<AxiosResponse>}
  */
    getTotalInfo() {
        return axiosInstance.get("/adminInfo/getTotalInfo", {});
    },


    /**
     * 获取菜品分类总数
     * @returns {Promise<AxiosResponse>}
     */
    getCategoryFoodCount() {
        return axiosInstance.get("/adminInfo/getTotalInfo", {});
    },


    /**
     *
     * 获取菜品评分总数
     * @returns {Promise<AxiosResponse>}
     */
    getCategoryFoodCount() {
        return axiosInstance.get("/adminInfo/getCategoryFoodCount", {});
    },
}

export default adminInfo;