# vue2 组件封装 by xudji

## 树形选择器组件

### 使用方式

用户需要在组件中传入一个列表数据，将该列表转换成树形结构，然后渲染成可点击的树形结构。用户可以通过点击节点获取该节点的值，并将其显示在组件中。

```html
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
```

#### 参数

- `multiple`: 是否可多选，默认为 false，单选模式。
- `clearable`: 可清空选项，默认为 true。

- `treeProps`: 配置项，包括选项数据的 id、label、children 字段名，默认值为 `{ id: 'id', label: 'title', children: 'children' }`。 

- `options`: 选项列表数据，树形结构的对象数组，默认值为 `[]`。 `accordion`: 自动收起节点，默认为 false。 

- `checkStrictly`: 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false。 `expand`: 是否展开所有节点，默认展开。

-  `expandParent`: 展开子节点的时候是否自动展开父节点，默认为 true。

-  `expandNode`: 是否在点击节点的时候展开或者收缩节点，默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。

-  `value`: 初始值，绑定 value 是为了外面也可以传值改变到里面的值双向绑定，默认为 null。

- `collapse`: 多选时是否将选中值按文字的形式展示，默认为 false。 

- ` size`: 选择框大小，默认为 small。

-  `width`: 选择框宽度，默认为 270px。 `disabled`: 是否禁用，默认为 false

#### 方法

- `input`: 组件值更新时触发的方法，在单选模式下 event 参数为当前选中项的 id，在多选模式下 event 参数为当前选中项的 id 组成的数组。
- `clear`: 清空选项时触发的方法。
- `remove-tag`: 多选模式下任一标签被删除时触发的方法。
- `getValue`: 选项发生变化时触发的方法，在多选模式下 `valueId` 参数为当前选中项的 id 组成的数组，在单选模式下 `valueId` 参数为当前选中项的 id，`valueTitle` 参数为当前选中项的名称。

### 使用逻辑

1. 在 data 中定义一些需要用到的变量，包括 `props`、`list`、`treeSelecList`、`isClearable`、`isAccordion`、`expandNode`、`valueId`、`valueIds`、`valueIds2`，其中 `props` 是树形结构中的一些属性配置，`list` 是传入的列表数据，其他变量是一些控制树形选择器行为的开关和选中值。
2. 在 created 钩子函数中调用 `initData` 方法，该方法将 `list` 列表数据转换为树形结构并存储于 `treeSelecList` 中。
3. 在 methods 中定义了一些需要使用到的方法，包括`initData` `listToTree` `getValue` `getValue2` 
   - `initData` 方法在创建组件时被调用，其主要作用是将传入的列表数据转换为树形结构并存储于 `treeSelecList` 中。
   - `listToTree` 方法将传入的列表数据转换为树形结构。
   - `getValue` 和 `getValue2` 方法分别用于获取树形选择器选中的值，`getValue` 方法只会获取单选的选中值，`getValue2` 方法可以获取多选的选中值。
4. 在 watch 中监听 `valueId` 和 `valueIds` 的变化，并在控制台输出相关信息。
5. 使用该组件时，需要在父组件中引用该组件并传入一个列表数据。同时可以通过设置组件中的一些属性来控制树形选择器的行为，如是否单选或多选、是否折叠展开等。用户可以通过点击树形结构中的节点来获取选中的值。

### 封装功能

1. 支持单选和多选两种模式，通过 `multiple` 属性进行控制；
2. 使用了 `el-tree` 和 `el-select` 两个 ElementUI 组件构建树形选择器；
3. 可以通过传入的参数 `options` 和 `treeProps` 来自定义树形结构和展示内容；
4. 单选模式下，当初始值 `valueId` 不为空时，会自动根据其设置当前选中的节点，并将其默认展开；
5. 多选模式下，当初始值 `valueId` 不为空时，会自动根据其设置当前选中的节点，并将其默认展开；
6. 在选项标签区域可点击删除已选项；
7. 选项区域支持滚动条；
8. 支持选择框宽度、大小、禁用等属性的配置。

