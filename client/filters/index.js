import dateUtils from 'vue-dateutils';

function dateFormat(time,fmt) {

    return dateUtils.dateToStr(fmt, new Date(time))
}

function name(params) {
    
}

export default {
    dateFormat,
    name
};