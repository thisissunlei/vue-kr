<template>
    <div class="archives-detail">
        <div v-for="(item ,index) in collapseData.items" :key="item.id">
            <ClassificationBox  
                :value="item.index" 
                :title="item.label" 
                :isBorder="true" 
                type="num"
                :isEnd="item.isEnd"
            >
                <div slot="content"  >
                    <div v-for="everyData in item.data" :key="everyData.id" style="min-height:40px">
                        <span class="field-title" >{{everyData.displayName}}</span>
                        <KrField 
                            :name="everyData.fieldName"
                            style="display:inline-block;"
                            :readOrEdit="true" 
                            :type="getFieldType(everyData.fieldType)" 
                            label="含税" 
                            :selectParam="everyData.params"
                            :value="getValue(everyData)"
                            placeholder="请输入含税收入" 
                            @recordClick="recordClick"
                            @okClick="okClick"
                        />
                    </div>
                </div>
            </ClassificationBox>    
        </div>
           
        <Drawer 
            :openDrawer="openRecord"
            iconType="view-icon"
            :close="cancelRecord"
            width="735"
        >   
            <div class="record-title" slot="title">
                <div class="big-text">编辑记录</div>
                <div class="small-text">招商经理</div>
            </div>
            <RecordDetail :data="data"/>
        </Drawer>
    </div>
</template>


<script>
import KrField from '~/components/KrField';
import ClassificationBox from '~/components/ClassificationBox';
import Drawer from '~/components/Drawer'
import RecordDetail from './record-detail'

export default {
    components:{
        ClassificationBox,
        KrField,
        Drawer,
        RecordDetail
    },
    data(){
       return {
           openRecord:false,
           imgs:[],
           openIndex:0,
           endIndex:0,
           //查看编辑记录数据
           data:[
               {comment:'dasdfsdf',detail:"ppp",uTime:'123134112',updator:'作者以'},
               {comment:'vvvvv',detail:"kkkk",uTime:'65656756756',updator:'作者以'},
               {comment:'dasdfsdf',detail:"ppp",uTime:'123134112',updator:'作者以'}
           ],
           // 物业基信息
           collapseData:this.dataFarmat({
               code:'qq',
               label:'物业基础信息',
               items:[
                {
                    label:"物业基础",
                    t_id:1,
                    value:1,
                    type:'GROUP',
                    data:[
                        {displayName:'项目名称',fieldName:"name",fieldType:'TEXT',fieldValue:'TEXT'},
                        {displayName:'所在区',fieldName:'localtion',fieldType:'CITY',fieldValue:[1,1,1]},
                        {displayName:'所在楼层',fieldName:'num',fieldType:'SELECT',fieldValue:'',params:'com.krspace.erp.api.enums.pm.PmDepartment'},
                        {displayName:'入驻项目资料',fieldName:'file',fieldType:'FILE',fieldValue:'[]'},
                        {displayName:'入驻时间',fieldName:'date',fieldType:'DATE',fieldValue:'DATE'},
                    ]
               },
               {
                    label:"其他东西",
                    t_id:1,
                    value:1,
                    type:'GROUP',
                    data:[
                        {displayName:'项目名称',fieldName:"name",fieldType:'TEXT',fieldValue:''},
                        {displayName:'所在区',fieldName:'localtion',fieldType:'CITY',fieldValue:''},
                        {displayName:'所在楼层',fieldName:'num',fieldType:'SELECT',fieldValue:'INVEST',params:'com.krspace.erp.api.enums.pm.PmDepartment'},
                        // {displayName:'入驻项目资料',fieldName:'file',fieldType:'FILE',fieldValue:'FILE'},
                        {displayName:'入驻时间',fieldName:'date',fieldType:'DATE',fieldValue:''},
                    ]
               },
           ]})
       }
    },
    mounted(){
        
    },
    methods:{
        getFieldType(type){
            if(type=="TEXT"){
                return 'text'
            }else if(type=="SELECT"){
                return 'select'
            }else if(type=="CITY"){
                return 'city'
            }else if(type=="FILE"){
                return 'upFiles'
            }else if(type=="DATE"){
                return 'date'
            }else{
                return 'text'
            }
        }, 
       
        getValue(everyData){
            if(everyData.fieldType=="FILE"){
               return eval(everyData.fieldValue)
            }else {
                return everyData.fieldValue;
            }
        },
        dataFarmat(data){
            var group = [].concat(data.items);
            var index = 1;
            var endIndex = 0;
            for(var i=0;i<group.length;i++) {
                if(group[i].type=="GROUP"){
                    group[i].index = index;
                    group[i].isEnd = false;
                    endIndex = index;
                    index++;
                   
                }
            }
            if(group.length){
                group[endIndex-1].isEnd = true;
            }
            data.items = [].concat(group);
            this.endIndex = endIndex;
            return Object.assign({},data);
        },
        onChange(index){
            this.openIndex = index;
        },
        okClick(params){
            this.$http.get('get-enum-all-data',{
                enmuKey:params
            }).then((response)=>{
           
                this.selectData = [].concat(this.selectFormat(response.data))
                callback();
            }).catch((error)=>{
                // this.MessageType="error";
                // this.openMessage=true;
                // this.warn=error.message;
            })
            console.log("-------",params)
        },
        recordClick(value){
            var data = {fieldName:'projectName',projectId:51};
            this.$http.get('project－field-record',data).then((response)=>{
           
                console.log(response,"pppppp")
            }).catch((error)=>{
                // this.MessageType="error";
                // this.openMessage=true;
                // this.warn=error.message;
            })
            
            this.cancelRecord();
        },
        cancelRecord(){
            this.openRecord = !this.openRecord;
        }
    }
}

</script>

<style lang="less" >
   .archives-detail{
       background: #ffffff;
       padding:20px;
       padding-bottom:50px;
       .field-title{
           display:inline-block;
           min-width:150px;
           vertical-align: top;
       }
        .record-title{
            display: inline-block;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            vertical-align: middle;
            .big-text{
                height: 22px;
                line-height: 22px;
                font-size: 16px;
                color: #333333;
            }
            .small-text{
                line-height: 20px;
                height: 20px;
                font-size: 14px;
                color: #666666;
            }
        }
   }
</style>
