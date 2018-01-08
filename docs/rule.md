##规范：


###1.前言：

```
每一个 Vue 组件（等同于模块）首先必须专注于解决一个单一的问题，
独立的、可复用的、微小的和可测试的。

如果你的组件做了太多的事或是变得臃肿,请将其拆分成更小的组件并保
持单一的原则。一般来说，尽量保证每一个文件的代码行数不要超过100 行。也请保证组件可独立的运行。比较好的做法是增加一个单独的demo示例。

```


###2.组件/页面：


**(1)导出一个清晰、组织有序的组件**

```
    <template lang="html">
	    <div class="Ranger__Wrapper">
	        <!-- ... -->
	    </div>
   </template>

   <script type="text/javascript">
	  export default {

	  	el,

	  	name/parent,

	  	functional,

	  	delimiters/comments,

	  	components/directives/filters,

	  	extends/mixins,

	  	inheritAttrs/model/props(propsData),

	  	data/computed,

	  	watch/生命周期钩子,

	  	methods,

	  	template/render/renderError

      };
    </script>

	<style scoped>
	  .Ranger__Wrapper { /* ... */ }
	</style> 


```

```
 
 三大模块顺序template——script——style,顺序放置,

 模块之间,保留一个空行,自定义的模块,要放到最后。


```


**(2)组件名应该为多个单词**

```
  尽量简短2-3个单词,
  有意义具有可读性(UserList),
  切勿使用保留字

```


**(3)组件props原子化**

```
虽然 Vue.js支持传递复杂的JavaScript对象通过props属性,
但是你应该尽可能的使用原始类型的数据。尽量只使用JavaScript 原始类型（字符串、数字、布尔值）和函数。尽量避免复杂的对象。

<!-- 推荐 -->
<range-slider
  :values="[10, 20]"
  min="0"
  max="100"
  step="5"
  :on-slide="updateInputs"
  :on-end="updateResults">
</range-slider>

<!-- 避免 -->
<range-slider :config="complexConfigObject"></range-slider>

```


**(4)组件的data必须是一个函数**

 ```
     因为组件可能被多次调用,当data为普通对象时,data内的数据会被共享,
     为函数时,则每个组件生成为独立data作用域"

	 export default {
	  data () {
	    return {
	      foo: 'bar'
	    }
	  }
	}

 ```


**(5)把每个组件单独分成文件**



**(6)单文件组件文件的大小写**

```
 单文件组件的文件名应该要么始终是单词大写开头,要么始终是横线连接

 components/
 |- MyComponent.vue 

 components/
 |- my-component.vue

```


**(7)和父组件紧密耦合的子组件应该以父组件名作为前缀命名。**

  ```
	|- TodoList.vue
	|- TodoListItem.vue
	|- TodoListItemButton.vue

  ```



**(8)组件名中的单词顺序** 
  
  ```
    组件名应该以高级别的(通常是一般化描述的)单词开头,以描述性的修饰词结尾。

    |- SearchButtonClear.vue
    |- SearchButtonRun.vue
    |- SearchInputQuery.vue

  ```



**(9)自闭合组件**

  ```
  在单文件组件、字符串模板和JSX中没有内容的组件应该是自闭合的——但在DOM模板里
  永远不要这样做。

  <!-- 在单文件组件、字符串模板和JSX中 -->
   <MyComponent/>

  <!-- 在 DOM 模板中 -->
   <my-component></my-component>  

  ```


**(10)模板中的组件名大小写**
   
   ```
    <!-- 在单文件组件和字符串模板中 -->

		<MyComponent/>

	<!-- 在 DOM 模板中 -->

		<my-component></my-component>

   ```


**(11)JS/JSX中的组件名大小写**


    ```
     JS/JSX中的组件名应该始终是大驼峰的

     import MyComponent from './MyComponent.vue'

     export default {
	   name:'MyComponent',
	   // ...
	 }

	 反例：import myComponent from './MyComponent.vue'

    ```



**(12)组件名应该倾向于完整单词而不是缩写。**



**(13)Prop名大小写**

  ```
  在声明prop的时候,其命名应该始终使用小驼峰，而在模板和JSX中应该始终使用中划线。

  props: {
   greetingText: String
  }

  <WelcomeMessage greeting-text="hi"/>


  使用:prop传递数据类型为数字或boolean时,必须带:

  <Page :current=1 :total="100"/>

  ```



**(14)提供组件API文档**

```
使用Vue.js组件的过程中会创建Vue组件实例,这个实例是通过自定义属性配置的。
为了便于其他开发者使用该组件,对于这些自定义属性即组件API应该在README.md 
文件中进行说明。

```



###3.代码/样式：


**(1)元素顺序**

 元素(包括组件)的特性应该有统一的顺序

 ```
  
  is

  v-for

  v-if/v-else-if/v-else/v-show/v-cloak

  v-pre/v-once

  id

  ref/key/slot

  v-model

  其他特性(所有普通的绑定或未绑定的特性)

  v-on

  v-html/v-text


 ```


