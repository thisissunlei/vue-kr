

<template>  
    <div class="assets-manage">
        <div class="asset-content">
            <div class="tab-list">
                <span class="tab-span"  v-for="(item, index) in tablist"
                :key="index" @click='selectTab(item.code)' :class="{'tab-active':selectedTab==item.code}">{{item.name}}</span>
            </div>
            <div class="tab-content">
                <Annex v-if="selectedTab == 'annex'"/>
                <Info v-if="selectedTab == 'basic'" />
            </div>
        </div>
    </div>
    

</template>

<script>
    import utils from '~/plugins/utils';
    import Annex from './annex.vue'; 
    import Info from './info.vue'; 


    export default {
        name:'orderManange',
        components:{
            Annex,
            Info
        },
        data (){
            return{
                //tablist
                tablist:[{
                    name:'基本信息',
                    code:'basic'
                },{
                    name:'工商信息',
                    code:'ICBC'
                },{
                    name:'附件资料',
                    code:'annex'
                },{
                    name:'招商资料',
                    code:'merchants'
                },{
                    name:'修改记录',
                    code:'records'
                }],
                selectedTab:'basic',
                
            }
        },
        methods:{
            selectTab(name){
                this.selectedTab = name;
            },
        },
        mounted(){
            GLOBALSIDESWITCH('false');
        }
    
    }
</script>
<style lang="less" scoped>
    .assets-manage{
        .asset-content{
            padding-left: 25px;
            display: flex;
            .tab-list{
                width: 135px;
                display: inline-block;
                .tab-span{
                    vertical-align: top;
                    display: block;
                    width:108px;
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    background: #F7F7F7;
                    border: 1px solid #DFDFDF;
                    border-bottom: none;
                    color:#666;
                    font-size: 14px;
                    cursor: pointer;
                    transition:all .5;
                    
                }
                .tab-span:last-child{
                    border-bottom:1px solid #DFDFDF
                }
                .tab-active{
                    background-color: #fff;
                    border-right:none;
                    color:#4A90E2;
                    transition:all .5;
                }
            }
            .tab-content{
                vertical-align: top;
            }
        }
    }
</style>