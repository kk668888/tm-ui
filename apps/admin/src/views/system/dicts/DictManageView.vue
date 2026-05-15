<template>
  <section class="admin-page">
    <AdminPageHeader title="字典管理" description="左侧维护字典类型，右侧维护对应字典项，适合高频基础数据配置。"></AdminPageHeader>

    <div class="admin-split-grid xl:grid-cols-[0.92fr_1.08fr]">
      <AdminTablePanel title="字典类型" description="决定字典项的业务归属。">
        <template #meta>
          <div class="admin-pill">类型 {{ typeList.length }}</div>
          <div class="admin-pill">启用 {{ enabledTypeCount }}</div>
        </template>
        <template #actions>
          <PermissionButton type="primary" permission="system:dict:create" @click="openTypeModal()">新增类型</PermissionButton>
        </template>
        <tm-table class="admin-data-table" :data-source="typeList" :columns="typeColumns" row-key="id" :pagination="false" :loading="typeLoading">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              <div class="dict-primary-cell">
                <div class="dict-primary-main">{{ record.name }}</div>
                <div class="dict-primary-sub">{{ record.code }}</div>
              </div>
            </template>
            <template v-else-if="column.key === 'status'">
              <StatusTag :value="record.status" />
            </template>
            <template v-else-if="column.key === 'actions'">
              <div class="admin-table-inline-actions">
                <tm-button size="small" @click="selectType(record)">查看项</tm-button>
                <PermissionButton size="small" permission="system:dict:edit" @click="openTypeModal(record)">编辑</PermissionButton>
                <PermissionButton size="small" permission="system:dict:delete" danger @click="removeType(record.id)">删除</PermissionButton>
              </div>
            </template>
          </template>
        </tm-table>
      </AdminTablePanel>

      <AdminTablePanel :title="selectedType ? `字典项 · ${selectedType.name}` : '字典项'" :description="selectedType ? selectedType.description || '按类型维护标签和值。' : '先从左侧选择一个字典类型。'">
        <template #meta>
          <div class="admin-pill">{{ selectedType ? selectedType.code : '未选择类型' }}</div>
          <div class="admin-pill">字典项 {{ itemList.length }}</div>
        </template>
        <template #actions>
          <PermissionButton type="primary" permission="system:dict:create" :disabled="!selectedType" mode="disabled" @click="openItemModal()">
            新增字典项
          </PermissionButton>
        </template>
        <tm-table class="admin-data-table" :data-source="itemList" :columns="itemColumns" row-key="id" :pagination="false" :loading="itemLoading">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'label'">
              <div class="dict-primary-cell">
                <div class="dict-primary-main">{{ record.label }}</div>
                <div class="dict-primary-sub">{{ record.remark || '未填写备注' }}</div>
              </div>
            </template>
            <template v-else-if="column.key === 'value'">
              <span class="admin-code">{{ record.value }}</span>
            </template>
            <template v-else-if="column.key === 'status'">
              <StatusTag :value="record.status" />
            </template>
            <template v-else-if="column.key === 'actions'">
              <div class="admin-table-inline-actions">
                <PermissionButton size="small" permission="system:dict:edit" @click="openItemModal(record)">编辑</PermissionButton>
                <PermissionButton size="small" permission="system:dict:delete" danger @click="removeItem(record.id)">删除</PermissionButton>
              </div>
            </template>
          </template>
        </tm-table>
      </AdminTablePanel>
    </div>

    <tm-modal v-model:model-value="typeModalOpen" :title="typeEditingId ? '编辑字典类型' : '新增字典类型'" :confirm-loading="saving" width="720px" @ok="submitType" @cancel="typeModalOpen = false">
      <tm-form :model="typeForm" layout="vertical" class="admin-form-grid">
        <tm-form-item label="名称"><tm-input v-model="typeForm.name" /></tm-form-item>
        <tm-form-item label="编码"><tm-input v-model="typeForm.code" /></tm-form-item>
        <tm-form-item class="admin-form-span-2" label="描述"><tm-textarea v-model="typeForm.description" :rows="3" /></tm-form-item>
        <tm-form-item class="admin-form-span-2" label="状态">
          <tm-radio-group v-model:value="typeForm.status">
            <a-radio value="enabled">启用</a-radio>
            <a-radio value="disabled">停用</a-radio>
          </tm-radio-group>
        </tm-form-item>
      </tm-form>
    </tm-modal>

    <tm-modal v-model:model-value="itemModalOpen" :title="itemEditingId ? '编辑字典项' : '新增字典项'" :confirm-loading="saving" width="720px" @ok="submitItem" @cancel="itemModalOpen = false">
      <tm-form :model="itemForm" layout="vertical" class="admin-form-grid">
        <tm-form-item label="标签"><tm-input v-model="itemForm.label" /></tm-form-item>
        <tm-form-item label="值"><tm-input v-model="itemForm.value" /></tm-form-item>
        <tm-form-item label="排序"><tm-input-number v-model="itemForm.sort" :min="1" class="w-full" /></tm-form-item>
        <tm-form-item label="状态">
          <tm-radio-group v-model:value="itemForm.status">
            <a-radio value="enabled">启用</a-radio>
            <a-radio value="disabled">停用</a-radio>
          </tm-radio-group>
        </tm-form-item>
        <tm-form-item class="admin-form-span-2" label="备注"><tm-textarea v-model="itemForm.remark" :rows="3" /></tm-form-item>
      </tm-form>
    </tm-modal>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { TmMessage } from 'tm-ui'
