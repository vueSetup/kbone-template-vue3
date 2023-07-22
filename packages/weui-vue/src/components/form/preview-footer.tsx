import type { FunctionalComponent } from "vue"

/**
 * Footer of Preview, consists of actions
 */
export const PreviewFooter: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-form-preview__ft"]
  const children = slots.default?.()
  return <h4 class={classNames}>{children}</h4>
}
