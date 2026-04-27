<template>
  <a-upload
    v-bind="forwardedAttrs"
    :file-list="fileList"
    class="tm-upload"
    :action="action"
    :multiple="multiple"
    :show-upload-list="showUploadList"
    :list-type="listType"
    :max-count="maxCount"
    :before-upload="beforeUpload"
    @change="handleChange"
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
  response?: any
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
    modelValue: () => [],
    multiple: false,
    showUploadList: true,
    listType: 'text',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: TmUploadFile[]]
  'change': [info: any]
}>()

const forwardedAttrs = useForwardAttrs()

const fileList = computed({
  get: () => props.modelValue,
  set: (val: TmUploadFile[]) => emit('update:modelValue', val),
})

const handleChange = (info: any) => {
  fileList.value = info.fileList
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
