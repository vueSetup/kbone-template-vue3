import type { FunctionalComponent } from "vue"

export interface MediaBoxInfoMetaProps {
  /**
   * add left margin to indicate extra
   */
  extra: boolean
}

/**
 * Meta Item for `MeidaBoxInfo`
 */
export const MediaBoxInfoMeta: FunctionalComponent<MediaBoxInfoMetaProps> = (
  props,
  { slots }
) => {
  const { extra } = props
  const classNames = [
    "weui-media-box__info__meta",
    { "weui-media-box__info__meta_extra": extra },
  ]
  const children = slots.default?.()
  return <li class={classNames}>{children}</li>
}
