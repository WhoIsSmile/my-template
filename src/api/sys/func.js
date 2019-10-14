import request from '@/utils/request'

export function list(data) {
    return request({
      url: '/sys/func/list',
      method: 'post',
      data
    })
}
export function edit(data) {
  return request({
    url: '/sys/func/edit',
    method: 'post',
    data
  })
}
export function del(id) {
  return request({
    url: '/sys/func/del',
    method: 'post',
    params: { id }
  })
  
}