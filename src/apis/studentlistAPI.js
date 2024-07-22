// 相关的API接口，都封装这个模块中
import request from '@/utils/http.js'

// 向外按需导入一个API函数
export const getstudentAPI = function (url,userid) {
  // console.log('调用了getArticleAPI函数')
  return request.get(url,{
    params:{
      UserId:userid
    }
  })
}
