import httpInstance from '@/utils/http.js'
// 获取首页背景图片
export const getSlidephotoAPI = function(){
  return httpInstance.get('Web_BackgroundPic/findAllSlideshow')
}

export const getAdvantageAPI = function(){
  return httpInstance.get('Web_Advantage/GetAdvantagePic')
}


export const getServiceAPI = function(){
  return httpInstance.get('Web_Service/GetOurServiceData')
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