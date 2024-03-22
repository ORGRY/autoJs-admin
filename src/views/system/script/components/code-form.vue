<template>
  <a-form
    layout="horizontal"
    ref="formRef"
    :model="form"
    :label-col="{ md: { span: 6 }, sm: { span: 28 } }"
    :wrapper-col="{ md: { span: 20 }, sm: { span: 28 } }"
  >
  <a-form-item label="用户账号:" name="userAccount">
        <a-select
          v-model:value="form.userAccount"
          show-search
          placeholder="请选择用户账号"
          :show-arrow="false"
          :filter-option="false"
          :not-found-content="null"
          allow-clear
        >
          <a-select-option v-for="item in userAccountList" :key="item.userAccount">
            {{ item.userAccount }}
          </a-select-option>
        </a-select>
  </a-form-item>
    <a-form-item label="卡密数量:" name="generateNum">
      <a-input
        v-model:value="form.generateNum"
        placeholder="请输入卡密数量"
        allow-clear
        autocomplete="off"
      />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  const props = defineProps<{
    form: Object;
    userAccountList: Array;
  }>();



</script>