### 封装逻辑

1. 定义组件名称 `tree-select`，同时定义了支持的 `props` 属性和默认值。
2. 在 `data()` 中初始化了 `valueId` 和 `valueTitle` 两个数据，用于记录当前选中的节点的 ID 和展示标题。另外，定义了 `label` 数据用于记录当前分组。
3. 在 `mounted()` 钩子函数中调用了 `initHandle()` 方法进行初始值的处理。
4. `initHandle()` 方法主要处理了单选和多选两种模式下的初始值设置。单选模式下，通过 `getNode` 方法获取当前选中节点的信息，并将其展开和设为当前选中；多选模式下，则直接调用 `setCheckedKeys` 方法将树的节点勾选。
5. 树形结构部分使用了 `el-tree` 组件，通过传入的 `options` 和 `treeProps` 参数自定义了树形结构和展示内容。同时，配置了一些参数，比如自动收起、严格遵循父子节点不互相关联等。
6. 选择器部分使用了 `el-select` 组件，通过绑定 `value` 和 `input` 事件实现双向绑定和回调功能。还支持传入一些属性，比如选择框大小、清空按钮、禁用等等。
7. 单选模式下，在节点被点击时会触发 `handleNodeClick` 方法，记录选中节点的信息并回调父组件传入的 `getValue` 方法。
8. 多选模式下，通过监听 `check-change` 事件获取勾选节点的信息，并记录当前选中节点的信息。同时，在节点勾选变化时会根据 `checkStrictly` 属性的值来进行处理，实现父子节点勾选关联或不关联的效果。
9. 在选择器中的标签区域，可以进行删除已选项的操作，通过监听 `remove-tag` 事件来实现。
10. 最后，定义了一些常用方法，比如清除选中、统一处理子节点为不选中、统一处理父节点为选中等。



## 表格组件

表格组件是一个方便展示和处理大量数据的界面元素，可以包含多种功能，如组合排序、筛选、slot 插槽、过滤器、操作列、展开行以及自定义分页等。

### 使用方式

```html
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
```

### 参数

- `loading`: 是否显示加载动效，默认为 `false`
- `stripe`: 是否带有斑马纹，默认为 `true`
- `border`: 是否带有边框，默认为 `true`
- `type`: 列的类型，可以是 `selection`、`index` 或 `expand`，分别对应多选框、行索引和可展开按钮，默认为 `index`
- `tableData`: 显示的表格数据，类型为数组，必选
- `tableColumn`: 表格列的配置，类型为数组，必选
- `tableOption`
- : 表格操作列的配置，类型为对象，包括以下属性：
  - `label`: 操作列的名称
  - `fixed`: 操作列是否固定
  - `width`: 操作列的宽度
  - `options`
  - : 操作列的选项，类型为数组，每个选项包括以下属性：
    - `label`: 选项名称
    - `type`: 选项的类型，比如 `primary`、`success` 等
    - `icon`: 选项的图标，通过 fontawesome 类名来指定
    - `methods`: 选项的事件方法
- `pagination`: 是否需要翻页组件，默认为 `true`
- `layout`: 翻页组件的布局形式，类型为字符串，默认为 `"total, sizes, prev, pager, next, jumper"`
- `pageSizes`: 每页显示的条数可选项，类型为数组，包含若干数字，默认为 `[10, 30, 50, 100]`
- `paginationObj`:
- : 翻页组件的相关参数，包括以下属性：
  - `total`: 数据总条数
  - `currentPage`: 当前页码
  - `pageSize`: 每页显示的条数

### 方法

