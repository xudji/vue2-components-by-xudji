<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-width="data.width" >


        <el-form-item :label="item.label" :prop="item.prop" v-for="(item,k) in data.items" :key="k" v-show="!item.hide">

            <template v-if="item.type=='slot'">
                <slot :name="item.slot_name"></slot>
            </template>

            <el-input v-model="ruleForm[item.prop]" :placeholder="item.placeholder" v-if="item.type=='Input'"
                      :style="{width: item.width}" :readonly="item.readonly" :show-password="item.password" v-show="!item.hide"></el-input>

            <el-select v-model="ruleForm[item.prop]" :placeholder="item.placeholder" v-if="item.type=='Select'">
                <el-option :label="o.label" :value="o.value" v-for="(o,i) in item.options" :key="i"></el-option>
            </el-select>

            <el-switch v-model="ruleForm[item.prop]" v-if="item.type=='Switch'"></el-switch>


            <el-checkbox-group v-model="ruleForm[item.prop]" v-if="item.type=='Checkbox'">
                <el-checkbox :label="o.value" v-for="(o,k) in item.options" :key="k" >{{o.label}}</el-checkbox>
            </el-checkbox-group>

            <el-radio-group v-model="ruleForm[item.prop]" v-if="item.type=='Radio'">
                <el-radio :label="o.value" v-for="(o,k) in item.options" :key="k" >{{o.label}}</el-radio>
            </el-radio-group>

            <el-col :span="item.span || 10">
                <el-input type="textarea" v-model="ruleForm[item.prop]" :placeholder="item.placeholder" v-if="item.type=='Textarea'"></el-input>
            </el-col>

            <el-col :span="item.span || 5">
                <el-date-picker type="date" :placeholder="item.placeholder" v-model="ruleForm[item.prop]" style="width: 100%;" v-if="item.type=='Date'"></el-date-picker>
            </el-col>
            <el-col :span="item.span || 5">
                <el-time-picker :placeholder="item.placeholder" v-model="ruleForm[item.prop]" style="width: 100%;" v-if="item.type=='Time'"></el-time-picker>
            </el-col>
            <el-col :span="item.span || 5">
                <el-date-picker type="datetime" :placeholder="item.placeholder" v-model="ruleForm[item.prop]" style="width: 100%;" v-if="item.type=='Datetime'"></el-date-picker>
            </el-col>


        </el-form-item>

        <el-form-item>
            <el-button :type="b.type" @click="callSelf('ruleForm',b.action,b.call)" v-for="(b,k) in data.buttons" :key="k">{{b.label}}</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "Form",
        data() {
            return {
                ruleForm: {
                },
                rules: {
                },
                watchKes:[]
            };
        },
        props:{
            data:Object
        },
        methods: {
            callSelf(formName,action,callback){
                if(action=='submit'){
                    this.submitForm(formName,callback)
                }else if(action=='reset'){
                    this.resetForm()
                    callback && callback()
                }else{
                    callback && callback()
                }
            },
            submitForm(formName,callback) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                        callback && callback(this.ruleForm)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            setForm(row){
                for (let key in row) {
                    this.ruleForm[key]=row[key]
                }
            },
            resetForm() {
                this.$refs.ruleForm.resetFields();
            },
            init(data){
                let form={}
                let box=[]
                data.items.forEach((item)=>{
                    switch (item.type) {
                        case 'Checkbox':
                            if(item.default){
                                if(Array.isArray(item.default)){
                                    box = box.concat(item.default)
                                }else{
                                    box.push(item.default)
                                }
                            }
                            form[item.prop]=box
                            break

                        case 'Date':
                        case 'Datetime':
                        case 'Time':
                            if(item.default){
                                form[item.prop]=new Date(item.default)
                            }

                            break
                        default:
                            form[item.prop]=item.default
                            break
                    }

                })

                this.ruleForm = form

                this.rules =  this.data.rules
            },
        },
        watch:{
            data:{
                handler(newVal){
                    //console.log(newVal)
                    this.init(newVal)
                },
                immediate:true,
                deep:true
            }
        },
        created() {
           // this.init()
        }
    }
</script>

<style scoped>

</style>