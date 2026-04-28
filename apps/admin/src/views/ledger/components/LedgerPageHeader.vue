<template>
  <div class="admin-toolbar ledger-header">
    <div>
      <h2 class="ledger-title">台账列表</h2>
    </div>
    <div class="ledger-header-actions">
      <div class="ledger-total-pill">
        共 {{ total }} 项
      </div>
      <PermissionButton permission="system:ledger:import" class="ledger-action-button ledger-import-button">
        <span class="ledger-button-inner">
          <ImportOutlined />
          导入
        </span>
      </PermissionButton>
      <PermissionButton type="primary" permission="system:ledger:create" class="ledger-action-button ledger-create-button">
        <span class="ledger-button-inner">
          <PlusOutlined />
          新增台账
        </span>
      </PermissionButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ImportOutlined, PlusOutlined } from '@ant-design/icons-vue'
import PermissionButton from '@admin/components/app/PermissionButton.vue'

defineProps<{
  total: number
}>()
</script>

<style scoped>
.ledger-header {
  padding: 4px 2px 2px;
}

.ledger-title {
  margin: 0;
  font-size: 18px;
  line-height: 30px;
  font-weight: 700;
  color: #0f172a;
}

.ledger-header-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.ledger-total-pill {
  height: 30px;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid #dbe7ff;
  background: #f7fbff;
  color: #2f6df6;
  font-size: 14px;
  font-weight: 600;
}

.ledger-button-inner {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

:deep(.ledger-action-button.tm-btn.ant-btn) {
  height: 34px;
  padding: 0 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: none;
}

:deep(.ledger-import-button.tm-btn.ant-btn) {
  border-color: #d9e2f0;
  color: #475569;
  background: #fff;
}

:deep(.ledger-import-button.tm-btn.ant-btn:hover) {
  border-color: #bed2f3;
  color: #2563eb;
}

:deep(.ledger-create-button.tm-btn.ant-btn.ant-btn-primary) {
  border-color: #3b82f6;
  background: #3b82f6;
}
</style>
