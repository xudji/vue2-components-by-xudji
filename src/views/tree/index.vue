<template>
  <div class="messageBox">
    <el-container>
      <el-main>
        <Tree
          :treeProps="props"
          :options="treeSelecList"
          v-model="valueId"
          :clearable="isClearable"
          :accordion="isAccordion"
          :expandNode="expandNode"
          size="small"
          width="100%"
          @getValue="getValue($event)"
        >
        </Tree>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Tree from "@/components/tree";

export default {
  name: "treeUse",
  mixins: [],
  components: { Tree },
  data() {
    return {
      props: {
        id: "id",
        label: "name",
        pid: "parentId",
        children: "children",
      },
      list: [
        {
          id: 1, // 菜单的id
          parentId: 0, // 菜单父级id
          name: "一级菜单A", // 菜单名字
          rank: 1, // 菜单等级
        },
        {
          id: 2,
          parentId: 0,
          name: "一级菜单B",
          rank: 1,
        },
        {
          id: 3,
          parentId: 0,
          name: "一级菜单C",
          rank: 1,
        },
        {
          id: 4,
          parentId: 1,
          name: "二级菜单A-1",
          rank: 2,
        },
        {
          id: 5,
          parentId: 1,
          name: "二级菜单A",
          rank: 2,
        },
        {
          id: 6,
          parentId: 5,
          name: "三级菜单A",
          rank: 3,
        },
        {
          id: 7,
          parentId: 2,
          name: "二级菜单B",
          rank: 2,
        },
        {
          id: 8,
          parentId: 7,
          name: "三级菜单B",
          rank: 3,
        },
      ],
      treeSelecList: [],
      isClearable: true,
      isAccordion: false,
      expandNode: true,
      valueId: null,
      valueIds: [],
      valueIds2: [],
    };
  },
  created() {
    this.initData();
  },
  /* 
将 config 对象中的配置信息复制到一个新的对象 conf 中。
创建一个 Map 对象 nodeMap，用于存放节点的映射关系。
创建一个空数组 result，用于存放根节点。
通过解构赋值获取 conf 对象中的 id、children、pid 三个属性。
遍历 list 数组，将每个节点存储到 nodeMap 中，键值对的键为节点的 id 属性，值为节点本身。
再次遍历 list 数组，对于每个节点，查找其父节点是否存在 nodeMap 中，如果存在，则将该节点添加到父节点的 children 数组中，如果不存在，则将该节点添加到 result 数组中。
返回处理结果 result 数组，即树形结构数据。
*/
  methods: {
    initData() {
      this.treeSelecList = this.listToTree(this.list, this.props);
      console.log("this.treeSelecList", this.treeSelecList);
    },
    // 列表转数据
    listToTree(list, config) {
      let conf = {};
      Object.assign(conf, config);
      const nodeMap = new Map();
      const result = [];
      const { id, children, pid } = conf;
      for (const node of list) {
        node[children] = node[children] || [];
        nodeMap.set(node[id], node);
      }
      for (const node of list) {
        const parent = nodeMap.get(node[pid]);
        if (parent) {
          if (parent.children) {
            parent.children.push(node);
          } else {
            parent.children = [];
            parent.children.push(node);
          }
        } else {
          result.push(node);
        }
      }
      return result;
    },
    // 树形选择器 - 取值
    getValue(value) {
      this.valueId = value;
      console.log("getValue", value, this.valueId);
    },
    // 树形选择器 - 取值
    getValue2(value) {
      this.valueId = value;
      console.log("getValue2", value, this.valueIds);
    },
  },
  watch: {
    valueId() {
      console.log("valueId", this.valueId);
    },
    valueIds() {
      console.log("valueIds", this.valueIds);
    },
  },
};
</script>
<style lang='less' scoped>
</style>