 <template> 
       <div>        
            <Form ref="formItem" :model="formItem"  label-position="left" class="goods-status">
                <div class="coloname"><span>您选择了以下</span><span style="color:red;">{{num}}</span><span>个商品:</span></div>

                <Form-item label="独立办公室:" style="margin-top:20px; word-wrap:break-word;" v-if="independentOfficeStr.length">
                    <span
                      v-for="(item,index) in independentOfficeStr"
                      :key="item.id"
                    >
                      <span v-if="index!=0">,</span><span :style="'color:'+item.color">{{item.name}}</span>
                    </span>
                </Form-item>
                
                <Form-item  label="固定办公桌:"  style="margin-top:20px; word-wrap:break-word;margin-right:20px;" v-if="fixedLocationStr.length">
                    <span
                      v-for="(item,index) in fixedLocationStr"
                      :key="item.id"
                    >
                      <span v-if="index!=0">,</span><span :style="'color:'+item.color">{{item.code}}</span>
                    </span>
                </Form-item>

      
              <Form-item label="移动办公桌:" style="margin-top:20px; word-wrap:break-word;" v-if="opentLocationStr.length">
                    <span
                      v-for="(item,index) in opentLocationStr"
                      :key="item.id"
                    >
                      <span v-if="index!=0">,</span><span :style="'color:'+item.color">{{item.code}}</span>
                    </span>
                </Form-item>
         </Form>

         <div v-if="!errorD.length">点击“创建”将创建同名的物理空间，并自动绑定。物理空间需绑定硬件设备后才可用。</div>
         <div v-if="errorD.length"><span style="color:red;">部分商品创建过空间，并且还未解除绑定。</span><span>如仍需创建请先解除原有的绑定</span></div>

         <div slot="footer" style="text-align:center;margin-top:30px;margin-bottom: 20px;">
             <Button type="primary" @click="submitSpace">创建</Button>
             <Button type="ghost" style="margin-left:20px" @click="cancelSpace">取消</Button>
         </div>
    </div>
</template>

<script>
import dateUtils from 'vue-dateutils';
    export default{
        name:'HeighSearch',
        props: {
             data:{
                 type:Array,
                 default:()=>[],   
             },
             errorData:{
                 type:Array,
                 default:()=>[],   
             }
        },
        data (){
            return{
                errorD:[],
                independentOfficeStr:[],
                fixedLocationStr:[],
                opentLocationStr:[],
                formItem:{
                    batchDate:''
                },
                num:0
            }
        },
        mounted(){
            this.dataFormat(this.data);       
        },
        watch:{
            errorData:function(val){
               this.errorD=val;
               this.dataFormat(this.data);
            }
        },
        updated(){
            this.$emit('updateForm',this.formItem);
        },
        methods:{
            dataFormat(data){
                this.independentOfficeStr=[];
                this.fixedLocationStr=[];
                this.opentLocationStr=[];
                let arr = [].concat(data);
                let error=[].concat(this.errorD);
                let goodsMiddle=[];
                this.num=arr.length;
                arr.length&&arr.map((item,index)=>{
                    if(error.length){
                        error.map((items,indexs)=>{
                            if(items.id==item.id){
                                item.color='red';
                            }
                        })               
                    }else{
                        item.color='';
                    }
                    if(item.goodsTypeName == '独立办公室'){
                        this.independentOfficeStr.push(item);
                    }else if(item.goodsTypeName == '固定办公桌'){
                        this.fixedLocationStr.push(item);
                    }else if(item.goodsTypeName == '移动办公桌'){
                        this.opentLocationStr.push(item);
                    }
                    
                    var list={};
                    list.communityId=item.communityId;
                    list.floor=item.floor;
                    list.quotedPrice=item.quotedPrice;
                    list.seatId=item.id;
                    list.seatType=item.seatType;
                    list.color=item.color;
                    list.capacity=item.capacity;
                    goodsMiddle.push(list);
                })
                this.formItem.batchDate=JSON.stringify(goodsMiddle);
            },
            submitSpace(){
                this.$emit('submit',this.formItem);
            },
            cancelSpace(){
                this.$emit('cancel');
            }
        }
    }
</script>

<style lang='less'>
.goods-status{
    .coloname{
        display:inline-block;
        font-size: 14px;
        font-weight:500;
    }
   .ivu-form-item-label{
       font-size: 14px;
       font-weight:500;
       margin-top: -2px;
   }
}
</style>  