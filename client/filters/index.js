import dateUtils from 'vue-dateutils';
import thousand from './thousand.js'

function name(params) {
    
}
function dateFormat(time,fmt) {
	if(!time){
		return
	}
	let format = fmt || 'YYYY-MM-dd HH:mm:ss'

    return dateUtils.dateToStr(format, new Date(time))
}


export default {
    name,
    dateFormat,
    thousand
};