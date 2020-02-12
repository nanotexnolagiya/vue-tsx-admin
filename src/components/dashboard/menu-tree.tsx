
import { Vue, Prop } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { Layout, Menu, Icon} from 'ant-design-vue'

export interface IMenu {
  id: number,
  path?: string,
  name: string,
  icon: string,
  children?: IMenu[]
}

@Component({
  name: 'menu-tree',
  components: {
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Menu.SubMenu.name]: Menu.SubMenu,
    [Icon.name]: Icon,
  }
})
class MenuTree extends Vue {
  @Prop(Array) readonly items: IMenu[]

  render() {
    {
      this.items.map((item: IMenu) => {
        if (item.children && item.children.length > 0) {
          return (
            <a-sub-menu key={item.id}>
              <span slot="title">
                <a-icon type={item.icon} />
                <span>{ item.name }</span>
              </span>
              <menu-tree items={item.children} />
            </a-sub-menu>
          )
        } else {
          return (
            <a-menu-item key={item.id}>
              <a-icon type={item.icon} />
              <router-link tag="span" to={item.path}>
                { item.name }
              </router-link>
            </a-menu-item>
          )
        }
      })
    }
  }
}

export default MenuTree
