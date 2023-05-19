import Vue from 'vue'
import App from './App.vue'
import Toast from './components/toast/toast';
import MessageBox from './components/confirm/messageBox';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import router from './router'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'mdeium', locale })

Vue.use(MessageBox);   //封装的messagebox组件 通过this调用
Vue.use(Toast);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
