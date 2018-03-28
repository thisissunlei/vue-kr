
<template lang="html">
  <div class="select-tree">
        <div style="width:200px" @click="inputClick">
            <Input 
                @on-change="inputSearch"  
                v-model="treeInput" 
                :placeholder="placeholder"     
            />
        </div>
        <div  class="select" v-if="mask" v-click-outside="clickedOutside">
            <div class="tree-content">
                 <Tree 
                    :data="nowData" 
                    show-checkbox
                    @on-check-change="checkChange"
                    @on-toggle-expand="toggleExpand"
                />
            </div>
           
             <div class="footer">
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
            treeInput:'全部任务',
            mask:false,
            checkValue:[],
            nowData:this.data,

            str:'',

            num:0
		}
    },
    watch:{
        $props:{
            deep:true,
            handler(nextProps) {
               this.nowData=nextProps.data;
               //this.treeInput='';
            }
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
    directives:{
        'click-outside':{
            bind: function (el, binding, vNode) {
                if (typeof binding.value !== 'function') {
                    var compName = vNode.context.name;
                    var warn = '[Vue-click-outside:] provided expression ' + binding.expression + ' is not a function, but has to be';
                    if (compName) {
                        warn += 'Found in component ' + compName;
                    }
                    console.warn(warn);
                }
               
                var handler = function(e) {
                    if (!el.contains(e.target) && el !== e.target) {
                        binding.value(e);
                    }
                };
                el.__vueClickOutside__ = handler;
                document.addEventListener('click', handler);
            },
            unbind: function (el, binding) {
                document.removeEventListener('click', el.__vueClickOutside__);
                el.__vueClickOutside__ = null;
            }
        }
    },
    methods:{
        clickedOutside: function () {
            this.mask = false;
        },
        checkChange(event){
            this.checkValue=event;
            this.$emit('checkChange',event)
        },
        inputClick(){
            this.clearClick();
        },
        toggleExpand(event){
           this.nowData = this.changeTreeData(event,this.nowData);
        },
        inputSearch(event){
            var searchKey = event.target.value;
            this.nowData = this.searchTreeData(searchKey,this.nowData).allData;
            // console.log(this.nowData,"ppppp")
            // this.$emit('search',searchKey);
        },
        calculateTree(data){
            data.map((item,index)=>{
                this.num+=1;
                if(item.children&&item.children.length){
                    this.calculateTree(item.children);
                }
            })
            return this.num
        },
        treeSelect(data){
            data.map((item,index)=>{
                    if(this.checkValue.length-1==index){
                        this.str+=item.title;
                    }else{
                        this.str+=item.title+',';
                    }
                    if(item.children&&item.children.length){
                        this.treeSelect(item.children);
                    }
            })
            //this.treeInput=this.str;
            return data
        },
        sureClick(){
            this.clearClick();
            this.num=0;
            if(this.checkValue.length){
                if(Number(this.calculateTree(this.nowData))==Number(this.checkValue.length)){
                    this.treeInput="全部任务"
                }else{
                    this.treeInput="自定义"
                }
                this.treeSelect(this.checkValue);
            }
            this.$emit('okClick',this.checkValue);
        },
        clearClick(){
            this.mask=!this.mask;
        },

        changeTreeData(event,data){
            var allData = data.map((item,index)=>{
                if(item.t_id == event.t_id){
                    item.expand = event.expand;
                }
                if(item.children && item.children.length){
                    item.children = this.changeTreeData(event,item.children);
                }
                return item;
            })
            return allData;
        },
        searchTreeData(searchKey,data){
            var isOpen = false;
            var allData = data.map((item,index)=>{
                if( searchKey && item.title.indexOf(searchKey) != -1 ){
                    item.expand = true
                    isOpen = true;  
                }else{
                     item.expand = false;
                }   
                
                if(item.children && item.children.length){
                    let obj = this.searchTreeData(searchKey,item.children);
                    if(obj.isOpen){
                        item.expand = true;
                        isOpen = true;
                    }
                    item.children = obj.allData;
                }
                return item;
            })
         
            return  {allData:allData,isOpen:isOpen};

        }
    }
}
</script>

<style lang="less" scoped>
    .select-tree{
        text-align: left;
        .select{

            .tree-content{
                min-width: 200px;
                max-height: 150px;
                overflow: auto;
                margin: 5px 0;
                padding: 5px 10px;
                background-color: #fff;
                box-sizing: border-box;
            }
            
            border-radius: 4px;
            box-shadow: 0 1px 6px rgba(0,0,0,.2);
            background-color: #fff;
            position: absolute;
            z-index: 900;
            .footer{
               text-align: center;
               background: #eee;
            }

        }
    }
</style>