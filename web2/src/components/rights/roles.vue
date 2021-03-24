<template>
  <el-card>
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-button class="addRoleBtn" type="primary">添加角色</el-button>
    <el-table border stripe :data="roleList" class="rightsTable">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="(item, index) in scope.row.children" :key="index">
            <el-col :span="4">
              <el-tag closable @close="deleteRight(scope.row, item.id)">{{
                item.authName
              }}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item1, index) in item.children" :key="index">
                <el-col :span="4">
                  <el-tag
                    closable
                    @close="deleteRight(scope.row, item1.id)"
                    type="warning"
                  >
                    {{ item1.authName }}
                  </el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-row>
                    <el-tag
                      @close="deleteRight(scope.row, item2.id)"
                      type="success"
                      closable
                      v-for="(item2, index) in item1.children"
                      :key="index"
                    >
                      {{ item2.authName }}
                    </el-tag>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scope.row.children.length === 0">未分配权限</span>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="150"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="200">
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="200">
      </el-table-column>
      <el-table-column label="操作">
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
            @click="showSetRightDialog(scope.row)"
            plain
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
      <el-tree
      ref="tree"
        :data="treeList"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="arrayCheck"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRight()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template><script>
export default {
  data() {
    return {
      roleList: [],
      treeList: [],
      arrayExpand: [],
      arrayCheck: [],
      currentRoleId: -1,
      defaultProps: {
        label: "authName",
        children: "children",
      },
      dialogFormVisibleRight: false,
      form: {},
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      const res = await this.$http.get("roles");
      console.log(res);
      this.roleList = res.data.data;
    },
    async deleteRight(role, rightId) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      console.log(res);
      role.children = res.data.data;
    },
    async showSetRightDialog(role) {
      this.dialogFormVisibleRight = true;
      this.currentRoleId = role.id
      const res = await this.$http.get(`rights/tree`);
      this.treeList = res.data.data;

      let arrayExpand = [];
      this.treeList.forEach((element) => {
        arrayExpand.push(element.id);
        element.children.forEach((element1) => {
          arrayExpand.push(element1.id);
          element1.children.forEach((element2) => {
            arrayExpand.push(element2.id);
          });
        });
      });
      this.arrayExpand = arrayExpand;

      let arrayCheck = [];
      role.children.forEach((element) => {
        // arrayCheck.push(element.id);
        element.children.forEach((element1) => {
        //   arrayCheck.push(element1.id);
          element1.children.forEach((element2) => {
            arrayCheck.push(element2.id);
          });
        });
      });
      this.arrayCheck = arrayCheck;
    },
    async setRoleRight(){
        let arr1 = this.$refs.tree.getCheckedKeys()
        
        let arr2 = this.$refs.tree.getHalfCheckedKeys()
        let arr = [...arr1, ...arr2]
        
        const res = await this.$http.post(`roles/${this.currentRoleId}/rights`, {
            rids: arr.join(',')
        })
        console.log(res)
        if(res.data.meta.status === 200){

        this.getRoleList()
        this.dialogFormVisibleRight = false
        }
    }
  },
};
</script>

<style scoped>
.rolesTable {
  overflow: auto;
  height: 250px;
  width: 100%;
}
.addRoleBtn {
  margin-top: 20px;
}
</style>