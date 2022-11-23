import axiosInstance from "../axiosInstance";

const commentInfo = {
    /**
     * 分页获取评论信息
     * @param {Object} param0 
     * @returns {Promise<AxiosResponse<any>>}
     */
    getListByPage({ pageIndex, food_name, start_time, end_time }) {
        return axiosInstance.get(`/commentInfo/getListByPage`, {
            params: {
                pageIndex, food_name, start_time, end_time
            }
        })
    },

    /**
     * 根据id隐藏当前评论
     * @param {Object} param0 
     * @returns {Promise<AxiosResponse<any>>}
     */
    setCommentHideById({ id }) {
        return axiosInstance.get(`/commentInfo/setCommentHideById`, {
            params: {
                id
            }
        })
    },

    /**
     * 根据id显示当前评论
     * @param {Object} param0 
     * @returns {Promise<AxiosResponse<any>>}
     */
    setCommentShowById({ id }) {
        return axiosInstance.get(`/commentInfo/setCommentShowById`, {
            params: {
                id
            }
        })
    },
};

export default commentInfo;