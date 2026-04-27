<template>
  <div class="flex min-h-[480px] items-center justify-center">
    <tm-result status="500" title="500" sub-title="刷新当前标签页，或稍后再试。">
      <template #extra>
        <tm-button type="primary" @click="router.back()">返回上一页</tm-button>
      </template>
    </tm-result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
