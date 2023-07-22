import type { FunctionalComponent } from "vue"

/**
 * Title for MediaBox
 */
export const MediaBoxTitle: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-media-box__title"]
  const children = slots.default?.()
  return <h4 class={classNames}>{children}</h4>
}
