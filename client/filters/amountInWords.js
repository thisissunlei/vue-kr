import utils from "~/plugins/utils";
/**
 *金额转为大写
 *
 * @param {*} amount
 * @returns
 */
function amountInWords(amount) {
    
    if (amount === null || amount === undefined) {
        return null;
    } else if (isNaN(amount)) {
        return null;
    } else {
        return utils.smalltoBIG(amount);
    }
}

export default amountInWords;