- `handle-button-click`: 表格操作列按钮的点击事件，传递选项的 methods、所在行的 row 和该选项的 index 三个参数
- `handle-sort-change`: 表格排序改变事件，传递一个设置好的 sort 对象参数
- `handle-selection-change`: 表格多选框改变事件，传递选中的数据 val 参数
- `handle-size-change`: 每页显示条数改变事件，传递改变后的 size 参数
- `handle-current-change`: 当前页码改变事件，传递改变后的 current 参数

### 封装的功能

1. 表格数据的加载动效；
2. 带斑马纹的表格；
3. 表格带竖直方向的边框；
4. 支持多选框、索引、可展开按钮等不同类型的列；
5. 筛选、排序功能；
6. 动态渲染自定义内容或操作按钮到表格中；
7. 支持表格的展开行和树形结构；
8. 翻页组件，可设置每页显示数量、布局等参数；
9. 触发相应事件，如点击操作按钮、选择行、滚动翻页等。

### 封装的逻辑

1. 定义 `props`

定义了 8 个 `props` 用来接收传入的表格数据和配置项。包括：

- `loading`：是否显示加载数据时的动效；
- `stripe`：是否启用斑马纹样式；
- `border`：是否启用带上下边框样式；
- `type`：对应列的类型，包括索引、多选框和可展开按钮等；
- `tableData`：表格数据；
- `tableColumn`：表格列；
- `tableOption`：表格操作列（可选）；
- `pagination`：是否需要翻页组件；
- `layout`：翻页组件的布局配置；
- `pageSizes`：每页显示数量的选项配置；
- `paginationObj`：翻页组件相关的配置，包括总条目数、当前页数和每页显示数量。

1. 实现表格

使用 Element UI 提供的 `el-table` 和 `el-table-column` 组件来实现表格。在 `el-table-column` 中，根据列的不同特性（如是否可排序、是否可筛选等），动态确定渲染哪个子组件。例如，对于设置了 `filters` 属性的列，则使用带有筛选功能的 `el-table-column` 组件；对于 `slot` 属性对应的列，则渲染组件内传入的插槽；否则，渲染默认的 `el-table-column` 组件。

1. 处理事件

在 `methods` 中定义了多个处理事件的方法，包括：

- `handleButtonClick`：处理操作按钮的点击事件；
- `handleSortChange`：处理表格排序的变化事件；
- `handleSelectionChange`：处理选择行的变化事件；
- `filterHandler`：列的筛选函数，根据传入的 `value`、`row` 和 `column` 决定某些数据是否显示；
- `toggleExpand`：切换某一行的展开状态；
- `handleSizeChange`：处理翻页组件中每页显示数量的变化事件；
- `handleCurrentChange`：处理翻页组件中当前页数的变化事件。

这些方法通过 `v-on` 传递到父组件进行处理，并且在必要时传递相应的参数。

1. 翻页组件

如果需要，使用 Element UI 提供的 `el-pagination` 组件来实现翻页组件。可以通过一些属性和方法来设置翻页组件的外观和交互行为，例如：每页显示数量的选项、布局配置、总条目数、当前页数和每页数量的同步修改等。

1. 事件触发

通过 `$emit` 方法向父组件触发自定义事件，如点击操作按钮、选择行、滚动翻页等。

除此之外还有几点需要注意：

- 这里提到用到了 Element UI，因此需要先安装和引入 Element UI 的代码库；

- 在 `el-table-column` 中可以用 `scoped-slot` 定义列的内容，这样可以更灵活地渲染自定义内容和操作按钮；

- 在 `props` 中定义的 `paginationObj` 可以通过计算属性来生成，避免在组件内部重复计算；

- 翻页组件的布局属性 `layout` 也可以通过计算属性来生成，方便自定义。

  

## 表单组件

本组件是一个表单组件，可以方便地生成包含多种表单元素的表单。使用时需要传递 `items` 和 `buttons` 数组。

### 使用方式:

