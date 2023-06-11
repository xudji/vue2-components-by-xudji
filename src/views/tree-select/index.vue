

<template>
  <div class="messageDemo">
    <el-container>
      <el-main>
        <treeSelect
          :treeProps="props"
          :options="treeSelectList"
          v-model="valueId"
          :clearable="isClearable"
          :accordion="isAccordion"
          :expandNode="false"
          size="small"
          width="100%"
          @getValue="getValue($event)"
        />
      </el-main>
      <el-main>
        <span>父子不互相关联：check-strictly=true</span>
        <treeSelect
          :multiple="true"
          :collapse="false"
          :checkStrictly="true"
          :treeProps="props"
          :options="treeSelectList"
          v-model="valueIds"
          :clearable="isClearable"
          :accordion="isAccordion"
          :expandNode="false"
          size="small"
          width="360px"
          @getValue="getValue2($event)"
        />
      </el-main>
      <el-main>
        <span>父子互相关联：check-strictly=false</span>
        <treeSelect
          :multiple="true"
          :collapse="false"
          :treeProps="props"
          :options="treeSelectList"
          v-model="valueIds2"
          :clearable="isClearable"
          :accordion="isAccordion"
          :expandNode="false"
          size="small"
          width="360px"
          @getValue="getValue2($event)"
        />
      </el-main>
    </el-container>
  </div>
</template>


<!-- JS -->
<script>
import treeSelect from "@/components/tree-select";
export default {
  name: "demo",
  components: {
    treeSelect,
  },
  data() {
    return {
      props: {
        // 配置项（必选）可以手动设置默认值
        id: "id",
        label: "name",
        pid: "parentId",
        children: "children",
        // disabled:true
      },
      // 数组
      list: [
        {
          id: 1,
          parentId: 0,
          name: "一级菜单A",
          rank: 1,
        },
        { id: 2, parentId: 0, name: "一级菜单B", rank: 1 },
        { id: 3, parentId: 0, name: "一级菜单C", rank: 1 },
        { id: 4, parentId: 1, name: "二级菜单A-A", rank: 2 },
        { id: 5, parentId: 1, name: "二级菜单A-B", rank: 2 },
        { id: 6, parentId: 2, name: "二级菜单B-A", rank: 2 },
        { id: 7, parentId: 4, name: "三级菜单A-A-A", rank: 3 },
        { id: 15, parentId: 0, name: "一级菜单C", rank: 1 },
        { id: 16, parentId: 0, name: "一级菜单C", rank: 1 },
        { id: 17, parentId: 0, name: "一级菜单C", rank: 1 },
        { id: 18, parentId: 0, name: "一级菜单C", rank: 1 },
      ],
      treeSelectList: [], // 处理好的树形列表数组
      isClearable: true, // 可清空（可选）
      isAccordion: false, // 可收起（可选）
      valueId: "", // 初始ID（可选）
      valueIds: [],
      valueIds2: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    // initData() 方法的作用就是将原始数据转换为树形数据，为树形选择器组件的使用提供准备。
    initData() {
      this.treeSelectList = this.listToTree(this.list, this.props);
      console.log("this.treeSelectList", this.treeSelectList);
    },
    /**
     * @description        数组转树形数据
     * @param {数据数组}    list
     * @param {树结构配置}  config
     * 将 config 对象中的配置信息复制到一个新的对象 conf 中。
创建一个 Map 对象 nodeMap，用于存放节点的映射关系。
创建一个空数组 result，用于存放根节点。
通过解构赋值获取 conf 对象中的 id、children、pid 三个属性。
遍历 list 数组，将每个节点存储到 nodeMap 中，键值对的键为节点的 id 属性，值为节点本身。
再次遍历 list 数组，对于每个节点，查找其父节点是否存在 nodeMap 中，如果存在，则将该节点添加到父节点的 children 数组中，如果不存在，则将该节点添加到 result 数组中。
返回处理结果 result 数组，即树形结构数据。
     */
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


