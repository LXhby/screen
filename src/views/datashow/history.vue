<template>
  <div class="common-content history">
    <div v-loading="loading" class="block-line">
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in timelist"
          :key="index"
          :timestamp="getTime(item.extInfo)"
          color="#29CB97"
          placement="top"
        >
          <el-card
            class="box-card"
            :body-style="{ padding: '0px' }"
            shadow="never"
          >
            <div
              class="card-item"
              style="padding:20px;"
              @click="gopage(item.id)"
            >
              <h4>{{ item.title }}</h4>
              <p class="time">
                {{ item.creator }} 提交于
                {{ item.updateTime | convertTime("YYYY/MM/DD HH:mm:ss") }}
              </p>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <scrollline />
  </div>
</template>

<script>
import moment from 'moment'
import { queryAll } from '@/api/datashow'
import scrollline from '@/components/scrollLine/index'
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
    queryAll(info)
      .then(res => {
        this.loading = false
        this.timelist = res.data
      })
      .catch(() => {
        this.loading = false
      })
  },
  methods: {
    getTime(info) {
      var time = JSON.parse(info)['time']
      return moment(time).format('YYYY/MM/DD')
    },
    gopage(id) {
      console.log('tag', '')
      this.$router.push({ name: 'detail', params: { id: id }})
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  display: inline-block;
  max-width: 520px;
  background-image: linear-gradient(to right bottom, #415d95, #333e80);
  border-style: none;
  color: #fff;
  h4 {
    margin: 0 0 12px 0;
    font-size: 16px;
  }
  .time {
    margin: 0;
    // font-size: 16px;
  }
}
.card-item {
  display: inline-block;
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
