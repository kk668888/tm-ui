import { computed, nextTick, reactive, ref } from 'vue'
import type { Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import {
  ApiOutlined,
  FileTextOutlined,
  LinkOutlined,
  ProfileOutlined,
  SafetyOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'

type LedgerSectionKey = 'account' | 'basic' | 'manage' | 'security' | 'network' | 'resource'
  | 'business'
  | 'deploy'
  | 'monitor'
  | 'backup'
  | 'tagging'

interface LedgerSectionMeta {
  key: LedgerSectionKey
  title: string
  icon: Component
  fields: string[]
  total: number
  requiredLabel?: string
}

export interface LedgerEditSectionItem extends LedgerSectionMeta {
  anchorId: string
  progressText: string
}

const sectionMetas: LedgerSectionMeta[] = [
  { key: 'account', title: '台账信息', icon: FileTextOutlined, fields: ['ledgerType', 'ledgerName'], total: 2 },
  {
    key: 'basic',
    title: '基础属性',
    icon: ProfileOutlined,
    fields: ['systemName', 'ownerUnit', 'systemCode', 'environment', 'serviceLevel', 'region', 'ownerDept', 'remark'],
    total: 8,
  },
  {
    key: 'business',
    title: '业务属性',
    icon: ProfileOutlined,
    fields: ['businessDomain', 'businessLine', 'businessOwner', 'serviceWindow', 'serviceUsers'],
    total: 5,
  },
  {
    key: 'manage',
    title: '管理属性',
    icon: SettingOutlined,
    fields: ['manager', 'ownerRole', 'maintainer', 'maintainerPhone', 'maintainerEmail', 'changeWindow', 'dutyGroup', 'backupManager', 'backupPhone', 'backupEmail'],
    total: 10,
  },
  {
    key: 'security',
    title: '等保属性',
    icon: SafetyOutlined,
    fields: ['securityLevel', 'dataLevel', 'complianceOwner', 'auditCycle', 'backupPolicy'],
    total: 5,
  },
  {
    key: 'deploy',
    title: '部署属性',
    icon: ApiOutlined,
    fields: ['clusterName', 'namespace', 'deployUnit', 'deployPath', 'runtimeVersion'],
    total: 5,
  },
  {
    key: 'network',
    title: '网络属性',
    icon: ApiOutlined,
    fields: ['serviceIp', 'domainName', 'networkZone'],
    total: 3,
  },
  {
    key: 'monitor',
    title: '监控属性',
    icon: SafetyOutlined,
    fields: ['monitorLevel', 'alertGroup', 'metricOwner', 'dashboardUrl'],
    total: 4,
  },
  {
    key: 'backup',
    title: '容灾备份',
    icon: SettingOutlined,
    fields: ['backupStrategy', 'backupCycle', 'disasterLevel', 'recoveryPoint'],
    total: 4,
  },
  {
    key: 'tagging',
    title: '标签属性',
    icon: LinkOutlined,
    fields: ['appTag', 'costCenter', 'projectCode', 'assetGroup'],
    total: 4,
  },
  {
    key: 'resource',
    title: '关联资源',
    icon: LinkOutlined,
    fields: ['linkedResource'],
    total: 1,
    requiredLabel: '创建必填',
  },
]

export function useLedgerEditPage() {
  const route = useRoute()
  const router = useRouter()

  const formState = reactive({
    ledgerType: '应用台账',
    ledgerName: '维护应用台账',
    systemName: '报表生成子系统',
    ownerUnit: '西安分公司',
    systemCode: 'XA-APP-001',
    environment: '生产',
    serviceLevel: '核心',
    region: '西北节点',
    businessDomain: '数据中台',
    businessLine: '经营分析',
    businessOwner: '王敏',
    serviceWindow: '',
    serviceUsers: '行内运营团队',
    ownerDept: '',
    remark: '',
    manager: '吴斌',
    ownerRole: '业务负责人',
    maintainer: '陈明',
    maintainerPhone: '13800001234',
    maintainerEmail: '',
    changeWindow: '',
    dutyGroup: '',
    backupManager: '',
    backupPhone: '',
    backupEmail: '',
    securityLevel: '二级',
    dataLevel: '内部',
    complianceOwner: '',
    auditCycle: '',
    backupPolicy: '',
    clusterName: 'xa-app-cluster',
    namespace: 'report-prod',
    deployUnit: '容器化',
    deployPath: '',
    runtimeVersion: 'Node 20',
    serviceIp: '10.20.11.8',
    domainName: 'report-xa.internal',
    networkZone: '业务应用区',
    monitorLevel: 'P2',
    alertGroup: '应用监控群',
    metricOwner: '',
    dashboardUrl: '',
    backupStrategy: '同城双活',
    backupCycle: '每日',
    disasterLevel: '',
    recoveryPoint: '',
    appTag: 'finance-report',
    costCenter: 'CC-1028',
    projectCode: '',
    assetGroup: '西安报表应用组',
    linkedResource: '应用集群 XA-APP-POOL-01',
  })

  const expandedSectionKey = ref<LedgerSectionKey>('account')

  const sectionItems = computed<LedgerEditSectionItem[]>(() =>
    sectionMetas.map((section) => ({
      ...section,
      anchorId: `ledger-edit-section-${section.key}`,
      progressText: `已填 ${countFilled(section.fields, formState)}/${section.total}`,
    })),
  )

  const pageSummary = computed(() => ({
    title: '维护应用台账',
    subtitle: '维护当前台账实例信息',
    ledgerType: formState.ledgerType,
    status: '已登记',
    recordId: String(route.params.id ?? ''),
  }))

  function openSection(key: LedgerSectionKey) {
    expandedSectionKey.value = key
  }

  function scrollToSection(key: LedgerSectionKey) {
    openSection(key)
    nextTick(() => {
      document.getElementById(`ledger-edit-section-${key}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }

  function saveAsPending() {
    message.success('台账信息已保存并转为未登记')
  }

  function goBack() {
    router.push('/ledger')
  }

  return {
    expandedSectionKey,
    formState,
    goBack,
    openSection,
    pageSummary,
    saveAsPending,
    scrollToSection,
    sectionItems,
  }
}

function countFilled(fields: string[], formState: Record<string, unknown>) {
  return fields.filter((field) => {
    const value = formState[field]

    if (Array.isArray(value)) {
      return value.length > 0
    }

    if (typeof value === 'string') {
      return value.trim().length > 0
    }

    return value !== undefined && value !== null && value !== false
  }).length
}
