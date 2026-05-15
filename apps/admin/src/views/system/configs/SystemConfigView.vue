<template>
  <section class="admin-page">
    <AdminPageHeader title="系统配置" description="统一维护应用标题、主题、开关项和安全类系统参数。">
      <template #actions>
        <PermissionButton type="primary" permission="system:config:create" @click="openCreate">
          新建配置
        </PermissionButton>
      </template>
    </AdminPageHeader>

    <AdminFilterPanel>
      <tm-form-item class="admin-filter-item admin-filter-item-wide" label="关键词">
        <tm-input v-model="query.keyword" placeholder="配置名 / 配置键" />
      </tm-form-item>
      <tm-form-item class="admin-filter-item" label="分组">
        <tm-select v-model="query.group" :options="groupOptions" allow-clear placeholder="全部分组" />
      </tm-form-item>
      <template #actions>
        <tm-button type="primary" @click="loadConfigs">查询</tm-button>
        <tm-button @click="resetQuery">重置</tm-button>
      </template>
    </AdminFilterPanel>

    <AdminTablePanel title="配置列表" description="支持维护不同分组下的配置键和值。">
      <template #meta>
        <div class="admin-pill">共 {{ total }} 项配置</div>
        <div class="admin-pill">布尔项 {{ booleanCount }}</div>
        <div class="admin-pill">启用 {{ enabledCount }}</div>
      </template>
      <tm-table class="admin-data-table" :data-source="configs" :columns="columns" row-key="id" :loading="loading" :pagination="pagination" @change="handleTableChange">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <div class="config-primary-cell">
              <div class="config-primary-main">{{ record.name }}</div>
              <div class="config-primary-sub">{{ record.key }}</div>
            </div>
          </template>
          <template v-else-if="column.key === 'group'">
            <div class="config-primary-cell">
              <div class="config-primary-main">{{ record.group }}</div>
              <div class="config-primary-sub">{{ typeLabelMap[record.type] }}</div>
            </div>
          </template>
          <template v-else-if="column.key === 'status'">
            <StatusTag :value="record.status" />
          </template>
          <template v-else-if="column.key === 'value'">
            <span class="admin-code">{{ formatConfigValue(record.value) }}</span>
          </template>
          <template v-else-if="column.key === 'actions'">
            <div class="admin-table-inline-actions">
              <PermissionButton size="small" permission="system:config:edit" @click="openEdit(record)">编辑</PermissionButton>
              <PermissionButton size="small" permission="system:config:delete" danger @click="removeConfig(record.id)">删除</PermissionButton>
            </div>
          </template>
        </template>
      </tm-table>
    </AdminTablePanel>

    <tm-modal v-model:model-value="modalOpen" :title="editingId ? '编辑配置' : '新建配置'" :confirm-loading="saving" width="760px" @ok="submitConfig" @cancel="modalOpen = false">
      <tm-form :model="formState" layout="vertical" class="admin-form-grid">
        <tm-form-item label="分组"><tm-input v-model="formState.group" /></tm-form-item>
        <tm-form-item label="配置键"><tm-input v-model="formState.key" /></tm-form-item>
        <tm-form-item label="配置名称"><tm-input v-model="formState.name" /></tm-form-item>
        <tm-form-item label="类型">
          <tm-select v-model="formState.type" :options="typeOptions" />
        </tm-form-item>
        <tm-form-item class="admin-form-span-2" label="值">
          <tm-input v-if="formState.type !== 'boolean'" v-model="stringValue" />
          <tm-switch v-else v-model="booleanValue" />
        </tm-form-item>
        <tm-form-item class="admin-form-span-2" label="状态">
          <tm-radio-group v-model:value="formState.status">
            <a-radio value="enabled">启用</a-radio>
            <a-radio value="disabled">停用</a-radio>
          </tm-radio-group>
        </tm-form-item>
        <tm-form-item class="admin-form-span-2" label="描述"><tm-textarea v-model="formState.description" :rows="3" /></tm-form-item>
      </tm-form>
    </tm-modal>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { TmMessage } from 'tm-ui'
import type { TablePaginationConfig } from 'ant-design-vue'
import { configApi } from '@admin/api/system'
import type { SystemConfigRecord } from '@admin/types'
import AdminFilterPanel from '@admin/components/app/AdminFilterPanel.vue'
import AdminPageHeader from '@admin/components/app/AdminPageHeader.vue'
import AdminTablePanel from '@admin/components/app/AdminTablePanel.vue'
import PermissionButton from '@admin/components/app/PermissionButton.vue'
import StatusTag from '@admin/components/app/StatusTag.vue'

