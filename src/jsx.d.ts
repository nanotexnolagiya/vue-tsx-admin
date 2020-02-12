import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {
      render(): any
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
  interface Window {
    [propsName: string]: any;
  }
}
