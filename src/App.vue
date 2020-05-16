<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  created() {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem('store'))
        )
      )
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="scss">
body {
  font-family: PingFangSC-Regular, PingFang SC;
  background-color: #01193c;
  font-size: 18px;
}

.el-table__header {
  width: 100% !important;
}

.el-table__body {
  width: 100% !important;
}

.gutter {
  display: table-cell !important;
}
.common-content {
  box-sizing: border-box;
  width: 1340px;
  height: 100%;
  margin: auto;
  .block-line {
    box-sizing: border-box;
    flex: 1;
    height: 100%;
    overflow: auto;
    padding-bottom: 20px;
    padding-top: 20px;
    padding-right: 100px;
    padding-left: 4px;
  }
}
</style>
