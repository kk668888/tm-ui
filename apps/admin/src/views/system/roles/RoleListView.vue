<template>
  <section class="admin-page">
    <AdminPageHeader title="角色管理" description="维护角色访问范围、按钮权限与菜单授权关系。">
      <template #actions>
        <PermissionButton type="primary" permission="system:role:create" @click="openCreate">
          新建角色
        </PermissionButton>
      </template>
    </AdminPageHeader>

    <AdminFilterPanel>
      <tm-form-item class="admin-filter-item admin-filter-item-wide" label="关键词">
        <tm-input v-model="query.keyword" placeholder="角色名称 / 编码" />
      </tm-form-item>
      <tm-form-item class="admin-filter-item" label="状态">
        <tm-select v-model="query.status" :options="statusOptions" allow-clear placeholder="全部状态" />
      </tm-form-item>
      <template #actions>
        <tm-button type="primary" @click="loadRoles">查询</tm-button>
        <tm-button @click="resetQuery">重置</tm-button>
      </template>
    </AdminFilterPanel>

    <AdminTablePanel title="角色列表" description="支持编辑角色基础信息并配置权限。">
      <template #meta>
        <div class="admin-pill">共 {{ total }} 个角色</div>
        <div class="admin-pill">启用 {{ enabledCount }}</div>
        <div class="admin-pill">权限点 {{ permissionOptions.length }}</div>
      </template>
      <tm-table
        class="admin-data-table"
        :data-source="roles"
        :columns="columns"
        :pagination="pagination"
        row-key="id"
        :loading="loading"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <div class="role-primary-cell">
              <div class="role-primary-main">{{ record.name }}</div>
              <div class="role-primary-sub">{{ record.code }}</div>
            </div>
          </template>
          <template v-else-if="column.key === 'description'">
            <div class="role-description">{{ record.description || '未填写描述' }}</div>
          </template>
          <template v-else-if="column.key === 'status'">
            <StatusTag :value="record.status" />
          </template>
          <template v-else-if="column.key === 'actions'">
            <div class="admin-table-inline-actions">
              <PermissionButton size="small" permission="system:role:edit" @click="openEdit(record)">编辑</PermissionButton>
              <PermissionButton size="small" permission="system:role:edit" @click="openAssign(record)">授权</PermissionButton>
              <PermissionButton size="small" permission="system:role:delete" danger @click="removeRole(record.id)">删除</PermissionButton>
            </div>
          </template>
        </template>
      </tm-table>
    </AdminTablePanel>

    <tm-modal v-model:model-value="modalOpen" :title="editingId ? '编辑角色' : '新建角色'" :confirm-loading="saving" width="720px" @ok="submitRole" @cancel="modalOpen = false">
      <tm-form :model="formState" layout="vertical" class="admin-form-grid">
        <tm-form-item label="角色名称">
          <tm-input v-model="formState.name" />
        </tm-form-item>
        <tm-form-item label="角色编码">
          <tm-input v-model="formState.code" />
        </tm-form-item>
        <tm-form-item class="admin-form-span-2" label="角色描述">
          <tm-textarea v-model="formState.description" :rows="3" />
        </tm-form-item>
        <tm-form-item class="admin-form-span-2" label="状态">
          <tm-radio-group v-model:value="formState.status">
            <a-radio value="enabled">启用</a-radio>
            <a-radio value="disabled">停用</a-radio>
          </tm-radio-group>
        </tm-form-item>
      </tm-form>
    </tm-modal>

    <tm-modal v-model:model-value="assignOpen" title="角色授权" width="960px" :confirm-loading="saving" @ok="submitAssign" @cancel="assignOpen = false">
      <div class="role-assign-summary" v-if="activeAssignRecord">
        <div class="role-assign-summary-main">
          <div class="role-assign-summary-title">{{ activeAssignRecord.name }}</div>
          <div class="role-assign-summary-sub">{{ activeAssignRecord.code }} · {{ activeAssignRecord.description || '未填写描述' }}</div>
        </div>
        <div class="role-assign-summary-stats">
          <div class="admin-pill">菜单 {{ assignState.menuIds.length }}</div>
          <div class="admin-pill">按钮 {{ assignState.permissions.length }}</div>
        </div>
      </div>
      <div class="admin-split-grid admin-split-grid-2">
        <AdminTablePanel title="菜单权限" description="控制该角色可见的页面与导航。">
          <tm-tree
            :checkable="true"
            :default-expand-all="true"
            :tree-data="menuTreeData"
            :checked-keys="assignState.menuIds"
            @update:checked-keys="handleMenuCheck"
          />
        </AdminTablePanel>
        <AdminTablePanel title="按钮权限" description="按业务域分组勾选该角色可执行的具体操作。">
          <div class="role-permission-groups">
            <section v-for="group in permissionGroups" :key="group.key" class="role-permission-group">
              <div class="role-permission-group-title">{{ group.label }}</div>
              <tm-checkbox-group v-model:value="assignState.permissions" class="grid gap-2" :options="group.options" />
            </section>
          </div>
        </AdminTablePanel>
      </div>
    </tm-modal>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { TmMessage } from 'tm-ui'
