<template>
  <section class="admin-page-section">
    <div class="admin-toolbar">
      <div>
        <h2 class="mb-2 text-2xl font-semibold">角色管理</h2>
        <p class="admin-muted">角色决定菜单访问范围和按钮操作权限。</p>
      </div>
      <PermissionButton type="primary" permission="system:role:create" @click="openCreate">
        新建角色
      </PermissionButton>
    </div>

    <tm-card>
      <a-form layout="inline" class="flex flex-wrap gap-3">
        <a-form-item label="关键词">
          <tm-input v-model="query.keyword" placeholder="角色名称 / 编码" style="width: 220px" />
        </a-form-item>
        <a-form-item label="状态">
          <tm-select v-model="query.status" style="width: 160px" :options="statusOptions" allow-clear />
        </a-form-item>
        <a-form-item>
          <tm-space>
            <tm-button type="primary" @click="loadRoles">查询</tm-button>
            <tm-button @click="resetQuery">重置</tm-button>
          </tm-space>
        </a-form-item>
      </a-form>
    </tm-card>

    <tm-card>
      <a-table :data-source="roles" :columns="columns" :pagination="pagination" row-key="id" :loading="loading" @change="handleTableChange">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <StatusTag :value="record.status" />
          </template>
          <template v-else-if="column.key === 'actions'">
            <tm-space wrap>
              <PermissionButton size="small" permission="system:role:edit" @click="openEdit(record)">编辑</PermissionButton>
              <PermissionButton size="small" permission="system:role:edit" @click="openAssign(record)">授权</PermissionButton>
              <PermissionButton size="small" permission="system:role:delete" danger @click="removeRole(record.id)">删除</PermissionButton>
            </tm-space>
          </template>
        </template>
      </a-table>
    </tm-card>

    <a-modal :open="modalOpen" :title="editingId ? '编辑角色' : '新建角色'" :confirm-loading="saving" @ok="submitRole" @cancel="modalOpen = false">
      <a-form layout="vertical">
        <a-form-item label="角色名称">
          <tm-input v-model="formState.name" />
        </a-form-item>
        <a-form-item label="角色编码">
          <tm-input v-model="formState.code" />
        </a-form-item>
        <a-form-item label="角色描述">
          <tm-textarea v-model="formState.description" :rows="3" />
        </a-form-item>
        <a-form-item label="状态">
          <a-radio-group v-model:value="formState.status">
            <a-radio value="enabled">启用</a-radio>
            <a-radio value="disabled">停用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal :open="assignOpen" title="角色授权" width="880px" :confirm-loading="saving" @ok="submitAssign" @cancel="assignOpen = false">
      <div class="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <div class="mb-3 font-semibold">菜单权限</div>
          <a-tree
            checkable
            default-expand-all
            :tree-data="menuTreeData"
            :checked-keys="assignState.menuIds"
            @check="handleMenuCheck"
          />
        </div>
        <div>
          <div class="mb-3 font-semibold">按钮权限</div>
          <a-checkbox-group v-model:value="assignState.permissions" class="grid gap-2" :options="permissionOptions" />
        </div>
      </div>
    </a-modal>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { Modal, message } from 'ant-design-vue'
import type { TablePaginationConfig, TreeProps } from 'ant-design-vue'
import { menuApi, roleApi } from '@admin/api/system'
import { useAuthStore } from '@admin/stores/auth'
import { usePermissionStore } from '@admin/stores/permission'
import type { MenuRecord, RoleRecord } from '@admin/types'
import PermissionButton from '@admin/components/app/PermissionButton.vue'
import StatusTag from '@admin/components/app/StatusTag.vue'

const permissionOptions = [
  'system:user:view', 'system:user:create', 'system:user:edit', 'system:user:delete',
  'system:role:view', 'system:role:create', 'system:role:edit', 'system:role:delete',
  'system:menu:view', 'system:menu:create', 'system:menu:edit', 'system:menu:delete',
  'system:dict:view', 'system:dict:create', 'system:dict:edit', 'system:dict:delete',
  'system:log:operation', 'system:log:login',
  'system:config:view', 'system:config:create', 'system:config:edit', 'system:config:delete',
].map((item) => ({ label: item, value: item }))

