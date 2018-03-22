import thousand from './thousand'; 
import addEvent from './addEvent';
import dataType from './dataType';
import throttle from './throttle';
   /** 数字金额大写转换(可以处理整数,小数,负数) */
    function smalltoBIG(n) {
        var fraction = ['角', '分'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
        var head = n < 0 ? '负' : '';
        n = Math.abs(n);

        var s = '';

        let strL =(n+'').split('.').length;
        let xiaoshu = '00';
        if(strL>1){
            xiaoshu = (n+'').split('.')[1]
        }

        for (var i = 0; i < fraction.length; i++) {
            if(digit[xiaoshu[i]]){
                s += (digit[xiaoshu[i]] + fraction[i]).replace(/零./, '');

            }
        }
        s = s || '整';
        n = Math.floor(n);

        for (var i = 0; i < unit[0].length && n > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    } 
    
    /*清空表单*/
    function clearForm(originParams){
        for(var item in originParams){
             originParams[item]='';
         }
    }

    /*导出*/
    function commonExport(props,url){
        var where=[];
        for(var item in props){
            if(props.hasOwnProperty(item)){
                where.push(`${item}=${props[item]}`);
            }
        }
       
        var url = `${url}?${where.join('&')}`
        window.location.href = url;
    }

    //获取url的参数
    function getRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

    //高级搜索时url上带参数
    function addParams(params){
        let path=window.location.href;
        let url=path.split('?')[0];
        var where = [];
		for(var field in params){
			if(params.hasOwnProperty(field)){
				where.push(`${field}=${params[field]}`);
			}
        }
        url=url+"?"+where.join('&');
        location.href=url;
    }
    
    //数组去重
    function arrayNoRepeat(array){
        for(var i=0, temp={}, result=[], ci; ci=array[i++];){
            var id = ci.id;
            if(temp[id]){
              continue;
            }
            temp[id] = true;
            result.push(ci);
          }
          return result;
    }

    //两个数组比较去重
    function arrayCompare(array1,array2,param1,param2){
          for(var i=0;i<array2.length;i++){
            for(var j=0;j<array1.length;j++){
                var middle1=param1?array1[j][param1]:array1[j];
                var middle2=param2?array2[i][param2]:array2[i];
                if(middle1==middle2){
                    array1.splice(j,1);
                }
            }
          }   
          return  array1
    }

    //文件下载的流式下载
    function downFile(href, filename) {
        var a = document.createElement('a');
        a.href = href;
        // a.download = filename;
        a.click();
    }

    function getDaysInOneMonth(year, month){  
        month = parseInt(month, 10);  
        var d= new Date(year, month, 0);  
        return d.getDate();  
    }  
    //计算天数差
    function dateDiff(sDate1, sDate2) {
        var aDate, oDate1, oDate2, iDays
        aDate = sDate1.split("-")
        oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])    //转换为12-18-2002格式  
        aDate = sDate2.split("-")
        oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)    //把相差的毫秒数转换为天数  
        return iDays  
    }

    function debounce(delay, atBegin, callback) {
        return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
    };

   export default{
    smalltoBIG,
    clearForm,
    commonExport,
    getRequest,
    addParams,
    arrayNoRepeat,
    arrayCompare,
    thousand,
    downFile,
    addEvent,
    dataType,
    getDaysInOneMonth,
    dateDiff,
    debounce
   }


