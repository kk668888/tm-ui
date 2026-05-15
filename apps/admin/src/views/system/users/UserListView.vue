<template>
  <section class="admin-page">
    <AdminPageHeader title="用户管理" description="统一维护账号、角色、状态与基础联系信息。">
      <template #actions>
        <PermissionButton type="primary" permission="system:user:create" @click="openCreate">
          新建用户
        </PermissionButton>
      </template>
    </AdminPageHeader>

    <AdminFilterPanel>
      <tm-form-item class="admin-filter-item admin-filter-item-wide" label="关键词">
        <tm-input v-model="query.keyword" placeholder="用户名 / 昵称 / 邮箱" />
      </tm-form-item>
      <tm-form-item class="admin-filter-item" label="状态">
        <tm-select v-model="query.status" :options="statusOptions" allow-clear placeholder="全部状态" />
      </tm-form-item>
      <template #actions>
        <tm-button type="primary" @click="loadUsers">查询</tm-button>
        <tm-button @click="resetQuery">重置</tm-button>
      </template>
    </AdminFilterPanel>

    <AdminTablePanel title="用户列表" description="支持分页浏览、编辑账号信息和查看详情。">
      <template #meta>
        <div class="admin-pill">共 {{ total }} 个用户</div>
        <div class="admin-pill">启用 {{ enabledCount }}</div>
        <div class="admin-pill">停用 {{ disabledCount }}</div>
      </template>
      <tm-table
        class="admin-data-table"
        :loading="loading"
        :data-source="users"
        :columns="columns"
        row-key="id"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'username'">
            <div class="user-primary-cell">
              <div class="user-primary-main">{{ record.username }}</div>
              <div class="user-primary-sub">{{ record.phone }}</div>
            </div>
          </template>
          <template v-else-if="column.key === 'nickname'">
            <div class="user-primary-cell">
              <div class="user-primary-main">{{ record.nickname }}</div>
              <div class="user-primary-sub">ID #{{ record.id }}</div>
            </div>
          </template>
          <template v-else-if="column.key === 'email'">
            <span class="admin-code">{{ record.email }}</span>
          </template>
          <template v-else-if="column.key === 'status'">
            <StatusTag :value="record.status" />
          </template>
          <template v-else-if="column.key === 'roles'">
            <tm-space wrap>
              <tm-tag v-for="role in record.roleCodes" :key="role">{{ role }}</tm-tag>
            </tm-space>
          </template>
          <template v-else-if="column.key === 'lastLoginAt'">
            <div class="user-primary-cell">
              <div class="user-primary-main">{{ record.lastLoginAt }}</div>
              <div class="user-primary-sub">创建于 {{ record.createdAt }}</div>
            </div>
          </template>
          <template v-else-if="column.key === 'actions'">
            <div class="admin-table-inline-actions">
              <PermissionButton size="small" permission="system:user:edit" @click="openEdit(record)">编辑</PermissionButton>
              <PermissionButton size="small" permission="system:user:view" @click="openDetail(record)">详情</PermissionButton>
              <PermissionButton size="small" permission="system:user:delete" danger @click="removeUser(record.id)">
                删除
              </PermissionButton>
            </div>
          </template>
        </template>
      </tm-table>
    </AdminTablePanel>

    <tm-modal
      v-model:model-value="modalOpen"
      :title="modalTitle"
      :confirm-loading="saving"
      width="720px"
      @ok="submitUser"
      @cancel="modalOpen = false"
    >
      <tm-form :model="formState" layout="vertical" class="admin-form-grid">
        <tm-form-item label="用户名">
          <tm-input v-model="formState.username" />
        </tm-form-item>
        <tm-form-item label="昵称">
          <tm-input v-model="formState.nickname" />
        </tm-form-item>
        <tm-form-item label="邮箱">
          <tm-input v-model="formState.email" />
        </tm-form-item>
        <tm-form-item label="手机号">
          <tm-input v-model="formState.phone" />
        </tm-form-item>
        <tm-form-item class="admin-form-span-2" label="角色">
          <tm-checkbox-group v-model:value="formState.roleCodes" :options="roleOptions" class="grid gap-2 md:grid-cols-3" />
        </tm-form-item>
        <tm-form-item class="admin-form-span-2" label="状态">
          <tm-radio-group v-model:value="formState.status">
            <a-radio value="enabled">启用</a-radio>
            <a-radio value="disabled">停用</a-radio>
          </tm-radio-group>
        </tm-form-item>
      </tm-form>
    </tm-modal>

    <tm-drawer :open="detailOpen" width="520" title="用户详情" @close="detailOpen = false">
      <div class="admin-page-section">
        <div class="user-detail-hero" v-if="detailRecord">
          <div>
            <div class="user-detail-name">{{ detailRecord.nickname }}</div>
            <div class="user-detail-account">{{ detailRecord.username }}</div>
          </div>
          <StatusTag :value="detailRecord.status" />
        </div>
        <div class="user-detail-roles" v-if="detailRecord">
          <tm-tag v-for="role in detailRecord.roleCodes" :key="role">{{ role }}</tm-tag>
        </div>
        <tm-descriptions bordered :column="1">
          <tm-descriptions-item label="用户名">{{ detailRecord?.username }}</tm-descriptions-item>
          <tm-descriptions-item label="昵称">{{ detailRecord?.nickname }}</tm-descriptions-item>
          <tm-descriptions-item label="邮箱">{{ detailRecord?.email }}</tm-descriptions-item>
          <tm-descriptions-item label="手机">{{ detailRecord?.phone }}</tm-descriptions-item>
          <tm-descriptions-item label="角色">{{ detailRecord?.roleCodes.join(', ') }}</tm-descriptions-item>
          <tm-descriptions-item label="状态">
            <StatusTag v-if="detailRecord" :value="detailRecord.status" />
          </tm-descriptions-item>
          <tm-descriptions-item label="创建时间">{{ detailRecord?.createdAt }}</tm-descriptions-item>
          <tm-descriptions-item label="最近登录">{{ detailRecord?.lastLoginAt }}</tm-descriptions-item>
        </tm-descriptions>
      </div>
    </tm-drawer>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { TmMessage } from 'tm-ui'
