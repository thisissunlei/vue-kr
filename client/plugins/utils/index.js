
   /** 数字金额大写转换(可以处理整数,小数,负数) */
    function smalltoBIG(n) {
        var fraction = ['角', '分'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
        var head = n < 0 ? '负' : '';
        n = Math.abs(n);

        var s = '';

        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
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
            var res = array.filter(function(item, index, array){
                return array.indexOf(item) === index;
            })
            return res;    
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
   
   export default{
      smalltoBIG,
      clearForm,
      commonExport,
      getRequest,
      addParams,
      arrayNoRepeat,
      arrayCompare
   }
