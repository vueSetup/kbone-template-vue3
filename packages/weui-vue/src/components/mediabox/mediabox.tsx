// import "weui/src/style/widget/weui-media-box/weui-media-box.less"

import type { FunctionalComponent } from "vue"

export interface MediaBoxProps {
  /**
   * The layout of media box, Options: appmsg/text/small_appmsg
   */
  type: "appmsg" | "text" | "small_appmsg"
}

/**
 * Media Object, Typically use with `Panel` to display pictures and text,
 * consists of `MediaBoxBody`, `MediaBoxDescription`, `MediaBoxHeader`
 */
export const MediaBox: FunctionalComponent<MediaBoxProps> = (
  props,
  { slots }
) => {
  const { type = "text" } = props
  const classNames = [
    "weui-media-box",
    {
      "weui-media-box_appmsg": type === "appmsg",
      "weui-media-box_text": type === "text",
      "weui-media-box_small-appmsg": type === "small_appmsg",
    },
  ]
  const children = slots.default?.()
  return <div class={classNames}>{children}</div>
}
