<template>
  <div class="g-upload-img">
       <Upload 
            name="imgUrl"
            multiple
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            :on-success="handleSuccess"
            :on-error="handleError"
            with-credentials
            :action="actionUrl" 
            :max-size="maxSize"
        >
              <slot></slot>
        </Upload>
  </div>
</template>
<script>
export default {
  props:{
     maxSize:{
         type:Number,
         defalut:null
     },
     format:{
         type:Array,
         defalut:[]
     },
     multiple:{
         type:Boolean,
         defalut:false
     }
  },
  data(){
      return{
          actionUrl:'',
      }
  },
  methods:{
     handleSuccess(){

     },
     handleError(){

     }
  }
}
</script>
<style lang="less">

</style>


