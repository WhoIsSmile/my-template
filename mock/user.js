
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      // const { username } = config.body
      // const token = tokens[username]
      return {
        "code": 0,
        "body": { "userInfo": { "id": 1, "createTime": "2018-04-01 06:35:36", "updateTime": "2019-08-05 13:07:49", "userAccount": "admin", "userName": "admin", "token": "6830da87a66445b99f5affa3ac506a1d", "image": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" } }
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      return {
        "code": "0",
        "message": "SUCCESS",
        "body": {
          "func": ["admin:perms:add"],
          "routers": [{
            "path": "/index",
            "component": "Layout",
            "meta": {
              "title": "主页",
              "icon": "dashboard"
            },
            "children": [{
              "path": "index",
              "name": "Index2",
              "component": "index/index",
              "meta": {
                "title": "Index",
                "icon": "dashboard"
              }
            },
            {
              "path": "index1",
              "name": "Index1",
              "component": "form/index1",
              "meta": {
                "title": "Index",
                "icon": "aaaaa"
              }
            }]
          }],
          "userInfo": {
            
            "id": 1,
            "createTime": "2018-04-01 06:35:36",
            "updateTime": "2019-08-05 14:59:31",
            "userAccount": "admin",
            "userName": "admin",
            "token": "1b54a648ae42469cb2d9e29f47306670",
            "image": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
          }
        }
      }
    
    
    }
    },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        data: 'success'
      }
    }
  }
]
