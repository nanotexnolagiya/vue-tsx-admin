
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { Getter, Mutation } from 'vuex-class'
import { Layout, Menu} from 'ant-design-vue'

@Component({
  name: 'dashboard-layout',
  components: {
    'a-layout': Layout,
    'a-menu': Menu
  }
})
class Dashboard extends Vue {
  @Getter loading: boolean
  @Mutation('loading') setLoading: () => void

  collapsed: boolean = false

  render() {
    const layoutHeaderCss = {
      background: '#fff',
      padding: 0
    }
    const layoutContentCss = {
      margin: '24px 16px',
      padding: '24px',
      background: '#fff',
      minHeight: '280px'
    }
    return (
      <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider trigger={null} collapsible vModel={this.collapsed}>
          <div class="logo" />
          <a-menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <a-menu-item key="1">
              <a-icon type="user" />
              <span>nav 1</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout>
          <a-layout-header style={layoutHeaderCss}>
            <a-icon 
              class="trigger" 
              type={this.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={ () => this.collapsed = !this.collapsed }
            />
          </a-layout-header>
          <a-layout-content style={layoutContentCss}>
            Content
          </a-layout-content>
        </a-layout>
      </a-layout>
    )
  }
}

export default Dashboard
