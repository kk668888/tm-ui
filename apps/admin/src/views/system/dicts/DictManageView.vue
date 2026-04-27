<template>
  <section class="admin-page-section">
    <div class="admin-toolbar">
      <div>
        <h2 class="mb-2 text-2xl font-semibold">字典管理</h2>
        <p class="admin-muted">左侧维护字典类型，右侧维护该类型下的字典项。</p>
      </div>
    </div>

    <div class="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <tm-card>
        <template #title>字典类型</template>
        <div class="mb-4 flex justify-end">
          <PermissionButton type="primary" permission="system:dict:create" @click="openTypeModal()">新增类型</PermissionButton>
        </div>
        <a-table :data-source="typeList" :columns="typeColumns" row-key="id" :pagination="false" :loading="typeLoading">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'status'">
              <StatusTag :value="record.status" />
            </template>
            <template v-else-if="column.key === 'actions'">
              <tm-space>
                <tm-button size="small" @click="selectType(record)">查看项</tm-button>
                <PermissionButton size="small" permission="system:dict:edit" @click="openTypeModal(record)">编辑</PermissionButton>
                <PermissionButton size="small" permission="system:dict:delete" danger @click="removeType(record.id)">删除</PermissionButton>
              </tm-space>
            </template>
          </template>
        </a-table>
      </tm-card>

      <tm-card>
        <template #title>字典项 {{ selectedType ? `(${selectedType.name})` : '' }}</template>
        <div class="mb-4 flex justify-end">
          <PermissionButton type="primary" permission="system:dict:create" :disabled="!selectedType" mode="disabled" @click="openItemModal()">
            新增字典项
          </PermissionButton>
        </div>
        <a-table :data-source="itemList" :columns="itemColumns" row-key="id" :pagination="false" :loading="itemLoading">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'status'">
              <StatusTag :value="record.status" />
            </template>
            <template v-else-if="column.key === 'actions'">
              <tm-space>
                <PermissionButton size="small" permission="system:dict:edit" @click="openItemModal(record)">编辑</PermissionButton>
                <PermissionButton size="small" permission="system:dict:delete" danger @click="removeItem(record.id)">删除</PermissionButton>
              </tm-space>
            </template>
          </template>
        </a-table>
      </tm-card>
    </div>

    <a-modal :open="typeModalOpen" :title="typeEditingId ? '编辑字典类型' : '新增字典类型'" :confirm-loading="saving" @ok="submitType" @cancel="typeModalOpen = false">
      <a-form layout="vertical">
        <a-form-item label="名称"><tm-input v-model="typeForm.name" /></a-form-item>
        <a-form-item label="编码"><tm-input v-model="typeForm.code" /></a-form-item>
        <a-form-item label="描述"><tm-textarea v-model="typeForm.description" :rows="3" /></a-form-item>
        <a-form-item label="状态">
          <a-radio-group v-model:value="typeForm.status">
            <a-radio value="enabled">启用</a-radio>
            <a-radio value="disabled">停用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal :open="itemModalOpen" :title="itemEditingId ? '编辑字典项' : '新增字典项'" :confirm-loading="saving" @ok="submitItem" @cancel="itemModalOpen = false">
      <a-form layout="vertical">
        <a-form-item label="标签"><tm-input v-model="itemForm.label" /></a-form-item>
        <a-form-item label="值"><tm-input v-model="itemForm.value" /></a-form-item>
        <a-form-item label="排序"><tm-input-number v-model="itemForm.sort" :min="1" class="w-full" /></a-form-item>
        <a-form-item label="备注"><tm-textarea v-model="itemForm.remark" :rows="3" /></a-form-item>
        <a-form-item label="状态">
          <a-radio-group v-model:value="itemForm.status">
            <a-radio value="enabled">启用</a-radio>
            <a-radio value="disabled">停用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Modal, message } from 'ant-design-vue'
import { dictApi } from '@admin/api/system'
import type { DictItemRecord, DictTypeRecord } from '@admin/types'
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
    message.success(typeEditingId.value ? '字典类型已更新' : '字典类型已创建')
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
    message.success(itemEditingId.value ? '字典项已更新' : '字典项已创建')
    itemModalOpen.value = false
    await loadItems(selectedType.value.code)
  } finally {
    saving.value = false
  }
}

function removeType(id: number) {
  Modal.confirm({
    title: '确认删除该字典类型？',
    onOk: async () => {
      await dictApi.typeRemove(id)
      message.success('字典类型已删除')
      selectedType.value = null
      itemList.value = []
      await loadTypes()
    },
  })
}

function removeItem(id: number) {
  if (!selectedType.value) return
  Modal.confirm({
    title: '确认删除该字典项？',
    onOk: async () => {
      await dictApi.itemRemove(id)
      message.success('字典项已删除')
      await loadItems(selectedType.value!.code)
    },
  })
}

onMounted(loadTypes)
</script>
