<template>
  <div class="echarts">
    <div ref="myEchart" class="map-box" />
  </div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js' // 引入中国地图数据
export default {
  props: ['mapData'],
  data() {
    return {
      MyMapData: [] // echart Map Data
    }
  },
  watch: {
    MapData(val) {
      this.MyMapData = []
      val.forEach(ele => {
        const obj = {
          name: ele.province,
          value: ele.patientQuantity
        }
        this.MyMapData.push(obj)
      })
      this.initEchartMap()
      // { name: "北京", value: Math.random() * 50000 },
    }
  },
  mounted() {
    this.initEchartMap()
  },
  methods: {
    initEchartMap() {
      // 这里我们用固定的数据，真正使用时，用父组件传递来的数据替换series即可
      const myChart = echarts.init(this.$refs.myEchart)
      // window.onresize = myChart.resize;
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            if (params.value) {
              return params.name + ': ' + params.value + '人'
            }
            return params.name + ': 0人'
          },
          itemSize: '14px'
        },
        // legend: {
        //   bottom: 200
        // },
        // grid: {
        //   right: "5%",
        //   top: "5%",
        //   bottom: "10%"
        // },
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
            top: '5%',
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
            data: this.MyMapData // 各省地图颜色数据依赖value
          }
        ],
        dataRange: {
          x: 'left',
          y: 'bottom',
          padding: [200, 0, 0, 50],
          splitList: [
            {
              start: 30000,
              end: 50000,
              label: '30000-50000人',
              color: '#2579D7'
            },
            {
              start: 20000,
              end: 30000,
              label: '20000-30000人',
              color: '#32B5DD'
            },
            {
              start: 10000,
              end: 20000,
              label: '10000-20000人',
              color: '#99D672'
            },
            {
              start: 5000,
              end: 10000,
              label: '5000-10000人',
              color: '#D5D83A'
            },
            { start: 0, end: 5000, label: '0-5000人', color: '#E0E5C1' }
          ],
          textStyle: {
            color: '#fff',
            fontSize: 9
          }
        } // 各省地图颜色；start：值域开始值；end：值域结束值；label：图例名称；color：自定义颜色值；
      })
      setTimeout(function() {
        window.onresize = function() {
          myChart.resize()
        }
      }, 200)
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
