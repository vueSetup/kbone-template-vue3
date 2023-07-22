import type { FunctionalComponent } from "vue"

/**
 * Content of Preview
 */
export const PreviewBody: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-form-preview__bd"]
  const children = slots.default?.()
  return <h4 class={classNames}>{children}</h4>
}
