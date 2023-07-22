import type { FunctionalComponent } from "vue"

/**
 * Header of Preview
 */
export const PreviewHeader: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-form-preview__hd"]
  const children = slots.default?.()
  return <h4 class={classNames}>{children}</h4>
}
