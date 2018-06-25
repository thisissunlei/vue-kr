import Vue from 'vue'
import NuxtChild from './nuxt-child'
import NuxtError from '../../client/layouts/error.vue'
import { compile } from '../utils'

export default {
  name: 'nuxt',
<<<<<<< HEAD
  props: ['nuxtChildKey', 'keepAlive'],
  render(h) {
=======
  props: ['nuxtChildKey'],
  render(h) {
    if (this.nuxt._redirected) {
      return h('div', [ 'Redirecting to external page.' ])
    }
>>>>>>> 7cbf1c16b6cc682b146defadfe7cb1de20b04e3d
    // If there is some error
    if (this.nuxt.err) {
      return h('nuxt-error', {
        props: {
          error: this.nuxt.err
        }
      })
    }
    // Directly return nuxt child
    return h('nuxt-child', {
<<<<<<< HEAD
      key: this.routerViewKey,
      props: this.$props
=======
      key: this.routerViewKey
>>>>>>> 7cbf1c16b6cc682b146defadfe7cb1de20b04e3d
    })
  },
  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$root.$options.nuxt)
  },
  computed: {
    routerViewKey () {
      // If nuxtChildKey prop is given or current route has children
      if (typeof this.nuxtChildKey !== 'undefined' || this.$route.matched.length > 1) {
        return this.nuxtChildKey || compile(this.$route.matched[0].path)(this.$route.params)
      }
      const Component = this.$route.matched[0] && this.$route.matched[0].components.default
      if (Component && Component.options && Component.options.key) {
        return (typeof Component.options.key === 'function' ? Component.options.key(this.$route) : Component.options.key)
      }
      return this.$route.path
    }
  },
  components: {
    NuxtChild,
    NuxtError
  }
}
