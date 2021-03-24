<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <my-bread level1="权限管理" level2="权限列表"></my-bread> -->
</template>
<script>
export default {
    name: 'my-bread',
    props: ['level1', 'level2']
}
</script>
<style scoped>

</style>