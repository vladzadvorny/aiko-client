export const isProduction = process.env.NODE_ENV === 'production'
const apiUri = isProduction ? 'https://api.site.com' : ' http://localhost:3000'
export const uri = `${apiUri}/v1`
export const isBrowser = typeof window !== 'undefined'
export const siteName = 'Aiko.Top'
