<template>
  <section class="admin-page-section">
    <div class="admin-toolbar">
      <div>
        <h2 class="mb-2 text-2xl font-semibold">用户管理</h2>
        <p class="admin-muted">账号、状态、角色和基础资料都在这里维护。</p>
      </div>
      <PermissionButton type="primary" permission="system:user:create" @click="openCreate">
        新建用户
      </PermissionButton>
    </div>

    <tm-card>
      <a-form layout="inline" class="flex flex-wrap gap-3">
        <a-form-item label="关键词">
          <tm-input v-model="query.keyword" placeholder="用户名 / 昵称 / 邮箱" style="width: 220px" />
        </a-form-item>
        <a-form-item label="状态">
          <tm-select
            v-model="query.status"
            style="width: 160px"
            :options="statusOptions"
            allow-clear
          />
        </a-form-item>
          <a-form-item>
            <tm-space>
              <tm-button type="primary" @click="loadUsers">查询</tm-button>
              <tm-button @click="resetQuery">重置</tm-button>
            </tm-space>
          </a-form-item>
      </a-form>
    </tm-card>

    <tm-card>
      <tm-table
        :loading="loading"
        :data-source="users"
        :columns="columns"
        row-key="id"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <StatusTag :value="record.status" />
          </template>
          <template v-else-if="column.key === 'roles'">
            <tm-space wrap>
              <tm-tag v-for="role in record.roleCodes" :key="role">{{ role }}</tm-tag>
            </tm-space>
          </template>
          <template v-else-if="column.key === 'actions'">
            <tm-space wrap>
              <PermissionButton size="small" permission="system:user:edit" @click="openEdit(record)">编辑</PermissionButton>
              <PermissionButton size="small" permission="system:user:view" @click="openDetail(record)">详情</PermissionButton>
              <PermissionButton size="small" permission="system:user:delete" danger @click="removeUser(record.id)">
                删除
              </PermissionButton>
            </tm-space>
          </template>
        </template>
      </tm-table>
    </tm-card>

    <a-modal
      :open="modalOpen"
      :title="modalTitle"
      :confirm-loading="saving"
      @ok="submitUser"
      @cancel="modalOpen = false"
    >
      <a-form layout="vertical">
        <a-form-item label="用户名">
          <tm-input v-model="formState.username" />
        </a-form-item>
        <a-form-item label="昵称">
          <tm-input v-model="formState.nickname" />
        </a-form-item>
        <a-form-item label="邮箱">
          <tm-input v-model="formState.email" />
        </a-form-item>
        <a-form-item label="手机号">
          <tm-input v-model="formState.phone" />
        </a-form-item>
        <a-form-item label="角色">
          <a-checkbox-group v-model:value="formState.roleCodes" :options="roleOptions" />
        </a-form-item>
        <a-form-item label="状态">
          <a-radio-group v-model:value="formState.status">
            <a-radio value="enabled">启用</a-radio>
            <a-radio value="disabled">停用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>

    <tm-drawer :open="detailOpen" width="520" title="用户详情" @close="detailOpen = false">
      <tm-descriptions bordered :column="1">
        <a-descriptions-item label="用户名">{{ detailRecord?.username }}</a-descriptions-item>
        <a-descriptions-item label="昵称">{{ detailRecord?.nickname }}</a-descriptions-item>
        <a-descriptions-item label="邮箱">{{ detailRecord?.email }}</a-descriptions-item>
        <a-descriptions-item label="手机">{{ detailRecord?.phone }}</a-descriptions-item>
        <a-descriptions-item label="角色">{{ detailRecord?.roleCodes.join(', ') }}</a-descriptions-item>
        <a-descriptions-item label="状态">
          <StatusTag v-if="detailRecord" :value="detailRecord.status" />
        </a-descriptions-item>
        <a-descriptions-item label="创建时间">{{ detailRecord?.createdAt }}</a-descriptions-item>
        <a-descriptions-item label="最近登录">{{ detailRecord?.lastLoginAt }}</a-descriptions-item>
      </tm-descriptions>
    </tm-drawer>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { Modal, message } from 'ant-design-vue'
import type { TablePaginationConfig } from 'ant-design-vue'
import { roleApi, userApi } from '@admin/api/system'
import type { RoleRecord, UserSummary } from '@admin/types'
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
  { title: '操作', key: 'actions', width: 240 },
]

const statusOptions = [
  { label: '启用', value: 'enabled' },
  { label: '停用', value: 'disabled' },
]

const roleOptions = computed(() => roles.value.map((item) => ({ label: item.name, value: item.code })))
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
    message.success(editingId.value ? '用户已更新' : '用户已创建')
    modalOpen.value = false
    await loadUsers()
  } finally {
    saving.value = false
  }
}

function removeUser(id: number) {
  Modal.confirm({
    title: '确认删除该用户？',
    onOk: async () => {
      await userApi.remove(id)
      message.success('用户已删除')
      await loadUsers()
    },
  })
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
