const getters = {
  sidebar: state => state.app.sidebar,
  isFullscreen: state => state.app.isFullscreen,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  link: state => state.permission.link,
  btns: state => state.user.btn,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  AccessKeyId: state => state.app.AccessKeyId,
  AccessKeySecret: state => state.app.AccessKeySecret,
  SecurityToken: state => state.app.SecurityToken,
  upPic: state => state.oss.upPic // oss上传
}
export default getters
