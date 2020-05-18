<template>
  <div class="echarts">
    <div ref="myEchart" class="scc" />
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  props: ['scatterData'],
  data() {
    return {
      MyScatterData: []
    }
  },
  watch: {
    ScatterData(val) {
      this.MyScatterData = []
      val.forEach(ele => {
        const arr = [
          Math.round(ele.patientQuantity / 10000),
          Math.round(ele.totalPrice / 10000),
          ele.patientQuantity,
          ele.projectName,
          ele.projectFullname
        ]
        this.MyScatterData.push(arr)
      })
      this.$nextTick(() => {
        this.initEchartMap()
      })

      console.log(this.MyScatterData)
      // [
      //   [28604, 77, 17096869, "Australia", 1990],
      //   [31163, 77.4, 27662440, "Canada", 1990],
      //   [1516, 68, 1154605773, "China", 1990],
      //   [13670, 74.7, 10582082, "Cuba", 1990],
      //   [28599, 75, 4986705, "Finland", 1990],
      //   [29476, 77.1, 56943299, "France", 1990],
      //   [31476, 75.4, 78958237, "Germany", 1990],
      //   [28666, 78.1, 254830, "Iceland", 1990],
      //   [1777, 57.7, 870601776, "India", 1990],
      //   [29550, 79.1, 122249285, "Japan", 1990],
      //   [2076, 67.9, 20194354, "North Korea", 1990],
      //   [12087, 72, 42972254, "South Korea", 1990],
      //   [24021, 75.4, 3397534, "New Zealand", 1990],
      //   [43296, 76.8, 4240375, "Norway", 1990],
      //   [10088, 70.8, 38195258, "Poland", 1990],
      //   [19349, 69.6, 147568552, "Russia", 1990],
      //   [10670, 67.3, 53994605, "Turkey", 1990],
      //   [26424, 75.7, 57110117, "United Kingdom", 1990],
      //   [37062, 75.4, 252847810, "United States", 1990])
      // ];
    }
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
        title: {
          left: 20,
          top: 'middle',
          text: '   捐\n   助\n   患\n   者\n   金\n   额\n   数\n(万元)',
          textStyle: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'normal'
          },
          subtext: '捐助患者数(万人)',
          subtextStyle: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'normal'
          }
        },
        grid: {
          top: '5%',
          left: '25%',
          right: '10%'
        },
        // visualMap: {
        //   right: 0,
        //   min: 0,
        //   max: 9000,
        //   dimension: 2,
        //   itemWidth: 10,
        //   itemHeight: 80,
        //   calculable: true,
        //   inRange: {
        //     color: ["#FF7900", "#FE44A9", "#00C7FF", "#6C46FF"],
        //     symbolSize: [20, 60]
        //   },
        //   text: ["高", "低"],
        //   textStyle: {
        //     color: "blue"
        //   }
        // },
        xAxis: {
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.2)'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
              color: 'rgba(255,255,255,.2)'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: '12'
            }
          },
          color: '#fff'
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: 'solid',
              color: 'rgba(255,255,255,.2)'
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.2)'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: '12'
            }
          },

          scale: true
        },
        series: [
          {
            type: 'scatter',
            symbolSize: function(data) {
              return Math.sqrt(data[2]) / 5e2
            },
            label: {
              normal: {
                show: true,
                formatter: function(param) {
                  return param.data[3]
                }
              },
              emphasis: {
                show: true,
                formatter: function(param) {
                  return param.data[3]
                },
                position: 'top'
              }
            },
            itemStyle: {
              type: 'radial',
              x: 0.4,
              y: 0.3,
              r: 1,
              shadowBlur: 10,
              shadowColor: 'rgba(120, 36, 50, 0.5)',
              shadowOffsetY: 5,
              colorStops: [
                {
                  offset: 0,
                  color: 'yellow' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'yellow' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            },
            data: [
              [28604, 77, 17096869, 'Australia', 1990],
              [31163, 77.4, 27662440, 'Canada', 1990]
            ]
          }
        ]
      })
    }
  }
}
</script>
<style scoped lang="scss">
.echarts {
  width: 500px;
  height: 300px;
  .scc {
    width: 100%;
    height: 100%;
  }
}
</style>
