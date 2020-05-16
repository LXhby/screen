<template>
  <div class="zbcommon-content">
    <video id="myVideo" class="video-js">
      <source src="https://yiidev.cn/hls/test/index.m3u8" type="application/x-mpegURL4">
    </video>
  </div>
</template>

<script>
export default {
  mounted() {
    this.initVideo()
  },
  methods: {
    initVideo() {
      // 初始化视频方法
      const myPlayer = this.$video('#myVideo', {
        // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        // 自动播放属性,muted:静音播放
        autoplay: 'muted',
        // 建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: 'auto',
        // 设置视频播放器的显示宽度（以像素为单位）
        width: '1226px',
        // 设置视频播放器的显示高度（以像素为单位）
        height: '400px'
      })
      console.log('myPlayer', myPlayer)
    }
  }
}
</script>

<style lang="scss" scoped>
.zbcommon-content {
  overflow: auto;
  padding-bottom: 20px;
}
.video-js {
  margin: 0 auto;
  width: 1340px;
  height: 754px;
  background: #021530;
  border: none;
}
</style>
