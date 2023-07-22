import type { FunctionalComponent } from "vue"

export const Panel: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-panel"]
  const children = slots.default?.()
  return <div class={classNames}>{children}</div>
}
