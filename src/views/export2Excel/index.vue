<template>
  <div class="export-to-excel">
    <el-button type="primary" @click="handleDownload"> 导 出 excel</el-button>
    <el-table :data="productList" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Export2Excel",
  components: {},
  data() {
    return {
      productList: [
        {
          index: "1",
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518",
        },
        {
          index: "2",
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517",
        },
        {
          index: "3",
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519",
        },
        {
          index: "4",
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516",
        },
      ],
    };
  },

  methods: {
    //excel 导出
    handleDownload() {
      import("@/components/Export2Excel/Export2Excel").then((excel) => {
        // 表头
        const tHeader = ["序号", "日期", "名字", "地址"];
        // 对应的list中的数据项字段名
        const filterVal = ["index", "date", "name", "address"];
        // 列表需要导出的列表
        const list = this.productList;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename, // 设置文件名
          autoWidth: this.autoWidth, // 设置自动列宽
          bookType: this.bookType, // 设置文件类型后缀
        });
      });
    },
    /* 
    formatJson方法通过map函数对jsonData进行遍历，返回一个新的数组即data。每个元素都是数组类型，其长度与filterVal相同，而元素的值是从jsonData中按照filterVal指定的属性名依次取出的值。也就是说，这个方法掌握了如何从jsonData中取出特定属性，并按照指定的顺序将这些值保存到一个数组中。 */
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );
    },
  },
};
</script>
<style lang='scss' scoped>
</style>