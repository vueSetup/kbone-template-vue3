import type { FunctionalComponent } from "vue"

/**
 * Header of Panel
 */
export const PanelHeader: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-panel__hd"]
  const children = slots.default?.()
  return <div class={classNames}>{children}</div>
}
