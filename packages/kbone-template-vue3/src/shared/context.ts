import { ref } from 'vue'

export const isMiniprogram = JSON.stringify(process.env.VUE_APP_isMiniprogram)
export const staticUrl = process.env.VUE_APP_STATICURL || 'https://static.tinmusic.com.cn/assets'
export const songUrl =
  process.env.VUE_APP_SONGURL || 'https://static.tinmusic.com.cn/assets/song.mp3'
export const serialNumber = ref<string>('1109')
export const current = ref<string>('1109')
