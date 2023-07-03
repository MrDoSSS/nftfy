import { App } from 'vue'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '~/tailwind.config.ts'
import { Config } from 'tailwindcss/types/config'
import { BaseError } from 'viem'
import { emitter } from './emitter'

const config = resolveConfig<Config>(tailwindConfig)

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    assetUrl: typeof assetUrl
  }
}

export const assetUrl = (path: string) =>
  new URL(`./assets/${path}`, import.meta.url).href

export const theme = config.theme!

export const globalHelpers = {
  install(app: App) {
    app.config.globalProperties.assetUrl = assetUrl
    app.config.globalProperties.theme = theme

    app.config.errorHandler = (e) => {
      if (e instanceof BaseError) {
        console.log(e.shortMessage)
      }

      if (e instanceof BaseError || e instanceof Error) {
        emitter.emit('FailedTransaction:Open', e)
      }
    }
  },
}
