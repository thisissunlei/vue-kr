<template>
    <div>
       <FlagLabel label="你好中国" 
            :data="timeObj"
            :startDate="{
                year:2018,
                month:3,
                dayNum:31
            }"
            minCalibration="50"
        />
        <ImportFile 
            @downFile="downFile"
            @close="close"
            @upload="upload"
        />
        <Button type="primary" @click="jumpCreate">新建</Button>
    </div>
</template>

<script>
import FlagLabel from '~/components/FlagLabel';
import ToolTip from '~/components/ToolTip';
import ImportFile from '~/components/ImportFile';
export default {
    components:{
        FlagLabel,
        ToolTip,
        ImportFile
    },
    data() {
        return{
            timeObj:{
                actualEndTime:1521590400000,
                actualStartTime:1520726400000,
                planEndTime:1521504000000,
                planStartTime:1520640000000
            },
            file:{},
            num:''
        }
    },
    methods:{
       jumpCreate(){
                let data={
                    text:this.num
                }
                this.$http.get('goods-ceshi', data).then((res)=>{
                   
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
       },
       downFile(){

       },
       close(){
        
       },
       submitFile(){
         let _this = this;
		 var form = new FormData();
         form.append('goodsData',this.file);
         form.append('communityId',this.file);
		 if(!this.file.name){
             this.$Notice.error({
                title:'请选择上传文件'
             });
			 return false;
		 }
		 var xhr = new XMLHttpRequest();
		 xhr.onreadystatechange = function() {
			 if (xhr.readyState === 4) {
				 if (xhr.status === 200) {
					 if (xhr.response && xhr.response.code > 0) {
						  _this.success(xhr.response);
					 } else {
                          _this.error(xhr.response);
                         _this.$Notice.error({
                            title:xhr.response.message
                         });
					 }
				 }else {
                     _this.$Notice.error({
                        title:'上传失败'
                     });
				 }
			 }
		 };
		 xhr.open('POST','//jsonplaceholder.typicode.com/posts/', true);
		 xhr.responseType = 'json';
		 xhr.send(form);
       },
       success(res){
         
       },
       error(res){

       },
       upload(file){
           this.file=file;
           this.judgeRepeat();
       },
       judgeRepeat(){

       }
    }
}
</script>

<style lang='less' scoped>
     
</style>
