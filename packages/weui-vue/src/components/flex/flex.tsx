import type { FunctionalComponent } from 'vue'

/**
 * FlexItem Container
 */
export const Flex: FunctionalComponent = (props, { slots }) => {
  const classNames = ['weui-flex']
  const children = slots.default?.()
  return <div class={classNames}>{children}</div>
}
