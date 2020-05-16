<template>
  <div class="home-container">
    <h1>医疗公益项目大数据</h1>
    <el-row type="flex" class="row-bg">
      <el-col :span="6" class="col-bg left">
        <div class="main-left">
          <div class="situa">
            <h3>概况统计</h3>
            <div class="detail">
              <el-row type="flex" class="row-bg">
                <el-col :span="6" class="sm-list">
                  <div class="item item1">
                    <div class="sm-title">捐助企业数</div>
                    <div class="num">{{ generalData.companyQuantity | formatNum }}</div>
                  </div>
                </el-col>
                <el-col :span="6" class="sm-list">
                  <div class="item item1">
                    <div class="sm-title">公益医院数</div>
                    <div class="num">{{ generalData.hospitalQuantity | formatNum }}</div>
                  </div>
                </el-col>
                <el-col :span="6" class="sm-list">
                  <div class="item item1">
                    <div class="sm-title">公益药房数</div>
                    <div class="num">{{ generalData.drugstoreQuantity | formatNum }}</div>
                  </div>
                </el-col>
                <el-col :span="6" class="sm-list">
                  <div class="item item1">
                    <div class="sm-title">覆盖疾病类型</div>
                    <div class="num">{{ generalData.diseaseQuantity | formatNum }}</div>
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg">
                <el-col :span="6" class="sm-list">
                  <div class="item">
                    <div class="sm-title">公益医生数</div>
                    <div class="num">{{ generalData.doctorQuantity | formatNum }}</div>
                  </div>
                </el-col>
                <el-col :span="6" class="sm-list">
                  <div class="item">
                    <div class="sm-title">公益药师数</div>
                    <div class="num">{{ generalData.druggistQuantity | formatNum }}</div>
                  </div>
                </el-col>
                <el-col :span="6" class="sm-list">
                  <div class="item">
                    <div class="sm-title">公益专员数</div>
                    <div class="num">{{ generalData.commissionerQuantity | formatNum }}</div>
                  </div>
                </el-col>
                <el-col :span="6" class="sm-list">
                  <div class="item">
                    <div class="sm-title">公益护士数</div>
                    <div class="num">{{ generalData.nurseQuantity | formatNum }}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="pro-static">
            <h3>项目统计</h3>
            <div class="detail">
              <div class="h-ssm">援助项目数据</div>
              <el-row type="flex" class="row-bg">
                <el-col :span="6" class="sm-list">项目名</el-col>
                <el-col :span="9" class="sm-list">受益人数</el-col>
                <el-col :span="9" class="sm-list">发放物资价值</el-col>
              </el-row>
              <el-row v-for="(item, index) in projectData" :key="index" type="flex" class="row-bg">
                <el-col :span="6" class="sm-list">
                  {{
                    item.projectName
                  }}
                </el-col>
                <el-col :span="9" class="sm-list">
                  {{
                    item.patientQuantity | formatNum
                  }}
                </el-col>
                <el-col :span="9" class="sm-list">
                  {{
                    item.totalPrice | formatNum
                  }}
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="col-bg left">
        <div style="padding:0 20px;" class="quantityContol">
          <div class="city-box" />
          <h3>质控数据</h3>
          <div class="detail">
            <el-row type="flex">
              <el-col :span="12">
                <div id="columfirst" class="padding-box" />
              </el-col>
              <el-col :span="12">
                <div id="columtwo" class="padding-box" />
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="col-bg left">
        <div class="main-right">
          <div class="today">
            <h3>今日数据</h3>
            <div class="detail">
              <div class="all-num">
                <div class="all-left">受益人数</div>
                <div class="all-right">{{ patientQuantity | formatNum }}人</div>
              </div>
              <div class="all-num">
                <div class="all-left">发放物资价值</div>
                <div class="all-right">{{ totalPrice | formatNum }}元</div>
              </div>
              <div class="all-num">
                <div class="all-left">发放物资数</div>
                <div class="all-right">{{ materialQuantity | formatNum }}</div>
              </div>
              <div class="h-ssm">项目患者实时数据</div>
              <el-row v-for="(item, index) in todayinfo" :key="index" type="flex" class="row-bg">
                <el-col :span="4" class="sm-list">11</el-col>
                <el-col :span="4" class="sm-list">
                  {{
                    item.projectName
                  }}
                </el-col>
                <el-col
                  :span="8"
                  class="sm-list"
                >{{ item.province }}{{ item.city }}{{ item.address }}</el-col>
                <el-col :span="8" class="sm-list">
                  {{
                    item.receiveInfo
                  }}
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="disease-static">
            <h3>疾病类型统计</h3>
            <div class="detail">
              <div id="columnar" style="width: 100%; height: 300px" class="padding-box" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { todaydatass, screendatass } from '@/api/datashow'
