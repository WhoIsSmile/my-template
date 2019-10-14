/**
 * @author laughing
 * @date 2019-08-20 10:12:37
 *
 **/
<template>
  <div>
    <el-row>
      <div style="margin-top: 10px; margin-bottom: 10px;float: right">
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </div>
    </el-row>
    <el-row>
      <el-table :data="dbData" border style="width: 100%" row-key="id">
        <el-table-column prop="id" label="ID" width="100" align="center"></el-table-column>
        <el-table-column prop="funcName" label="功能名称" align="center"></el-table-column>
        <el-table-column prop="funcCode" label="功能Code" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              :loading="loading"
              size="mini"
              type="danger"
              @click="handleDel(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <Add
      :title="title"
      :edit-able="editAble"
      :edit-data="editData"
      :showDialog="dialogFormVisible"
      v-on:hideAddDialog="hideDialog"
    />
  </div>
</template>
<script>
import Add from "./add.vue";
export default {
  components: { Add },
  data() {
    return {
      dbData: [],
      loading: false,
      editAble: false,
      title: "新增功能",
      dialogFormVisible: false,
      editData: {},
      parentData: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    hideDialog(flag) {
      this.editData = {};
      this.fetchData();
      this.dialogFormVisible = false;
    },
    fetchData() {
      this.$store
        .dispatch("sys/func/list")
        .then(res => {
          this.dbData = res.body;
          // this.initParentData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.editAble = false;
      this.title = "新增功能";
      this.editData = {};
    },
    handleEdit(index, row) {
      this.title = "编辑功能";
      this.editAble = true;
      this.dialogFormVisible = true;
      this.editData = row;
    },
    // 删除
    handleDel(index, row) {
      this.loading = true;
      this.$confirm("您确定要删除 [" + row.funcName + "] 功能吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("sys/func/del", row)
            .then(() => {
              this.loading = false;
              this.fetchData();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(err => {
              console.log(err);
              this.loading = false;
              this.$message.error("删除失败");
            });
        })
        .catch(() => {
          this.loading = false;
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    hideDialog(flag) {
      this.editData = {};
      // if(flag === 'refresh'){
      this.fetchData();
      // }
      this.dialogFormVisible = false;
    }
  }
};
</script>
<style scoped>
</style>