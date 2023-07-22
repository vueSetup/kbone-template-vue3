import type { FunctionalComponent } from "vue"

/**
 * Content of Mediabox
 */
export const MediaBoxBody: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-media-box__bd"]
  const children = slots.default?.()
  return <div class={classNames}>{children}</div>
}
