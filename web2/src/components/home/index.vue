<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="" alt="无法显示图片" />
          </div>
        </el-col>
        <el-col :span="18" class="middle">
          <h3>电商后台管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a class="loginout" @click.prevent="handleSignout()" href="#"
              >退出</a
            >
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-col>
          <el-menu :unique-opened="true" :router="true">
            <el-submenu
              :index="''+item1.order"
              :key="index"
              v-for="(item1, index) in menus"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item1.authName }}</span>
              </template>
              <el-menu-item
                :index="item2.path"
                v-for="(item2, index) in item1.children"
                :key="index"
              >
                <i class="el-icon-location"></i>
                <span>{{ item2.authName }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menus: [],
    };
  },
  beforeCreate() {
    let token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
    }
  },
  created() {
    this.getMenus();
  },
  methods: {
    handleSignout() {
      localStorage.clear();
      this.$message.success("退出成功");
      this.$router.push("/login");
    },
    async getMenus() {
      const res = await this.$http.get(`menus`);
      this.menus = res.data.data;
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
  height: 100%;
}
.middle {
  text-align: center;
  vertical-align: middle;
  display: inline-block;
}
.loginout {
  line-height: 60px;
  text-decoration: none;
}
</style>