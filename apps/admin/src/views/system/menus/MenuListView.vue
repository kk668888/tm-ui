<template>
  <section class="admin-page">
    <AdminPageHeader title="菜单管理" description="维护目录、菜单和按钮节点，为后台导航和权限控制提供基础数据。">
      <template #actions>
        <PermissionButton type="primary" permission="system:menu:create" @click="openCreate">
          新建菜单
        </PermissionButton>
      </template>
    </AdminPageHeader>

    <AdminTablePanel title="菜单树" description="目录、菜单与按钮使用同一棵树进行管理。">
      <template #meta>
        <div class="admin-pill">共 {{ menus.length }} 个节点</div>
        <div class="admin-pill">顶级 {{ rootCount }}</div>
        <div class="admin-pill">按钮 {{ buttonCount }}</div>
        <div class="admin-pill">启用 {{ enabledCount }}</div>
      </template>
      <tm-table class="admin-data-table" :data-source="treeData" :columns="columns" row-key="id" :pagination="false" :loading="loading">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'title'">
            <div class="menu-primary-cell">
              <div class="menu-primary-main">{{ record.title }}</div>
              <div class="menu-primary-sub">{{ record.titleKey || '未配置 titleKey' }}</div>
            </div>
          </template>
          <template v-else-if="column.key === 'path'">
            <div class="menu-primary-cell">
              <div class="menu-primary-main admin-code">{{ record.path || '-' }}</div>
              <div class="menu-primary-sub">{{ parentTitleMap[record.parentId ?? -1] || '顶级节点' }}</div>
            </div>
          </template>
          <template v-else-if="column.key === 'type'">
            <tm-tag>{{ typeMap[record.type] }}</tm-tag>
          </template>
          <template v-else-if="column.key === 'permission'">
            <span class="admin-code">{{ record.permission || '无' }}</span>
          </template>
          <template v-else-if="column.key === 'status'">
            <StatusTag :value="record.status" />
          </template>
          <template v-else-if="column.key === 'sort'">
            <div class="menu-primary-cell">
              <div class="menu-primary-main">#{{ record.sort }}</div>
              <div class="menu-primary-sub">{{ record.hidden ? '侧边栏隐藏' : '导航可见' }} · {{ record.keepAlive ? '缓存' : '不缓存' }}</div>
            </div>
          </template>
          <template v-else-if="column.key === 'actions'">
            <div class="admin-table-inline-actions">
              <PermissionButton size="small" permission="system:menu:edit" @click="openEdit(record)">编辑</PermissionButton>
              <PermissionButton size="small" permission="system:menu:delete" danger @click="removeMenu(record.id)">
                删除
              </PermissionButton>
            </div>
          </template>
        </template>
      </tm-table>
    </AdminTablePanel>

    <tm-modal v-model:model-value="modalOpen" :title="editingId ? '编辑菜单' : '新建菜单'" :confirm-loading="saving" width="760px" @ok="submitMenu" @cancel="modalOpen = false">
      <tm-form :model="formState" layout="vertical" class="admin-form-grid">
        <tm-form-item label="菜单标题">
          <tm-input v-model="formState.title" />
        </tm-form-item>
        <tm-form-item label="国际化键">
          <tm-input v-model="formState.titleKey" placeholder="menu.xxx" />
        </tm-form-item>
        <tm-form-item label="路由路径">
          <tm-input v-model="formState.path" />
        </tm-form-item>
        <tm-form-item label="组件路径">
          <tm-input v-model="formState.component" placeholder="views/system/xxx/index.vue" />
        </tm-form-item>
        <tm-form-item label="父级节点">
          <tm-select v-model="formState.parentId" :options="parentOptions" allow-clear />
        </tm-form-item>
        <tm-form-item label="节点类型">
          <tm-select v-model="formState.type" :options="typeOptions" />
        </tm-form-item>
        <tm-form-item class="admin-form-span-2" label="权限码">
          <tm-input v-model="formState.permission" />
        </tm-form-item>
        <tm-form-item label="图标">
          <tm-input v-model="formState.icon" />
        </tm-form-item>
        <tm-form-item label="排序">
          <tm-input-number v-model="formState.sort" :min="1" class="w-full" />
        </tm-form-item>
        <tm-form-item label="状态">
          <tm-radio-group v-model:value="formState.status">
            <a-radio value="enabled">启用</a-radio>
            <a-radio value="disabled">停用</a-radio>
          </tm-radio-group>
        </tm-form-item>
        <tm-form-item label="在导航中隐藏">
          <tm-switch v-model="formState.hidden" />
        </tm-form-item>
        <tm-form-item label="启用缓存">
          <tm-switch v-model="formState.keepAlive" />
        </tm-form-item>
      </tm-form>
    </tm-modal>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { TmMessage } from 'tm-ui'
import { menuApi } from '@admin/api/system'
import type { MenuRecord } from '@admin/types'
import AdminPageHeader from '@admin/components/app/AdminPageHeader.vue'
import AdminTablePanel from '@admin/components/app/AdminTablePanel.vue'
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
  titleKey: '',
  path: '',
  component: '',
  permission: '',
  icon: '',
  sort: 1,
  status: 'enabled',
  hidden: false,
  keepAlive: false,
})

const columns = [
  { title: '标题', dataIndex: 'title', key: 'title' },
  { title: '路径', dataIndex: 'path', key: 'path' },
  { title: '类型', key: 'type' },
  { title: '权限码', dataIndex: 'permission', key: 'permission' },
  { title: '状态', key: 'status' },
  { title: '排序', dataIndex: 'sort', key: 'sort' },
  { title: '操作', key: 'actions', width: 180 },
]

const typeOptions = [
  { label: '目录', value: 'catalog' },
  { label: '菜单', value: 'menu' },
  { label: '按钮', value: 'button' },
]

const typeMap = {
  catalog: '目录',
  menu: '菜单',
  button: '按钮',
}
const parentTitleMap = computed<Record<number, string>>(() =>
  Object.fromEntries(menus.value.map((item) => [item.id, item.title])),
)

const parentOptions = computed(() => [
  { label: '顶级节点', value: null },
  ...menus.value.map((item) => ({ label: item.title, value: item.id })),
])

const treeData = computed(() => buildTree(menus.value))
const rootCount = computed(() => menus.value.filter((item) => item.parentId == null).length)
const buttonCount = computed(() => menus.value.filter((item) => item.type === 'button').length)
const enabledCount = computed(() => menus.value.filter((item) => item.status === 'enabled').length)

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
    titleKey: '',
    path: '',
    component: '',
    permission: '',
    icon: '',
    sort: 1,
    status: 'enabled',
    hidden: false,
    keepAlive: false,
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
    TmMessage.success(editingId.value ? '菜单已更新' : '菜单已创建')
    modalOpen.value = false
    await loadMenus()
  } finally {
    saving.value = false
  }
}

async function removeMenu(id: number) {
  await menuApi.remove(id)
  TmMessage.success('菜单已删除')
  await loadMenus()
}

onMounted(loadMenus)
</script>

<style scoped>
.menu-primary-cell {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;
}

.menu-primary-main {
  color: var(--admin-text-strong);
  font-weight: 600;
}

.menu-primary-sub {
  color: var(--admin-text-soft);
  font-size: 12px;
}
</style>
