// uno.config.ts
import {defineConfig, presetUno, presetAttributify, presetIcons, presetTypography} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
    presetIcons({
      scale: 1.2,
      collections: {
        // icon 目前不支持动态引用，因此你写  :class="xxxx" 是不生效的
        mdi: () => import('@iconify-json/mdi/icons.json').then((i) => i.default)
      }
    }),
  ],
  safelist: [
    'i-mdi-alarm',
    'i-mdi-alarm-bell',
  ]
})

