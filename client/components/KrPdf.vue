
<template>
  <div class="cpdf">
   <div class="center">
   
      <Button type="info" @click="downSwitch">下载pdf</Button>
      <div style="float:right;padding:0px 0px 0px 20px">
         <!-- <Button @click="prevPage" icon="minus"/> -->
            <!-- {{page_num+'/'+page_count}} -->
          <!-- <Button @click="nextPage" icon="plus"/>   -->
      </div>
      <!-- <Button @click="addScale" icon="plus"></Button>
      
      <Button @click="minusScale" icon="minus"></Button> -->
     </div>
     <div class="pdf-box"  ref="krPdfViewBox"  />
  </div>
</template>


<script>
 export default {
  /**
	 *  @param {String} pdfurl 要显示的pdf的地址
	 *  @param {Function} downSwitch 现在按钮点击回调
	 *  @param {String, Number} height pdf每一页的默认高度
	 *  @param {Boolean} isScroll 是否懒加载 
	*/
  props: {
    pdfurl:String,
    downSwitch:Function,
    height:{
      type:[String, Number],
      default:"auto"
    },
    isScroll:{
      type:Boolean,
      default:true,
    }
  },

  data() {
    return {
      pdfDoc: null, //pdfjs 生成的对象
      pageNum: 1,//当前的页数
      pageRendering: false,
      pageNumPending: null,
      scale: 1.2,//放大倍数
      page_num: 0,//当前页数
      page_count: 0,//总页数
      maxscale: 2,//最大放大倍数
      minscale: 0.8,//最小放大倍数
    }
  },

  methods: {
    renderPage(num) { //渲染pdf
        let vm = this
        this.pageRendering = true;
        let tagCanvas = document.createElement("canvas");
        tagCanvas.id = "pdf-view"+num;
        tagCanvas.className = "kr-pdf-page";
        vm.$refs.krPdfViewBox.appendChild(tagCanvas);
        let canvas = document.getElementById('pdf-view'+num)
        let ctx = canvas.getContext('2d');
        this.pdfDoc.getPage(num).then(function(page) {
          var viewport = page.getViewport(vm.scale);
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function() {
          vm.pageRendering = false;
          if(vm.pageNumPending !== null) {
            vm.renderPage(vm.pageNumPending);
            vm.pageNumPending = null;
          }
        });
     });
     vm.page_num = vm.pageNum;
    },

    addScale() {//放大
     if(this.scale >= this.maxscale) {
       return
     }
     this.scale += 0.1;
     this.queueRenderPage(this.pageNum)
    },

    minusScale() {//缩小
     if(this.scale <= this.minscale) {
       return
     }
     this.scale -= 0.1;
     this.queueRenderPage(this.pageNum)
    },

    prevPage() {//上一页
     let vm = this
     if(vm.pageNum <= 1) {
       return;
     }
     vm.pageNum--;
     vm.queueRenderPage(vm.pageNum);
    },

    nextPage() {//下一页
     let vm = this
     if(vm.pageNum >= vm.page_count) {
       return;
     }
     vm.pageNum++;
     vm.queueRenderPage(vm.pageNum);
    },
 
    queueRenderPage(num) {
      if(this.pageRendering) {
        this.pageNumPending = num;
      } else {
        this.renderPage(num);
      }
    }
  },
 
  mounted() {
    let vm = this
    PDFJS.getDocument(vm.pdfurl).then(function(pdfDoc_,demo) { //初始化pdf
      vm.pdfDoc = pdfDoc_;
      vm.page_count = vm.pdfDoc.numPages;
      for(let i=1;i<=vm.page_count;i++){
        vm.renderPage(i);
      }
    });
  }
 }
</script>

<style lang="less">
.cpdf {
  .center{
    height: 40px;
    line-height: 40px;
    margin: 10px 0px;
  }
  .kr-pdf-page{
    display: block;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  }
  .pdf-box{
    overflow:auto;
    width: 100%;
  }
 }
</style>