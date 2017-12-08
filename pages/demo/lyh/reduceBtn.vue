<template lang="html">
  <span class="reduce-btn" @click="handleClick">reduce: {{counter}}</span>
</template>
<script>
export default {
  name: 'reduce-btn',
  data () {
    return {
      counter: 0
    }
  },
  methods: {
    handleClick () {
      this.counter--
      this.$emit('change', -1)
    }
  }
}
</script>