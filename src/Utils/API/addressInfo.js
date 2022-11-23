import axiosInstance from "../axiosInstance";

const addressInfo = {
    /**
     * 分页查询地址信息
     * @param {Object} param0 
     * @returns {Promise<AxiosResponse<any>>}
     */
    getListByPage({ pageIndex, nickName, phone }) {
        return axiosInstance.get(`addressInfo/getListByPage`, {
            params: {
                pageIndex, nickName, phone
            }
        });
    },

    /**
     * 根据id删除
     * @param {Object} id 
     * @returns {Promise<AxiosResponse<any>>}
     */
    deleteById(id) {
        return axiosInstance.get(`/addressInfo/deleteById`, {
            params: {
                id
            }
        })
    },


};

export default addressInfo;