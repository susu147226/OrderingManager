import axiosInstance from "../axiosInstance";

const categoryInfo = {
    /**
     * 分页获取分类列表
     * @param {Object} param0 
     * @returns {Promise<AxiosResponse<any>>}
     */
    getListByPage({ pageIndex, category_name }) {
        return axiosInstance.get(`/categoryInfo/getListbyPage`, {
            params: {
                pageIndex, category_name
            }
        });
    },

    /**
     * 获取所有餐点分类信息
     * @returns {Promise<AxiosResponse<any>>}
     */
    getAllList() {
        return axiosInstance.get(`/categoryInfo/getAllList`);
    },

    /**
     * 添加餐点分类信息
     * @param {Object} param0 
     * @returns {Promise<AxiosResponse<any>>}
     */
    add({ category_name }) {
        return axiosInstance.get(`/categoryInfo/add`, {
            params: {
                category_name,
            }
        });
    },

    /**
     * 根据id删除
     * @param {Object} param0 
     * @returns {Promise<AxiosResponse<any>>}
     */
    deleteById({ id }) {
        return axiosInstance.get(`/categoryInfo/deleteById`, {
            params: {
                id,
            }
        });
    },

    /**
     * 更新餐点信息
     * @param {Object} param0 
     * @returns {Promise<AxiosResponse<any>>}
     */
    update({ id, category_name }) {
        return axiosInstance.post(`/categoryInfo/update`, {
            id, category_name
        });
    },

    /**
     * 根据id查找餐点分类
     * @param {Object} param0 
     * @returns {Promise<AxiosResponse<any>>}
     */
    findById({ id }) {
        return axiosInstance.get(`/categoryInfo/findById`, {
            params: {
                id
            }
        })
    }
}

export default categoryInfo;