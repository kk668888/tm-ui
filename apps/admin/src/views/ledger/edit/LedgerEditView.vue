<template>
  <section class="admin-page-section ledger-edit-page">
    <div class="ledger-crumbs">
      <tm-button type="link" class="ledger-crumb-link" @click="goBack">业务台账列表</tm-button>
      <span class="ledger-crumb-separator">/</span>
      <span class="ledger-crumb-current">维护应用台账</span>
    </div>

    <LedgerEditHero
      :title="pageSummary.title"
      :subtitle="pageSummary.subtitle"
      :ledger-type="pageSummary.ledgerType"
      :status="pageSummary.status"
    />

    <div class="admin-shell-card ledger-edit-shell">
      <LedgerEditSidebar
        :active-key="expandedSectionKey"
        :items="sectionItems"
        @select="scrollToSection"
      />

      <div class="ledger-edit-main">
        <LedgerEditSectionCard
          v-for="section in sectionItems"
          :key="section.key"
          :anchor-id="section.anchorId"
          :expanded="expandedSectionKey === section.key"
          :progress-text="section.progressText"
          :required-label="section.requiredLabel"
          :title="section.title"
          @toggle="openSection(section.key)"
        >
          <template v-if="section.key === 'account'">
            <div class="ledger-fields ledger-fields-single">
              <div class="ledger-field">
                <div class="ledger-field-label">
                  <span class="ledger-required-mark">*</span>
                  <span>台账类型</span>
                  <span class="ledger-required-tip">创建必填</span>
                </div>
                <tm-select
                  v-model="formState.ledgerType"
                  class="ledger-control ledger-select-control"
                  :show-search="false"
                  :options="[
                    { label: '应用台账', value: '应用台账' },
                    { label: '服务器台账', value: '服务器台账' },
                    { label: '数据库台账', value: '数据库台账' },
                  ]"
                />
              </div>
            </div>
          </template>

          <template v-else-if="section.key === 'basic'">
            <div class="ledger-fields ledger-fields-grid">
              <div class="ledger-field">
                <div class="ledger-field-label">系统名称</div>
                <tm-input v-model="formState.systemName" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">所属单位</div>
                <tm-select
                  v-model="formState.ownerUnit"
                  class="ledger-control ledger-select-control"
                  :show-search="false"
                  :options="[
                    { label: '西安分公司', value: '西安分公司' },
                    { label: '成都分公司', value: '成都分公司' },
                    { label: '上海分公司', value: '上海分公司' },
                  ]"
                />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">系统编码</div>
                <tm-input v-model="formState.systemCode" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">运行环境</div>
                <tm-select
                  v-model="formState.environment"
                  class="ledger-control ledger-select-control"
                  :show-search="false"
                  :options="[
                    { label: '生产', value: '生产' },
                    { label: '预发', value: '预发' },
                    { label: '测试', value: '测试' },
                  ]"
                />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">服务等级</div>
                <tm-select
                  v-model="formState.serviceLevel"
                  class="ledger-control ledger-select-control"
                  :show-search="false"
                  :options="[
                    { label: '核心', value: '核心' },
                    { label: '重要', value: '重要' },
                    { label: '一般', value: '一般' },
                  ]"
                />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">部署区域</div>
                <tm-input v-model="formState.region" class="ledger-control" />
              </div>
            </div>
          </template>

          <template v-else-if="section.key === 'business'">
            <div class="ledger-fields ledger-fields-grid">
              <div class="ledger-field">
                <div class="ledger-field-label">业务域</div>
                <tm-input v-model="formState.businessDomain" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">业务线</div>
                <tm-input v-model="formState.businessLine" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">业务负责人</div>
                <tm-input v-model="formState.businessOwner" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">服务窗口</div>
                <tm-input v-model="formState.serviceWindow" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">服务对象</div>
                <tm-input v-model="formState.serviceUsers" class="ledger-control" />
              </div>
            </div>
          </template>

          <template v-else-if="section.key === 'manage'">
            <div class="ledger-fields ledger-fields-grid">
              <div class="ledger-field">
                <div class="ledger-field-label">责任人</div>
                <tm-input v-model="formState.manager" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">角色</div>
                <tm-input v-model="formState.ownerRole" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">维护人</div>
                <tm-input v-model="formState.maintainer" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">联系电话</div>
                <tm-input v-model="formState.maintainerPhone" class="ledger-control" />
              </div>
            </div>
          </template>

          <template v-else-if="section.key === 'security'">
            <div class="ledger-fields ledger-fields-grid">
              <div class="ledger-field">
                <div class="ledger-field-label">等保级别</div>
                <tm-select
                  v-model="formState.securityLevel"
                  class="ledger-control ledger-select-control"
                  :show-search="false"
                  :options="[
                    { label: '二级', value: '二级' },
                    { label: '三级', value: '三级' },
                    { label: '四级', value: '四级' },
                  ]"
                />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">数据级别</div>
                <tm-select
                  v-model="formState.dataLevel"
                  class="ledger-control ledger-select-control"
                  :show-search="false"
                  :options="[
                    { label: '内部', value: '内部' },
                    { label: '敏感', value: '敏感' },
                    { label: '公开', value: '公开' },
                  ]"
                />
              </div>
            </div>
          </template>

          <template v-else-if="section.key === 'deploy'">
            <div class="ledger-fields ledger-fields-grid">
              <div class="ledger-field">
                <div class="ledger-field-label">集群名称</div>
                <tm-input v-model="formState.clusterName" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">命名空间</div>
                <tm-input v-model="formState.namespace" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">部署单元</div>
                <tm-input v-model="formState.deployUnit" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">部署路径</div>
                <tm-input v-model="formState.deployPath" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">运行时版本</div>
                <tm-input v-model="formState.runtimeVersion" class="ledger-control" />
              </div>
            </div>
          </template>

          <template v-else-if="section.key === 'network'">
            <div class="ledger-fields ledger-fields-grid">
              <div class="ledger-field">
                <div class="ledger-field-label">服务 IP</div>
                <tm-input v-model="formState.serviceIp" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">域名</div>
                <tm-input v-model="formState.domainName" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">网络区域</div>
                <tm-input v-model="formState.networkZone" class="ledger-control" />
              </div>
            </div>
          </template>

          <template v-else-if="section.key === 'monitor'">
            <div class="ledger-fields ledger-fields-grid">
              <div class="ledger-field">
                <div class="ledger-field-label">监控等级</div>
                <tm-input v-model="formState.monitorLevel" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">告警群组</div>
                <tm-input v-model="formState.alertGroup" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">指标责任人</div>
                <tm-input v-model="formState.metricOwner" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">看板地址</div>
                <tm-input v-model="formState.dashboardUrl" class="ledger-control" />
              </div>
            </div>
          </template>

          <template v-else-if="section.key === 'backup'">
            <div class="ledger-fields ledger-fields-grid">
              <div class="ledger-field">
                <div class="ledger-field-label">备份策略</div>
                <tm-input v-model="formState.backupStrategy" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">备份周期</div>
                <tm-input v-model="formState.backupCycle" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">容灾等级</div>
                <tm-input v-model="formState.disasterLevel" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">恢复点目标</div>
                <tm-input v-model="formState.recoveryPoint" class="ledger-control" />
              </div>
            </div>
          </template>

          <template v-else-if="section.key === 'tagging'">
            <div class="ledger-fields ledger-fields-grid">
              <div class="ledger-field">
                <div class="ledger-field-label">应用标签</div>
                <tm-input v-model="formState.appTag" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">成本中心</div>
                <tm-input v-model="formState.costCenter" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">项目编码</div>
                <tm-input v-model="formState.projectCode" class="ledger-control" />
              </div>
              <div class="ledger-field">
                <div class="ledger-field-label">资产分组</div>
                <tm-input v-model="formState.assetGroup" class="ledger-control" />
              </div>
            </div>
          </template>

          <template v-else-if="section.key === 'resource'">
            <div class="ledger-fields ledger-fields-single">
              <div class="ledger-field">
                <div class="ledger-field-label">
                  <span class="ledger-required-mark">*</span>
                  <span>关联资源</span>
                </div>
                <tm-textarea v-model="formState.linkedResource" class="ledger-control" :rows="3" />
              </div>
            </div>
          </template>
        </LedgerEditSectionCard>
      </div>
    </div>

    <div class="admin-shell-card ledger-edit-footer">
      <tm-button class="ledger-footer-cancel" @click="goBack">取消</tm-button>
      <tm-button type="primary" class="ledger-footer-submit" @click="saveAsPending">保存并转为未登记</tm-button>
    </div>
  </section>
