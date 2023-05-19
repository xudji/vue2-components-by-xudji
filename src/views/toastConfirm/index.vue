<template>
  <div>
    home
    <button @click="handleToast">点我Toast</button>
    <button @click="handleConfirm">点我confirm</button>
  </div>
</template>

<script>
export default {
  name: "",
  mixins: [],
  components: {},
  data() {
    return {};
  },

  computed: {},

  created() {},

  //mounted() {},

  methods: {
    handleToast() {
      this.$toast.show({
        show: true, // 是否显示消息按钮
        text: "已完成", //  // 提示框显示文本
        time: "2000", // 提示框持续时间
        position: "center", // 提示框位置
        isShowMask: false, // 是否显示遮罩层
        transition: true, // 是否开启动画
      });
    },
    handleConfirm() {
      this.$msgBox
        .showMsgBox({
          title: "请确认",
          content: "确定要删除这条数据吗？",
          isShowConfimrBtn: true,
          isShowCancelBtn: true,
          confirmVal: "确认",
          cancelVal: "取消",
          maskHide: false,
        })
        .then(async (val) => {
          // ...
          console.log("确认");
        })
        .catch(() => {
          // ...
          console.log("取消");
        });
    },
  },
};
</script>
<style lang='scss' scoped>
</style>