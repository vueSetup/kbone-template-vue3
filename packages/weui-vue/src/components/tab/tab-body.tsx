import type { FunctionalComponent } from "vue"

/**
 * Content Wrapper for Tab
 */
export const TabBody: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-tab__panel"]
  const children = slots.default?.()
  return <div class={classNames}>{children}</div>
}
