<template lang="html">
  <span class="add-btn" @click="handleClick">add: {{counter}}</span>
</template>
<script>
export default {
  name: 'add-btn',
  data () {
    return {
      counter: 0
    }
  },
  methods: {
    handleClick () {
      this.counter++
      this.$emit('change', 1)
    }
  }
}
</script>