import dateUtils from 'vue-dateutils';
function dateCompatible(data){ 
    var switchdate=dateUtils.dateToStr("YYYY/MM/DD HH:mm:SS",new Date(data));
    return switchdate.replace(/\//g,'-');
}
export default dateCompatible;