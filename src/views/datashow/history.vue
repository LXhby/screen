<template>
  <div class="zbcommon-content history">
    <div v-loading="loading" class="block-line">
      <div class="right">
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in timelist"
            :key="index"
            :timestamp="getTime(item.timeline)"
            color="#29CB97"
            placement="top"
          >
            <el-card class="box-card" :body-style="{ padding: '0px' }" shadow="never">
              <div class="card-item" @click="gopage(item.id)">
                <div class="left-img">
                  <img :src="item.cover" alt>
                </div>
                <div class="right-detail">
                  <h4>{{ item.title }}</h4>
                  <p class="time">
                    {{ item.creator }} 提交于
                    {{ item.updateTime | convertTime("YYYY/MM/DD HH:mm:ss") }}
                  </p>
                </div>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div class="right-line">
        <scrollline />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { queryAll } from '@/api/datashow'
import scrollline from '@/components/scrollLine/index'
import { getpicUrl } from '@/utils/upload'
import { getCssStsToken } from '@/api/datashow'
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
      menuId: 2,
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
        })
        .catch(() => {
          this.loading = false
        })
    })
  },
  methods: {
    getTime(info) {
      return moment(info).format('YYYY/MM/DD')
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
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.history {
  .block-line {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    padding-bottom: 20px;
    justify-content: space-between;
    .right {
      width: calc(100% - 2px);
      height: 100%;
      overflow: auto;
    }
    .right-line {
      position: absolute;
      width: 2px;
      height: 90%;
      right: 0;
      top: 0;
    }
  }
}
.box-card {
  display: inline-block;
  width: 960px;
  background-image: linear-gradient(to right bottom, #415d95, #333e80);
  border-style: none;
  color: #fff;
  .card-item {
    display: flex;
    align-items: top;
    padding: 10px 12px 24px 12px;
    img {
      width: 141px;
      height: 80px;
      object-fit: cover;
    }
    .right-detail {
      margin-top: 10px;
      margin-left: 16px;
    }
    h4 {
      margin: 0 0 12px 0;
      font-size: 18px;
      line-height: 25px;
      font-weight: normal;
    }
    .time {
      margin: 0;
      font-size: 16px;

      color: rgba(160, 181, 204, 1);
      line-height: 22px;
      // font-size: 16px;
    }
  }
}
</style>
<style lang="scss">
.history {
  display: flex;
  justify-content: space-between;

  .el-card {
    border-radius: 0;
  }
  .el-timeline {
    padding: 0;
  }
  .el-timeline-item__timestamp {
    color: #fff;
  }
  .el-timeline-item__tail {
    border: none;
  }
}
</style>
