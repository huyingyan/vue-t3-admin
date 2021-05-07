<template>
  <a-form class="filter-container" layout="inline" :model="filterData">
    <a-form-item label="标题">
      <a-input v-model="filterData.title"></a-input>
    </a-form-item>
    <a-form-item>
      <a-select>
        <a-select-opt-group label="国外">
          <a-select-option value="yahoo"> yahoo.com </a-select-option>
        </a-select-opt-group>
      </a-select>
    </a-form-item>
  </a-form>
  <a-table
    :columns="columns"
    :loading="state.loading"
    :dataSource="state.dataSource"
    :row-selection="{
      selectedRowKeys: state.selectedRowKeys,
      onChange: onSelectChange,
    }"
    :pagination="pagination"
    @change="handleTableChange"
    class="list-container"
  >
    <template #type="{ record }">
      <span>{{ state.typeOptions[record.type] }}</span>
    </template>
    <template #status="{ record }">
      <a-tag :color="record.status == 1 ? 'blue' : ''">{{
        state.statusOptions[record.status]
      }}</a-tag>
    </template>
    <template #action="{ record }">
      <a-button
        type="primary"
        v-if="record.status == 1"
        @click="handleChangeStatus(record.id, 0)"
        >隐藏</a-button
      >
      <a-button type="primary" v-else @click="handleChangeStatus(record.id, 1)"
        >开启</a-button
      >
      <a-button type="primary" @click="handleDelete(record.id)">删除</a-button>
      <a-button type="primary">详情</a-button>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from 'vue';
import { Table, Button, Tag, Form, Input, Select } from 'ant-design-vue';
import { getList } from '@/api/article';
import { IArticleParams, IArticle } from '@/typings';
import { formatTime } from '@/utils/tool';

export default defineComponent({
  components: {
    [Table.name]: Table,
    [Button.name]: Button,
    [Tag.name]: Tag,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [Select.name]: Select,
    [Select.Option.name]: Select.Option,
    [Select.OptGroup.name]: Select.OptGroup,
  },
  setup() {
    const filterData = reactive({
      title: '',
      type: undefined,
      status: undefined,
      createTime: undefined,
    });
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '作者',
        dataIndex: 'author',
        key: 'author',
        align: 'center',
      },
      {
        title: '类别',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        slots: { customRender: 'type' },
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        slots: { customRender: 'status' },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        slots: { customRender: 'action' },
      },
    ];
    const state = reactive({
      dataSource: [] as IArticle[],
      loading: false,
      selectedRowKeys: [] as number[],
      typeOptions: {
        1: '原创',
        2: '视频',
      },
      statusOptions: {
        0: '隐藏',
        1: '开启',
      },
    });
    const page = ref(1);
    const pageSize = ref(10);
    const total = ref(0);
    const pagination = computed(() => ({
      total: total.value,
      current: page.value,
      pageSize: pageSize.value,
    }));
    const getArticleList = () => {
      state.loading = true;
      const data: IArticleParams = {
        page: page.value,
      };
      getList(data)
        .then((res) => {
          if (res && res.list.length > 0) {
            total.value = res.total;
            for (let i = 0; i < res.list.length; i++) {
              const item: any = res.list[i];
              item.key = res.list[i].id;
              item.createTime = formatTime(
                res.list[i].createTime,
                '{y}-{m}-{d} {h}:{i}',
              );
              state.dataSource.push(item);
            }
          }
        })
        .finally(() => {
          state.loading = false;
        });
    };
    getArticleList();

    const handleTableChange = (pagination: any) => {
      page.value = pagination.current;
      getArticleList();
    };

    const onSelectChange = (changableRowKeys: number[]) => {
      state.selectedRowKeys = changableRowKeys;
    };

    // 修改状态
    const handleChangeStatus = (id: number, status: number) => {
      const data = state.dataSource.find((item) => item.id === id);
      if (data) {
        data.status = status;
      }
    };

    // 删除
    const handleDelete = (id: number) => {
      state.dataSource = state.dataSource.filter((item) => item.id != id);
    };

    return {
      filterData,
      columns,
      state,
      pagination,
      getArticleList,
      handleTableChange,
      onSelectChange,
      handleChangeStatus,
      handleDelete,
    };
  },
});
</script>

<style lang="scss" scoped>
.filter-container {
  background: #fff;
  margin-bottom: 20px;
  padding: 10px;
}
.ant-table {
  .ant-btn {
    margin: 0 5px;
  }
}
</style>
