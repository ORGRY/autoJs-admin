<!-- 应用新增弹窗 -->
<template>
  <a-modal
    :width="600"
    :visible="visible"
    :confirm-loading="loading"
    title="新增应用"
    :body-style="{ paddingBottom: '8px' }"
    @update:visible="updateVisible"
    @ok="save"
    @close="updateVisible(false)"
  >
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ md: { span: 5 }, sm: { span: 24 } }"
      :wrapper-col="{ md: { span: 17 }, sm: { span: 24 } }"
    >
      <a-form-item label="应用名称" name="appName">
        <a-input v-model:value="form.appName" placeholder="请输入应用名称" allow-clear />
      </a-form-item>
      <a-form-item label="应用编码" name="appCode">
        <a-input v-model:value="form.appCode" placeholder="请输入应用编码" allow-clear />
      </a-form-item>
      <a-form-item label="应用图标">
        <icon-picker v-model:value="form.appIcon" placeholder="请选择应用图标" />
      </a-form-item>
      <a-form-item label="应用排序" name="appSort">
        <a-input-number
          v-model:value="form.appSort"
          placeholder="请填写应用排序"
          style="width: 100%"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script name="SysAppAdd" lang="ts" setup>
  import { ref, reactive, watch } from 'vue';
  import { message } from 'ant-design-vue/es';
  import type { FormInstance, Rule } from 'ant-design-vue/es/form';
  import IconPicker from '/@/components/icon-picker/main.vue';
  import useFormData from '/@/utils/common/use-form-data';
  import { SysAppApi } from '/@/api/system/app/SysAppApi';
  import { SysAppRequest } from '/@/api/system/app/model/SysAppModel';

  const emit = defineEmits<{
    (e: 'done'): void;
    (e: 'update:visible', value: boolean): void;
  }>();

  const props = defineProps<{
    visible: boolean;
  }>();

  // 表单实例
  const formRef = ref<FormInstance | null>(null);

  // 提交状态
  const loading = ref<boolean>(false);

  // 表单数据
  const { form, resetFormFields } = useFormData<SysAppRequest>({
    appId: undefined,
    appName: undefined,
    appCode: undefined,
    appIcon: undefined,
    appSort: undefined,
  });

  // 表单验证规则
  const rules = reactive<Record<string, Rule[]>>({
    appName: [
      {
        required: true,
        message: '请输入应用名称',
        type: 'string',
        trigger: 'blur',
      },
    ],
    appCode: [
      {
        required: true,
        message: '请输入应用编码',
        type: 'string',
        trigger: 'blur',
      },
    ],
  });

  watch(
    () => props.visible,
    () => {
      if (!props.visible) {
        resetFormFields();
        formRef.value?.clearValidate();
      }
    },
  );

  /**
   * 保存编辑
   *
   * @author yxx
   * @date 2022/6/14 20:24
   */
  const save = () => {
    if (!formRef.value) {
      return;
    }
    formRef.value
      .validate()
      .then(() => {
        loading.value = true;
        // 执行保存
        SysAppApi.add(form)
          .then((res) => {
            // 移除加载框
            loading.value = false;
            // 提示添加成功
            message.success(res.message);
            // 关闭弹框，通过控制visible的值，传递给父组件
            updateVisible(false);
            // 触发父组件done事件
            emit('done');
          })
          .catch(() => {
            loading.value = false;
          });
      })
      .catch(() => {});
  };

  /**
   * 更新编辑界面弹框是否显示
   *
   * @author yxx
   * @date 2022/6/14 20:24
   */
  const updateVisible = (value) => {
    emit('update:visible', value);
  };
</script>
