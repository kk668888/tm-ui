<template>
  <aside ref="containerRef" class="ledger-edit-sidebar">
    <div class="ledger-sidebar-head">
      <div class="ledger-sidebar-head-title">分组导航</div>
      <div class="ledger-sidebar-head-meta">共 {{ items.length }} 组</div>
    </div>
    <div class="ledger-sidebar-list">
      <tm-button
        v-for="item in items"
        :key="item.key"
        :ref="(el) => setItemRef(item.key, el)"
        type="text"
        class="ledger-sidebar-item"
        :class="{ 'ledger-sidebar-item-active': activeKey === item.key }"
        @click="$emit('select', item.key)"
      >
        <span class="ledger-sidebar-item-inner">
          <component :is="item.icon" class="ledger-sidebar-icon" />
          <span class="ledger-sidebar-copy">
            <span class="ledger-sidebar-title">{{ item.title }}</span>
            <span class="ledger-sidebar-progress">{{ item.progressText }}</span>
          </span>
        </span>
      </tm-button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import type { LedgerEditSectionItem } from '../composables/useLedgerEditPage'

const props = defineProps<{
  activeKey: LedgerEditSectionItem['key']
  items: LedgerEditSectionItem[]
}>()

defineEmits<{
  select: [key: LedgerEditSectionItem['key']]
}>()

const containerRef = ref<HTMLElement>()
const itemRefs = ref<Partial<Record<LedgerEditSectionItem['key'], HTMLElement>>>({})

function setItemRef(key: LedgerEditSectionItem['key'], el: Element | ComponentPublicInstance | null) {
  if (!el) {
    delete itemRefs.value[key]
    return
  }

  const resolvedEl = '$el' in el ? (el.$el as HTMLElement) : (el as HTMLElement)
  itemRefs.value[key] = resolvedEl
}

watch(
  () => props.activeKey,
  async (key) => {
    await nextTick()
    if (!containerRef.value) {
      return
    }
    const target = itemRefs.value[key]
    target?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
      behavior: 'smooth',
    })
  },
  { immediate: true },
)
</script>

<style scoped>
.ledger-edit-sidebar {
  width: 180px;
  max-height: calc(100vh - 240px);
  padding: 14px 12px;
  border-radius: 12px;
  background: #f6f7f9;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

.ledger-edit-sidebar::-webkit-scrollbar {
  width: 6px;
}

.ledger-edit-sidebar::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: #cbd5e1;
}

.ledger-sidebar-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
  padding: 0 6px;
}

.ledger-sidebar-head-title {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
}

.ledger-sidebar-head-meta {
  font-size: 12px;
  color: #64748b;
}

.ledger-sidebar-list {
  display: flex;
  flex-direction: column;
}

:deep(.ledger-sidebar-item.tm-btn.ant-btn-text) {
  width: 100%;
  height: auto;
  margin-bottom: 8px;
  padding: 12px 14px;
  border-radius: 10px;
  color: #334155;
  text-align: left;
}

:deep(.ledger-sidebar-item.tm-btn.ant-btn-text:hover) {
  background: #eef4ff;
  color: #2563eb;
}

:deep(.ledger-sidebar-item-active.tm-btn.ant-btn-text) {
  border: 1px solid #9dc0ff;
  background: #eef4ff;
  color: #2563eb;
}

.ledger-sidebar-item-inner {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ledger-sidebar-icon {
  font-size: 16px;
  color: currentColor;
}

.ledger-sidebar-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
}

.ledger-sidebar-title {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
}

.ledger-sidebar-progress {
  font-size: 12px;
  color: #475569;
}

@media (max-width: 1200px) {
  .ledger-edit-sidebar {
    width: 100%;
    max-height: none;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .ledger-sidebar-list {
    flex-direction: row;
    align-items: stretch;
    gap: 8px;
    min-width: max-content;
  }

  :deep(.ledger-sidebar-item.tm-btn.ant-btn-text) {
    width: 168px;
    margin-bottom: 0;
  }
}
</style>
