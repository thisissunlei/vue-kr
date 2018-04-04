

<template>  
    <div class="assets-manage">
        <Form ref="basicInfo" :model="basicInfo" :rules="ruleValidate" class="basic-form">
             <Row>  
                <Col class="col">
                   <KrField 
                        :readOrEdit="true" 
                        type="text"  
                        label="含税" 
                        value="123er" 
                        name='try'
                        inline="true"
                        placeholder="请输s入含税收入" 
                        :maxLength="200"
                        @okClick="okClick"
                    />
                </Col>
                
                <Col class="col">
                     <KrField 
                        :readOrEdit="true" 
                        type="select"  
                        label="含税" 
                        value="202" 
                        name='try'
                        inline="true"
                        placeholder="selectData" 
                        :selectData="selectData"
                        :maxLength="200"
                        @okClick="okClick"
                    />
                </Col>
                <Col class="col">
                     <KrField 
                        :readOrEdit="true" 
                        type="date"  
                        label="含税" 
                        value="202" 
                        name='try'
                        inline="true"
                        placeholder="selectData" 
                        :maxLength="200"
                        @okClick="okClick"
                    />
                </Col>
                
            </Row>
            
           
            
        </Form>
    </div>
    

</template>

<script>
    import utils from '~/plugins/utils';
    import KrField from '~/components/KrField';


    export default {
        components:{
            KrField
        },
        data (){
            return{
                ruleValidate:{},
                basicInfo:{},
                selectData:[]
            }
        },
        methods:{
            selectTab(name){
                this.selectedTab = name;
            },
            okClick(value){
                console.log('okClick',value)
            }
        },
        mounted(){
            GLOBALSIDESWITCH('false');
        }
    
    }
</script>
<style lang="less" scoped>
    .basic-form{
        width: 794px;
    }
    .col{
        display: inline-block;
        width: 50%;
        max-width: 400px;
        padding-right: 10px;
        vertical-align:top;
    }
</style>