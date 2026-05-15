<template>
  <section class="admin-panel admin-info-card">
    <h3 class="admin-info-card-title">{{ title }}</h3>
    <p v-if="description" class="admin-info-card-description">{{ description }}</p>
    <div v-if="$slots.default" class="mt-4">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>
