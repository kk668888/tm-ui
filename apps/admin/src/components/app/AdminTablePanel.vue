<template>
  <section class="admin-panel admin-table-panel">
    <div v-if="title || description || $slots.actions || $slots.meta" class="admin-table-panel-header">
      <div class="admin-table-panel-header-copy">
        <div v-if="$slots.meta" class="admin-table-meta">
          <slot name="meta" />
        </div>
        <h2 v-if="title" class="admin-table-panel-title">{{ title }}</h2>
        <p v-if="description" class="admin-table-panel-description">{{ description }}</p>
      </div>
      <div v-if="$slots.actions" class="admin-page-actions">
        <slot name="actions" />
      </div>
    </div>
    <div class="admin-table-panel-body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>
