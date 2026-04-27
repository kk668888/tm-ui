<template>
  <div class="flex min-h-[480px] items-center justify-center">
    <tm-result status="403" title="403" sub-title="当前账号没有权限访问此页面。">
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
