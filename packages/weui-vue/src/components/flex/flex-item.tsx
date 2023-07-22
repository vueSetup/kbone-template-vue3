import type { FunctionalComponent } from 'vue'

interface FlexItemProps {
  /**
   * if cell body is the primary block
   */
  Component?: string
}

/**
 * Evenly distribute flex items
 */
export const FlexItem: FunctionalComponent<FlexItemProps> = (props, { slots }) => {
    const { Component = 'div' } = props
  const classNames = ['weui-flex__item']
  const children = slots.default?.()
  return <div class={classNames}>{children}</div>
}
