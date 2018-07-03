<template>
  <div class="g-power-owner">
            <SectionTitle title="门禁权限详情" />
            <div class="page-box">
                <DeviceData :data="deviceInfo"/>
                <div class="table-box">
                    <Table :columns="columns1" :data="powerOwnerList" size="small" :loading="loading"></Table>
                </div>
            </div>
    </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import DeviceData from './deviceData';
import dateUtils from 'vue-dateutils';


export default {
   components:{
      SectionTitle,DeviceData
   },
   data(){
     return{
        loading: true,
        deviceInfo:{
            doorCode :"",
            title :"",
            deviceId :"",
        },
        powerOwnerList : [],
        searchData :{
            id :''
        },

        columns1: [
                    
                    {
                        title: '姓名',
                        key: 'name',
                        align:'center',
                        render: (h, obj) => {
                            return h('div', [
                                h('span', {
                                    
                                    on: {
                                        click: () => {
                                            this.toMemebrDetail(obj)
                                        }
                                    }
                                },obj.row.name ),
                               
                            ]);
                        }

                        
                    },
                    {
                        title: '手机号',
                        key: 'phone',
                        align:'center',

                        
                    },
                    {
                        title: '权限所有时间',
                        key: 'time',
                        align:'center',
                        width:"32%",
                        render(h,obj){
                           return h('div', [
                               
                                h('span', dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(obj.row.startAt))+"——"+dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(obj.row.endAt)))
                            ]);
                            
                        }
                    },
                    
                    {
                        title: '操作',
                        key: 'action',
                        width:"12%",
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params)
                                        }
                                    }
                                }, '查看会员权限'),
                               
                            ]);
                        }
                    }
                    
                ],
                openLogList: []
     }
   },
   created(){

   },
   mounted(){
        GLOBALSIDESWITCH("false");
        this.searchData.id = this.$route.query.id || "";
        this.getListData();
   },
   methods:{
       
       getListData(){

           let _this =this;
           let params = this.searchData;

            this.$http.get('get-smart-hardware-power-owner',params).then((res)=>{

                _this.loading = false;
                var resData = res.data;
                _this.powerOwnerList = resData.list;
                _this.deviceInfo = resData.door || {};
                
                
            }).catch((error)=>{
                _this.$Notice.error({
                    title:error.message
                });
            })
       },

       show(params){
           var itemData = params.row;
           var deviceId = this.deviceInfo.deviceId;
           window.open(`../#/user/memberdoormanage/${itemData.uid}?deviceId=${deviceId}&derivedFromGroup=${itemData.derivedFromGroup}`,'_blank');

       },
       toMemebrDetail(params){
           var itemData = params.row;
           window.open(`../new/#/member/memberManage/list/${itemData.uid}`,'_blank');

       },
      
     
      


   }

}
</script>
<style lang="less">
    .g-power-owner{
        .page-box{
            padding:10px 20px;
        }
    }
</style>