```javascript
<Form ref="myForm" :data="formData"></Form>
formData: {
  width: "100px",
  items: [
    {
      type: "Input",
      label: "活动名称",
      prop: "name",
      width: "240px",
      placeholder: "请填写活动名称",
      default: "请",
    },
    //...其他表单项
  ],
  buttons: [
    {
      label: "确定",
      type: "primary",
      action: "submit",
      call: (data) => {
        console.log(data);
      },
    },
    //...其他按钮
  ],
  rules: {
    name: [
      { required: true, message: "请输入活动名称", trigger: "blur" },
      {
        min: 3,
        max: 5,
        message: "长度在 3 到 5 个字符",
        trigger: "blur",
      },
    ],
    region: [
      { required: true, message: "请选择活动区域", trigger: "change" },
    ],
    //...其他验证规则
  }
}
```

### 参数:

- `data`: 包含表单所有配置信息的对象，结构如下：

  ```javascript
  {
    width: String, // 表单的宽度
    items: Array, // 包含所有表单项的数组
    buttons: Array, // 包含所有操作按钮的数组
    rules: Object // 包含所有验证规则的对象
  }
  ```

- `items`: 包含了表单所有的字段，每个元素代表一个表单项，具体属性如下：

  - `prop`: 字符串，必须，代表该表单项对应数据的属性名
  - `label`: 字符串，必须，代表该表单项的标签
  - `type`: 字符串，必须，代表该表单项的类型，可选值有：Input、Select、Switch、Checkbox、Radio、Textarea、Date、Time、Datetime
  - `placeholder`: 字符串，选填，代表该表单项的占位符
  - `width`: 字符串，选填，代表该表单项的宽度
  - `readonly`: 布尔值，选填，代表该表单项是否只读
  - `password`: 布尔值，选填，代表该表单项是否为密码输入框
  - `hide`: 布尔值，选填，代表该表单项是否隐藏
  - `span`: 数字，选填，代表该表单项在网格布局中所占的列数，范围为 1~24，默认值为 10
  - `default`: 该表单项对应的默认值，类型和意义与不同类型的表单项相关，具体说明如下：
    - `Input`: 字符串，选填，代表输入框的默认值
    - `Select`: 字符串或数组，选填，代表下拉选择框的默认值。若该属性值为字符串，则表示下拉框某个选项的 label 值；若该属性值为数组，则表示多选框已选中的选项的 value 值数组。
    - `Switch`: 布尔值，选填，代表开关的默认值
    - `Checkbox`: 数组，选填，代表多选框已选中的选项的 value 值数组
    - `Radio`: 字符串，选填，代表单选框已选中的选项的 value 值
    - `Textarea`: 字符串，选填，代表文本域的默认值
    - `Date`、`Datetime`、`Time`: 字符串，选填，代表日期时间相关组件的默认值

- `buttons`: 包含了表单的操作按钮，每个元素代表一个操作按钮，具体属性如下：

  - `label`: 字符串，必须，代表该按钮的标签
  - `type`: 字符串，选填，代表该按钮的类型，可选值有：primary、success、warning、danger、info、text
  - `action`: 字符串，必须，代表该按钮的操作类型，可选值有：submit、reset、自定义方法名
  - `call`: 自定义方法，选填，代表该按钮点击后要执行的回调函数。若未传递该属性，则直接执行 `action` 属性所指定的操作。

- `rules`: 包含了所有验证规则，具体属性如下：

  - `prop`: 字符串，必须，代表该验证规则对应的表单项属性名。
  - `required`: 布尔值，选填，代表该表单项是否是必填项。
  - `type`: 字符串，选填，代表该表单项的类型。可选值有：string、number、boolean、method、regexp、integer、float、array、object、enum、date、url、email。
  - `validator`: 自定义方法，选填，代表自定义的验证函数。若未传递该属性，则使用默认的验证函数。
  - `trigger`: 字符串，选填，代表触发验证的事件类型。可选值有：blur、change 等。
  - `message`: 字符串，必填，代表验证失败的提示信息。

### 方法:

