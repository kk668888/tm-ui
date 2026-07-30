<template>
  <a-upload
    v-bind="uploadAttrs"
  >
    <slot name="default">
      <a-button>
        <upload-outlined />
        点击上传
      </a-button>
    </slot>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-upload>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'
import { UploadOutlined } from '@ant-design/icons-vue'

defineOptions({
  name: 'TmUpload',
  inheritAttrs: false,
})

export interface TmUploadFile {
  uid: string | number
  name: string
  status?: string
  url?: string
  thumbUrl?: string
  // 后端响应体结构因接口而异，无法预先收窄，用 unknown 表达并交由业务层断言
  response?: unknown
}

// ant-design-vue Upload 的 change 事件入参结构，收敛 info: any
export interface TmUploadChangeInfo {
  file: TmUploadFile
  fileList: TmUploadFile[]
  event?: { percent?: number }
}

const props = withDefaults(
  defineProps<{
    modelValue?: TmUploadFile[]
    action?: string
    multiple?: boolean
    showUploadList?: boolean | { showPreviewIcon?: boolean; showRemoveIcon?: boolean; showDownloadIcon?: boolean }
    listType?: 'text' | 'picture' | 'picture-card'
    maxCount?: number
    accept?: string
    beforeUpload?: (file: File) => boolean | Promise<boolean>
  }>(),
  {
    multiple: false,
    showUploadList: true,
    listType: 'text',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: TmUploadFile[]]
  'change': [info: TmUploadChangeInfo]
}>()

const forwardedAttrs = useForwardAttrs()

const uploadAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.modelValue !== undefined ? { fileList: props.modelValue } : {}),
  class: 'tm-upload',
  action: props.action,
  multiple: props.multiple,
  showUploadList: props.showUploadList,
  listType: props.listType,
  maxCount: props.maxCount,
  beforeUpload: props.beforeUpload,
  onChange: handleChange,
}))

const handleChange = (info: TmUploadChangeInfo) => {
  emit('update:modelValue', info.fileList)
  emit('change', info)
}
</script>

<style scoped lang="less">
.tm-upload {
  :deep(.ant-upload) {
    border-radius: 6px;
  }
}
</style>
