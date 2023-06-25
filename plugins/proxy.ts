import type {ProxyOptions} from "vite"

export function createProxy(proxyList: [string, string][] = []) {
  const proxyOptions: Record<string, ProxyOptions> = {};
  for (const [key, value] of proxyList) {
    proxyOptions[key] = {
      target: value,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(new RegExp(`^${key}`), '')
    }
  }
  return proxyOptions;
}