import type { TablePaginationConfig } from 'ant-design-vue'
import { menuApi, roleApi } from '@admin/api/system'
import { useAuthStore } from '@admin/stores/auth'
import { usePermissionStore } from '@admin/stores/permission'
import type { MenuRecord, RoleRecord } from '@admin/types'
import AdminFilterPanel from '@admin/components/app/AdminFilterPanel.vue'
import AdminPageHeader from '@admin/components/app/AdminPageHeader.vue'
import AdminTablePanel from '@admin/components/app/AdminTablePanel.vue'
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
  { title: '操作', key: 'actions', width: 220 },
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
const enabledCount = computed(() => roles.value.filter((item) => item.status === 'enabled').length)
const activeAssignRecord = computed(() => roles.value.find((item) => item.id === activeAssignId.value) ?? null)
const permissionGroupLabels: Record<string, string> = {
  user: '用户',
  role: '角色',
  menu: '菜单',
  dict: '字典',
  log: '日志',
  config: '配置',
}
const permissionGroups = computed(() => {
  const grouped = new Map<string, Array<{ label: string; value: string }>>()
  permissionOptions.forEach((option) => {
    const domain = option.value.split(':')[1] ?? 'misc'
    if (!grouped.has(domain)) {
      grouped.set(domain, [])
    }
    grouped.get(domain)?.push(option)
  })

  return Array.from(grouped.entries()).map(([key, options]) => ({
    key,
    label: permissionGroupLabels[key] ?? key,
    options,
  }))
})

const menuTreeData = computed(() => {
  const build = (parentId: number | null) =>
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
    TmMessage.success(editingId.value ? '角色已更新' : '角色已创建')
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
    TmMessage.success('角色权限已更新')
    assignOpen.value = false
    await authStore.fetchProfile()
    permissionStore.buildRoutes()
    await loadRoles()
  } finally {
    saving.value = false
  }
}

async function removeRole(id: number) {
  await roleApi.remove(id)
  TmMessage.success('角色已删除')
  await loadRoles()
}

function handleMenuCheck(checkedKeys: Array<string | number>) {
  assignState.menuIds = checkedKeys as number[]
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

<style scoped>
.role-primary-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.role-primary-main {
  color: var(--admin-text-strong);
  font-weight: 600;
}

.role-primary-sub {
  color: var(--admin-text-soft);
  font-size: 12px;
}

.role-description {
  color: var(--admin-text-soft);
  line-height: 1.6;
}

.role-assign-summary {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid var(--admin-border);
  border-radius: 12px;
  background: var(--admin-surface-muted);
}

.role-assign-summary-title {
  color: var(--admin-text-strong);
  font-size: 16px;
  font-weight: 700;
}

.role-assign-summary-sub {
  margin-top: 4px;
  color: var(--admin-text-soft);
  font-size: 13px;
}

.role-assign-summary-stats {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.role-permission-groups {
  display: grid;
  gap: 12px;
}

.role-permission-group {
  padding: 12px;
  border: 1px solid var(--admin-border);
  border-radius: 10px;
  background: var(--admin-surface-muted);
}

.role-permission-group-title {
  margin-bottom: 10px;
  color: var(--admin-text-strong);
  font-size: 13px;
  font-weight: 700;
}
</style>
