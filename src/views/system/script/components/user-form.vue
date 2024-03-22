<template>
  <a-form
    layout="horizontal"
    ref="formRef"
    :model="form"
    :rules="rules"
    :label-col="{ md: { span: 4 }, sm: { span: 24 } }"
    :wrapper-col="{ md: { span: 20 }, sm: { span: 24 } }"
  >
    <a-form-item label="用户账号:" name="userAccount">
      <a-input
        v-model:value="form.userAccount"
        placeholder="请输入用户账号"
        allow-clear
        autocomplete="off"
      />
    </a-form-item>

    <a-form-item label="是否卡密账号:" name="cdKeyFlag">
      <a-select
        v-model:value="form.cdKeyFlag"
        placeholder="请选择是否卡密账号"
        allow-clear
        autocomplete="off"
      >
        <a-select-option :value="1">否</a-select-option>
        <a-select-option :value="2">是</a-select-option>
        </a-select>
    </a-form-item>

    <a-form-item label="最大设备数量:" name="maxDevices">
      <a-input
        v-model:value="form.maxDevices"
        placeholder="请输入最大设备数量"
        allow-clear
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item label="启用状态:" name="useFlag">
      <a-select
        v-model:value="form.useFlag"
        placeholder="请选择启用状态"
        allow-clear
        autocomplete="off"
      >
        <a-select-option :value="1">否</a-select-option>
        <a-select-option :value="2">是</a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  const props = defineProps<{
    form: Object;
  }>();

  // 验证规则
  const rules = reactive({
    userAccount: [{ required: true, message: '请输入用户账号', type: 'string', trigger: 'blur' }],
  });
</script>
