import type { FunctionalComponent } from "vue"

/**
 * Footer of Panel
 */
export const PanelFooter: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-panel__ft"]
  const children = slots.default?.()
  return <div class={classNames}>{children}</div>
}
