<template>
  <div class="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm text-blue-600">
    <span class="font-medium">TailwindCSS</span>
    <span class="text-blue-400">|</span>
    <span>{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>