- `callSelf(formName, action, callback)`: 自定义方法，用于执行表单相关的操作。
  - `formName`: 字符串，必填，代表要操作的表单的 ref 属性名。
  - `action`: 字符串，必填，代表要执行的操作类型，可选值有：submit、reset、自定义方法名。
  - `callback`: 自定义方法，选填，代表操作完成后要执行的回调函数。该回调函数会接收一个参数，即当前表单数据对象 ruleForm。若未传递该属性，则不执行回调函数。
- `submitForm(formName, callback)`: 自定义方法，用于提交表单。
  - `formName`: 字符串，必填，代表要提交的表单的 ref 属性名。
  - `callback`: 自定义方法，选填，代表提交表单后要执行的回调函数。该回调函数会接收一个参数，即当前表单数据对象 ruleForm。若未传递该属性，则不执行回调函数。
- `setForm(row)`: 自定义方法，用于设置表单的默认数据。
  - `row`: 对象，必填，包含了要设置的表单数据属性和值的键值对。
- `resetForm()`: 自定义方法，用于重置表单。

### 使用的逻辑:

1. 在父组件中引入 Form 组件，在 data 中定义 formData，并将其传入 Form 组件中。
2. 在 formData 中定义表单元素列表 items，包括每个表单元素的 type、label、prop、width、default、placeholder 和 options 等属性。
3. 在 formData 中定义按钮列表 buttons，label、type、action 和 call 等属性来配置按钮的名称、类型、动作和响应函数等。
4. 在 formData 中定义验证规则列表 rules，包括每个表单元素的 required、message 和 trigger 等属性。
5. 可以通过设置验证规则列表中的 required、message 和 trigger 等属性来配置表单元素的验证规则，例如必填、错误提示和触发方式等
6. 调用表单组件的方法，可以使用 ref 引用表单组件，例如获取表单数据、重置表单数据等。

### 封装的功能

1. 支持多种表单输入类型，包括文本框、下拉框、日期选择器等
2. 可以配置每个表单项的校验规则、默认值、展示方式等
3. 支持自定义按钮和插槽
4. 提供表单校验、表单提交、表单重置等常用表单操作方法
5. 使用 Element UI 中的组件进行实现
6. 可以通过数据传入的方式进行动态生成表单项，并支持数据的双向绑定
7. 提供了初始化方法以进行表单的默认值设置
8. 组件使用了 El-Form 进行表单的布局

### 封装的逻辑

1. 在组件中定义了一个 data 函数，用于初始化组件内部使用的数据，其中包括表单数据、表单校验规则、需要监听的表单属性等
2. 定义了一个 props 属性，用于从父组件获取传入的配置项
3. 定义了多个组件内部使用的方法，包括初始化表单数据、提交表单、重置表单等
4. 在组件内部使用了 Element UI 中的多个组件，例如 Input、Select、DatePicker 等，用于实现不同类型的表单输入项
5. 通过 v-if 条件语句实现不同类型表单输入项的动态渲染，例如 `v-if="item.type=='Input'"` 表示如果表单项类型为文本框，则渲染 Input 组件
6. 使用 v-for 循环渲染表单项，同时通过 `:key` 属性指定每个表单项的唯一标识符
7. 利用插槽，支持自定义展示内容或操作按钮
8. 在表单提交时，会根据配置项中设置的校验规则进行表单校验，并执行相应的回调函数

以上是这个组件封装的大致逻辑。该组件通过对 Element UI 中组件的引用和结合 Vue.js 的特性进行动态渲染，实现了可配置、灵活、易用的表单组件。

## Toast

封装了一个带有遮罩层的提示框组件。

### 使用方式

使用方式如下：

```javascript
this.$toast.show({
  show: true, // 是否显示消息按钮
  text: "已完成", // 提示框显示文本
  time: "2000", // 提示框持续时间
  position: "center", // 提示框位置
  isShowMask: false, // 是否显示遮罩层
  transition: true, // 是否开启动画
});
```

