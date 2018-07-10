<template>

<div>
     
    <Form  :model="formItem" label-position="left"  class="temp-humidity-searchform">
            <FormItem label="日期:">
                <DatePicker 
                    type="datetimerange" 
                    placeholder="请选择日期和时间" 
                    style="width: 300px"  
                    confirm
                    @on-change = 'changeDate'
                    @on-ok = "searchList"
                    @on-clear = "clearDate"
                >
                </DatePicker>
               
                </DatePicker>
            </FormItem>
        </Form>
        

</div>

</template>

<script>
import dateUtils from 'vue-dateutils';
export default{
    name:'equipmentSearch',
    data (){
		return{
           
            formItem : {
               

            },
          
		}

    },
    mounted(){

        
        
    },
    props:[
       
    ],
    components: {
     
    },
    methods:{
       
        changeDate(data){
            console.log("data========",data);
            this.formItem  = {
                startDate :data[0]||'',
                endDate :data[1]||'',
            }
            
        },
        clearDate(){
            this.formItem = {
                startDate :'',
                endDate :'',
            };
            this.$emit("submitSearchData",this.formItem);
        },
        searchList(){
            this.$emit("submitSearchData",this.formItem);
        }


    },
    

}
</script>
<style lang="less" >
.temp-humidity-searchform{
    padding: 10px 0 0 20px;
}
</style>