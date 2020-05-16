<template>
  <div class="scrool-line">
    <img src="../../../static/img/angle.png" alt="" class="angle">
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.scrool-line {
  position: relative;
  width: 2px;
  height: 400px;
  background: rgba(160, 181, 204, 0.4);
  .angle {
    position: absolute;
    width: 13px;
    height: 16px;
    right: 2px;
    top: 0px;
  }
}
</style>
