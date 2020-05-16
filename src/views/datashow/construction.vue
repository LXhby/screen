<template>
  <div class="main-box">
    <div class="common-content construc">
      <div class="img-list">
        <el-carousel indicator-position="outside" :autoplay="false">
          <el-carousel-item v-for="item in shuflist" :key="item.id">
            <div class="img-show">
              <img :src="item.cover" alt class="top-img">
              <div class="img-tip">{{ item.content }}</div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-row :gutter="30">
        <el-col
          v-for="(item, index) in timelist"
          :key="index"
          :xs="12"
          :sm="6"
          :md="6"
          :lg="6"
          :xl="1"
        >
          <div class="grid-content bg-purple">
            <div class="showimg">
              <img :src="item.cover" alt>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { queryAll } from '@/api/datashow'
import { getpicUrl } from '@/utils/upload'
import { getCssStsToken } from '@/api/datashow'
export default {
  data() {
    return {
      shuflist: [],
      timelist: [],
      loading: true
    }
  },
  created() {
    this.loading = true
    var info = {
      menuId: 5,
      status: 1
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
          // 处理图片
          this.timelist.forEach((item, index) => {
            this.getImage(index, item.cover, 1)
          })
          if (this.timelist.length <= 5) {
            this.shuflist = this.timelist
          } else {
            var info = [...this.timelist]
            this.shuflist = info.slice(0, 5)
            console.log('this.shuflist', this.shuflist)
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    getImage(index, item, num) {
      getpicUrl(item, 'image').then(res => {
        this.$set(this.timelist[index], 'cover', res)
        console.log('tag', this.timelist)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main-box {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-top: 20px;
}
.top-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.img-list {
  position: relative;
  padding-top: 550px;
  width: 100%;
  margin-bottom: 30px;
  .img-show {
    width: 100%;
    height: 100%;
  }
  .img-tip {
    position: absolute;
    width: 100%;
    height: 60px;
    line-height: 60px;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    padding-left: 20px;
  }
}
.showimg {
  position: relative;
  padding-top: 60%;
  width: 100%;
  margin-bottom: 30px;
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
<style lang="scss">
.img-list {
  .el-carousel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .el-carousel__container {
      height: calc(100% - 29px);
    }
  }
}
</style>
