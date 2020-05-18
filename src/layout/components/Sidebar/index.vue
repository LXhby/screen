<template>
  <div :class="{ 'has-logo': showLogo }">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <img
        src="../../../../static/img/logo.png"
        alt
        class="logoimg"
        @click="gohome"
      >
      <div class="nav-toplist">
        <el-menu
          router
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :default-active="activeMenu"
          :active-text-color="variables.menuActiveText"
          class="zd-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item class="zd-menu-item" index="/">成果展示</el-menu-item>
          <el-submenu index="2" class="zd-submenu">
            <template
              slot="title"
            >风貌展示</template>
            <el-menu-item index="/datashow/history">历史记录</el-menu-item>
            <el-menu-item index="/datashow/train">培训展示</el-menu-item>
            <el-menu-item index="/datashow/perform">项目执行</el-menu-item>
            <el-menu-item index="/datashow/construction">团队建设</el-menu-item>
          </el-submenu>
          <el-menu-item
            index="/online/onscene"
            class="zd-menu-item"
          >连线现场</el-menu-item>
        </el-menu>
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import Screenfull from '@/components/Screenfull'
export default {
  components: { Screenfull },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar', 'link', 'isFullscreen']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return {
      activeIndex: 'home'
    }
  },
  created() {
    this.activeIndex = this.$route.name
    console.log('this.is', this.$route.path)
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
      this.$router.push({ name: key })
    },
    gohome() {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
<style lang="scss">
.el-scrollbar__view {
  position: relative;
}
.logoimg {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 58px;
  margin-left: 75px;
}
</style>
