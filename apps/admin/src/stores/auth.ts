import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { STORAGE_KEYS } from '@admin/config'
import { authApi } from '@admin/api/auth'
import { storage } from '@admin/utils/storage'
import type { LoginPayload, UserProfile } from '@admin/types'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(storage.get<string>(STORAGE_KEYS.token, ''))
  const profile = ref<UserProfile | null>(null)
  const bootstrapped = ref(false)

  const isLoggedIn = computed(() => Boolean(token.value))
  const permissions = computed(() => profile.value?.permissions ?? [])

  async function login(payload: LoginPayload) {
    const result = await authApi.login(payload)
    token.value = result.token
    storage.set(STORAGE_KEYS.token, result.token)
    await fetchProfile()
    return result
  }

  async function fetchProfile() {
    if (!token.value) {
      profile.value = null
      return null
    }

    const result = await authApi.getProfile()
    profile.value = result
    return result
  }

  async function logout() {
    if (token.value) {
      await authApi.logout().catch(() => undefined)
    }
    reset()
  }

  async function bootstrap() {
    if (bootstrapped.value) {
      return
    }
    bootstrapped.value = true
    if (!token.value) {
      return
    }

    try {
      await fetchProfile()
    } catch {
      reset()
    }
  }

  function reset() {
    token.value = ''
    profile.value = null
    storage.remove(STORAGE_KEYS.token)
  }

  return {
    token,
    profile,
    permissions,
    isLoggedIn,
    bootstrapped,
    bootstrap,
    login,
    fetchProfile,
    logout,
    reset,
  }
})
