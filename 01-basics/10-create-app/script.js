import { defineComponent, createApp } from 'vue'

const App = defineComponent({
  name: 'App',
  computed: {
    formattedDate() {
      return new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' })
    },
  },

  template: 'Сегодня {{formattedDate}}',
})
const app = createApp(App)
const vm = app.mount('#app')
window.vm = vm
