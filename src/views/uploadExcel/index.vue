<template>
  <div class="app-container">
    <UploadExcelComponent
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    />
    <el-table
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        v-for="item of tableHeader"
        :key="item"
        :prop="item"
        :label="item"
      />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import { formatExcelDate } from "@/components/UploadExcel/formatExcelDate ";
export default {
  name: "UploadExcel",
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
    };
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      }

      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning",
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
      // 1. 转换格式
      // const 后端要的格式 = this.format(results, header)
      const res = this.format(results);

      console.log("后端要的格式", res);
      // 2. 发ajax
      /* try {
        const res = await importEmployee(data);
        console.log("上传的结果是", res);
        this.$router.go(-1);
      } catch (err) {
        this.$message.error(err.message);
      } */

      //2. 发ajax(后端要的格式)
    },

    format(results) {
      const mapInfo = {
        名字: "name",
        地址: "address",
        序号: "index",
        日期: "date",
      };
      console.log(results);
      // return []
      const res = results.map((obj) => {
        // obj属性名是中文
        // 1. 取出所有的属性名 ---> 数组
        // 2  循环这个数组
        //    向newObj中补充键值对
        //             键：从中文->英文
        //             值: obj中的值
        const newObj = {};
        // 存储对象每个键为一个数组
        const zhKeys = Object.keys(obj);
        console.log(zhKeys, "zhKeys");
        zhKeys.forEach((zhkey) => {
          const enKey = mapInfo[zhkey];

          console.log(enKey);
          console.log(mapInfo[zhkey]);

          console.log(obj[zhkey], "obj"); // 打印出每个对象的值

          // if(当前的key是日期相关的，要额外处理)
          if (enKey === "timeOfEntry" || enKey === "correctionTime") {
            // excel中的日期格式和编程语言中的格式不一致，要转换
            // 44892 -------> 2022-11-11
            newObj[enKey] = new Date(formatExcelDate(obj[zhkey]));
          } else {
            newObj[enKey] = obj[zhkey];
          }
        });

        return newObj;
      });

      return res;
    },
  },
};
</script>
