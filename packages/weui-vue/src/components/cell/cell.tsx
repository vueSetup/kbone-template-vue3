import type { FunctionalComponent, VNodeChild } from "vue"

interface CellProps {
  /**
   * if cell should have arrow or link
   */
  access?: boolean
  /**
   * if this cell body is link
   */
  link?: boolean

  /**
   * href
   */
  href?: string

  /**
   * htmlFor
   */
  htmlFor?: string
  /**
   * pass in an component to replace Cell but apply same style
   */
  component?: () => VNodeChild
}

/**
 * Cell consist of `CellBody`, `CellHeader` and `CellFooter` for flexible reason
 */
export const Cell: FunctionalComponent<CellProps> = (props, { slots }) => {
  const { access, href, link, component, htmlFor } = props
  const classNames = [
    "weui-cell",
    { "weui-cell_access": access },
    { "weui-cell_link": link },
  ]
  const children = slots.default?.()

  const DefaultComponent = href ? "a" : htmlFor ? "label" : "div"
  const CellComponent = component ? component : DefaultComponent

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <CellComponent class={classNames} href={href} htmlFor={htmlFor}>
      {children}
    </CellComponent>
  )
}
