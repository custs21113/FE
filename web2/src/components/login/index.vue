<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formdata"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="formdata.password" type="password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handleLogin()" class="login-btn" type="primary"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        password: "",
        username: "",
      },
    };
  },
  methods: {
    async handleLogin() {
      const res = await this.$http.post("login", this.formdata);
      console.log(res);
      const { data, meta: { msg, status } } = res.data;
      if (status === 200) {
        localStorage.setItem('token', data.token)
        this.$router.push("/");
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
      // alert("submit!");
      // this.$router.push('/')
    },
  },
};
</script>

<style scoped>
.login-wrap {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  width: 360px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
}
.login-content {
  padding: 30px 30px;
}
.login-wrap .login-btn {
  text-align: center;
  width: 100%;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>