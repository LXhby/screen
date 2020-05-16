<template>
  <div class="bread-box">
    <div class="title">当前位置：</div>
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="item in levelList" :key="item.path">
          <span class="no-redirect">{{ item.meta.title }}</span>
          <!-- <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a> -->
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      const matched = this.$route.matched.filter(
        item => item.meta && item.meta.title
      )
      // const first = matched[0]

      // if (!this.isDashboard(first)) {
      //   matched = [
      //     { path: "/dashboard", meta: { title: "当前位置：Dashboard" } }
      //   ].concat(matched);
      // }

      this.levelList = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return (
        name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
      )
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      // const { redirect, path } = item
      // console.log('path', path)
      // if (redirect) {
      //   this.$router.push(redirect)
      //   return
      // }
      // this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.bread-box {
  width: $centerWidth;
  background: $mainBg;
  margin: 20px auto 0 auto;
  .title {
    display: inline-block;
    color: #fff;
    cursor: text;
    font-size: 14px;
    line-height: 40px;
    vertical-align: top;
  }
}
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 40px;
  vertical-align: top;
  .no-redirect {
    color: #fff;
    cursor: text;
  }
}
</style>
