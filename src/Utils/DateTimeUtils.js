/**
 * 格式化日期时间
 */

import dayjs from "dayjs";


/**
 * 格式化日期
 * @param {string|Date|Number} _d 
 * @param {string} 格式化的参数
 */
export const formatDataTime = (_d, split = "YYYY-MM-DD HH:mm:ss") => {
    let d = dayjs(_d);
    if (d.isValid()) {
        return d.format(split);
    } else {
        return "";
    }
}