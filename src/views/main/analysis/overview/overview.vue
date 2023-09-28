<template>
  <div class="overview">
    <el-card class="box-card">
      <h4>简介</h4>
      <span>
        Geeker-Admin 一款基于 Vue3、TypeScript、Vite4、Pinia、Element-Plus 开发的后台管理系统
      </span>
      <br />
      <span>
        本项目实现了动态路由功能，根据获取的该用户菜单数据，注册相对应的路由并显示在界面上
      </span>
    </el-card>
    <h4>技术栈介绍</h4>

    <el-table class="box-table" :data="tableData" border style="width: 100%" :show-header="false">
      <el-table-column prop="AA" label="AA" width="400" align="center" />
      <el-table-column prop="BB" label="BB" width="400" align="center" />
      <el-table-column prop="CC" label="CC" width="400" align="center" />
      <el-table-column prop="DD" label="DD" width="400" align="center" />
    </el-table>
    <el-timeline>
      <el-timeline-item timestamp="2023/9/28" placement="top">
        <el-card>
          <h4>搜索框的抽取</h4>
          <p>实现了搜索框的抽取，确定了整体的项目范围</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2023/9/24" placement="top">
        <el-card>
          <h4>动态路由，用户管理界面的搭建，后端数据的获取</h4>
          <p>实现了表头查询，表单显示，按钮删除，用户新建，数据分页</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2023/9/23" placement="top">
        <el-card>
          <h4>后端多重菜单数据接口拼接和前端动态路由搭建</h4>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2023/9/22" placement="top">
        <el-card>
          <h4>mock数据方案和node后端方案的尝试</h4>
          <p>在mock尝试多次无法满足动态数据的情况，开始搭建后端项目</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2023/9/21" placement="top">
        <el-card>
          <h4>项目搭建-前端登录界面及接口</h4>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script setup lang="ts">
const aa = '开发工具'
const tableData = [
  {
    AA: '开发工具：',
    BB: 'webStorm',
    CC: '编程语言:',
    DD: 'TS+JS'
  },
  {
    AA: '前端框架',
    BB: 'Vue3.x + setup',
    CC: '路由工具：',
    DD: 'Vue Router 4.x'
  },

  {
    AA: '状态管理:',
    BB: 'Pinia',
    CC: 'UI框架:',
    DD: 'Element Plus'
  },
  {
    AA: 'Http工具',
    BB: 'Axios',
    CC: '代码规范：',
    DD: 'Prettier+ESLint'
  },
  {
    AA: '后端语言:',
    BB: 'Node',
    CC: '后端框架',
    DD: 'Koa'
  },
  {
    AA: '数据库',
    BB: 'MySQL',
    CC: '项目版本',
    DD: '0.0.3'
  },

  {
    AA: '前端项目地址:',
    BB: 'https://github.com/hero233-li/vue3G',
    CC: '后端项目地址',
    DD: 'https://github.com/hero233-li/vue3G_mysql'
  }
]
</script>

<style scoped>
.box-card,
.box-table {
  margin-bottom: 20px;
}
.box-table {
  display: flex;
  justify-content: center;
}
</style>
