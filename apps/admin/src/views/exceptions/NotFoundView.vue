<template>
  <div class="flex min-h-screen items-center justify-center px-6">
    <tm-result status="404" title="404" sub-title="你访问的页面不存在或已被移动。">
      <template #extra>
        <tm-button type="primary" @click="router.push('/dashboard')">返回工作台</tm-button>
      </template>
    </tm-result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
