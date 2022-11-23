import axiosInstance from "../axiosInstance";

const orderInfo = {
    /**
     * 分页获取订单列表
     * @param {Object} param0 
     * @returns {Promise<Object>}
     */
    getListByPage({ pageIndex, start_time, end_time, order_status, uid }) {
        return axiosInstance.get(`orderInfo/getListByPage`, {
            params: {
                pageIndex, start_time, end_time, order_status, uid
            }
        });
    },


};

export default orderInfo;