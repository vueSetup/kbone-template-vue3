// import "weui/src/style/widget/weui-tab/weui-tab.less"

import {
  defineComponent,
  isVNode,
  shallowReactive,
  toRaw,
  VNode,
  type ExtractPropTypes,
  type PropType,
} from "vue"
import { TabBody } from "./tab-body"
import { TabBodyItem } from "./tab-body-item"
import { NavBar } from "./navbar"
import { NavBarItem } from "./navbar-item"
import { TabBar } from "./tabbar"
import { TabBarItem } from "./tabbar-item"

const tabProps = {
  /**
   * layout of the tab, auto mount components when set to `navbar` or `tabbar`
   */
  type: {
    type: String as PropType<"normal" | "navbar" | "tabbar">,
    default: "normal",
  },
  /**
   * default select index
   */
  defaultIndex: {
    type: Number,
    default: 0,
  },
}

export type TabProps = ExtractPropTypes<typeof tabProps>

export const Tab = defineComponent({
  name: "weui-tab",
  props: tabProps,
  emits: ["change"],
  setup(props, { slots, emit }) {
    const state = shallowReactive<{
      index: number
    }>({
      index: props.defaultIndex,
    })

    return () => {
      const { type, ...others } = props
      const classNames = ["weui-tab"]
      const children = slots.default?.() || []

      const parseChildren = (children: VNode[]) => {
        const headers: VNode[] = []
        const contents: VNode[] = []

        // React.Children.map(childrenInput, (child) => {
        //   if (!child) return
        //   const { children, type, ...others } = child.props
        //   if (child.type === TabBarItem || child.type === NavBarItem) {
        //     ChildHeaders.push(child)
        //     if (children)
        //       ChildContents.push(<TabBodyItem children={children} />)
        //   } else if (child.type === TabBodyItem) {
        //     ChildContents.push(child)
        //   }
        // })

        // return { ChildHeaders, ChildContents }

        children.map((child) => {
          const element = toRaw(child)
          if (isVNode(element)) {
            const { type, props, children } = element
            if (type === TabBarItem || type === NavBarItem) {
              headers.push(element)
            } else if (type === TabBodyItem) {
              contents.push(element)
            }
          }
        })

        return { headers, contents }
      }

      const { headers, contents } = parseChildren(children)

      switch (type) {
        case "normal":
          return (
            <div class={classNames} {...others}>
              {children}
            </div>
          )
        case "tabbar":
          return (
            <div class={classNames}>
              <TabBody>{contents}</TabBody>
              <TabBar>{headers}</TabBar>
            </div>
          )
        case "navbar":
          return (
            <div class={classNames}>
              <NavBar>{headers}</NavBar>
              <TabBody>{contents}</TabBody>
            </div>
          )
        default:
          throw new Error(`Tab's type must be "normal" | "navbar" | "tabbar"`)
      }
    }
  },
})
