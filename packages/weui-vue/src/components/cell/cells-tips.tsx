import type { FunctionalComponent } from "vue"

/**
 * Footer Information for `Cells`
 */
export const CellsTips: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-cells__tips"]
  const children = slots.default?.()
  return <div class={classNames}>{children}</div>
}
