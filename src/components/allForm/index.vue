<template>
  <el-form
    :model="formData"
    class="demo-ruleForm"
    ref="ruleForm"
    label-position="left"
    label-width="120px"
  >
    <el-col
      v-for="(formobj, index) in formObj"
      v-show="!formobj.notShow"
      :key="index"
      :span="formobj.width ? formobj.width : 24"
    >
      <el-form-item
        :label="formobj.label"
        :prop="formobj.prop"
        :rules="formobj.rules"
      >
        <!-- inupt输入框 -->
        <el-input
          v-if="formobj.input"
          v-model="formData[formobj.prop]"
          size="small"
          :disabled="formobj.disabled"
          :placeholder="formobj.placeholder"
          @input="inputINPUT($event, index, formobj.prop)"
          @change="inputChange($event, index, formobj.prop)"
        />
        <!-- textarea输入框 -->
        <el-input
          v-if="formobj.textarea"
          v-model="formData[formobj.prop]"
          size="small"
          type="textarea"
          :rows="formObj.rows"
          :disabled="formobj.disabled"
          :placeholder="formobj.placeholder"
        />
        <!-- select选择器 -->
        <el-select
          v-if="formobj.select"
          v-model="formData[formobj.prop]"
          size="small"
          :disabled="formobj.disabled"
          :placeholder="formobj.placeholder"
          @change="selectChange($event, index, formobj.prop)"
        >
          <el-option
            v-for="(options, sIndex) in formobj.options"
            :key="sIndex"
            :label="options.label"
            :value="options.value"
          />
        </el-select>
        <!-- select搜索框 -->
        <el-select
          v-if="formobj.searchSelect"
          v-model="formData[formobj.prop]"
          size="small"
          :disabled="formobj.disabled"
          filterable
          remote
          reserve-keyword
          :placeholder="formobj.placeholder"
          :remote-method="(query) => remoteMethod(query, index, formobj.prop)"
          :loading="searchSelectLoading"
          @change="selectChange($event, index, formobj.prop)"
        >
          <el-option
            v-for="(item, ssIndex) in formobj.options"
            :key="ssIndex"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- 年月日时分秒选择器 -->
        <el-date-picker
          v-if="formobj.dateTime"
          v-model="formData[formobj.prop]"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          size="small"
          :disabled="formobj.disabled"
          :placeholder="formobj.placeholder"
        />
        <!-- 年月日时分秒，开始和结束时间 -->
        <el-date-picker
          v-if="formobj.dateTimeRange"
          v-model="formData[formobj.prop]"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          size="small"
          type="datetimerange"
          :disabled="formobj.disabled"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <!-- 时分秒选择器 -->
        <el-time-picker
          v-if="formobj.timePicker"
          v-model="formData[formobj.prop]"
          value-format="HH:mm:ss"
          format="HH:mm:ss"
          size="small"
          :disabled="formobj.disabled"
          :placeholder="formobj.placeholder"
          :picker-options="formobj.options"
        />
        <!-- 时分秒选择器，开始和结束时间 -->
        <el-time-picker
          v-if="formobj.timePickerIsRange"
          v-model="formData[formobj.prop]"
          value-format="HH:mm:ss"
          format="HH:mm:ss"
          is-range
          size="small"
          :disabled="formobj.disabled"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        />
        <!-- 年月日选择器 -->
        <el-date-picker
          v-if="formobj.datePicker"
          v-model="formData[formobj.prop]"
          value-format="yyyy-MM-dd"
          size="small"
          :disabled="formobj.disabled"
          :placeholder="formobj.placeholder"
        />
        <!-- 年月日选择器，开始和介绍年月日 -->
        <el-date-picker
          v-if="formobj.datePickerIsRange"
          v-model="formData[formobj.prop]"
          value-format="yyyy-MM-dd"
          type="daterange"
          size="small"
          :disabled="formobj.disabled"
          :placeholder="formobj.placeholder"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <!-- switch开关 -->
        <el-switch
          v-if="formobj.switch"
          v-model="formData[formobj.prop]"
          size="small"
          :disabled="formobj.disabled"
          @change="formSwitchChange($event, index, formobj.prop)"
        />
        <!-- radio单选框 -->
        <el-radio-group
          v-if="formobj.radio"
          v-model="formData[formobj.prop]"
          :disabled="formobj.disabled"
        >
          <el-radio
            v-for="(options, rIndex) in formobj.options"
            :key="rIndex"
            :label="options.label"
            :value="options.value"
          />
        </el-radio-group>
        <!-- checkbox复选框 -->
        <el-checkbox-group
          v-if="formobj.checkbox"
          v-model="formData[formobj.prop]"
          :disabled="formobj.disabled"
        >
          <el-checkbox
            v-for="options in formobj.options"
            :key="options.value"
            :label="options.label"
          />
        </el-checkbox-group>

        <!-- 文件上传 -->
        <!-- 如果对象有值就回显，没有值就为空 -->
        <el-upload
          v-if="formobj.upload"
          :ref="formobj.prop"
          :accept="formobj.accept ? formobj.accept : 'PNG,JPEG'"
          :file-list="formData[formobj.prop] ? formData[formobj.prop] : []"
          :action="`${uploadUrl}${
            formobj.uploadObj.fileType ? formobj.uploadObj.fileType : ''
          }`"
          :limit="formobj.uploadObj.limit"
          :class="{
            hide:
              formobj.uploadObj.hideUpload ||
              formData[formobj.prop].length == formobj.uploadObj.limit,
          }"
          :on-preview="handlePictureCardPreview"
          :on-remove="
            (file, fileList) =>
              handleRemove(
                file,
                fileList,
                formobj.uploadObj.limit,
                formobj.prop,
                index
              )
          "
          :on-success="
            (response, file, fileList) =>
              uploadSuccess(
                response,
                file,
                fileList,
                formobj.uploadObj.limit,
                formobj.prop,
                index
              )
          "
          list-type="picture-card"
          :auto-upload="true"
        >
          <i slot="default" class="el-icon-plus" />
        </el-upload>
        <el-dialog
          v-if="formobj.upload"
          :visible.sync="dialogVisible"
          :append-to-body="true"
          width="40%"
        >
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>

        <!-- 按钮 -->
        <el-button
          v-if="formobj.button"
          size="small"
          :disabled="formobj.disabled"
          :loading="formobj.loading"
          :type="formobj.buttonType || 'primary'"
          @click="buttonClick(formobj.prop, index)"
        >
          {{ formobj.placeholder }}
        </el-button>
        <!-- text展示 -->
        <span v-if="formobj.text" v-text="formData[formobj.prop]" />
        <!-- 计量单位 -->
        <span v-if="formobj.unit" class="left10">{{ formobj.unit }}</span>

        <!-- 高德地图 -->
        <!-- <div class="amap_div" v-if="formobj.aMap">
					<el-input size="small" v-model="formData[formobj.prop]" @input="aMapInput($event,formobj.prop)"></el-input>
					<ul v-show="searchShow==formobj.prop" class="sreach_ul">
						<li @click="selectVal(sval,formobj.prop,index)" v-for=" (sval, index) in setSearchVal" :key="index">{{sval.name}}
							<span style="color:#8591A6 ;font-size: 12px;">{{sval.district}}</span>
						</li>
					</ul>
					<aMap :ref="'aMap'+formobj.prop" :aMapId="'aMapId'+formobj.prop" :location="formData[formobj.prop+'location']" @cbSearch="cbSearch($event,formobj.prop)"></aMap>
				</div> -->
        <VueQuillEditor
          v-if="formobj.quillEditor"
          :quill="formData[formobj.prop]"
        ></VueQuillEditor>
      </el-form-item>
    </el-col>
  </el-form>
</template>
<!--  zoutiancong封装,date:20210429,详细使用见根目录@/views/home/testForm/testForm.vue,———————————————————————————————————————————————————————————————————————————————— -->
<script>
// import aMap from '../../map/aMap.vue'
import VueQuillEditor from "vue-quill-editor";
export default {
  components: {
    VueQuillEditor,
  },
  props: {
    formObj: {
      type: Array,
      required: true,
    },
    formData: {
      type: Object,
      required: true,
    },
    searchSelectOptionsCb: {
      type: Array,
    },
  },
  data() {
    let uploadFileUrl = this.$store.state.user.uploadFileUrl;
    return {
      uploadUrl: uploadFileUrl,
      dialogImageUrl: "",
      searchSelectLoading: false,
      dialogVisible: false,
      disabled: false,
      searchShow: "", //高德地图input收索联想
      setSearchVal: [], //高德地图赋值搜索内容
    };
  },
  created() {},
  watch: {},
  methods: {
    //select变化调用
    selectChange(value, index, prop) {
      this.$emit("selectChange", value, index, prop);
    },
    // input的input事件
    inputINPUT(value, index, prop) {
      this.$emit("inputINPUT", value, index, prop);
    },
    // input的change事件
    inputChange(value, index, prop) {
      this.$emit("inputChange", value, index, prop);
    },
    // 搜索类型select搜索
    remoteMethod(query, index, prop) {
      if (query) {
        this.searchSelectLoading = true;
        this.$emit("querySelectValue", query, index, prop);
        setTimeout(() => {
          this.formObj[index].options = this.searchSelectOptionsCb;
          this.searchSelectLoading = false;
        }, 500);
      } else {
        this.searchSelectOptios = [];
      }
    },
    //switch变化
    formSwitchChange(val, index, prop) {
      this.$emit("formSwitchChange", val, index, prop);
    },
    //按钮点击事件
    buttonClick(prop, index) {
      this.$emit("buttonClick", prop, index);
    },

    //文件上传成功回调
    uploadSuccess(response, file, fileList, limit, prop, index) {
      this.formObj[index].uploadObj.hideUpload = fileList.length == limit; //文件列表变化后判断当前文件列表长度是否等于限制长度。目的，当长度相等时隐藏文件上传按钮
      this.pushUpload(file, fileList, limit, prop);
    },
    //文件删除
    handleRemove(file, fileList, limit, prop, index) {
      this.formObj[index].uploadObj.hideUpload = fileList.length == limit; //文件删除后判断当前文件列表长度是否等于限制长度。目的，当长度相等时隐藏文件上传按钮
      this.pushUpload(file, fileList, limit, prop);
    },
    // 文件预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //提交时验证表单，直接在父级调用
    submitForm() {
      let formValidate = Boolean;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          formValidate = true;
        } else {
          this.$message.warning("请把信息填写完整！");
          formValidate = false;
        }
      });
      return formValidate;
    },
    /* 清空表单
				逻辑：
				1 、如果要清空文件上传列表，要传入要清空的upload的字段名，假如多个upload用for循环，调用清空方法！
				2、清空upload之后，还要把upload上传框展示出来，通过字段名比对，获取到在formObj中的下标，通过下标操作对象属性，进行展示
			 */
    resetForm(uploadArr) {
      this.$refs.ruleForm.resetFields();
      if (uploadArr) {
        for (let i = 0; i < uploadArr.length; i++) {
          this.$refs[uploadArr[i]][0].clearFiles();
          let index = this.formObj.findIndex(
            (item) => item.prop == uploadArr[i]
          );
          this.formObj[index].uploadObj.hideUpload = false;
        }
      }
    },
    // 单个字段验证
    validateFieldProp(prop) {
      let formValidate = Boolean;
      this.$refs.ruleForm.validateField(prop, (valid) => {
        if (!valid) {
          formValidate = true;
        } else {
          formValidate = false;
        }
      });
      return formValidate;
    },
    // 对文件上传，删除进行赋值，调用form验证
    pushUpload(file, fileList, limit, prop) {
      if (fileList.length > 0) {
        this.formData[prop] = fileList;
      } else {
        // 表示没有数据,把字段置空
        this.formData[prop] = "";
      }
      this.$refs.ruleForm.validateField(prop); //调用验证form表单的文件上传
    },
    //地图input的input事件
    aMapInput(value, prop) {
      this.$refs[`aMap${prop}`][0].getSearch(value);
    },
    //子组件返回地图搜索值
    cbSearch(val, prop) {
      this.setSearchVal = val.tips; //子组件
      this.searchShow = prop; //显示input输入联想
    },
    //选中地图值
    selectVal(val, prop, index) {
      // 赋值的时候，拿到键，及formobj的下标，进行赋值
      this.formData[prop] = val.name; //input输入框赋值
      this.formData.district = val.district; //传入省市区
      let lngLat = {
        lng: val.location.lng,
        lat: val.location.lat,
      };
      this.formData[`${prop}location`] = lngLat;
      this.searchShow = ""; //隐藏input输入联想
    },
  },
};
</script>
 
<style lang="less" scoped>
form {
  overflow: hidden;
}

/deep/.el-input {
  width: 220px;
}

/deep/.el-select {
  width: 220px;
}

/deep/.el-date-editor.el-input {
  width: 220px;
}
/deep/.el-date-editor .el-range-separator {
  width: 20px !important;
}
/deep/.el-range-editor--small.el-input__inner {
  width: 400px;
}

.el-textarea {
  width: 400px;
}

/deep/ .el-upload--picture-card {
  display: none;
}
.amap_div {
  overflow: hidden;
  height: 400px;
  width: 600px;
  position: relative;
}
.sreach_ul {
  position: absolute;
  top: 1;
  background-color: white;
  z-index: 9;
  min-width: 210px;
  float: auto;
  height: 200px;
  overflow: auto;
  padding: 0 20px;
  line-height: 24px;
}
</style>