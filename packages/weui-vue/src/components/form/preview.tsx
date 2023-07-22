import type { FunctionalComponent } from "vue"

/**
 * Preview Wrapper consists of `PreviewHeader`, `PreviewBody`, `PreviewFooter`, `PreviewItem`
 */
export const Preview: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-form-preview"]
  const children = slots.default?.()
  return <h4 class={classNames}>{children}</h4>
}
