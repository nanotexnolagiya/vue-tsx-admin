
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { Getter, Mutation } from 'vuex-class'
import './App.css'

const components = {
  'dashboard-layout': () => import('./layouts/dashboard'),
  'empty-layout': () => import('./layouts/empty'),
  'front-layout': () => import('./layouts/front')
}

@Component({
  name: 'App',
  components
})
class App extends Vue {
  @Getter loading: boolean
  @Mutation('loading') setLoading: () => void

  layout(): string {
    return `${this.$route.meta.layout}-layout`
  }

  render(h: any) {
    return h(`${this.$route.meta.layout || 'front'}-layout`, h('router-view'))
  }
}

export default App