</template>

<script setup lang="ts">
import LedgerEditHero from './components/LedgerEditHero.vue'
import LedgerEditSectionCard from './components/LedgerEditSectionCard.vue'
import LedgerEditSidebar from './components/LedgerEditSidebar.vue'
import { useLedgerEditPage } from './composables/useLedgerEditPage'

const {
  expandedSectionKey,
  formState,
  goBack,
  openSection,
  pageSummary,
  saveAsPending,
  scrollToSection,
  sectionItems,
} = useLedgerEditPage()
</script>

<style scoped>
.ledger-edit-page {
  gap: 16px;
}

.ledger-crumbs {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 20px;
  font-size: 14px;
}

:deep(.ledger-crumb-link.tm-btn.ant-btn-link) {
  height: auto;
  padding: 0;
  color: #2563eb;
  font-size: 14px;
}

.ledger-crumb-separator,
.ledger-crumb-current {
  color: #475569;
}

.ledger-edit-shell {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 16px 18px 20px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.ledger-edit-main {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

:deep(.ledger-edit-sidebar) {
  position: sticky;
  top: 16px;
  flex-shrink: 0;
}

.ledger-fields {
  display: grid;
  gap: 18px 16px;
}

.ledger-fields-single {
  grid-template-columns: minmax(0, 320px);
}

.ledger-fields-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.ledger-field {
  min-width: 0;
}

.ledger-field-label {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  color: #0f172a;
  font-size: 14px;
  font-weight: 600;
}

.ledger-required-mark {
  color: #ef4444;
}

.ledger-required-tip {
  color: #ef4444;
  font-size: 12px;
  font-weight: 500;
}

:deep(.ledger-control.ant-input-affix-wrapper),
:deep(.ledger-control.ant-input),
:deep(.ledger-control.ant-input-textarea),
:deep(.ledger-select-control .ant-select-selector) {
  border-radius: 8px !important;
  border-color: #d7dde8 !important;
  box-shadow: none !important;
}

:deep(.ledger-control.ant-input-affix-wrapper),
:deep(.ledger-control.ant-input),
:deep(.ledger-select-control .ant-select-selector) {
  height: 42px !important;
}

:deep(.ledger-select-control .ant-select-selection-item),
:deep(.ledger-select-control .ant-select-selection-placeholder) {
  line-height: 40px !important;
}

:deep(.ledger-control.ant-input-textarea textarea) {
  min-height: 88px !important;
  padding-top: 10px;
}

.ledger-edit-footer {
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 22px 24px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

:deep(.ledger-footer-cancel.tm-btn.ant-btn) {
  min-width: 92px;
  height: 40px;
  border-radius: 8px;
  border-color: #d7dde8;
  color: #475569;
  background: #fff;
}

:deep(.ledger-footer-submit.tm-btn.ant-btn.ant-btn-primary) {
  min-width: 142px;
  height: 40px;
  border-radius: 8px;
  border-color: #3b82f6;
  background: #3b82f6;
  box-shadow: 0 8px 18px rgba(59, 130, 246, 0.18);
}

@media (max-width: 1200px) {
  .ledger-edit-shell {
    flex-direction: column;
  }

  :deep(.ledger-edit-sidebar) {
    position: static;
  }

  .ledger-fields-grid {
    grid-template-columns: 1fr;
  }
}
</style>
