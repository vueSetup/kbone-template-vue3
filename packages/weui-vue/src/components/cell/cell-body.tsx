import type { FunctionalComponent } from "vue"

interface CellBodyProps {
  /**
   * if cell body is the primary block
   */
  primary?: boolean
}

/**
 * Content of `Cell`
 */
export const CellBody: FunctionalComponent<CellBodyProps> = (
  props,
  { slots }
) => {
  const { primary } = props
  const classNames = ["weui-cell__bd", { "weui-cell_primary": primary }]
  const children = slots.default?.()
  return <div class={classNames}>{children}</div>
}
