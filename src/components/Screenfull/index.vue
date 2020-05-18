<template>
  <div class="sc-box">
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="click"
    />
    <i class="el-icon-switch-button svg-logout-icon" @click="logout" />
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
      console.log('this.isFullscreen', this.isFullscreen)
      this.$store.commit('app/getisFullscreen', this.isFullscreen)
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
        this.$store.commit('app/getisFullscreen', this.isFullscreen)
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
        this.$store.commit('app/getisFullscreen', this.isFullscreen)
      }
    },
    async logout() {
      await this.$confirm('退出后将返回登录页', '是否退出当前系统', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('user/logout').then(res => {
            this.$store.dispatch('tagsView/delAllViews').then(res => {
              this.$message({
                message: '退出成功',
                type: 'success'
              })
              this.$router.push(`/login`)
            })
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped>
.sc-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.svg-icon {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;

  /* vertical-align: 10px; */
  font-size: 20px;
}
.svg-logout-icon {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-left: 20px;
  /* line-height: 70px; */
}
</style>