### 使用逻辑

1. 通过传递 props 给 `$toast.show` 方法，可以改变提示框中展示的文字内容、显示的时间、展示的位置、是否展示遮罩层以及开启动画效果等。
2. 调用该方法后，会在页面中展示一个提示框，展示的文字内容为“已完成”，展示的时间为2000ms，展示在页面中央，不展示遮罩层，开启动画效果。
3. 在页面上不需要再手动隐藏提示框，因为指定了时间后，该提示框会自动隐藏，无需用户手动关闭。

### 封装功能

1. 可自定义提示框的展示状态、提示文字、位置、是否显示遮罩层、显示时间、是否开启动画等属性；
2. 提示框可以通过设置不同的位置实现在页面顶部、中间或底部显示；
3. 提示框支持多种动画效果，如从顶部、底部或中间平移进入；
4. 提示框中的遮罩层可以实现页面防止重复点击等操作；
5. 提示框的样式可以通过修改组件内部的样式来进行定制。

### 封装逻辑

1. 用于显示一个提示框，根据传入的 props 来控制提示框的样式和行为。具体逻辑如下：
2. 根据传入的 props，决定是否显示遮罩层和提示文字，以及它们的位置和持续时间。
3. 通过计算属性 computed 来生成相对应的动画，根据提示框的位置来设置不同的动画方式。动画效果包括淡入淡出和滑动等。
4. 在 mounted 钩子函数中，可以控制提示框的显示时间，默认是 1500 毫秒，也可以通过传入 props 来调整显示时间。
5. 最后，在组件的 template 中，通过使用 Vue.js 的过渡动画 transition，来实现提示框的动画效果。

### 插件注册导出

1. 首先定义了一个名为 `Toast` 的对象，并在该对象中定义了 `install` 方法，该方法用于在 Vue 中定义插件，实现全局调用。
2. 在 `install` 方法中，`Toast` 通过创建一个包含 Vue 组件实例的构造器 `toastTpl`，然后在该构造器的基础上实例化一个 Vue 组件 `$vm`。
3. 接着，在该组件的生命周期函数中，使用 `$mount` 手动开启编译，并将其挂载到 `document.body` 上，用于显示 Toast。
4. 然后，在 Vue 的原型上添加实例方法 `$toast`，用于控制 toast 的显示与隐藏，并实现全局调用。在 `show` 方法中，根据传入的参数类型判断，传入相应的 props，设置组件内部 `show` 属性为 true，显示 Toast。并通过 `setTimeout` 来控制 Toast 的消失时间。
5. 最后，通过 default 导出 `Toast` 插件，以便在其他地方引入使用。

## Confirm

本文档是关于 `confirm` 组件的说明文档，其中包括使用方式、封装的功能和逻辑、注册插件的逻辑等。

### 使用方式

用于显示一个确认对话框。你可以在需要显示确认对话框的事件处理函数中调用该方法，并传入一个对象作为参数，其中包括了确认对话框的相关配置信息。通过 `this.$msgBox.showMsgBox()` 调用，并传递配置项。

```javascript
this.$msgBox
  .showMsgBox({
    title: "请确认", // 标题
    content: "确定要删除这条数据吗？", // 内容文本
    isShowConfimrBtn: true, // 是否显示确认按钮
    isShowCancelBtn: true, // 是否显示取除按钮
    confirmVal: "确认", // 确认按钮的文本
    cancelVal: "取消", // 取消框文本
    maskHide: false, // 是否隐藏遮罩
  })
  .then(async (val) => {
    // ...
    console.log("确认");
  })
  .catch(() => {
    // ...
    console.log("取消");
  });
```

使用的逻辑:

