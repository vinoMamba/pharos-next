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
        mdi: () => import('@iconify-json/mdi/icons.json').then((i) => i.default)
      }
    }),
  ]
})

