export const wrapperEnv = (record: Record<string, string>): ViteEnv => {
  const wrapEnv = {} as any
  for (const key of Object.keys(record)) {
    const realValue = record[key].trim() === 'true' ? true : record[key].trim() === 'false' ? false : record[key].trim()

    if (key === 'VITE_PORT' && realValue) {
      wrapEnv[key] = Number(record[key])
    }

    if (key === 'VITE_PROXY' && realValue) {
      wrapEnv[key] = JSON.parse(record[key].replace(/'/g, '"'))
    }

    else {
      wrapEnv[key] = record[key]
    }
  }
  return wrapEnv as ViteEnv
}

