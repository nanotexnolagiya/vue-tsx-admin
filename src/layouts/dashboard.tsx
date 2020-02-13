
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { Getter, Mutation } from 'vuex-class'
import { Layout, Menu, Icon} from 'ant-design-vue'
import './dashboard.css'
import Api from '../services/api.dto'

export interface IMenu {
  id: number,
  path?: string,
  name: string,
  icon: string,
  children?: IMenu[]
}

@Component({
  name: 'dashboard-layout',
  components: {
    [Layout.name]: Layout,
    [Layout.Sider.name]: Layout.Sider,
    [Layout.Header.name]: Layout.Header,
    [Layout.Content.name]: Layout.Content,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Menu.SubMenu.name]: Menu.SubMenu,
    [Icon.name]: Icon,
  }
})
class Dashboard extends Vue {
  @Getter loading: boolean
  @Mutation('loading') setLoading: () => void

  apiService = new Api()

  collapsed: boolean = false
  menus: IMenu[] = []

  async mounted() {
    const res = await this.apiService.get('/mocks/menu.json')
    this.menus = res.data
  }

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
        <a-layout-sider collapsedWidth="50" trigger={null} collapsible vModel={this.collapsed}>
          <div class="logo" />
          <a-menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {
              this.menus.map((menu: IMenu) => {
                if (menu.children && menu.children.length > 0) {
                  return (
                    <a-sub-menu key={menu.id}>
                      <span slot="title">
                        <a-icon type={menu.icon} />
                        <span>{ menu.name }</span>
                      </span>
                      {
                        menu.children.map((subMenu: IMenu) => {
                          return (
                            <a-menu-item key={subMenu.id}>
                              <a-icon type={subMenu.icon} />
                              <router-link tag="span" to={subMenu.path}>
                                { subMenu.name }
                              </router-link>
                            </a-menu-item>
                          )
                        })
                      }
                    </a-sub-menu>
                  )
                } else {
                  return (
                    <a-menu-item key={menu.id}>
                      <a-icon type={menu.icon} />
                      <router-link tag="span" to={menu.path}>
                        { menu.name }
                      </router-link>
                    </a-menu-item>
                  )
                }
              })
            }
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
            { this.$slots.default }
          </a-layout-content>
        </a-layout>
      </a-layout>
    )
  }
}

export default Dashboard
