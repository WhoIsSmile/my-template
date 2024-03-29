import request from '@/utils/request'

export function list(data) {
    return request({
      url: '/sys/menu/list',
      method: 'post',
      data
    })
}
export function edit(data) {
  return request({
    url: '/sys/menu/edit',
    method: 'post',
    data
  })
}
export function del(id) {
  return request({
    url: '/sys/menu/del',
    method: 'post',
    params: { id }
  })
  
}