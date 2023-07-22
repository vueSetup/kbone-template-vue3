import type { FunctionalComponent } from 'vue'

export interface FormCellProps {
  /**
   * if cell use for vcode
   */
  vcode?: boolean
  /**
   * display warn style of cell
   */
  warn?: boolean
  /**
   * if cell use for radio
   */
  radio?: boolean
  /**
   * if cell use for checkbox
   */
  checkbox?: boolean
  /**
   * if cell use for switch checkbox
   */
  switch?: boolean
  /**
   * if cell use for select
   */
  select?: boolean
  /**
   * select position, options: before, after
   */
  selectPos?: 'before' | 'after'
}

/**
 *  Form Wrapper for `Cell`
 */
export const FormCell: FunctionalComponent<FormCellProps> = (props, { slots }) => {
  const { vcode, warn, radio, checkbox, select, selectPos, ...others } = props
  const cellProps = Object.assign({}, others)
  delete cellProps.switch
  const classNames = [
    'weui-cell',
    { 'weui-cell_vcode': vcode },
    { 'weui-cell_warn': warn },
    { 'weui-cell_switch': props.switch },
    { 'weui-cell_select': radio },
    { 'weui-cell_select': checkbox },
    { 'weui-cell_select': select },
    { 'weui-cell_select-before': selectPos === 'before' },
    { 'weui-cell_select-after': selectPos === 'after' },
    { 'weui-check__label': radio || checkbox }
  ]
  const children = slots.default?.()

  const CellComponent = radio || checkbox ? 'label' : 'div'

  return (
    <CellComponent class={classNames} {...cellProps}>
      {children}
    </CellComponent>
  )
}
