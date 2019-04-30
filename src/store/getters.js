const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  userid: state => state.user.userid,
  realname: state => state.user.realname

  // /* getter 方法 */
  // // 检测角色
  // isRole: (state) => (roleId, isLevel = 0) => {
  //   if (isLevel === 1) {
  //     return state.user.role.id === roleId && state.user.role.level === isLevel
  //   }

  //   return state.user.role.id === roleId
  // },
  // // 检测权限
  // isPower: (state) => (action) => {
  //   return state.user.power.indexOf(action) >= 0
  // },
  // // 检测菜单权限
  // isPaNameRelations: (state) => (action) => {
  //   return state.user.paNameRelations.indexOf(action) >= 0
  // }
}
export default getters
