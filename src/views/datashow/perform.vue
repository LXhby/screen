<template>
  <div v-loading="loading" class="common-content perform">
    <div class="block-line">
      <el-row :gutter="30">
        <el-col v-for="(item, index) in timelist" :key="index" :span="6">
          <div class="grid-content bg-purple" @click="gopage(item.id)">
            <div class="showimg">
              <img :src="item.cover" alt>
            </div>
            <div class="title">{{ item.title }}</div>
            <div class="time">项目上线日期：{{ getupTimes(item.extInfo) }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="right-line">
      <scrollline />
    </div>
  </div>
</template>

<script>
import scrollline from '@/components/scrollLine/index'
import { queryAll } from '@/api/datashow'
import { getpicUrl } from '@/utils/upload'
import { getCssStsToken } from '@/api/datashow'
import moment from 'moment'
export default {
  components: { scrollline },
  data() {
    return {
      loading: true,
      timelist: []
    }
  },
  created() {
    this.loading = true
    var info = {
      menuId: 4,
      status: 1
    }
    getCssStsToken().then(res => {
      this.$store.commit('app/GET_OSS', res.data)
      queryAll(info)
        .then(res => {
          this.loading = false
          this.timelist = res.data
          // 处理图片视频
          this.timelist.forEach((item, index) => {
            this.getImage(index, item.cover, 1)
          })
        })
        .catch(() => {
          this.loading = false
        })
    })
  },
  methods: {
    getTime(time) {
      return moment(time).format('YYYY/MM/DD')
    },
    getImage(index, item, num) {
      if (num === 1) {
        getpicUrl(item, 'image').then(res => {
          this.$set(this.timelist[index], 'cover', res)
        })
      }
    },
    getupTimes(time) {
      if (time) {
        var str = JSON.parse(time).time
        return moment(str).format('YYYY-MM-DD')
      }
    },
    gopage(id) {
      this.$router.push({ name: 'detail', params: { id: id }})
    }
  }
}
</script>

<style lang="scss" scoped>
.perform {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 1350px;
}
.block-line {
  width: 1225px;
}
.grid-content {
  margin-bottom: 85px;
}
.title {
  margin: 12px 0 10px;
  color: #fff;
  font-size: 18px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.time {
  color: #5cb79a;
  font-size: 16px;
}
.showimg {
  position: relative;
  padding-top: 60%;
  width: 100%;
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
