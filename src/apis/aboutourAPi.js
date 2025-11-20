import httpInstance from '@/utils/http.js'
// 获取首页背景图片
export const getCompanyInfoAPI = function(){
  return httpInstance.get('Web_CompanyInformation/GetCompanyInformationData')
}

export const getDesignersAPI = function(){
  return httpInstance.get('Web_PeopleInformation/GetPeopleInformationPic')
}


export const getourfaithAPI = function(){
  return httpInstance.get('Web_OurAim/GetOurAimData')
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