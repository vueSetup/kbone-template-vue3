import { cloneVNode, FunctionalComponent } from "vue"

/**
 * Header of MediaBox, if detects Img tag inside content will automatically adds corresponding class
 */
export const MediaBoxHeader: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-media-box__hd"]
  const children = slots.default?.()?.map((child) => {
    if (child.type === "img" && !child.props?.class) {
      return cloneVNode(child, { class: "weui-media-box__thumb" })
    } else {
      return child
    }
  })

  return <div class={classNames}>{children}</div>
}