**(2)Prop定义**
 
 ```
  在你提交的代码中,prop的定义应该尽量详细，至少需要指定其类型。

  如果下面有多个对象,按字母顺序

  提供默认值

  使用type属性校验类型

  使用props之前先检查该prop是否存在

  props: {
	   max: {
        type: Number, //这里添加了数字类型的校验
        default() { return 10; },
       },
	}

 ```


**(3)为v-for设置键值**
 
 ```
  总是用key配合v-for
	<ul>
	  <li
	    v-for="todo in todos"
	    :key="todo.id"
	   >
	    {{ todo.text }}
	  </li>
	</ul>

 ```



**(4)避免v-if和v-for用在一起**
  
 ```
  永远不要把v-if和v-for同时用在同一个元素上。

 ```


**(5)为组件样式设置作用域**

 ```
  对于应用来说,顶级App组件和布局组件中的样式可以是全局的,
  但是其它所有组件都应该是有作用域的。
  
  1.单组件样式作用域加上scoped可以避免冲突;
  2.也可以在类名前加上统一的组件专属前缀;
  3.
   <button :class="[$style.button, $style.buttonClose]">X</button>

   <style module>
	.button {
	  border: none;
	}

	.buttonClose {
	  background-color: red;
	}
</style>


 ```


**(6)私有属性名**
  
  ```

  在插件、混入等扩展中始终为自定义的私有属性使用$_ 前缀。
  并附带一个命名空间以回避和其它作者的冲突 (比如 $_yourPluginName_)。
  
   var myGreatMixin = {
	  // ...
	  methods: {
	    $_myGreatMixin_update: function () {
	      // ...
	    }
	  }
   }


  ```



**(7)尽量使用缩写**

 ```
  比如:

     用style代替v-bind:style;

     用@click代替v-on:click。

     且全文保持统一,不要混用

 ```


**(8)多个特性的元素**

 ```
	多个特性的元素应该分多行撰写,每个特性一行。

	<img
	  src="https://vuejs.org/images/logo.png"
	  alt="Vue Logo"
	>
 
 ```



**(9)模板中简单的表达式**

```
 组件模板应该只包含简单的表达式,复杂的表达式则应该重构为计算属性或方法。

```



**(10)简单的计算属性**

```
 应该把复杂计算属性分割为尽可能多的更简单的属性

 computed: {
	  basePrice: function () {
	    return this.manufactureCost / (1 - this.profitMargin)
	  },
	  discount: function () {
	    return this.basePrice * (this.discountPercent || 0)
	  },
	  finalPrice: function () {
	    return this.basePrice - this.discount
	  }
 }

```



**(11)带引号的特性值**

```
 非空HTML特性值应该始终带引号(一般模版中属性用双引号,js中用单引号)

 <input type="text">
 <AppSidebar :style="{ width: sidebarWidth + 'px' }">

 反例:

 <input type=text>
 <AppSidebar :style={width:sidebarWidth+'px'}>

```




**(12)组件/实例选项中的空行**
  
  ```

   你可能想在多个属性之间增加一个空行,特别是在这些选项一屏放不下,
   需要滚动才能都看到的时候。

   props: {
	  value: {
	    type: String,
	    required: true
	  },

	  focused: {
	    type: Boolean,
	    default: false
	  },

	  label: String,
	  icon: String
	},

	computed: {
	  formattedValue: function () {
	    // ...
	  },

	  inputClasses: function () {
	    // ...
	  }
	}


  ```




###谨慎使用


**(1)scoped中的元素选择器**

 元素选择器应该避免在scoped中出现。


**(2)没有在v-if/v-if-else/v-else中使用key**

```
     如果一组v-if + v-else的元素类型相同,最好使用key(比如两个<div>元素)

	 <div
	   v-if="error"
	   key="search-status"
	  >
	    错误：{{ error }}
	  </div>
	  <div v-else key="search-results">
	     {{ results }}
	  </div>


	   <p v-if="error">
		  错误：{{ error }}
	   </p>
	   <div v-else>
		  {{ results }}
	   </div>

```


**(3)隐性的父子组件通信**

```
应该优先通过prop和事件进行父子组件之间的通信,而不是this.$parent或改变prop。

```


**(4)谨慎使用this.$refs**

```
Vue.js支持通过ref属性来访问其它组件和HTML元素。并通过this.$refs可以得到组
件或HTML元素的上下文。在大多数情况下，通过this.$refs来访问其它组件的上下文是
可以避免的。在使用的的时候你需要注意避免调用了不恰当的组件API,所以应该尽量避免
使用this.$refs。

组件必须是保持独立的,如果一个组件的API不能够提供所需的功能,那么这个组件在
设计、实现上是有问题的.


```


**(5)非Flux的全局状态管理**

```
应该优先通过Vuex管理全局状态,而不是通过this.$root或一个全局事件总线

```


