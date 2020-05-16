import request from '@/utils/request'

// 查询所有大屏新闻内容
export function queryAll(data) {
  return request({
    // url: '/account/query',
    url: 'datascreen/data-screen-news/queryAll',
    method: 'post',
    data
  })
}
export function getCssStsToken() {
  return request({
    url: '/common/getCssStsToken',
    method: 'get'
  })
}
// 根据id查询大屏新闻内容
export function queryById(id) {
  return request({
    url: '/datascreen/data-screen-news/queryById',
    method: 'post',
    data: {
      id: id
    }
  })
}
// 更新浏览量
export function updateViewTimes(id) {
  return request({
    url: '/datascreen/data-screen-news/updateViewTimes',
    method: 'post',
    data: {
      id: id
    }
  })
}
// 获取 今日数据
export function todaydatass(id) {
  return request({
    url: '/data-screen/today-datas',
    method: 'post',
    data: {}
  })
}
// 获取 大屏所有数据
export function screendatass(id) {
  return request({
    url: '/data-screen/all-datas',
    method: 'post',
    data: {}
  })
}
