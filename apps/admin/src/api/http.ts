import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'
import { IS_MOCK_ENABLED, STORAGE_KEYS } from '@admin/config'
import { createMockAdapter } from '@admin/mock/server'
import { storage } from '@admin/utils/storage'

function readStoredToken() {
  const parsed = storage.get<string>(STORAGE_KEYS.token, '')
  if (parsed) {
    return parsed
  }

  // Compatible with old plain-string tokens written before JSON storage was standardized.
  return localStorage.getItem(STORAGE_KEYS.token) ?? ''
}

function injectToken(config: InternalAxiosRequestConfig) {
  const token = readStoredToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

export const http = axios.create({
  baseURL: '/api',
  timeout: 6000,
  adapter: IS_MOCK_ENABLED ? createMockAdapter() : undefined,
})

http.interceptors.request.use(injectToken)

http.interceptors.response.use(
  (response) => {
    const payload = response.data
    if (payload.code !== 0) {
      message.error(payload.message || 'Request failed')
      return Promise.reject(new Error(payload.message))
    }
    return payload.data
  },
  (error) => {
    const status = error?.response?.status
    if (status === 401) {
      message.error('登录状态已失效，请重新登录')
    } else {
      message.error(error?.message || 'Network Error')
    }
    return Promise.reject(error)
  },
)
