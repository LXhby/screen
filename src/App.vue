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
  background-color: #021530;
  font-size: 18px;
}
p {
  margin: 0;
}

::-webkit-scrollbar {
  display: none;
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
.zbcommon-content {
  box-sizing: border-box;
  width: 1340px;
  height: 100%;
  margin: auto;
}
</style>
