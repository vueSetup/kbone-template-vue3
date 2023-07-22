import type { FunctionalComponent } from "vue"

export interface PreviewItemProps {
  /**
   * The label of item
   */
  label?: string
  /**
   * Value of the label
   */
  value?: string
}

/**
 * Preview Item for all purpose usage
 */
export const PreviewItem: FunctionalComponent<PreviewItemProps> = (props) => {
  const { label, value } = props
  const classNames = ["weui-form-preview__item"]
  return (
    <h4 class={classNames}>
      <label class="weui-form-preview__label">{label}</label>
      <em class="weui-form-preview__value">{value}</em>
    </h4>
  )
}
