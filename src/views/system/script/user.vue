<template>
  <div class="guns-body">
    <!-- 搜索表单 -->
    <div class="block-interval">
      <a-card :bordered="false">
        <a-form layout="inline" :model="where">
          <a-row>
            <a-form-item label="用户账号:">
              <a-input
                v-model:value.trim="where.userAccount"
                placeholder="请输入用户账号"
                allow-clear
              />
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
          :api="ScriptUserApi.findPage"
          :where="where"
          :columns="columns"
          showTableSetting
          rowKey="accountId"
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
                  <template #icon>
                    <plus-outlined />
                  </template>
                  <span>新建</span>
                </a-button>
                <a-button>
                <a-popconfirm title="确定将生成10个账号？" @confirm="batchCreate()">
                 一键生成
                </a-popconfirm>  
                </a-button>
              </a-space>
            </div>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'userAccount'">
              <a @click="openEdit(record)">{{ record.userAccount }}</a>
            </template>

            <!-- table列表状态栏 -->
            <!-- Y是激活，N是禁用 -->
            <template v-if="column.key === 'state'">
              <a-switch
                :checked="record.useFlag === 2"
                @change="(checked) => editStatus(checked, record)"
              />
            </template>

            <!-- table操作栏按钮 -->
            <template v-else-if="column.key === 'action'">
              <a-space>
                <a @click="openEdit(record)">修改</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定要续约30天吗？" @confirm="renewal(record)">
                  <a>续约</a>
                </a-popconfirm>
                <a-divider type="vertical" />
                <a-popconfirm title="确定要删除此账号吗？" @confirm="remove(record)">
                  <a class="guns-text-danger">删除</a>
                </a-popconfirm>
              </a-space>
            </template>
          </template>
        </BasicTable>
      </a-card>
    </div>

    <!-- 编辑弹窗 -->
    <user-edit
      v-model:visible="showEdit"
      :data="current"
      @done="reload"
      :defaultKey="defaultKey"
      v-if="showEdit"
    />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { message } from 'ant-design-vue';
  import { ScriptUserApi } from '/@/api/system/script/ScriptUserApi';
  import UserEdit from './components/user-edit.vue';  

  // 查询条件
  const where = reactive({
    userAccount: '',
  });

  // 表格配置
  const columns = ref<string[]>([
    {
      title: '用户账号',
      dataIndex: 'userAccount',
      width: 160,
      sorter: true,
    },
    {
      title: '是否卡密账号',
      dataIndex: 'cdKeyFlag',
      width: 160,
      customRender: function ({ text }) {
        return 1 === text ? '否' : '是';
      },
    },
    {
      title: '最大设备数量',
      dataIndex: 'maxDevices',
      width: 160,
    },
    {
      title: '启用状态',
      key: 'state',
      dataIndex: 'useFlag',
      width: 100,
      align: 'center',
    },
    {
      title: '启用时间',
      dataIndex: 'useTime',
      width: 160,
      sorter: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 260,
      align: 'center',
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

  /**
   * 删除单个
   *
   * @author fengshuonan
   * @date 2021/4/2 17:03
   */
  const remove = async (row: any) => {
    const result = await ScriptUserApi.del({ accountId: row.accountId });
    message.success(result.message);
    reload();
  };


  const renewal = async (row: any) => {
    const result = await ScriptUserApi.renewal({ accountId: row.accountId });
    message.success(result.message);
    reload();
  };

  const batchCreate = async () => {
    const result = await ScriptUserApi.batchCreate();
    message.success(result.message);
    reload();
  };

  /**
   * 打开编辑页面
   *
   * @author fengshuonan
   * @date 2021/6/15 23:14
   */
  const openEdit = (record: any) => {
    defaultKey.value = '1';
    current.value = record;
    showEdit.value = true;
  };

  /**
   * 修改账号启用状态
   *
   * @author fengshuonan
   * @date 2021/12/21 11:30:07
   */
  const editStatus = async (checked: boolean, row: any) => {
    const accountId = row.accountId;
    const useFlag = checked ? '2' : '1';
    const result = await ScriptUserApi.updateUserAccountStatus({ accountId, useFlag });
    message.success(result.message);
    row.useFlag = useFlag;
    reload();
  };

</script>
