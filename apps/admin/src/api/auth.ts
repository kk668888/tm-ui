import { http } from './http'
import type { LoginPayload, LoginResult, UserProfile } from '@admin/types'

export const authApi = {
  login(payload: LoginPayload) {
    return http.post<never, LoginResult>('/auth/login', payload)
  },
  logout() {
    return http.post<never, boolean>('/auth/logout')
  },
  getProfile() {
    return http.get<never, UserProfile>('/auth/profile')
  },
}
