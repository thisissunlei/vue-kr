
<template lang="html">
  <div class="select-tree">
        <div style="width:200px" @click="inputClick">
            <Input 
                readonly 
                v-model="treeInput" 
                :placeholder="placeholder"     
            />
        </div>
        <div  class="select" v-if="mask" style="width:200px">
            <!--<Input 
                v-model="searchValue" 
                class='search-input' 
                @on-enter="enderTool"
                placeholder="请输入搜索关键字"  
             />-->
            <div class='tree-scroll' id="treeScroll">
                <Tree 
                    :data="data" 
                    show-checkbox
                    @on-check-change="checkChange"
                />
            </div>
            <div  class='tree-btn'>
                <Button type="primary" size="small" @click="sureClick" style="margin-right:10px;">确定</Button>
                <Button type="text" size="small" @click="clearClick">取消</Button>
            </div>
        </div>
  </div>
</template>

<script>

export default {
     props:{
        data:{
            default:()=>[],
            type:Array,
            required:true,
        },
        placeholder:{
            default:'请选择...',
            type:String
        }
    },
    data(){
		return {
            treeInput:'',
            mask:false,
            checkValue:[],

            searchValue:'',
            htmlBox:'',
            oldContent:"",
		}
    },
    /*updated(){
         var htmlBox=document.getElementById('treeScroll');
         if(htmlBox){
            this.htmlBox = htmlBox;
            console.log(this.htmlBox)
            this.oldContent = this.htmlBox.innerHTML;
         }
    },*/
    methods:{
        checkChange(event){
            this.checkValue=event;
            this.$emit('checkChange',event)
        },
        inputClick(){
            this.mask=!this.mask;           
        },
        sureClick(){
            this.mask=false;
            var str='';
            if(this.checkValue.length){
                this.checkValue.map((item,index)=>{
                    item.checked=true;
                    if(this.checkValue.length-1==index){
                        str+=item.title;
                    }else{
                        str+=item.title+',';
                    }
                })
            }
            this.treeInput=str;
        },
        clearClick(){
            this.mask=false;
        },
        enderTool(event){
            var inputValue = event.target.value,
                childContet =  this.htmlBox.innerHTML;


            var regExp = new RegExp(inputValue, 'g')
            if (!inputValue||!regExp.test(childContet)) {
                this.htmlBox.innerHTML = this.oldContent;
                this.oldValue = '';
                alert("什么都没有",inputValue)
                return;
            }else{
                inputValue = inputValue.replace(/\s+/g,"");
                var NodeLenght = 0

                if(this.oldValue !== inputValue){
                    console.log("11111",this.oldContent,inputValue)
                    childContet = this.oldContent;

                    childContet = childContet.replace(regExp,'<span class="height">'+inputValue+'</span>')

                    this.htmlBox.innerHTML = childContet;

                }
                var nodes = this.getNode('.height');
                NodeLenght= nodes.length;
                this.goLocaltion(nodes,this.keyNum)
                this.oldValue = inputValue;


                if(this.keyNum == NodeLenght-1){
                    this.keyNum = 0;
                }else{
                    this.keyNum++;
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .select-tree{
        .select{
                max-height: 300px;
                margin: 5px 0;
                overflow: hidden;
                padding: 30px 0px;
                background-color: #fff;
                box-sizing: border-box;
                border-radius: 4px;
                box-shadow: 0 1px 6px rgba(0,0,0,.2);
                position: relative;
                z-index: 900;
                .tree-scroll{
                    max-height: 200px;
                    overflow: scroll; 
                    padding:0 5px;
                    box-sizing: border-box;
                }
                .tree-btn{
                    width:100%;
                    background: #F3F3F3;
                    text-align: center;
                    position: absolute;
                    bottom:0;
                }
                .search-input{
                    width: 200px;
                    position: absolute;
                    top: 0;
                }
        }
    }
</style>