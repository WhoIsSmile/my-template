<template>
  <div>
    <el-dialog :title="title" :visible.sync="showDialog" :before-close="hideDialog">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item :label-width="formLabelWidth" prop="name" v-show="false">
          <el-col :span="18">
            <el-input v-model="form.id" v-show="false" />
          </el-col>
        </el-form-item>

        <el-form-item label="功能名称" :label-width="formLabelWidth" prop="funcName">
          <el-col :span="18">
            <el-input v-model="form.funcName" placeholder="请输入名称"></el-input>
          </el-col>
        </el-form-item>

        <!--菜单路径-->
        <el-form-item label="功能Code" :label-width="formLabelWidth" prop="funcCode" >
          <el-col :span="18">
            <el-input v-model="form.funcCode" placeholder="菜单Code" :disabled="editAble"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" @click="hideDialog()">取 消</el-button>
        <el-button :loading="loading" @click="submitDialog()" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      iconVisible: false,
      formLabelWidth: "120px",
      formComponentVisible: true,
      form: {
        id: "",
        funcName : "",
        funcCode: ""
      },
      rules: {
        funcName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        funcCode: [{ required: true, message: "请输入Code", trigger: "blur" }]
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
    }
  },
  watch: {
    
    // 编辑
    editData(val) {
      if (val && val.id) {
        this.form.id = val.id;
        this.form.funcName = val.funcName;
        this.form.funcCode = val.funcCode;
      } else {
        this.form.id = "";
        this.form.funcName = "";
        this.form.funcCode = "";
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
        .dispatch("sys/func/edit", this.form)
        .then(res => {
          this.loading = false;
          this.$refs["form"].resetFields();
          this.hideDialog();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
</style>