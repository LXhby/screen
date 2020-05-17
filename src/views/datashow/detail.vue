<template>
  <div class="detail">
    <div class="zbcommon-content">
      <h3 v-if="info.title">{{ info.title }}</h3>
      <div class="nav-top">
        <div class="time">
          <span class="one">发布日期：{{ info.createTime | convertTime("YYYY/MM/DD") }}</span>
          <span class="two">浏览次数：{{ info.viewTimes }}</span>
        </div>
        <video v-if="info.newsType == '视频内容'" :src="info.cover" class="one" />
        <img v-if="info.menuId !=3" :src="info.cover" alt class="one">
        <div v-else class="many">
          <div class="showimg">
            <img :src="info.cover" alt>
          </div>
          <div class="showimg">
            <img :src="info.trainingimg" alt>
          </div>
          <div class="showimg">
            <img :src="info.signimg" alt>
          </div>
          <div class="showimg">
            <video class="vedi" controls preload="auto" :src="info.video" />
          </div>
        </div>
      </div>
      <div class="content" v-html="info.content" />
    </div>
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
    updateViewTimes(id)
      .then(res => {
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
      .catch(err => {
        this.$message.error(err.message)
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
.detail {
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
  padding-bottom: 20px;
}
.zbcommon-content {
  padding: 40px 0;
  height: auto;
  margin: 0 auto;
  width: 1340px;
  background: rgba(59, 80, 140, 0.3);
  color: #a0b5cc;
  // text-align: center;
  h3 {
    margin: 0;
    font-size: 42px;
    line-height: 59px;
    text-align: center;
    color: #fff;
  }
  .nav-top {
    .time {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 12px;
      height: 22px;
      font-size: 16px;
      line-height: 22px;
      span {
        margin: 0 18px;
      }
    }
    .one {
      display: block;
      width: 720px;
      margin: 50px auto 40px auto;
    }
  }
  .content {
    padding: 0 40px;
    font-size: 16px;
    color: rgba(255, 255, 255, 1);
    line-height: 30px;
  }
  .bg-purple {
    margin: 12px 0;
  }
  .many {
    margin-top: 50px;
  }
  .showimg {
    position: relative;
    width: 720px;

    margin: 0 auto 20px auto;
    img {
      width: 100%;
      margin: auto;
    }
    .vedi {
      width: 100%;
      margin: auto;
    }
  }
}
</style>
