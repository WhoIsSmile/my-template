/**
 * 菜单功能mock
 * @author laughing
 * @date 2019-08-18 15:02:06
 */

export default [
  // 菜单列表
  {
    url: '/sys/menu/list',
    type: 'post',
    response: config => {
      return { "code": "0", "message": "SUCCESS", "body": [{ "id": 1, "createTime": "2018-06-27 16:00:00", "updateTime": "2019-08-11 10:38:36", "menuName": "权限", "parentMenuId": "0", "component": "Layout", "path": "/dashboard", "orderNo": 2, "icon": "svg|peoples", "childrenMenu": [{ "id": 2, "createTime": "2018-06-27 16:00:00", "updateTime": "2019-08-11 10:39:38", "menuName": "权限管理", "parentMenuId": "1", "component": "dashboard/index", "path": "dashboard", "orderNo": 1, "icon": "dashboard" }] }] }
    }
  },
  // 编辑菜单
  {
    url: '/sys/menu/edit',
    type: 'post',
    response: config => {
      return { "code": "0", "message": "SUCCESS", "body": {} }
    }
  },
  // 删除菜单
  {
    url: '/sys/menu/del',
    type: 'post',
    response: config => {
      return { "code": "0", "message": "SUCCESS", "body": {} }
    }
  }
]