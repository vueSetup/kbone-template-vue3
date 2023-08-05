import { staticUrl } from '@/shared/context'

export const tabbar: Record<string, string> = {
  sticker: `${staticUrl}/sticker_icon.png`,
  song: `${staticUrl}/song_icon.png`,
  suggest: `${staticUrl}/suggest_icon.png`,
  photo: `${staticUrl}/photo_icon.png`,
  settings: `${staticUrl}/settings_icon.png`
}

export const tabbar_active: Record<string, string> = {
  sticker: `${staticUrl}/sticker_icon_active.png`,
  song: `${staticUrl}/song_icon_active.png`,
  suggest: `${staticUrl}/suggest_icon_active.png`,
  photo: `${staticUrl}/photo_icon_active.png`,
  settings: `${staticUrl}/settings_icon_active.png`
}