export default {
  name: 'HomeEditor',
  filters: {
    formatNum(val) {
      if (val) {
        val = Math.round(val)
        val = val.toString()
        var re = /(?=(?!\b)(\d{3})+$)/g
        val = val.replace(re, ',')
        return val
      } else {
        return 0
      }
    }
  },
  data() {
    return {
      todayinfo: [],
      projectData: [],
      generalData: {},
      patientQuantity: '',
      materialQuantity: '',
      totalPrice: '',
      quantityContolData: []
    }
  },
  created() {
    this.initData()
  },
  mounted() {
    this.showColumnar() // 初始化柱状图标
  },
  methods: {
    initData() {
      todaydatass().then(res => {
        if (res.data.todayReceiveInfos) {
          this.todayinfo = res.data.todayReceiveInfos
          this.patientQuantity = res.data.patientQuantity
          this.materialQuantity = res.data.materialQuantity
          this.totalPrice = res.data.totalPrice
        }
      })
      screendatass().then(res => {
        this.generalData = res.data.generalData
        this.projectData = res.data.projectData
        this.quantityContolData = res.data.quantityContolData
        this.monthrate()
        this.monthnum()
      })
    },
    showColumnar() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(
        document.getElementById('columnar'),
        'light'
      )
      console.log('myChart', myChart)
    },
    monthrate() {
      var option = {
        legend: {},
        tooltip: {},
        dataset: {
          // 提供一份数据。
          source: this.quantityContolData
        },
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: { type: 'category', boundaryGap: false },
        // 声明一个 Y 轴，数值轴。
        yAxis: {},
        series: [
          {
            type: 'line',
            areaStyle: {},
            name: '月度合格率',
            encode: {
              x: 'month',
              // 将 "product" 列映射到 Y 轴。
              y: 'passRate'
            }
          }
        ]
      }
      this.$nextTick(() => {
        const myChart = this.$echarts.init(
          document.getElementById('columfirst'),
          'light'
        )
        myChart.setOption(option)
      })
    },
    monthnum() {
      var option = {
        legend: {},
        tooltip: {},
        dataset: {
          // 提供一份数据。
          source: [
            {
              month: '2月',
              passRate: 2,
              sampleNum: 23
            },
            {
              month: '3月',
              passRate: 4,
              sampleNum: 26
            },
            {
              month: '4月',
              passRate: 4,
              sampleNum: 21
            },
            {
              month: '5月',
              passRate: 8,
              sampleNum: 20
            }
          ]
        },
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: { type: 'category', boundaryGap: false },
        // 声明一个 Y 轴，数值轴。
        yAxis: {},
        series: [
          {
            type: 'line',
            name: '月度样本数',
            encode: {
              x: 'month',
              // 将 "product" 列映射到 Y 轴。
              y: 'sampleNum'
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
.home-container {
  box-sizing: border-box;
  min-width: 1360px;
  height: 100%;
  padding: 20px;
  background: #01032a;
  color: #fff;
  h1 {
    color: #64a6e6;
    text-align: center;
  }
  .h-ssm {
    font-weight: bold;
    font-size: 14px;
  }
  .detail {
    padding: 10px;
    border: solid 2px #1a3f72;
    background: #071139;
    font-weight: bold;
    border-radius: 5px;
    .sm-title {
      font-size: 14px;
    }
    .num {
      margin-top: 15px;
      font-size: 20px;
    }
    .item1 {
      margin-bottom: 15px;
    }
  }
  .pro-static {
    margin-top: 30px;
    font-size: 12px;
    h3 {
      font-size: 19px;
    }
    // .h-ssm {
    //   margin-bottom: 20px;
    // }
    .sm-list {
      margin-top: 20px;
    }
  }
  .today {
    .sm-list {
      margin-top: 20px;
      font-size: 12px;
    }
    .all-num {
      display: flex;
      font-size: 16px;
      line-height: 30px;
      font-weight: bold;
      .all-left {
        width: 120px;
        margin-right: 20px;
        text-align: right;
      }
    }
    .h-ssm {
      margin-top: 20px;
    }
  }
  .quantityContol {
    height: 324px;
    box-sizing: border-box;
  }
  .disease-static {
    height: 324px;
    box-sizing: border-box;
  }
  #columfirst {
    width: 300px;
    height: 260px;
  }
  #columtwo {
    width: 300px;
    height: 260px;
  }
}
</style>
