<template>
  <div id="app">
    <add-btn @change="handleChange" a="b"/>
    <reduce-btn @change="handleChange"/>
    <div>total: {{total}}</div>
    <kr-date-picker @change="lChange"></kr-date-picker>
  </div>
</template>
<script>
import hoc from '~/components/hoc.js'
import AddBtn from './AddBtn.vue'
import ReduceBtn from './ReduceBtn.vue'
import krDatePicker from '~/components/krDatePicker'
export default {
  name: 'app',
  components: {
    'add-btn': hoc(AddBtn),
    'reduce-btn': hoc(ReduceBtn),
    'kr-date-picker': hoc(krDatePicker),
  },
  data () {
    return {
      total: 0
    }
  },
  methods: {
    handleChange (number) {
      this.total += number
    },
    lChange(data){
        console.log(">>>>>>>>>")

    }
  }
}
</script>