import dataType from "./dataType";

/**
 *兼容谷歌火狐safair时间对象
 *
 * @param {*} date [string,number,date]
 * @returns Date
 */
function dateParse(date) {
    let dateType = dataType(date);
    let res = null;
    switch (dateType) {
        case "string":
            res = new Date(date.replace(/-/g, "/"));
            break;
        case "number":
            res = new Date(date);
            break;
        case "date":
            res = date;
            break;
        default:
            break;
    }
    return res;
}

export default dateParse
