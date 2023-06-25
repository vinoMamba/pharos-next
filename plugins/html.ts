import type {Plugin} from "vite";

export const htmlPlugin = (env: ViteEnv): Plugin => {
  const title = env.VITE_APP_TITLE || 'Vite App'
  console.log(title);
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      return html.replace(/VITE_APP_TITLE/g, title)
    }
  }
}

