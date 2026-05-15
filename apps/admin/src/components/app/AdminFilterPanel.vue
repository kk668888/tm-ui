<template>
  <section class="admin-panel admin-filter-panel">
    <tm-form :model="model" layout="vertical" class="admin-filter-form">
      <slot />
      <div v-if="$slots.actions" class="admin-filter-actions">
        <slot name="actions" />
      </div>
    </tm-form>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  model?: Record<string, unknown>
}>(), {
  model: () => ({}),
})
</script>
