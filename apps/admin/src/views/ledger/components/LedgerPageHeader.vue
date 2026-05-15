<template>
  <div class="admin-page-header">
    <div class="admin-page-heading">
      <h1 class="admin-page-title ledger-title">台账列表</h1>
      <p class="admin-page-description">按类型、状态和所属单位查看当前业务台账，并快速进入维护流程。</p>
    </div>
    <div class="admin-page-actions">
      <div class="admin-pill">
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
.ledger-title {
  font-size: 22px;
}

.ledger-button-inner {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

:deep(.ledger-action-button.tm-btn.ant-btn) {
  height: 36px;
  padding: 0 16px;
  border-radius: 8px;
}
</style>
