<template>
  <section class="admin-page-section">
    <div class="admin-toolbar">
      <div>
        <h2 class="mb-2 text-2xl font-semibold">系统配置</h2>
        <p class="admin-muted">统一维护应用标题、主题与安全策略等系统级参数。</p>
      </div>
      <PermissionButton type="primary" permission="system:config:create" @click="openCreate">
        新建配置
      </PermissionButton>
    </div>

    <tm-card>
      <a-form layout="inline" class="flex flex-wrap gap-3">
        <a-form-item label="关键词">
          <tm-input v-model="query.keyword" placeholder="配置名 / 配置键" style="width: 240px" />
        </a-form-item>
        <a-form-item label="分组">
          <tm-select v-model="query.group" style="width: 180px" :options="groupOptions" allow-clear />
        </a-form-item>
        <a-form-item>
          <a-space>
            <tm-button type="primary" @click="loadConfigs">查询</tm-button>
            <tm-button @click="resetQuery">重置</tm-button>
          </a-space>
        </a-form-item>
      </a-form>
    </tm-card>

    <tm-card>
      <a-table :data-source="configs" :columns="columns" row-key="id" :loading="loading" :pagination="pagination" @change="handleTableChange">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <StatusTag :value="record.status" />
          </template>
          <template v-else-if="column.key === 'actions'">
            <a-space wrap>
              <PermissionButton size="small" permission="system:config:edit" @click="openEdit(record)">编辑</PermissionButton>
              <PermissionButton size="small" permission="system:config:delete" danger @click="removeConfig(record.id)">删除</PermissionButton>
            </a-space>
          </template>
        </template>
      </a-table>
    </tm-card>

    <a-modal :open="modalOpen" :title="editingId ? '编辑配置' : '新建配置'" :confirm-loading="saving" @ok="submitConfig" @cancel="modalOpen = false">
      <a-form layout="vertical">
        <a-form-item label="分组"><tm-input v-model="formState.group" /></a-form-item>
        <a-form-item label="配置键"><tm-input v-model="formState.key" /></a-form-item>
        <a-form-item label="配置名称"><tm-input v-model="formState.name" /></a-form-item>
        <a-form-item label="类型">
          <tm-select v-model="formState.type" :options="typeOptions" />
        </a-form-item>
        <a-form-item label="值">
          <tm-input v-if="formState.type !== 'boolean'" v-model="stringValue" />
          <a-switch v-else v-model:checked="booleanValue" />
        </a-form-item>
        <a-form-item label="描述"><a-textarea v-model:value="formState.description" :rows="3" /></a-form-item>
      </a-form>
    </a-modal>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { Modal, message } from 'ant-design-vue'
import type { TablePaginationConfig } from 'ant-design-vue'
import { configApi } from '@admin/api/system'
import type { SystemConfigRecord } from '@admin/types'
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
  { title: '操作', key: 'actions', width: 200 },
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

const pagination = computed<TablePaginationConfig>(() => ({
  current: query.page,
  pageSize: query.pageSize,
  total: total.value,
  showSizeChanger: true,
}))

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
  stringValue.value = String(record.value)
  booleanValue.value = Boolean(record.value)
  modalOpen.value = true
}

async function submitConfig() {
  saving.value = true
  try {
    formState.value = formState.type === 'boolean' ? booleanValue.value : stringValue.value
    await configApi.save({ ...formState, id: editingId.value ?? undefined })
    message.success(editingId.value ? '配置已更新' : '配置已创建')
    modalOpen.value = false
    await loadConfigs()
  } finally {
    saving.value = false
  }
}

function removeConfig(id: number) {
  Modal.confirm({
    title: '确认删除该配置？',
    onOk: async () => {
      await configApi.remove(id)
      message.success('配置已删除')
      await loadConfigs()
    },
  })
}

function handleTableChange(paginationConfig: TablePaginationConfig) {
  query.page = paginationConfig.current ?? 1
  query.pageSize = paginationConfig.pageSize ?? 10
  loadConfigs()
}

onMounted(loadConfigs)
</script>
