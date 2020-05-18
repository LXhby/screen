<template>
  <div id="columtwo" class="line-chart" />
</template>

<script>
import echarts from 'echarts'
export default {
  props: ['lineData'],
  data() {
    return {}
  },
  watch: {
    lineData: {
      handler: function(val, oldval) {
        if (val.length) {
          this.monthnum()
        }
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    }
  },
  created() {
    console.log('lineData', this.lineData)
  },
  methods: {
    monthnum() {
      var option = {
        legend: {},
        tooltip: {},
        // title: {
        //   text: "年度同期合格率",
        //   textStyle: {
        //     align: "center",
        //     color: "#fff",
        //     fontSize: 12
        //   },
        //   top: -6,
        //   left: "0"
        // },
        grid: {
          bottom: 20,
          top: '12%',
          right: 10
        },
        dataset: {
          // 提供一份数据。
          source: this.lineData
        },
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        },
        // 声明一个 Y 轴，数值轴。
        yAxis: {
          axisLine: {
            show: false
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.7)',
            textStyle: {
              fontSize: 12
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.2)'
            }
          }
        },
        series: [
          {
            type: 'line',
            name: '',
            encode: {
              x: 'month',
              // 将 "product" 列映射到 Y 轴。
              y: 'sampleNum'
            },
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: '#8667FF',
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0
                // shadowOffsetY: 5,
                // shadowOffsetX: 5
              }
            },
            itemStyle: {
              color: '#8667FF',
              borderColor: '#fff',
              borderWidth: 1,
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowBlur: 0
              // shadowOffsetY: 2,
              // shadowOffsetX: 2
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(108,80,243,0.3)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(108,80,243,0)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(108,80,243, 0.9)',
                shadowBlur: 20
              }
            }
          }
        ]
      }

      this.$nextTick(() => {
        const myChart = this.$echarts.init(
          document.getElementById('columtwo'),
          'light'
        )
        myChart.setOption(option)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.line-chart {
  width: 350px;
  height: 320px;
  margin: auto;
}
</style>