const authStore = useAuthStore()
const permissionStore = usePermissionStore()
const loading = ref(false)
const saving = ref(false)
const roles = ref<RoleRecord[]>([])
const menus = ref<MenuRecord[]>([])
const total = ref(0)
const modalOpen = ref(false)
const assignOpen = ref(false)
const editingId = ref<number | null>(null)
const activeAssignId = ref<number | null>(null)

const query = reactive({
  page: 1,
  pageSize: 10,
  keyword: '',
  status: undefined as string | undefined,
})

const formState = reactive<Partial<RoleRecord>>({
  name: '',
  code: '',
  description: '',
  status: 'enabled',
})

const assignState = reactive({
  menuIds: [] as number[],
  permissions: [] as string[],
})

const columns = [
  { title: '角色名称', dataIndex: 'name', key: 'name' },
  { title: '角色编码', dataIndex: 'code', key: 'code' },
  { title: '状态', key: 'status' },
  { title: '描述', dataIndex: 'description', key: 'description' },
  { title: '操作', key: 'actions', width: 260 },
]

const statusOptions = [
  { label: '启用', value: 'enabled' },
  { label: '停用', value: 'disabled' },
]

const pagination = computed<TablePaginationConfig>(() => ({
  current: query.page,
  pageSize: query.pageSize,
  total: total.value,
  showSizeChanger: true,
}))

const menuTreeData = computed(() => {
  const build = (parentId: number | null): TreeProps['treeData'] =>
    menus.value
      .filter((item) => item.parentId === parentId)
      .map((item) => ({
        title: item.title,
        key: item.id,
        children: build(item.id),
      }))
  return build(null)
})

async function loadRoles() {
  loading.value = true
  try {
    const result = await roleApi.list(query)
    roles.value = result.list
    total.value = result.total
  } finally {
    loading.value = false
  }
}

async function loadMenus() {
  menus.value = await menuApi.list()
}

function resetQuery() {
  query.page = 1
  query.pageSize = 10
  query.keyword = ''
  query.status = undefined
  loadRoles()
}

function resetForm() {
  editingId.value = null
  Object.assign(formState, { name: '', code: '', description: '', status: 'enabled' })
}

function openCreate() {
  resetForm()
  modalOpen.value = true
}

function openEdit(record: RoleRecord) {
  editingId.value = record.id
  Object.assign(formState, JSON.parse(JSON.stringify(record)))
  modalOpen.value = true
}

function openAssign(record: RoleRecord) {
  activeAssignId.value = record.id
  assignState.menuIds = [...record.menuIds]
  assignState.permissions = [...record.permissions]
  assignOpen.value = true
}

async function submitRole() {
  saving.value = true
  try {
    await roleApi.save({ ...formState, id: editingId.value ?? undefined })
    message.success(editingId.value ? '角色已更新' : '角色已创建')
    modalOpen.value = false
    await loadRoles()
  } finally {
    saving.value = false
  }
}

async function submitAssign() {
  if (!activeAssignId.value) {
    return
  }
  saving.value = true
  try {
    await roleApi.assign({
      roleId: activeAssignId.value,
      menuIds: assignState.menuIds,
      permissions: assignState.permissions,
    })
    message.success('角色权限已更新')
    assignOpen.value = false
    await authStore.fetchProfile()
    permissionStore.buildRoutes()
    await loadRoles()
  } finally {
    saving.value = false
  }
}

function removeRole(id: number) {
  Modal.confirm({
    title: '确认删除该角色？',
    onOk: async () => {
      await roleApi.remove(id)
      message.success('角色已删除')
      await loadRoles()
    },
  })
}

function handleMenuCheck(keys: any) {
  assignState.menuIds = Array.isArray(keys) ? keys.map(Number) : keys.checked.map(Number)
}

function handleTableChange(paginationConfig: TablePaginationConfig) {
  query.page = paginationConfig.current ?? 1
  query.pageSize = paginationConfig.pageSize ?? 10
  loadRoles()
}

onMounted(async () => {
  await Promise.all([loadRoles(), loadMenus()])
})
</script>
