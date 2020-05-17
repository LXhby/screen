<template>
  <div class="result">
    <sidebar class="sidebar-container" />
    <div class="zbcommon-content">
      <div v-if="seeone" class="list">
        <div class="nav-top">
          <div class="title">项目新闻</div>
          <div class="more" @click="handleMore(1)">{{ this.list1.length>4 ?'返回>>':'查看更多>>' }}</div>
        </div>
        <el-row class="row-title" :gutter="15">
          <el-col v-for="(item,index) in this.list1" :key="index" :span="6" class="sm-list">
            <div class="main">
              <div class="item" @click="gopage(item.id)">
                <img :src="item.cover" alt>
                <div class="shadow">查看详情</div>
                <div class="detail">
                  <div class="title-top">{{ item.title }}</div>
                  <div class="time">{{ item.updateTime | convertTime("YYYY-MM-DD") }}</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-if="seetwo" class="list">
        <div class="nav-top">
          <div class="title">视频内容</div>
          <div class="more" @click="handleMore(2)">{{ this.list2.length>4 ?'返回>>':'查看更多>>' }}</div>
        </div>
        <el-row class="row-title" :gutter="15">
          <el-col v-for="(item,index) in this.list2" :key="index" :span="6" class="sm-list">
            <div class="main">
              <div class="item" @click="gopage(item.id)">
                <video :src="item.cover" alt />
                <div class="shadow">查看详情</div>
                <div class="detail">
                  <div class="title-top">{{ item.title }}</div>
                  <div class="time">{{ item.updateTime | convertTime("YYYY-MM-DD") }}</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from "moment";
import { queryAll } from '@/api/datashow'
import { getpicUrl } from '@/utils/upload'
import { getCssStsToken } from '@/api/datashow'
import { Sidebar } from '@/layout/components'
export default {
  components: {
    Sidebar
  },
  data() {
    return {
      loading: true,
      list1: [],
      list2: [],
      alllist1: [],
      alllist2: [],
      timelist: [],
      seeone: true,
      seetwo: true
    }
  },
  created() {
    this.loading = true
    var info = {
      menuId: 1,
      status: 1
    }
    getCssStsToken().then(res => {
      this.$store.commit('app/GET_OSS', res.data)
      queryAll(info)
        .then(res => {
          this.loading = false
          this.timelist = res.data
          this.timelist.forEach((item, index) => {
            this.getImage(index, item.cover, 1)
          })
          this.handlelist()
        })
        .catch(() => {
          this.loading = false
        })
    })
  },
  methods: {
    gopage(id) {
      console.log('tag', '')
      this.$router.push({ name: 'detail', params: { id: id }})
    },
    // 处理查看更多
    handlelist() {
      // 数组分类
      this.alllist1 = this.timelist.filter(
        item => item.newsType === '项目新闻'
      )
      this.alllist2 = this.timelist.filter(
        item => item.newsType === '视频内容'
      )

      // 判断页面的状态
      var status = this.$route.query
      if (status.hasOwnProperty('status')) {
        if (status.status * 1 === 1) {
          this.seeone = true
          this.seetwo = false
          this.list1 = [...this.alllist1]
          this.list2 = [...this.alllist2]
        } else {
          this.seeone = false
          this.seetwo = true
          this.list1 = [...this.alllist1]
          this.list2 = [...this.alllist2]
        }
      } else {
        // 刚进来的状态
        this.seeone = true
        this.seetwo = true
        if (this.alllist1.length >= 5) {
          this.list1 = [...this.alllist1]
          this.list1 = this.list1.splice(0, 4)
        } else {
          this.list1 = [...this.alllist1]
        }

        if (this.alllist2.length >= 5) {
          this.list2 = [...this.alllist2]
          this.list2 = this.list2.splice(0, 4)
        } else {
          this.list2 = [...this.alllist2]
        }
      }
    },
    handleMore(num) {
      if (num === 1) {
        if (this.list1.length <= 4) {
          this.seeone = true
          this.seetwo = false
          this.list1 = this.alllist1
          this.$router.replace({ name: 'home', query: { status: num }})
        } else {
          // 返回
          this.seeone = true
          this.seetwo = true
          this.list1 = [...this.alllist1]
          this.list1 = this.list1.splice(0, 4)
          this.list2 = this.list2.splice(0, 4)
          this.$router.replace({ name: 'home' })
          this.$router.replace({ name: 'home' })
        }
      } else if (num === 2) {
        if (this.list2.length <= 4) {
          this.seeone = false
          this.seetwo = true
          this.list2 = this.alllist2
          this.$router.push({ name: 'home', query: { status: num }})
        } else {
          this.seeone = true
          this.seetwo = true
          this.list1 = [...this.alllist1]
          this.list1 = this.list1.splice(0, 4)
          this.list2 = [...this.alllist2]
          this.list2 = this.list2.splice(0, 4)
          this.$router.replace({ name: 'home' })
        }
      }
    },
    getImage(index, item, num) {
      if (num === 1) {
        getpicUrl(item, 'image').then(res => {
          this.$set(this.timelist[index], 'cover', res)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.result {
  width: 100%;
  height: 100%;
  position: relative;
  .list {
    margin-top: 70px;
    .nav-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      .title {
        font-size: 18px;
        line-height: 25px;
      }
      .more {
        font-size: 16px;
        color: rgba(116, 138, 161, 1);
        line-height: 22px;
        cursor: pointer;
      }
    }
    .main {
      position: relative;
      width: 100%;
      margin-top: 40px;
      padding-top: 94%;
      .item {
        position: absolute;

        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        img {
          height: 60%;
          width: 100%;
          object-fit: cover;
        }
        video {
          height: 60%;
          width: 100%;
        }
        .shadow {
          position: absolute;
          top: 0;
          left: 0;
          height: 60%;
          width: 100%;
          display: none;
          background: rgba(0, 0, 0, 0.7);
          box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.25);
          font-size: 14px;
          color: #fff;
        }
        &:hover {
          .shadow {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .detail {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 40%;
          width: 100%;
          box-sizing: border-box;
          padding: 12px 19px 18px 19px;
          background-image: linear-gradient(to right bottom, #1a684f, #1f7459);
          .title-top {
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 25px;
            font-size: 18px;
            color: #fff;
          }
          .time {
            font-size: 16px;
            font-family: ArialMT;
            color: rgba(116, 138, 161, 1);
            line-height: 18px;
          }
        }
      }
    }
  }
}
</style>
