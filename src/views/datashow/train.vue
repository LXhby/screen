<template>
  <div class="zbcommon-content tranin">
    <div class="block-line">
      <el-row class="el-btns" style="margin-bottom:40px;">
        <el-button
          v-for="(item, index) in list"
          :key="index"
          :class="{ activebtn: activeName == item }"
          @click="handlechange(item)"
        >{{ item }}</el-button>
      </el-row>

      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in timelist"
          :key="index"
          :timestamp="getTime(item.createTime)"
          color="#29CB97"
          placement="top"
        >
          <el-card class="box-card" :body-style="{ padding: '0px' }">
            <div class="card-item" @click="gopage(item.id)">
              <h3 class="hd-title">{{ item.title }}</h3>
              <p class="type">培训类型：{{ item.newsType }}</p>
              <p class="hm-txt" v-html="item.content" />
              <el-row :gutter="6">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <div class="showimg">
                      <img :src="item.cover" alt>
                      <div class="content-title">项目计划</div>
                      <p />
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <div class="showimg">
                      <img :src="item.trainingimg" alt>
                      <div class="content-title">项目培训照片</div>
                      <p />
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <div class="showimg">
                      <img :src="item.signimg" alt>
                      <div class="content-title">项目培训签到表</div>
                      <p />
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <div class="showimg">
                      <video class="vedi" controls preload="auto" :src="item.video" />
                      <div class="content-title">项目培训视频</div>
                      <p />
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <scrollline />
  </div>
</template>

<script>
import scrollline from '@/components/scrollLine/index'
import moment from 'moment'
import { queryAll } from '@/api/datashow'
import { getpicUrl } from '@/utils/upload'
import { getCssStsToken } from '@/api/datashow'
export default {
  inject: ['reload'],
  components: { scrollline },
  data() {
    return {
      activeName: '全部',
      list: ['全部', '业务项目', '工作技能', '法律法规', '制度标准'],
      timelist: [],
      loading: true,
      firstSearch: {}
    }
  },
  created() {
    this.loading = true
    var newsType = null
    if (this.$route.query && this.$route.query.newsType) {
      newsType = this.$route.query.newsType
      this.activeName = this.$route.query.newsType
    } else {
      newsType = null
    }
    var info = {
      menuId: 3,
      status: 1,
      newsType: newsType
    }
    this.firstSearch = info
    getCssStsToken().then(res => {
      this.$store.commit('app/GET_OSS', res.data)
      this.intiData(this.firstSearch)
    })
  },
  methods: {
    intiData(info) {
      queryAll(info)
        .then(res => {
          this.loading = false
          this.timelist = res.data
          // 处理图片视频
          this.timelist.forEach((item, index) => {
            this.getImage(index, item.cover, 1)
            if (item.extInfo) {
              this.getImage(index, item.extInfo, 2)
            }
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    handlechange(tab) {
      this.activeName = tab
      if (this.activeName !== '全部') {
        this.firstSearch.newsType = this.activeName
        this.$router.replace({
          name: 'train',
          query: { newsType: this.activeName }
        })
      } else {
        this.firstSearch.newsType = null
      }

      this.intiData(this.firstSearch)
    },
    getTime(time) {
      return moment(time).format('YYYY/MM/DD')
    },
    gopage(id) {
      console.log('tag', '')
      this.$router.push({ name: 'detail', params: { id: id }})
    },
    getImage(index, item, num) {
      if (num === 1) {
        getpicUrl(item, 'image').then(res => {
          this.$set(this.timelist[index], 'cover', res)
        })
      } else {
        var info = JSON.parse(item)

        getpicUrl(info.trainingimg, 'image').then(res => {
          this.$set(this.timelist[index], 'trainingimg', res)
        })
        getpicUrl(info.signimg, 'image').then(res => {
          this.$set(this.timelist[index], 'signimg', res)
        })
        getpicUrl(info.video, 'video').then(res => {
          this.$set(this.timelist[index], 'video', res)
        })
        console.log('arr', this.timelist)
        this.$forceUpdate()
      }
    }
  }
}
</script>

<style lang="scss">
.tranin {
  display: flex;
  justify-content: space-between;
  .block-line {
    .activebtn {
      background: $menuActiveText;
      color: #fff;
      border-color: $menuActiveText;
    }
  }
  .el-button {
    background: rgba(21, 47, 83, 1);
    color: rgba(97, 124, 153, 1);
    border-color: rgba(21, 47, 83, 1);
  }
  .el-card {
    border-radius: 0;
  }
  .el-timeline {
    padding: 0;
  }
  .el-timeline-item__timestamp {
    margin-bottom: 24px;
    color: #fff;
  }
  .el-timeline-item__tail {
    border: none;
  }
  .el-timeline-item__wrapper {
    margin-bottom: 10px;
  }
  .box-card {
    display: inline-block;
    box-sizing: border-box;
    width: 960px;
    padding: 25px 22px 33px 22px;
    background-image: linear-gradient(to right bottom, #415d95, #333e80);
    border-style: none;
    color: #fff;
    .card-item p:nth-child(3) {
      color: #a0b5cc;
    }
    h3 {
      margin-bottom: 12px;
      font-size: 22px;
    }
    .type {
      margin: 0;
      margin-bottom: 18px;
      font-size: 18px;
    }
    .hm-txt {
      font-size: 18px;
      color: rgba(160, 181, 204, 1);
      line-height: 25px;
      margin-bottom: 10px;
    }
    .time {
      margin: 0;
      // font-size: 16px;
    }
  }
  .hd-title {
    font-size: 20px;
    color: #29cb97;
    margin: 0;
  }
  .showimg {
    position: relative;
    padding-top: 60%;
    width: 100%;
    // background: rgba(0, 0, 0, 0.2);
    box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.25);
    p {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      background: rgba(0, 0, 0, 0.2);
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .content-title {
      position: absolute;
      left: 0;
      bottom: 0;
      box-sizing: border-box;
      width: 100%;
      height: 30px;
      padding-left: 10px;
      background-image: linear-gradient(
        to bottom,
        rgba(2, 21, 48, 0.4),
        #010e21
      );
      line-height: 30px;
      color: #fff;
      font-size: 12px;
      border: none;
    }
    .vedi {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
