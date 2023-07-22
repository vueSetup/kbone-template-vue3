import type { FunctionalComponent } from "vue"
import { MediaBoxInfoMeta } from "./mediabox-info-meta"

interface Meta {
  extra: boolean
  label: string
}

export interface MediaBoxInfoProps {
  /**
   * automatically include Metas, object array of metas,
   * property required: `extra`, `label`
   */
  data?: Meta[]
}

/**
 * Info Items for MediaBox
 */
export const MediaBoxInfo: FunctionalComponent<MediaBoxInfoProps> = (props) => {
  const { data = [] } = props
  const classNames = ["weui-media-box__info"]
  const children = data.map((meta, i) => (
    <MediaBoxInfoMeta key={i} extra={meta.extra}>
      {meta.label}
    </MediaBoxInfoMeta>
  ))
  return <ul class={classNames}>{children}</ul>
}
