/**
 *@Author laughing
 *@Date 2019-08-19 08:55:41
 */
<template>
  <div>
    <el-row>
      <div style="margin-top: 10px; margin-bottom: 10px;float: right">
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </div>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-table :data="dbData" border style="width: 100%" row-key="id">
        <el-table-column type="expand">
          <template slot-scope="scope2">
            <el-table
              :data="scope2.row.childrenMenu"
              style="width: 100%"
              row-key="id"
              border
              stripe
            >
              <el-table-column prop="id" label="ID" width="100" align="center"></el-table-column>
              <!-- <el-table-column prop="icon" label="菜单图标">
                            <template slot-scope="scope5">
                                <Ic :icon="scope5.row['icon']" />
                            </template>
              </el-table-column>-->
              <el-table-column prop="menuName" label="菜单名称" align="center"></el-table-column>
              <el-table-column prop="path" label="菜单路径" align="center"></el-table-column>
              <el-table-column prop="orderNo" label="排序" align="center"></el-table-column>
              <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                 <template slot-scope="scope3">
                   <el-button size="mini" @click="handleEdit(scope3.$index, scope3.row)">编辑</el-button>
                  <el-button :loading="loading" size="mini" type="danger" @click="handleDel(scope3.$index, scope3.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>

        <el-table-column prop="id" label="ID" width="100" align="center"></el-table-column>
        <el-table-column prop="icon" label="菜单图标" align="center">
          <template slot-scope="scope5">
            <Ic :icon="scope5.row['icon']" />
          </template>
        </el-table-column>
        <el-table-column prop="menuName" label="菜单名称" align="center"></el-table-column>
        <el-table-column prop="path" label="菜单路径" align="center"></el-table-column>
        <el-table-column prop="orderNo" label="排序" align="center"></el-table-column>
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
      :parentData="parentData"
      :edit-data="editData"
      :showDialog="dialogFormVisible"
      v-on:hideAddDialog="hideDialog"
    />
  </div>
</template>
<script>
// icon 图标
import Ic from "./ic";
import Add from "./add.vue";

var ParentMenu = function(id, name) {
  this.id = id;
  this.name = name;
};
export default {
  components: { Ic, Add },
  data() {
    return {
      dbData: [],
      loading: false,
      editAble: false,
      title: "新增菜单",
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
        .dispatch("sys/menu/list")
        .then(res => {
          this.dbData = res.body;
          this.initParentData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.editAble = false;
      this.title = "新增菜单";
      this.editData = {};
    },
    handleEdit(index, row) {
      this.title = "编辑菜单";
      this.editAble = true;
      this.dialogFormVisible = true;
      this.editData = row;
    },
    // 删除
    handleDel(index, row) {
      this.loading = true;
      this.$confirm("您确定要删除 [" + row.menuName + "] 菜单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$store
            .dispatch("sys/menu/del", row)
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
    },

    initParentData() {
      if(this.parentData.length>0){
        this.parentData=[];
      }
      var rootMenu = new ParentMenu(0, "根节点(一级菜单)");
      this.parentData.push(rootMenu);
      for (var i = 0; i < this.dbData.length; i++) {
        var parentMenu = new ParentMenu(
          this.dbData[i].id,
          this.dbData[i].menuName + "(二级菜单)"
        );
        this.parentData.push(parentMenu);
      }
    }
  }
};
</script>
<style scoped>
</style>