import type { TablePaginationConfig } from 'ant-design-vue'
import { roleApi, userApi } from '@admin/api/system'
import type { RoleRecord, UserSummary } from '@admin/types'
import AdminFilterPanel from '@admin/components/app/AdminFilterPanel.vue'
import AdminPageHeader from '@admin/components/app/AdminPageHeader.vue'
import AdminTablePanel from '@admin/components/app/AdminTablePanel.vue'
import PermissionButton from '@admin/components/app/PermissionButton.vue'
import StatusTag from '@admin/components/app/StatusTag.vue'

const loading = ref(false)
const saving = ref(false)
const users = ref<UserSummary[]>([])
const roles = ref<RoleRecord[]>([])
const total = ref(0)
const modalOpen = ref(false)
const detailOpen = ref(false)
const editingId = ref<number | null>(null)
const detailRecord = ref<UserSummary | null>(null)

const query = reactive({
  page: 1,
  pageSize: 10,
  keyword: '',
  status: undefined as string | undefined,
})

const formState = reactive<Partial<UserSummary>>({
  username: '',
  nickname: '',
  email: '',
  phone: '',
  roleCodes: [],
  status: 'enabled',
})

const columns = [
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '昵称', dataIndex: 'nickname', key: 'nickname' },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
  { title: '角色', key: 'roles' },
  { title: '状态', key: 'status' },
  { title: '最近登录', dataIndex: 'lastLoginAt', key: 'lastLoginAt' },
  { title: '操作', key: 'actions', width: 220 },
]

const statusOptions = [
  { label: '启用', value: 'enabled' },
  { label: '停用', value: 'disabled' },
]

const roleOptions = computed(() => roles.value.map((item) => ({ label: item.name, value: item.code })))
const enabledCount = computed(() => users.value.filter((item) => item.status === 'enabled').length)
const disabledCount = computed(() => users.value.filter((item) => item.status === 'disabled').length)
const pagination = computed<TablePaginationConfig>(() => ({
  current: query.page,
  pageSize: query.pageSize,
  total: total.value,
  showSizeChanger: true,
}))
const modalTitle = computed(() => editingId.value ? '编辑用户' : '新建用户')

async function loadUsers() {
  loading.value = true
  try {
    const result = await userApi.list(query)
    users.value = result.list
    total.value = result.total
  } finally {
    loading.value = false
  }
}

async function loadRoles() {
  const result = await roleApi.list({ page: 1, pageSize: 99 })
  roles.value = result.list
}

function resetQuery() {
  query.page = 1
  query.pageSize = 10
  query.keyword = ''
  query.status = undefined
  loadUsers()
}

function resetForm() {
  editingId.value = null
  Object.assign(formState, {
    username: '',
    nickname: '',
    email: '',
    phone: '',
    roleCodes: [],
    status: 'enabled',
  })
}

function openCreate() {
  resetForm()
  modalOpen.value = true
}

function openEdit(record: UserSummary) {
  editingId.value = record.id
  Object.assign(formState, JSON.parse(JSON.stringify(record)))
  modalOpen.value = true
}

function openDetail(record: UserSummary) {
  detailRecord.value = record
  detailOpen.value = true
}

async function submitUser() {
  saving.value = true
  try {
    await userApi.save({ ...formState, id: editingId.value ?? undefined })
    TmMessage.success(editingId.value ? '用户已更新' : '用户已创建')
    modalOpen.value = false
    await loadUsers()
  } finally {
    saving.value = false
  }
}

async function removeUser(id: number) {
  await userApi.remove(id)
  TmMessage.success('用户已删除')
  await loadUsers()
}

function handleTableChange(paginationConfig: TablePaginationConfig) {
  query.page = paginationConfig.current ?? 1
  query.pageSize = paginationConfig.pageSize ?? 10
  loadUsers()
}

onMounted(async () => {
  await Promise.all([loadUsers(), loadRoles()])
})
</script>

<style scoped>
.user-primary-cell {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;
}

.user-primary-main {
  color: var(--admin-text-strong);
  font-weight: 600;
}

.user-primary-sub {
  color: var(--admin-text-soft);
  font-size: 12px;
}

.user-detail-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
  border: 1px solid var(--admin-border);
  border-radius: 12px;
  background: var(--admin-surface-muted);
}

.user-detail-name {
  color: var(--admin-text-strong);
  font-size: 18px;
  font-weight: 700;
}

.user-detail-account {
  color: var(--admin-text-soft);
  font-size: 13px;
}

.user-detail-roles {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
