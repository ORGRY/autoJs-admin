<template>
  <div class="guns-body">
    <!-- 搜索表单 -->
    <div class="block-interval">
      <a-card :bordered="false">
        <a-form layout="inline" :model="where">
          <a-row>
          <a-form-item label="用户账号:" name="userAccount">
                <a-select
                  v-model:value.trim="where.userAccount"
                  show-search
                  placeholder="请选择用户账号"
                  style="width: 200px"
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
            <a-form-item class="ele-text-center">
              <a-space>
                <a-button type="primary" @click="reload">查询</a-button>
                <a-button @click="reset">重置</a-button>
              </a-space>
            </a-form-item>
          </a-row>
        </a-form>
      </a-card>
    </div>

    <!-- 表格 -->
    <div>
      <a-card :bordered="false" class="table-height">
        <BasicTable
          :canResize="false"
          ref="tableRef"
          :api="ScriptCodeApi.findPage"
          :where="where"
          :columns="columns"
          showTableSetting
          rowKey="registrationId"
          :rowSelection="{
            type: 'checkbox',
            selectedRowKeys: checkedKeys,
          }"
        >
          <!-- table上边工具栏 -->
          <template #toolbar>
            <div class="table-toolbar">
              <a-space>
                <a-button type="primary" @click="openEdit()">
                  <span>生成卡密</span>
                </a-button>
                  <a-button type="primary" @click="exportTxt()">
                  <span>导出卡密</span>
                </a-button>
              </a-space>
            </div>
          </template>
        </BasicTable>
      </a-card>
    </div>

    <!-- 编辑弹窗 -->
    <code-edit
      v-model:visible="showEdit"
      :data="current"
      @done="reload"
      :defaultKey="defaultKey"
      v-if="showEdit"
    />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref , onMounted} from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { message } from 'ant-design-vue';
  import { ScriptCodeApi } from '/@/api/system/script/ScriptCodeApi';
  import CodeEdit from './components/code-edit.vue';
  

  // 查询条件
  const where = reactive({
    userAccount: '',
  });

  // 表格配置
  const columns = ref<string[]>([
    {
      title: '注册码',
      dataIndex: 'registrationCode',
      width: 160,
      sorter: true,
    },
    {
      title: '用户账号',
      dataIndex: 'userAccount',
      width: 160,
    },
    {
      title: '机器码',
      dataIndex: 'machineCode',
      width: 160,
    },
    {
      title: '绑定时间',
      dataIndex: 'bindingTime',
      width: 160,
      sorter: true,
    },
  ]);

  // 多选选中列表
  const checkedKeys = ref<Array<string | number>>([]);

  // 当前行数据
  const current = ref<any>(null);

  // 是否显示新增编辑弹框
  const showEdit = ref<boolean>(false);
  // 默认选中
  const defaultKey = ref<string>('1');

  const userAccountList = ref<string[]>([]);
  // ref
  const tableRef = ref(null);

  /**
   * 点击查询
   * @author: nxy
   * @Date: 2022-10-12 09:38:18
   */
  const reload = () => {
    checkedKeys.value = [];
    tableRef.value.reload({ page: 1 });
  };

  /**
   * 点击重置
   * @author: nxy
   * @Date: 2022-10-12 09:38:29
   */
  const reset = () => {
    where.userAccount = '';
    reload();
  };

    const openEdit = (record: any) => {
    defaultKey.value = '1';
    current.value = record;
    showEdit.value = true;
  };

  const exportTxt = async (row: any) => {
  const allStr = await ScriptCodeApi.export({userAccount: where.userAccount});
      var export_blob = new Blob([allStr]);
      var save_link = document.createElement("a");
      save_link.href = window.URL.createObjectURL(export_blob);
      save_link.download = where.userAccount + '.txt';
      var ev = document.createEvent("MouseEvents");
      ev.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      save_link.dispatchEvent(ev);
};
onMounted(async () => {
    // 查询应用
    userAccountList.value = await ScriptCodeApi.list();
  });
</script>
