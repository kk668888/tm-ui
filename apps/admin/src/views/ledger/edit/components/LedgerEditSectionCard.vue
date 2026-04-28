<template>
  <section :id="anchorId" class="ledger-section-card">
    <tm-button type="text" class="ledger-section-trigger" @click="$emit('toggle')">
      <span class="ledger-section-head">
        <span class="ledger-section-title-wrap">
          <span class="ledger-section-accent" />
          <span class="ledger-section-title">{{ title }}</span>
        </span>
        <span class="ledger-section-meta">
          <tm-tag v-if="requiredLabel" class="ledger-section-required">{{ requiredLabel }}</tm-tag>
          <span class="ledger-section-progress">{{ progressText }}</span>
          <component :is="expanded ? DownOutlined : RightOutlined" class="ledger-section-arrow" />
        </span>
      </span>
    </tm-button>
    <div v-if="expanded" class="ledger-section-body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { DownOutlined, RightOutlined } from '@ant-design/icons-vue'

defineProps<{
  anchorId: string
  expanded: boolean
  progressText: string
  requiredLabel?: string
  title: string
}>()

defineEmits<{
  toggle: []
}>()
</script>

<style scoped>
.ledger-section-card {
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
}

:deep(.ledger-section-trigger.tm-btn.ant-btn-text) {
  width: 100%;
  height: 44px;
  padding: 0 16px;
  border-radius: 0;
  background: #f5f6f7;
  color: #334155;
}

:deep(.ledger-section-trigger.tm-btn.ant-btn-text:hover) {
  background: #f1f5f9;
  color: #2563eb;
}

.ledger-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.ledger-section-title-wrap {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.ledger-section-accent {
  width: 4px;
  height: 18px;
  border-radius: 999px;
  background: #2563eb;
}

.ledger-section-title {
  font-size: 14px;
  font-weight: 700;
}

.ledger-section-meta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #64748b;
}

.ledger-section-progress {
  color: #475569;
}

.ledger-section-arrow {
  font-size: 12px;
}

.ledger-section-body {
  padding: 18px 20px 20px;
  background: #fff;
}

:deep(.ledger-section-required.tm-tag) {
  margin-inline-end: 0;
  padding: 1px 10px;
  border-radius: 999px;
  border-color: #ffc4c4;
  color: #ef4444;
  background: #fff7f7;
  font-size: 12px;
}
</style>
