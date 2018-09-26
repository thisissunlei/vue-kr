import dateUtils from 'vue-dateutils';
import thousand from './thousand.js'
import amountInWords from './amountInWords.js'
function name(params) {
    
}
function dateFormat(time,fmt) {
	if(!time || time == '-'){
		return time
	}
	let format = fmt || 'YYYY-MM-dd HH:mm:ss'

    return dateUtils.dateToStr(format, new Date(time))
}


export default {
    name,
    dateFormat,
    thousand,
    amountInWords
};