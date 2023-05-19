<template>
  <div class="app-container">
  <!--   <p>基础表格(日期列默认排序+邮编列自定义排序)</p>
    <table-custom
      :loading="loading"
      :pagination="false"
      :table-data="tableData"
      :table-column="basicColumn"
      :pagination-obj="paginationObj"
      @handle-button-click="handleButtonClick"
      @handle-sort-change="handleSortChange"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange"
    /> -->

    <!-- <br />
    <br />

    <p>基础表格(组合排序+默认分页)</p>
    <table-custom
      :loading="loading"
      :table-data="tableData"
      :table-column="basicColumn"
      :pagination-obj="paginationObj"
      @handle-button-click="handleButtonClick"
      @handle-sort-change="handleSortChange"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange"
    />

    <br />
    <br />
-->
    <p>最全功能(组合排序+筛选+slot插槽+过滤器+操作列+展开行+自定义分页)</p>
    <table-custom
      type="selection"
      :loading="loading"
      :table-data="tableData"
      :table-column="tableColumn"
      :table-option="tableOption"
      :pagination="pagination"
      :page-sizes="pageSizes"
      :pagination-obj="paginationObj"
      @handle-button-click="handleButtonClick"
      @handle-sort-change="handleSortChange"
      @handle-selection-change="handleSelectionChange"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange"
    >
      <el-table-column type="expand" width="35">
        <template slot-scope="scope">
          <div>
            <p>姓名：{{ scope.row.name }}</p>
            <p>日期：{{ scope.row.date }}</p>
            <p>
              地址：{{ scope.row.province }} {{ scope.row.address }}
              {{ scope.row.address }}
            </p>
            <p>邮编：{{ scope.row.zip }}</p>
          </div>
        </template>
      </el-table-column>

      <template v-slot:status="{ row }">
        <el-tag :type="row.status | statusFilter">
          {{ row.status | labelFilter }}
        </el-tag>
      </template>
    </table-custom> 
  </div>
</template>
  
  <script>
import tableCustom from "@/components/BaseTable/table-custom";

export default {
  components: {
    tableCustom,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: "warning",
        1: "success",
        2: "danger",
        3: "info",
      };
      return statusMap[status];
    },
    labelFilter(val) {
      const labelMap = {
        0: "未审核",
        1: "审核通过",
        2: "审核不通过",
        3: "禁用",
      };
      return labelMap[val];
    },
  },
  data() {
    return {
      loading: false,
      tableData: [
        {
          id: 1,
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200331,
          status: "0",
        },
        {
          id: 2,
          date: "2016-05-02",
          name: "赵四",
          province: "东北",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200332,
          status: "1",
        },
        {
          id: 3,
          date: "2016-05-03",
          name: "张三疯",
          province: "武当山",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          status: "2",
        },
        {
          id: 4,
          date: "2016-05-04",
          name: "李连杰",
          province: "新加坡",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 T",
          zip: 200334,
          status: "3",
        },
      ],
      basicColumn: [
        { label: "日期", prop: "date", align: "center", sortable: true },
        { label: "姓名", prop: "name" },
        { label: "省份", prop: "province" },
        { label: "市区", prop: "city" },
        { label: "地址", prop: "address" },
        {
          label: "邮编",
          prop: "zip",
          align: "center",
          sortable: "custom",
          width: "200",
        },
        { label: "审核状态", prop: "status", align: "center", slot: false },
      ],
      tableColumn: [
        { label: "日期", prop: "date", align: "center", sortable: true },
        { label: "姓名", prop: "name" },
        { label: "省份", prop: "province" },
        { label: "市区", prop: "city" },
        { label: "地址", prop: "address" },
        {
          label: "邮编",
          prop: "zip",
          align: "center",
          sortable: true,
          width: "200",
        },
        {
          label: "审核状态",
          prop: "status",
          align: "center",
          slot: true, // 特定列是否需要slot插槽
          // filters: this.filterCondition,
          filters: [
            { text: "未审核", value: "0" },
            { text: "审核通过", value: "1" },
            { text: "审核不通过", value: "2" },
            { text: "禁用", value: "3" },
          ],
          render: (row) => {
            if (row.status === "0") {
              return "未审核";
            } else if (row.status === "1") {
              return "审核通过";
            } else if (row.status === "2") {
              return "审核不通过";
            } else {
              return "禁用";
            }
          },
        },
      ],
      tableOption: {
        label: "操作",
        fixed: "right",
        width: "200",
        options: [
          {
            label: "编辑",
            type: "primary",
            icon: "el-icon-edit-outline",
            methods: "edit",
          },
          {
            label: "删除",
            type: "danger",
            icon: "el-icon-delete",
            methods: "delete",
          },
        ],
      },
      filterCondition: [],
      pagination: true,
      pageSizes: [1, 3, 5, 8],
      paginationObj: {
        total: 4,
        currentPage: 1,
        pageSize: 3,
      },
    };
  },
  computed: {
    changeLable() {
      const condition = [...new Set(this.tableData)].map((item) => {
        return { text: this.labelFilter(item.status), value: item.status };
      });
      return condition;
    },
  },
  created() {
    // this.filterCondition = this.changeLable
  },
  methods: {
    labelFilter(val) {
      const labelMap = {
        0: "未审核",
        1: "审核通过",
        2: "审核不通过",
        3: "禁用",
      };
      return labelMap[val];
    },
    handleButtonClick(param) {
      this.$message({
        message: param,
        type: "info",
      });
    },
    handleSortChange({ column, prop, order }) {
      this.$message({
        message: { prop, order },
        type: "info",
      });
      // const param = Object.assign({}, { prop, order })
      // this.$emit('sort-change', param)
    },
    handleSelectionChange(val) {
      this.$message({
        message: val,
        type: "info",
      });
    },
    handleCurrentChange(current) {
      this.$message({
        message: `当前页: ${current}`,
        type: "info",
      });
      // this.currentPage = current
      // this.queryTable()
    },
    handleSizeChange(size) {
      this.$message({
        message: `每页 ${size} 条`,
        type: "info",
      });
      // this.currentPage = 1
      // this.pageSize = size
      // this.queryTable()
    },
  },
};
</script>