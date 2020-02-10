
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { Getter, Mutation } from 'vuex-class'

@Component
class App extends Vue {
  @Getter loading: boolean
  @Mutation('loading') setLoading: () => void

  render() {
    return <router-view />
  }
}

export default App
