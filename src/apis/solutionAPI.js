import httpInstance from '@/utils/http.js'
// 获取首页背景图片
export const getSolutionListAPI = function(){
  return httpInstance.get('Web_Solution/GetSolutionList')
}

export const getDetailListPI = function(PId){
  return httpInstance.get('Web_Solution/GetDetailList',{
    params:{
      PId:PId
    }
  })
}


export const getProductByIdAPI = function(TypeDetailsId){
  return httpInstance.get('Web_ProductInformation/GetProductInformationPic',{
  params:{
    TypeDetailsId:TypeDetailsId
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