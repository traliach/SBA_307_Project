const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() ?? ''

// Keep local development on the Vite proxy, but allow split client/server deploys.
const apiBaseUrl = rawApiBaseUrl.replace(/\/+$/, '')

export function withApiBase(path: string) {
  return apiBaseUrl ? `${apiBaseUrl}${path}` : path
}
