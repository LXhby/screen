<template>
  <div class="echarts">
    <div ref="myEchart" class="map-box" />
  </div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js' // 引入中国地图数据
export default {
  data() {
    return {}
  },
  mounted() {
    this.initEchartMap()
  },
  methods: {
    initEchartMap() {
      // 这里我们用固定的数据，真正使用时，用父组件传递来的数据替换series即可
      const myChart = echarts.init(this.$refs.myEchart)
      window.onresize = myChart.resize
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}',
          itemSize: '14px'
        },
        series: [
          {
            type: 'map',
            mapType: 'china',
            label: {
              normal: {
                show: false, // 显示省份标签
                textStyle: {
                  color: 'blue'
                } // 省份标签字体颜色
              },
              emphasis: {
                // 对应的鼠标悬浮效果
                show: false,
                textStyle: {
                  color: '#800080'
                }
              }
            },
            aspectScale: 0.75,
            zoom: 1.2,
            itemStyle: {
              normal: {
                borderWidth: 0.5, // 区域边框宽度
                borderColor: '#009fe8', // 区域边框颜色
                areaColor: '#ffefd5' // 区域颜色
              },
              emphasis: {
                borderWidth: 0.5,
                borderColor: '#4b0082',
                areaColor: '#ffdead'
              }
            },
            data: [
              { name: '北京', value: Math.random() * 50000 },
              { name: '天津', value: Math.random() * 50000 },
              { name: '上海', value: Math.random() * 50000 },
              { name: '重庆', value: Math.random() * 50000 },
              { name: '河北', value: Math.random() * 50000 },
              { name: '河南', value: Math.random() * 50000 },
              { name: '云南', value: Math.random() * 50000 },
              { name: '辽宁', value: Math.random() * 50000 },
              { name: '黑龙江', value: Math.random() * 50000 },
              { name: '湖南', value: Math.random() * 50000 },
              { name: '安徽', value: Math.random() * 50000 },
              { name: '山东', value: Math.random() * 50000 },
              { name: '新疆', value: Math.random() * 50000 },
              { name: '江苏', value: Math.random() * 50000 },
              { name: '浙江', value: Math.random() * 50000 },
              { name: '江西', value: Math.random() * 50000 },
              { name: '湖北', value: Math.random() * 50000 },
              { name: '广西', value: Math.random() * 50000 },
              { name: '甘肃', value: Math.random() * 50000 },
              { name: '山西', value: Math.random() * 50000 },
              { name: '内蒙古', value: Math.random() * 50000 },
              { name: '陕西', value: Math.random() * 50000 },
              { name: '吉林', value: Math.random() * 50000 },
              { name: '福建', value: Math.random() * 50000 },
              { name: '贵州', value: Math.random() * 50000 },
              { name: '广东', value: Math.random() * 50000 },
              { name: '青海', value: Math.random() * 50000 },
              { name: '西藏', value: Math.random() * 50000 },
              { name: '四川', value: Math.random() * 50000 },
              { name: '宁夏', value: Math.random() * 50000 },
              { name: '海南', value: Math.random() * 50000 },
              { name: '台湾', value: Math.random() * 50000 },
              { name: '香港', value: Math.random() * 50000 },
              { name: '澳门', value: Math.random() * 50000 }
            ] // 各省地图颜色数据依赖value
          }
        ],
        dataRange: {
          x: 'left',
          y: 'bottom',
          splitList: [
            { start: 30000, end: 50000, color: '#2579D7' },
            { start: 20000, end: 30000, color: '#32B5DD' },
            { start: 10000, end: 20000, color: '#99D672' },
            { start: 5000, end: 10000, color: '#D5D83A' },
            { start: 0, end: 5000, color: '#E0E5C1' }
          ]
        } // 各省地图颜色；start：值域开始值；end：值域结束值；label：图例名称；color：自定义颜色值；
      })
    }
  }
}
</script>
<style scoped lang="scss">
.echarts {
  width: 437px;
  height: 400px;
  .map-box {
    width: 100%;
    height: 100%;
  }
}
</style>
