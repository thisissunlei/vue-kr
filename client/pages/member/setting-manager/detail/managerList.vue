<template>
<div class="g-member-manager-list">
         <div class="u-search-box">
             <div class="u-search-list" style="margin-left:30px;">
                  <SearchForm 
                        placeholder="请输入搜索关键词"
                        :openSearch="true"
                        :onSubmit="lowerSubmit"
                        :searchFilter="searchFilter"
                    />
                    <div class="u-status-tip">
                        <div class="u-tip-txt">
                            <span class="u-tip-icon"></span>
                            <span>关于管理员激活状态</span>
                        </div>
                        <div class="u-tip-content u-show">
                            <div class="u-icon-trigon"></div>
                           <p>1.  若该管理员登录过APP或官网-会员中心，系统认定为其“已激活”；</p> 
                           <p> 2.  若管理员一直未激活，请注意提醒Ta ，避免无法接收企业账单、管理企业等情况。</p> 
                        </div>
                    </div>
                   
            </div>
		</div>
        <Table border :columns="list" :data="listInfo"></Table>
        <div v-if="totalCount>15" style="margin: 10px;height:40px;overflow: hidden">
            <div style="float: right;">
                <Page   
                    :total="totalCount" 
                    :page-size="pageSize"
                    show-total 
                    show-elevator
                    @on-change="changePage"
                ></Page>
            </div>
        </div>
</div>
</template>

<script>

import SearchForm from '~/components/SearchForm';

export default {
    components:{
        SearchForm
    },
    data(){
        return{
            totalCount:0,
            pageSize:15,
            listInfo:[],
            mbrName:'',
            Params:{
                page:1,
                pageSize:15
            },
            searchFilter:[
                {
                    label:'姓名',
                    value:'mbrName'
                },
                {
                    label:'手机号',
                    value:''
                }
            ],
            list:[
				{
				 title: '姓名',
                 key: 'mbrName',
				 align:'center',
                },
                {
				 title: '联系电话',
                 key: 'mbrPhone',
				 align:'center',
                },
                {
				 title: '邮箱',
                 key: 'mbrEmail',
				 align:'center',
                },
                {
				 title: '成员类型',
                 key: 'enterCmtName',
				 align:'center',
				},
				{
				 title: '入驻社区',
                 key: 'enterCmtName',
				 align:'center',
                },
                {
				 title: '管理的社区',
                 key: 'manageCmtName',
				 align:'center',
				},
                {
				 title: '激活状态  ',
                 key: 'enterCmtName',
				 align:'center',
				},
				// {
				//  title: '管理员',
                //  key: 'isManager',
				//  align:'center',
				//  render(h,obj){
				// 	let manager= obj.row.isManager=="1"?'是':'否';
				// 	return manager;
				//   }
				// },
				
				{
				 title: '操作',
                 key: 'operation',
				 align:'center',
				 render:(h,obj)=>{
					  return h('div', [
						h('Button', {
							props: {
								type: 'text',
								size: 'small'
							},
							style: {
								color:'#2b85e4'
							},
							on: {
								click: () => {
									this.setManager(obj.row)
								}
							}
						}, '设置管理员')
						
					]);
				 }
				},
			],
        }
    },
    mounted(){
        this.getInfo();
    },
    methods:{
        changePage(page){
			this.Params.page=page;
			this.getInfo();
        },
        getInfo(){
			let {params}=this.$route;
			this.Params.csrId=params.csrId;
			this.$http.get('customer-manager-staff-list', this.Params).then((res)=>{
				this.listInfo=res.data.items;
				this.totalCount=res.data.totalCount;
			}).catch((err)=>{
				this.$Notice.error({
					title:err.message
				});
			})
        },
        lowerSubmit(form){
            this.Params.page=1;
            this.Params.mbrName=form.mbrName;
            this.getInfo();
        },
        setManager(params){
			this.itemDetail=params;
			//this.hideTip();
        },
        
    }
}
</script>

<style lang="less">
.g-member-manager-list{
    padding-bottom:30px;
    .u-search-list{
        height: 40px;
        clear: both;
    }
    .u-status-tip{
        width:150px;
        float:right;
        line-height:30px;
        position: relative;
       
        span{
          font-size: 12px;
          color: #666666;  
        }
        .u-tip-icon{
            width:13px;
            height:13px;
            display: inline-block;
            margin-right:7px;
            vertical-align: -2px;
            background: url('./images/question.svg') no-repeat center center;
            background-size:100% 100%;
        }
        .u-tip-content{
            display: none;
            width:217px;
            height:120px;
            line-height: 20px;
            background: #575D6A;
            border-radius: 4px;
            font-size: 12px;
            color: #FFFFFF;
            padding:10px;
            box-sizing: border-box;
            position: absolute;
            left:-102px;
            top:40px;
            z-index: 900;
           
           .u-icon-trigon{
                width:0;
                height:0;
                border:6px solid transparent;
                border-bottom-color: #575D6A;
                position: absolute;
                top:-12px;
                left:50%;
                transform: translateX(-50%);
                
           }
        }
        .u-tip-txt{
             white-space: nowrap;
             &:hover+.u-show{
                display: inline-block;

            } 
        }
       
    }
}
</style>

