import type { FunctionalComponent } from "vue"

interface CellHeaderProps {
  /**
   * if cell body is the primary block
   */
  primary?: boolean
}

/**
 * Header of `Cell`
 */
export const CellHeader: FunctionalComponent<CellHeaderProps> = (
  props,
  { slots }
) => {
  const { primary } = props
  const classNames = ["weui-cell__hd", { "weui-cell_primary": primary }]
  const children = slots.default?.()
  return <div class={classNames}>{children}</div>
}
