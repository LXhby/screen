<template>
  <div class="to-title">{{ title }}</div>
</template>

<script>
export default {
  data() {
    return {
      title: ''
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
      const matched = this.$route.matched.filter(
        item => item.meta && item.meta.title
      )
      if (matched.length >= 2) {
        this.title = matched[1].meta.title
      } else {
        this.title = matched[0].meta.title
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.to-title {
  display: inline-block;
  line-height: 50px;
  font-size: 20px;
}
</style>
