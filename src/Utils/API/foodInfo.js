import axiosInstance from "../axiosInstance";

const foodInfo = {
    /**
     * 分页获取餐点数据
     * @param {Object} param0 
     * @returns {Promise<AxiosResponse<any>>}
     */
    getListByPage({ pageIndex, food_name, category_name }) {
        return axiosInstance.get(`/foodInfo/getListByPage`, {
            params: {
                pageIndex, food_name, category_name
            }
        });
    },

    /**
     * 设置餐点权重值
     * @param {Object} param0 
     * @returns {Promise<AxiosResponse<any>>}
     */
    setFoodInfoWeight({ id, weight }) {
        return axiosInstance.get(`/foodInfo/setFoodInfoWeight`, {
            params: {
                id, weight
            }
        });
    },

    /**
     * 添加餐点信息
     * @param {Object} param0 
     * @returns {Promise<AxiosResponse<any>>}
     */
    add({ food_name, price, cid, food_desc, food_img, weight }) {
        return axiosInstance.post(`/foodInfo/add`, {
            food_name, price, cid, food_desc, food_img, weight
        });
    },

    /**
     * 根据id删除行
     * @param {Object} id 
     * @returns {Promise<AxiosResponse<any>>}
     */
    deleteById(id) {
        return axiosInstance.get(`/foodInfo/deleteById`, {
            params: {
                id
            }
        });
    },

    /**
     * 根据id查找餐点信息
     * @param {Object} id 
     * @returns {Promise<AxiosResponse<any>>}
     */
    findById(id) {
        return axiosInstance.get(`/foodInfo/findById`, {
            params: {
                id
            }
        })
    },

    /**
     * 编辑餐点信息
     * @param {Object} param0 
     * @returns {Promise<AxiosResponse<any>>}
     */
    update({ id, food_name, price, cid, food_desc, food_img, weight }) {
        return axiosInstance.post(`/foodInfo/update`, {
            id, food_name, price, cid, food_desc, food_img, weight
        })
    }
};

export default foodInfo;