const loading = ref(false)
const saving = ref(false)
const configs = ref<SystemConfigRecord[]>([])
const total = ref(0)
const modalOpen = ref(false)
const editingId = ref<number | null>(null)
const stringValue = ref('')
const booleanValue = ref(false)

const query = reactive({
  page: 1,
  pageSize: 10,
  keyword: '',
  group: undefined as string | undefined,
})

const formState = reactive<Partial<SystemConfigRecord>>({
  group: 'app',
  key: '',
  name: '',
  type: 'string',
  value: '',
  description: '',
  status: 'enabled',
})

const columns = [
  { title: '分组', dataIndex: 'group', key: 'group' },
  { title: '配置键', dataIndex: 'key', key: 'key' },
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '类型', dataIndex: 'type', key: 'type' },
  { title: '值', dataIndex: 'value', key: 'value' },
  { title: '状态', key: 'status' },
  { title: '操作', key: 'actions', width: 180 },
]

const groupOptions = [
  { label: 'app', value: 'app' },
  { label: 'security', value: 'security' },
  { label: 'theme', value: 'theme' },
]

const typeOptions = [
  { label: 'string', value: 'string' },
  { label: 'number', value: 'number' },
  { label: 'boolean', value: 'boolean' },
  { label: 'select', value: 'select' },
]
const typeLabelMap = {
  string: '字符串',
  number: '数字',
  boolean: '布尔值',
  select: '下拉选项',
}

const pagination = computed<TablePaginationConfig>(() => ({
  current: query.page,
  pageSize: query.pageSize,
  total: total.value,
  showSizeChanger: true,
}))
const booleanCount = computed(() => configs.value.filter((item) => item.type === 'boolean').length)
const enabledCount = computed(() => configs.value.filter((item) => item.status === 'enabled').length)

function parseBooleanValue(value: SystemConfigRecord['value']) {
  if (typeof value === 'boolean') {
    return value
  }
  if (typeof value === 'number') {
    return value !== 0
  }
  return value === 'true'
}

function formatConfigValue(value: SystemConfigRecord['value']) {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false'
  }
  return String(value)
}

async function loadConfigs() {
  loading.value = true
  try {
    const result = await configApi.list(query)
    configs.value = result.list
    total.value = result.total
  } finally {
    loading.value = false
  }
}

function resetQuery() {
  query.page = 1
  query.pageSize = 10
  query.keyword = ''
  query.group = undefined
  loadConfigs()
}

function resetForm() {
  editingId.value = null
  Object.assign(formState, { group: 'app', key: '', name: '', type: 'string', value: '', description: '', status: 'enabled' })
  stringValue.value = ''
  booleanValue.value = false
}

function openCreate() {
  resetForm()
  modalOpen.value = true
}

function openEdit(record: SystemConfigRecord) {
  editingId.value = record.id
  Object.assign(formState, JSON.parse(JSON.stringify(record)))
  stringValue.value = record.value == null ? '' : String(record.value)
  booleanValue.value = parseBooleanValue(record.value)
  modalOpen.value = true
}

async function submitConfig() {
  saving.value = true
  try {
    formState.value = formState.type === 'boolean' ? booleanValue.value : stringValue.value
    await configApi.save({ ...formState, id: editingId.value ?? undefined })
    TmMessage.success(editingId.value ? '配置已更新' : '配置已创建')
    modalOpen.value = false
    await loadConfigs()
  } finally {
    saving.value = false
  }
}

async function removeConfig(id: number) {
  await configApi.remove(id)
  TmMessage.success('配置已删除')
  await loadConfigs()
}

function handleTableChange(paginationConfig: TablePaginationConfig) {
  query.page = paginationConfig.current ?? 1
  query.pageSize = paginationConfig.pageSize ?? 10
  loadConfigs()
}

onMounted(loadConfigs)
</script>

<style scoped>
.config-primary-cell {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;
}

.config-primary-main {
  color: var(--admin-text-strong);
  font-weight: 600;
}

.config-primary-sub {
  color: var(--admin-text-soft);
  font-size: 12px;
}
</style>
