import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import BasicLayout from '@/layouts/basic-layout.vue'
import Signin from '@/views/sign-in.vue'

import Sticker from '@/views/sticker.vue'
import StickerShow from '@/views/sticker-show.vue'
import Song from '@/views/song.vue'
import Suggest from '@/views/suggest.vue'
import Photo from '@/views/photo.vue'
import Settings from '@/views/settings.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/sign-in',
    children: [
      {
        path: 'sticker',
        name: 'sticker',
        component: Sticker
      },
      {
        path: 'sticker/:id',
        name: 'sticker-show',
        component: StickerShow,
        props: true
      },
      {
        path: 'song',
        name: 'song',
        component: Song
      },
      {
        path: 'suggest',
        name: 'suggest',
        component: Suggest
      },
      {
        path: 'photo',
        name: 'photo',
        component: Photo
      },
      {
        path: 'settings',
        name: 'settings',
        component: Settings
      }
    ]
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: Signin
  }
]

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
