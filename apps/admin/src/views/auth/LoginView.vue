<template>
  <div class="admin-login-shell">
    <section class="admin-login-poster">
      <div class="space-y-6">
        <div class="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm tracking-[0.2em] text-white/80 uppercase">
          TM Admin
        </div>
        <div class="max-w-xl space-y-4">
          <h1 class="text-5xl font-semibold leading-tight">{{ t('auth.welcome') }}</h1>
          <p class="max-w-lg text-base leading-7 text-slate-300">
            {{ t('auth.subtitle') }}
          </p>
        </div>
      </div>

      <div class="grid max-w-xl gap-3">
        <div class="rounded-[24px] border border-white/10 bg-white/6 p-5">{{ t('auth.slogan1') }}</div>
        <div class="rounded-[24px] border border-white/10 bg-white/6 p-5">{{ t('auth.slogan2') }}</div>
        <div class="rounded-[24px] border border-white/10 bg-white/6 p-5">{{ t('auth.slogan3') }}</div>
      </div>
    </section>

    <section class="admin-login-panel">
      <div class="admin-shell-card w-full max-w-[460px] rounded-[32px] p-8">
        <div class="mb-8 flex items-center justify-between">
          <div>
            <h2 class="mb-2 text-3xl font-semibold text-slate-900">{{ t('auth.signIn') }}</h2>
            <p class="text-sm text-slate-500">admin / editor / auditor</p>
          </div>
          <tm-button size="small" @click="appStore.toggleLocale()">
            {{ appStore.locale === 'zh-CN' ? 'EN' : '中文' }}
          </tm-button>
        </div>

        <a-form layout="vertical" :model="formState" @finish="handleSubmit">
          <a-form-item
            :label="t('auth.username')"
            name="username"
            :rules="[{ required: true, message: t('auth.usernameRequired') }]"
          >
            <tm-input v-model="formState.username" :placeholder="t('auth.usernamePlaceholder')" />
          </a-form-item>
          <a-form-item
            :label="t('auth.password')"
            name="password"
            :rules="[{ required: true, message: t('auth.passwordRequired') }]"
          >
            <tm-input-password v-model="formState.password" :placeholder="t('auth.passwordPlaceholder')" />
          </a-form-item>

          <div class="mb-4 rounded-2xl bg-slate-50 p-4 text-xs leading-6 text-slate-500">
            admin / editor / auditor<br />
            password: 123456
          </div>

          <tm-button type="primary" html-type="submit" block :loading="submitting">
            {{ t('auth.submit') }}
          </tm-button>
        </a-form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@admin/stores/app'
import { useAuthStore } from '@admin/stores/auth'

const router = useRouter()
const route = useRoute()
const { t, locale } = useI18n()
const appStore = useAppStore()
const authStore = useAuthStore()
const submitting = ref(false)
const formState = reactive({
  username: 'admin',
  password: '123456',
})

watch(
  () => appStore.locale,
  (value) => {
    locale.value = value
  },
  { immediate: true },
)

async function handleSubmit() {
  submitting.value = true
  try {
    await authStore.login(formState)
    message.success(t('auth.loginSuccess'))
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/dashboard'
    router.replace(redirect)
  } finally {
    submitting.value = false
  }
}
</script>
