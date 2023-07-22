import type { FunctionalComponent } from "vue"

/**
 * Description of MediaBox
 */
export const MediaBoxDescription: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-media-box__desc"]
  const children = slots.default?.()
  return <div class={classNames}>{children}</div>
}
