<template>
  <section class="admin-page-section">
    <div class="admin-toolbar">
      <div>
        <h2 class="mb-2 text-2xl font-semibold">菜单管理</h2>
        <p class="admin-muted">维护目录、菜单和按钮节点，同时为权限体系提供基础数据。</p>
      </div>
      <PermissionButton type="primary" permission="system:menu:create" @click="openCreate">
        新建菜单
      </PermissionButton>
    </div>

    <tm-card>
      <tm-table :data-source="treeData" :columns="columns" row-key="id" :pagination="false" :loading="loading">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'type'">
            <tm-tag>{{ record.type }}</tm-tag>
          </template>
          <template v-else-if="column.key === 'status'">
            <StatusTag :value="record.status" />
          </template>
          <template v-else-if="column.key === 'actions'">
            <tm-space wrap>
              <PermissionButton size="small" permission="system:menu:edit" @click="openEdit(record)">编辑</PermissionButton>
              <PermissionButton size="small" permission="system:menu:delete" danger @click="removeMenu(record.id)">
                删除
              </PermissionButton>
            </tm-space>
          </template>
        </template>
      </tm-table>
    </tm-card>

    <a-modal :open="modalOpen" :title="editingId ? '编辑菜单' : '新建菜单'" :confirm-loading="saving" @ok="submitMenu" @cancel="modalOpen = false">
      <a-form layout="vertical">
        <a-form-item label="菜单标题">
          <tm-input v-model="formState.title" />
        </a-form-item>
        <a-form-item label="路由路径">
          <tm-input v-model="formState.path" />
        </a-form-item>
        <a-form-item label="父级节点">
          <tm-select v-model="formState.parentId" :options="parentOptions" allow-clear />
        </a-form-item>
        <a-form-item label="节点类型">
          <tm-select v-model="formState.type" :options="typeOptions" />
        </a-form-item>
        <a-form-item label="权限码">
          <tm-input v-model="formState.permission" />
        </a-form-item>
        <a-form-item label="图标">
          <tm-input v-model="formState.icon" />
        </a-form-item>
        <a-form-item label="排序">
          <tm-input-number v-model="formState.sort" :min="1" class="w-full" />
        </a-form-item>
      </a-form>
    </a-modal>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { Modal, message } from 'ant-design-vue'
import { menuApi } from '@admin/api/system'
import type { MenuRecord } from '@admin/types'
import PermissionButton from '@admin/components/app/PermissionButton.vue'
import StatusTag from '@admin/components/app/StatusTag.vue'

const loading = ref(false)
const saving = ref(false)
const menus = ref<MenuRecord[]>([])
const modalOpen = ref(false)
const editingId = ref<number | null>(null)

const formState = reactive<Partial<MenuRecord>>({
  parentId: null,
  type: 'menu',
  title: '',
  path: '',
  permission: '',
  icon: '',
  sort: 1,
  status: 'enabled',
})

const columns = [
  { title: '标题', dataIndex: 'title', key: 'title' },
  { title: '路径', dataIndex: 'path', key: 'path' },
  { title: '类型', key: 'type' },
  { title: '权限码', dataIndex: 'permission', key: 'permission' },
  { title: '状态', key: 'status' },
  { title: '排序', dataIndex: 'sort', key: 'sort' },
  { title: '操作', key: 'actions', width: 220 },
]

const typeOptions = [
  { label: '目录', value: 'catalog' },
  { label: '菜单', value: 'menu' },
  { label: '按钮', value: 'button' },
]

const parentOptions = computed(() => [
  { label: '顶级节点', value: null },
  ...menus.value.map((item) => ({ label: item.title, value: item.id })),
])

const treeData = computed(() => buildTree(menus.value))

function buildTree(list: MenuRecord[], parentId: number | null = null): MenuRecord[] {
  return list
    .filter((item) => item.parentId === parentId)
    .sort((a, b) => a.sort - b.sort)
    .map((item) => ({
      ...item,
      children: buildTree(list, item.id),
    }))
}

async function loadMenus() {
  loading.value = true
  try {
    menus.value = await menuApi.list()
  } finally {
    loading.value = false
  }
}

function resetForm() {
  editingId.value = null
  Object.assign(formState, {
    parentId: null,
    type: 'menu',
    title: '',
    path: '',
    permission: '',
    icon: '',
    sort: 1,
    status: 'enabled',
  })
}

function openCreate() {
  resetForm()
  modalOpen.value = true
}

function openEdit(record: MenuRecord) {
  editingId.value = record.id
  Object.assign(formState, JSON.parse(JSON.stringify(record)))
  modalOpen.value = true
}

async function submitMenu() {
  saving.value = true
  try {
    await menuApi.save({ ...formState, id: editingId.value ?? undefined })
    message.success(editingId.value ? '菜单已更新' : '菜单已创建')
    modalOpen.value = false
    await loadMenus()
  } finally {
    saving.value = false
  }
}

function removeMenu(id: number) {
  Modal.confirm({
    title: '确认删除该菜单节点？',
    onOk: async () => {
      await menuApi.remove(id)
      message.success('菜单已删除')
      await loadMenus()
    },
  })
}

onMounted(loadMenus)
</script>
