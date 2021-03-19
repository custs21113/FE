<template>
  <el-card class="box-card">
    <!-- 1.面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2.搜索 -->
    <el-row class="searchRow">
      <el-col>
        <el-input
          clearable
          @clear="getUserList"
          placeholder="请输入内容"
          v-model="query"
          class="inputSearch"
        >
          <el-button
            @click="searchUser()"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-button type="success" @click="showAddUserDialog()"
          >添加用户</el-button
        >
      </el-col>
    </el-row>
    <!-- 3.表格 -->
    <el-table :data="userList" style="width: 100%">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="username" label="姓名"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_time | fmtdate }}
        </template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13c366"
            inactive-color="#ff4949"
            @change="changeMgState(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="showEditUserDialog(scope.row)"
            plain
            circle
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            plain
            circle
            @click="showDeleteUserMsgBox(scope.row.id)"
          ></el-button>
          <el-button
            size="mini"
            type="success"
            icon="el-icon-check"
            @click="showSetUserRoleDialog(scope.row)"
            plain
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 4.分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input
            v-model="form.username"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
  <el-form :model="form">
    <el-form-item label="用户名" label-width="100px">
      {{ currentUsername|| "当前角色用户名"}}--{{currentRoleId}}
    </el-form-item>
    <el-form-item label="角色" label-width="100px">
      <el-select v-model="currentRoleId">
        <el-option label="请选择" :value="-1"></el-option>
        <el-option v-for="(item, index) in roleList" :key= index :label="item.roleName" :value="item.id" ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
    <el-button type="primary" @click="setRole()">确 定</el-button>
  </div>
</el-dialog>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 8,
      total: -1,
      currentUsername: '',
      currentRoleId:-1,
      currentUserId:-1,
      userList: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      roleList: [],
      form: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      editForm: {
        id: "",
        email: "",
        mobile: "",
      },
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      this.$http.defaults.headers.common[
        "Authorization"
      ] = localStorage.getItem("token");
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      console.log(res);
      const {
        meta: { status, msg },
        data: { users, total },
      } = res.data;
      if (status === 200) {
        this.userList = users;
        this.total = total;
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      // this.pagenum = 1
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getUserList();
    },
    searchUser() {
      this.getUserList();
    },
    async addUser() {
      this.$http.defaults.headers.common[
        "Authorization"
      ] = localStorage.getItem("token");
      this.dialogFormVisibleAdd = false;
      const res = await this.$http.post("users", this.form);
      const {
        meta: { msg, status },
        data,
      } = res.data;
      if (status === 201) {
        this.$message.success(msg);
        this.getUserList();
        this.form = {};
        console.log(data);
      } else {
        this.$message.warning(msg);
      }
      this.dialogFormVisibleAdd = false
    },
    showDeleteUserMsgBox(userId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${userId}}`);
          const {
            meta: { msg, status },
          } = res.data;
          if (status === 200) {
            this.pagenum = 1;
            this.getUserList();
            this.$message({
              type: "success",
              message: msg,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    showAddUserDialog(){
      this.dialogFormVisibleAdd = true
      this.from = {}
    },
    showEditUserDialog(user) {
      this.dialogFormVisibleEdit = true;
      this.form = user;
      this.currentUserId = user.id;
    },
    async editUser() {
      const res = await this.$http.put(`users/${this.form.id}`, this.form);
      const {
        meta: { msg, status },
      } = res.data;
      if (status === 200) {
        this.getUserList();
        this.$message.success(msg);
      } else {
        this.getUserList();
        this.$message.warning(msg);
      }
        this.dialogFormVisibleEdit = false;
      this.form = {};
    },
    async changeMgState(user) {
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      const {
        meta: { msg, status },
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    },
    async showSetUserRoleDialog (user) {
      this.$http.defaults.headers.common[
        "Authorization"
      ] = localStorage.getItem("token");
      this.dialogFormVisibleRole = true
      // this.form = user
      this.currentUsername = user.username
      this.currentUserId = user.id
      // this.currentRoleId = user.role_name
      const res = await this.$http.get('roles')
      const res1 = await this.$http.get(`users/${user.id}`)
      console.log(res1);
      this.currentRoleId = res1.data.data.rid;
      this.roleList = res.data.data
    },
    async setRole() {
      console.log(this.form)
      const res = await this.$http.put(`users/${this.currentUserId}/role`,{
        rid: this.currentRoleId
      })
      const { meta: {msg, status} } = res.data

      console.log(res)
      // const { meta: {msg, status}} = res.data.data
      if (status === 200) {
        this.$message.success(msg);
        this.dialogFormVisibleRole = false

      } else {
        this.$message.warning(msg);
      }
      this.form = {}
    }
  },
};
</script>
<style scoped>
.box-card {
  height: 100%;
}
.searchRow {
  margin-top: 20px;
}
.inputSearch {
  width: 300px;
}
</style>