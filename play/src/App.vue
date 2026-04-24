<template>
  <div style="padding: 24px; max-width: 1200px; margin: 0 auto;">
    <h1>TM-UI Playground</h1>

    <!-- TailwindCSS Test -->
    <section style="margin-bottom: 32px;">
      <h2>TailwindCSS Test</h2>
      <tm-demo message="TailwindCSS is working!" />
    </section>

    <!-- TmButton -->
    <section style="margin-bottom: 32px;">
      <h2>TmButton</h2>
      <a-space>
        <tm-button>Default</tm-button>
        <tm-button type="primary">Primary</tm-button>
        <tm-button type="dashed">Dashed</tm-button>
        <tm-button type="text">Text</tm-button>
        <tm-button type="link">Link</tm-button>
        <tm-button type="primary" danger>Danger</tm-button>
      </a-space>
    </section>

    <!-- TmInput -->
    <section style="margin-bottom: 32px; max-width: 400px;">
      <h2>TmInput</h2>
      <tm-input v-model="inputValue" placeholder="请输入内容" />
      <p style="margin-top: 8px;">Value: {{ inputValue }}</p>

      <tm-input
        v-model="textareaValue"
        type="textarea"
        placeholder="请输入多行文本"
        :rows="3"
        style="margin-top: 12px;"
      />
    </section>

    <!-- TmSelect -->
    <section style="margin-bottom: 32px; max-width: 400px;">
      <h2>TmSelect</h2>
      <tm-select v-model="selectValue" :options="selectOptions" />
      <p style="margin-top: 8px;">Value: {{ selectValue }}</p>
    </section>

    <!-- TmTable -->
    <section style="margin-bottom: 32px;">
      <h2>TmTable</h2>
      <tm-table
        :data-source="tableData"
        :columns="tableColumns"
        :pagination="{ current: 1, pageSize: 10, total: tableData.length }"
        :loading="tableLoading"
      />
    </section>

    <!-- TmForm -->
    <section style="margin-bottom: 32px; max-width: 600px;">
      <h2>TmForm (Auto Generate)</h2>
      <tm-form
        v-model:model="formModel"
        :schema="formSchema"
        auto-generate
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      />
      <p style="margin-top: 8px;">Model: {{ formModel }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TmFormSchemaItem, TmColumn } from '../src'

// Input
const inputValue = ref('')
const textareaValue = ref('')

// Select
const selectValue = ref(undefined)
const selectOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]

// Table
const tableLoading = ref(false)
const tableColumns: TmColumn[] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age', width: 80 },
  { title: 'Address', dataIndex: 'address', key: 'address' },
]
const tableData = ref([
  { id: 1, name: 'John', age: 32, address: 'London' },
  { id: 2, name: 'Mike', age: 28, address: 'Paris' },
  { id: 3, name: 'Tom', age: 36, address: 'Tokyo' },
])

// Form
const formModel = ref({
  name: '',
  email: '',
  role: undefined,
  description: '',
  active: true,
})
const formSchema: TmFormSchemaItem[] = [
  { field: 'name', label: 'Name', type: 'input', rules: [{ required: true, message: 'Required' }] },
  { field: 'email', label: 'Email', type: 'input', rules: [{ type: 'email', message: 'Invalid email' }] },
  { field: 'role', label: 'Role', type: 'select', options: [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
  ]},
  { field: 'description', label: 'Description', type: 'textarea' },
  { field: 'active', label: 'Active', type: 'switch' },
]
</script>
