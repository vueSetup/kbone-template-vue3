import type { FunctionalComponent } from "vue"

/**
 * Content of Panel
 */
export const PanelBody: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-panel__bd"]
  const children = slots.default?.()
  return <div class={classNames}>{children}</div>
}
