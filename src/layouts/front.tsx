
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { Getter, Mutation } from 'vuex-class'

@Component({
  name: 'front-layout'
})
class Front extends Vue {
  @Getter loading: boolean
  @Mutation('loading') setLoading: () => void

  render() {
    return <h1>Hello World</h1>
  }
}

export default Front
