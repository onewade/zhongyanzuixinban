import httpInstance from '@/utils/http.js'
// 获取首页背景图片
export const getArticleAPI = function(PageIndex,PageSize){
  return httpInstance.get('Web_ArticleData/GetArticle',{
  params:{
    PageIndex:PageIndex,
    PageSize:PageSize
  }
  })
}

export const getArticleByArticleIdAPI = function(ArticleId){
  return httpInstance.get('Web_ArticleData/GetArticleData',{
    params:{
      ArticleId:ArticleId
    }
  })
}


export const getRecentArticleAPI = function(ArticleId){
  return httpInstance.get('Web_ArticleData/GetOtherArticleData',{
  params:{
    ArticleId:ArticleId
  }
  })
}

// 向外按需导入一个API函数
export const getstudentAPI = function (userid) {
  // console.log('调用了getArticleAPI函数')
  return httpInstance.get('/GetStudentList',{
    params:{
      UserId:userid
    }
  })
}
// 获取新闻详情
export const getNewsDetailAPI = function (newsId) {
  return httpInstance.get('/portal/banner/'+newsId)
}