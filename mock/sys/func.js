/**
 * 菜单功能mock
 * @author laughing
 * @date 2019-08-18 15:02:06
 */

export default [
  // 菜单功能列表
  {
    url: '/sys/func/list',
    type: 'post',
    response: config => {
      return {"transNo":"Wig1uOCQzr","code":"0","message":"SUCCESS","body":[{"id":1,"createTime":"2018-06-28 02:00:53","updateTime":"2018-06-28 02:00:56","funcName":"添加","funcCode":"add"},{"id":2,"createTime":"2018-06-28 02:01:20","updateTime":"2018-06-28 02:01:24","funcName":"删除","funcCode":"del"},{"id":3,"createTime":"2018-06-28 02:01:46","updateTime":"2019-08-20 02:44:23","funcName":"修改","funcCode":"edit"},{"id":4,"createTime":"2018-06-28 02:02:12","updateTime":"2018-06-28 02:02:15","funcName":"查询","funcCode":"find"}]}
      }
  },
  // 编辑功能菜单
  {
    url: '/sys/func/edit',
    type: 'post',
    response: config => {
      return { "transNo":"Wig1uOCQzr","code": "0", "message": "SUCCESS", "body": {} }
    }
  },
  // 删除功能菜单
  {
    url: '/sys/func/del',
    type: 'post',
    response: config => {
      return { "transNo":"Wig1uOCQzr","code": "0", "message": "SUCCESS", "body": {} }
    }
  }
]