import type { FunctionalComponent } from "vue"

interface CellFooterProps {
  /**
   * if cell body is the primary block
   */
  primary?: boolean
}

/**
 * Footer of `Cell`
 */
export const CellFooter: FunctionalComponent<CellFooterProps> = (
  props,
  { slots }
) => {
  const { primary } = props
  const classNames = ["weui-cell__ft", { "weui-cell_primary": primary }]
  const children = slots.default?.()
  return <div class={classNames}>{children}</div>
}
