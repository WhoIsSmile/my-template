import { list,edit,del } from '@/api/sys/func'

const actions = {
    list({ commit }) {
      return new Promise((resolve, reject) => {
        list().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    edit({ commit }, form) {
      return new Promise((resolve, reject) => {
        edit(form).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    del({ commit }, form) {
      return new Promise((resolve, reject) => {
        del(form.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
  
  export default {
    namespaced: true,
    actions
  }