1. 在需要显示确认对话框的事件处理函数中调用 `this.$msgBox.showMsgBox({ ... })` 方法。
2. 将需要显示的标题、内容等信息传递给 `showMsgBox({ ... })` 方法。
3. 在 `then` 和 `catch` 函数中分别编写用户点击确认和取消按钮后需要执行的逻辑。
4. 在用户点击确认/取消按钮后，`Promise` 将结果返回。

### 封装的功能

1. 可以展示弹框并在弹框中展示标题和内容
2. 可以自定义确认和取消按钮的文字以及是否展示取消按钮
3. 点击确认或取消按钮可以返回 `Promise`，并将 `Promise` 状态断定为 `resolve` 或 `reject`
4. 可以通过传入 props 控制是否可以点击蒙层关闭弹框
5. 弹出和关闭动画效果
6. 可以用作插件全局使用，引入后挂载到 Vue 原型上

### 封装的逻辑

1. 在 `data` 方法中定义了组件内部的数据 `isShowMessageBox`、`resolve`、`reject` 和 `promise`，其中 `isShowMessageBox` 用于控制弹框的展示与隐藏，`resolve` 和 `reject` 分别对应 `Promise` 的 `resolve` 和 `reject` 方法，`promise` 用于保存 `Promise` 对象。
2. 在 `props` 中定义了弹框的相关属性，包括是否展示确认和取消按钮、弹框内容、标题、确认和取消按钮文字、是否可以点击蒙层关闭等。
3. 在`methods`方法中定义了弹框组件的方法，包括：
   - `confirm`：点击确认按钮时触发，将 `isShowMessageBox` 置为 `false`，调用 `resolve` 方法，并在100毫秒后销毁弹框。
   - `cancel`：点击取消按钮时触发，将 `isShowMessageBox` 置为 `false`，调用 `reject` 方法，并在100毫秒后销毁弹框。
   - `showMsgBox`：弹出弹框时触发，将 `isShowMessageBox` 置为 `true`，创建一个 `Promise` 对象并将其保存到 `promise` 变量中，同时将 `resolve` 和 `reject` 方法分别指向实例的 `resolve` 和 `reject` 方法，并返回该 `Promise` 对象。
   - `remove`：销毁弹框时触发，设置一个100毫秒后销毁弹框的定时器。
   - `destroy`：销毁弹框时最终触发，先销毁实例，再从 DOM 中移除组件的元素。
4. 最后，将该组件挂载到 Vue 的原型上，以便在任意 Vue 实例中全局使用。对外提供 `$messageBox` 方法，在调用时传入需要展示的内容和标题等参数即可弹出该组件展示弹框内容，同时返回 `Promise` 对象，通过 `Promise.then()` 方法可以获取到 confirm 和 cancel 的状态。

### 注册插件的逻辑

1. 首先导入了 `MessageBox` 组件的相关代码。
2. 接着定义了一个空对象 `MessageBox`，用于存放该插件的方法和属性。
3. 在 `MessageBox` 对象上定义了一个 `install` 方法，该方法会在插件安装时被调用。在该方法中，首先通过 `Vue.extend()` 方法创建了一个新的 Vue 实例并将其赋值给了 `MessageBoxInstance` 变量。
4. 接着定义了 `initInstance` 方法，该方法用于初始化当前的弹框实例。在该方法中，首先判断当前是否已经存在 `MessageBox` 实例，如果不存在，则创建一个新的实例并将其挂载到 DOM 中；否则直接使用已有的实例。
5. 在 Vue 原型上定义了一个 `$msgBox` 的属性，该属性的值是一个对象。该对象中包含了一个 `showMsgBox` 方法，用于展示弹框。在该方法中，首先调用 `initInstance` 方法初始化实例，然后根据传入的参数设置弹框的内容和标题等信息。接着，调用实例的 `showMsgBox` 方法展示弹框，并且返回 `Promise` 对象，通过 `Promise.then()` 或者 `Promise.catch()` 方法分别处理确认和取消按钮的点击事件。
6. 最后，将 `MessageBox` 对象导出。