import type { FunctionalComponent } from "vue"

/**
 * Heading for `Cells`
 */
export const CellsTitle: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-cells__title"]
  const children = slots.default?.()
  return <div class={classNames}>{children}</div>
}
