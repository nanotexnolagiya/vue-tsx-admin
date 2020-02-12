
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { Getter, Mutation } from 'vuex-class'

@Component({
  name: 'front-index'
})
class Index extends Vue {
  @Getter loading: boolean
  @Mutation('loading') setLoading: () => void

  render() {
    return <router-view />
  }
}

export default Index
