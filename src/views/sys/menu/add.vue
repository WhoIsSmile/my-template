<template>
  <div>
    <el-dialog :title="title" :visible.sync="showDialog" :before-close="hideDialog">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item :label-width="formLabelWidth" prop="name" v-show="false">
          <el-col :span="18">
            <el-input v-model="form.id" v-show="false" />
          </el-col>
        </el-form-item>

        <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="menuName">
          <el-col :span="18">
            <el-input v-model="form.menuName" placeholder="请输入名称"></el-input>
          </el-col>
        </el-form-item>
        <!-- 下拉列表-->
        <el-form-item label="父级菜单" :label-width="formLabelWidth" prop="parentMenuId">
          <el-col :span="18">
            <el-select v-model="form.parentMenuId" placeholder="请选择" :disabled="editAble">
              <el-option
                v-for="item in parentData"
                :key="item.code"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <!--菜单图标-->
        <el-form-item class="is-required" label="菜单图标" :label-width="formLabelWidth" prop="icon">
          <el-col :span="18">
            <el-input v-model="form.icon" placeholder="请选择图标" readonly>
              <template slot="prepend">
                <Ic :icon="form.icon" />
              </template>
              <el-button
                slot="append"
                icon="el-icon-circle-plus-outline"
                @click="iconVisible = true"
              ></el-button>
            </el-input>
          </el-col>
        </el-form-item>
        <!--菜单路径-->
        <el-form-item label="菜单路径" :label-width="formLabelWidth" prop="path">
          <el-col :span="18">
            <el-input v-model="form.path" placeholder="菜单路径"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item
          label="组件名"
          :label-width="formLabelWidth"
          prop="component"
          v-show="formComponentVisible"
        >
          <el-col :span="18">
            <el-input v-model="form.component" placeholder="请输入组件名"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="排序" :label-width="formLabelWidth" prop="orderNo">
          <el-col :span="18">
            <el-input-number v-model="form.orderNo" :min="1" :max="1000" label="菜单排序,数字越小越靠前"></el-input-number>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" @click="hideDialog()">取 消</el-button>
        <el-button :loading="loading" @click="submitDialog()" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog width="55%" title="菜单图标" :visible.sync="iconVisible" append-to-body>
      <Icon v-on:initIconValue="setIconValue" />
    </el-dialog>
  </div>
</template>
<script>
import Ic from "./ic";
import Icon from "@/views/icons/index";
// 一级菜单的component值
const layout = "Layout";
export default {
  components: { Ic, Icon },
  data() {
    let validIcon = (rule, value, callback) => {
      if (this.formIconVisible) {
        if (!value || value === "") {
          return callback(new Error("请选择图标"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    let validComponent = (rule, value, callback) => {
      if (this.formComponentVisible) {
        if (!value || value === "") {
          return callback(new Error("请输入组件名称"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    let validPath = (rule, value, callback) => {
      if (this.formPathVisible) {
        if (!value || value === "") {
          return callback(new Error("请输入路由路径"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      loading: false,
      iconVisible: false,
      formLabelWidth: "120px",
      formComponentVisible: true,
      form: {
        id: "",
        parentMenuId: "",
        menuName: "",
        path: "",
        icon: "",
        component: "",
        orderNo: 1
      },
      rules: {
        menuName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        path: [{ validator: validPath, trigger: "blur" }],
        icon: [{ validator: validIcon, trigger: "blur" }],
        component: [{ validator: validComponent, trigger: "blur" }]
      }
    };
  },
  props: {
    showDialog: {
      type: Boolean,
      required: true
    },
    editData: {
      type: Object,
      required: true
    },
    editAble: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    parentData: {
      type: Array,
      required: true
    }
  },
  watch: {
    // 监控parentMenuId 的值
    "form.parentMenuId": function(val, oldval) {
      if (parseInt(val) == 0) {
        this.form.component = layout;
        this.formComponentVisible = false;
      } else {
        this.formComponentVisible = true;
      }
    },
    // 编辑
    editData(val) {
      if (val && val.id) {
        this.form.id = val.id;
        this.form.parentMenuId = val.parentMenuId;
        this.form.menuName = val.menuName;
        this.form.path = val.path;
        this.form.icon = val.icon;
        this.form.component = val.component;
        this.form.orderNo = val.orderNo;
        // this.editAble = true;
      } else {
        this.form.id = "";
        this.form.parentMenuId = "";
        this.form.menuName = "";
        this.form.path = "";
        this.form.icon = "";
        this.form.component = "";
        this.form.orderNo = 1;
      }
    }
  },
  methods: {
    hideDialog() {
      this.loading = false;
      this.$refs["form"].resetFields();
      this.$emit("hideAddDialog");
    },
    submitDialog() {
      this.loading = true;
      this.$store
        .dispatch("sys/menu/edit", this.form)
        .then(res => {
          this.loading = false;
          this.$refs["form"].resetFields();
          this.hideDialog();
        })
        .catch(error => {
          console.log(error);
        });
    },
    setIconValue(text) {
      const text2 = text.substring(
        text.indexOf('"') + 1,
        text.lastIndexOf('"')
      );
      if (text.startsWith("svg-icon", 1)) {
        this.form.icon = "svg|" + text2;
      } else {
        this.form.icon = "i|" + text2;
      }
      this.iconVisible = false;
    }
  }
};
</script>
<style scoped>
</style>