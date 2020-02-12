
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { Getter, Mutation } from 'vuex-class'

@Component({
  components: {
    'dashboard-layout': () => import('./layouts/dashboard'),
    'empty-layout': () => import('./layouts/empty'),
    'front-layout': () => import('./layouts/front')
  }
})
class App extends Vue {
  @Getter loading: boolean
  @Mutation('loading') setLoading: () => void

  get layout(): string {
    return `${this.$route.meta.layout}-layout`
  }

  render() {
    return (
      <component is={this.layout}>
        <router-view />
      </component>
    )
  }
}

export default App
