<template>
  <div class="home-page">
    <full-page ref="fullpage" :options="options">
      <div class="section">
        <div class="home-container">
          <div class="home-box">
            <div class="big-box">
              <div class="left">
                <div class="left-one">
                  <div class="situa">
                    <h3>概况统计</h3>
                    <div class="detail">
                      <el-row type="flex" class="row-bg">
                        <el-col :span="6" class="sm-list list-one">
                          <div class="sm-title">捐助企业数</div>
                          <div class="num">{{ generalData.companyQuantity | formatNum }}</div>
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
                </div>
                <div class="left-two">
                  <div class="pro-static">
                    <div class="nav-top">
                      <h3>项目统计</h3>
                      <div class="nav-title">援助项目数据</div>
                    </div>

                    <div class="detail">
                      <el-row type="flex" class="row-title">
                        <el-col :span="6" class="sm-list">项目名</el-col>
                        <el-col :span="9" class="sm-list txt-center">受益人数</el-col>
                        <el-col :span="9" class="sm-list txt-center">发放物资价值</el-col>
                      </el-row>

                      <el-scrollbar wrap-class="scrollbar-wrapper">
                        <div class="list">
                          <el-row
                            v-for="(item, index) in projectData"
                            :key="index"
                            type="flex"
                            class="row-bg"
                          >
                            <el-col :span="6" class="sm-list">
                              {{
                                item.projectName
                              }}
                            </el-col>
                            <el-col :span="9" class="sm-list txt-center">
                              {{
                                item.patientQuantity | formatNum
                              }}
                            </el-col>
                            <el-col :span="9" class="sm-list txt-center">
                              {{
                                item.totalPrice | formatNum
                              }}
                            </el-col>
                          </el-row>
                        </div>
                      </el-scrollbar>
                    </div>
                  </div>
                </div>
              </div>
              <div class="center">
                <div class="center-top">医疗公益项目大数据</div>
                <div class="center-one">
                  <el-row type="flex" class="left">
                    <el-col :span="12">
                      <div class="one-item">
                        <h3 class="nav-title">受益人数</h3>
                        <div class="item-main">
                          <img src="../../../../static/img/7.png" alt>
                          <div class="num">{{ generalData.patientQuantity }}</div>
                        </div>
                      </div>
                      <div class="one-item tww">
                        <h3 class="nav-title">发放物资数</h3>
                        <div class="item-main">
                          <img src="../../../../static/img/7.png" alt>
                          <div class="num">{{ generalData.materialQuantity }}</div>
                        </div>
                      </div>
                      <div class="one-item">
                        <h3 class="nav-title">发放物资价值</h3>
                        <div class="item-main">
                          <img src="../../../../static/img/7.png" alt>
                          <div class="num">{{ generalData.totalPrice }}</div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12" />
                  </el-row>
                </div>
                <div class="quantityContol">
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
              </div>
              <div class="right">
                <div class="right-one">
                  <div class="today">
                    <div class="nav-top">
                      <h3>今日数据</h3>
                      <div class="nav-title">{{ new Date() | convertTime("YYYY/MM/DD") }}</div>
                    </div>
                    <el-row class="row-title">
                      <el-col :span="8">
                        <div class="all-num">
                          <div class="all-right">
                            {{ patientQuantity | formatNum }}
                            <span>人</span>
                          </div>
                          <div class="all-left">受益人数</div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="all-num two">
                          <div class="all-right">
                            {{ materialQuantity | formatNum }}
                            <span>件</span>
                          </div>
                          <div class="all-left left-two">发放物资数</div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="all-num">
                          <div class="all-right">
                            {{ totalPrice | formatNum }}
                            <span>元</span>
                          </div>
                          <div class="all-left left-third">发放物资价值</div>
                        </div>
                      </el-col>
                    </el-row>
                    <div class="detail">
                      <div class="h-ssm">项目患者实时数据</div>
                      <el-row type="flex" class="item-title">
                        <el-col :span="3" class="sm-list">时间</el-col>
                        <el-col :span="5" class="sm-list txt-center">项目名称</el-col>
                        <el-col :span="8" class="sm-list txt-center txt-center">地址</el-col>
                        <el-col :span="8" class="sm-list txt-center txt-center">详情</el-col>
                      </el-row>
                      <el-scrollbar wrap-class="scrollbar-wrapper">
                        <div class="row-bow">
                          <el-row
                            v-for="(item, index) in todayinfo"
                            :key="index"
                            type="flex"
                            class="row-bg"
                          >
                            <el-col :span="3" class="sm-list">{{ item.createdStr }}</el-col>
                            <el-col :span="5" class="sm-list">
                              {{
                                item.projectName
                              }}
                            </el-col>
                            <el-col :span="8" class="sm-list txt-center">{{ item.address }}</el-col>
                            <el-col :span="8" class="sm-list txt-center">
                              {{
                                item.receiveInfo
                              }}
                            </el-col>
                          </el-row>
                        </div>
                      </el-scrollbar>
                    </div>
                  </div>
                </div>
                <div class="right-two">
                  <div class="disease-static">
                    <div class="nav-top">
                      <h3>疾病类型统计</h3>
                      <div class="nav-title">援助药品疾病类型统计</div>
                    </div>
                    <div class="detail">
                      <div id="columnar" style="width: 100%; height: 300px" class="padding-box" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <Result />
      </div>
    </full-page>
  </div>
</template>

<script>
import { todaydatass, screendatass } from '@/api/datashow'
import Result from '@/views/datashow/results'
export default {
  name: 'HomeEditor',
  components: { Result },
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
      options: {
        // 整屏插件vue-fullpage选项
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        verticalCentered: true, // 定义每一页的内容是否垂直居中

        scrollBar: true // true则是一滚动就是一整屏
      },
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
</style>
