<template>
  <div class="common-content">
    <h3 v-if="info.title">{{ info.title }}</h3>
    <div class="nav-top">
      <div class="time">
        <span class="one">发布日期：{{ info.createTime | convertTime("YYYY/MM/DD") }}</span>
        <span class="two">浏览次数：{{ info.viewTimes }}</span>
      </div>
      <img v-if="info.menuId !=3" :src="info.cover" alt class="img1">
      <div v-else>
        <el-row :gutter="30">
          <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="1">
            <div class="grid-content bg-purple">
              <div class="showimg">
                <img :src="info.cover" alt>
              </div>

              <div class="content-title">项目计划</div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="1">
            <div class="grid-content bg-purple">
              <div class="showimg">
                <img :src="info.trainingimg" alt>
              </div>

              <div class="content-title">项目培训照片</div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="1">
            <div class="grid-content bg-purple">
              <div class="showimg">
                <img :src="info.signimg" alt>
              </div>

              <div class="content-title">项目培训签到表</div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="1">
            <div class="grid-content bg-purple">
              <div class="showimg">
                <video class="vedi" controls preload="auto" :src="info.video" />
              </div>
              <div class="content-title">项目培训视频</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="content" v-html="info.content" />
  </div>
</template>

<script>
import { queryById, updateViewTimes, getCssStsToken } from '@/api/datashow'
import { getpicUrl } from '@/utils/upload'
export default {
  data() {
    return {
      info: {}
    }
  },
  created() {
    var id = this.$route.params.id * 1
    updateViewTimes(id).then(res => {
      queryById(id).then(res => {
        this.info = res.data
        getCssStsToken().then(res => {
          this.$store.commit('app/GET_OSS', res.data)
          this.getImage(this.info, this.info.cover, 1)
          if (this.info.menuId === 3) {
            var info = JSON.parse(this.info.extInfo)

            getpicUrl(info.trainingimg, 'image').then(res => {
              this.$set(this.info, 'trainingimg', res)
            })
            getpicUrl(info.signimg, 'image').then(res => {
              this.$set(this.info, 'signimg', res)
            })
            getpicUrl(info.video, 'video').then(res => {
              this.$set(this.info, 'video', res)
            })
          }
        })
      })
    })
  },
  methods: {
    getImage(info, item, num) {
      if (num === 1) {
        getpicUrl(item, 'image').then(res => {
          this.$set(info, 'cover', res)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
}
.nav-top {
  width: 680px;
  margin: 20px auto;
  text-align: center;
  .time {
    padding: 0 60px;
    color: #999;
    height: 30px;
    line-height: 30px;
    .one {
      float: left;
    }
    .two {
      float: right;
    }
  }
  .img1 {
    margin-top: 20px;
  }
}
.bg-purple {
  margin: 20px 0;
}
.showimg {
  position: relative;
  padding-top: 60%;
  width: 100%;
  margin-bottom: 10px;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .vedi {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