import { dictApi } from '@admin/api/system'
import type { DictItemRecord, DictTypeRecord } from '@admin/types'
import AdminPageHeader from '@admin/components/app/AdminPageHeader.vue'
import AdminTablePanel from '@admin/components/app/AdminTablePanel.vue'
import PermissionButton from '@admin/components/app/PermissionButton.vue'
import StatusTag from '@admin/components/app/StatusTag.vue'

const typeLoading = ref(false)
const itemLoading = ref(false)
const saving = ref(false)
const typeList = ref<DictTypeRecord[]>([])
const itemList = ref<DictItemRecord[]>([])
const selectedType = ref<DictTypeRecord | null>(null)
const typeModalOpen = ref(false)
const itemModalOpen = ref(false)
const typeEditingId = ref<number | null>(null)
const itemEditingId = ref<number | null>(null)

const typeForm = reactive<Partial<DictTypeRecord>>({
  name: '',
  code: '',
  description: '',
  status: 'enabled',
})

const itemForm = reactive<Partial<DictItemRecord>>({
  label: '',
  value: '',
  sort: 1,
  remark: '',
  status: 'enabled',
})

const typeColumns = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '编码', dataIndex: 'code', key: 'code' },
  { title: '状态', key: 'status' },
  { title: '操作', key: 'actions', width: 220 },
]

const itemColumns = [
  { title: '标签', dataIndex: 'label', key: 'label' },
  { title: '值', dataIndex: 'value', key: 'value' },
  { title: '排序', dataIndex: 'sort', key: 'sort' },
  { title: '状态', key: 'status' },
  { title: '操作', key: 'actions', width: 180 },
]
const enabledTypeCount = computed(() => typeList.value.filter((item) => item.status === 'enabled').length)

async function loadTypes() {
  typeLoading.value = true
  try {
    const result = await dictApi.typeList({ page: 1, pageSize: 99 })
    typeList.value = result.list
    if (!selectedType.value && result.list[0]) {
      await selectType(result.list[0])
    }
  } finally {
    typeLoading.value = false
  }
}

async function selectType(record: DictTypeRecord) {
  selectedType.value = record
  await loadItems(record.code)
}

async function loadItems(typeCode: string) {
  itemLoading.value = true
  try {
    itemList.value = await dictApi.itemList(typeCode)
  } finally {
    itemLoading.value = false
  }
}

function openTypeModal(record?: DictTypeRecord) {
  typeEditingId.value = record?.id ?? null
  Object.assign(typeForm, record ?? { name: '', code: '', description: '', status: 'enabled' })
  typeModalOpen.value = true
}

function openItemModal(record?: DictItemRecord) {
  if (!selectedType.value) {
    return
  }
  itemEditingId.value = record?.id ?? null
  Object.assign(itemForm, record ?? { label: '', value: '', sort: 1, remark: '', status: 'enabled' })
  itemModalOpen.value = true
}

async function submitType() {
  saving.value = true
  try {
    await dictApi.typeSave({ ...typeForm, id: typeEditingId.value ?? undefined })
    TmMessage.success(typeEditingId.value ? '字典类型已更新' : '字典类型已创建')
    typeModalOpen.value = false
    await loadTypes()
  } finally {
    saving.value = false
  }
}

async function submitItem() {
  if (!selectedType.value) return
  saving.value = true
  try {
    await dictApi.itemSave({
      ...itemForm,
      id: itemEditingId.value ?? undefined,
      typeCode: selectedType.value.code,
    })
    TmMessage.success(itemEditingId.value ? '字典项已更新' : '字典项已创建')
    itemModalOpen.value = false
    await loadItems(selectedType.value.code)
  } finally {
    saving.value = false
  }
}

async function removeType(id: number) {
  await dictApi.typeRemove(id)
  TmMessage.success('字典类型已删除')
  selectedType.value = null
  itemList.value = []
  await loadTypes()
}

async function removeItem(id: number) {
  if (!selectedType.value) return
  await dictApi.itemRemove(id)
  TmMessage.success('字典项已删除')
  await loadItems(selectedType.value.code)
}

onMounted(loadTypes)
</script>

<style scoped>
.dict-primary-cell {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;
}

.dict-primary-main {
  color: var(--admin-text-strong);
  font-weight: 600;
}

.dict-primary-sub {
  color: var(--admin-text-soft);
  font-size: 12px;
}
</style>
