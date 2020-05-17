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

                      <vue-seamless-scroll
                        :data="projectData"
                        class="seamless-warp"
                        :class-option="optionSingleHeightTime"
                      >
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
                      </vue-seamless-scroll>
                    </div>
                  </div>
                </div>
              </div>
              <div class="center">
                <div class="center-top">医疗公益项目大数据</div>
                <div class="center-one">
                  <el-row type="flex" class="left">
                    <el-col :span="10">
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
                    <el-col :span="14">
                      <Map :map-data="projProvinceData" style="width:400px;height:400px;" />
                    </el-col>
                  </el-row>
                </div>
                <div class="quantityContol">
                  <h3>质控数据</h3>

                  <div class="detail">
                    <el-row type="flex" class="detail-box">
                      <el-col :span="12" class="col-box">
                        <h4>月度合格率</h4>
                        <Lineone :line-data="quantityContolData" />
                      </el-col>
                      <el-col :span="12" class="col-box">
                        <h4>年度同期合格率</h4>
                        <Lines :line-data="quantityContolData" />
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
                      <vue-seamless-scroll
                        :data="projectData"
                        class="seamless-warp"
                        :class-option="optionSingleHeightTime"
                      >
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
                      </vue-seamless-scroll>
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
                      <!-- <div id="columnar" style="width: 100%; height: 300px" class="padding-box" /> -->
                      <Scatter />
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
import Map from '../components/Map'
import Scatter from '../components/Scatter'
import Lines from '../components/Line'
import Lineone from '../components/Lineone'
export default {
  name: 'HomeEditor',
  components: { Result, Map, Scatter, Lines, Lineone },
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
      quantityContolData: [],
      projProvinceData: [] // Map数据
    }
  },
  computed: {
    optionSingleHeightTime() {
      return {
        // singleHeight: 24,
        waitTime: 4000
      }
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
        console.log('this.quantityContolData', this.quantityContolData)
        // this.monthrate();
        // this.monthnum();
      })
    },
    showColumnar() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(
        document.getElementById('columnar'),
        'light'
      )
      console.log('myChart', myChart)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
