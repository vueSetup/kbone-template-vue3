import type { FunctionalComponent } from 'vue'

export interface FormProps {
  /**
   * if this form is use for radios
   */
  radio?: boolean
  /**
   * if this form is use for checkbox
   */
  checkbox?: boolean
}

/**
 *  Weui Wrapper for Form
 */
export const Form: FunctionalComponent<FormProps> = (props, { slots }) => {
  const { radio, checkbox, ...others } = props
  const classNames = [
    'weui-cells',
    { 'weui-cells_form': !radio && !checkbox },
    { 'weui-cells_radio': radio },
    { 'weui-cells_checkbox': checkbox }
  ]
  const children = slots.default?.()

  return (
    <div class={classNames} {...others}>
      {children}
    </div>
  )
}
