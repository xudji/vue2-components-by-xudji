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
        text: "已完成",
        time: "2000", //显示的时间
        show: false,
        position: "center",
        isShowMask: false,
        transition: true,
      });
    },
    handleConfirm() {
      this.$msgBox
        .showMsgBox({
          title: "提示",
          content: "确定要删除吗",
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