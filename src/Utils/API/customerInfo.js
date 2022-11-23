import axiosInstance from "../axiosInstance";

const customerInfo = {
    /**
     * 分页获取用户信息列表
     * @param {Object} param0 
     * @returns {Promise<AxiosResponse<any>>}
     */
    getListByPage({ pageIndex, nickName, user_phone, user_sex }) {
        return axiosInstance.get(`/userInfo/getListByPage`, {
            params: {
                pageIndex, nickName, user_phone, user_sex
            }
        });
    },

    /**
     * 根据id删除
     * @param {Object} id 
     * @returns {Promise<AxiosResponse<any>>}
     */
    deleteById(id) {
        return axiosInstance.get(`/userInfo/deleteById`, {
            params: {
                id
            }
        })
    },
};

export default customerInfo;