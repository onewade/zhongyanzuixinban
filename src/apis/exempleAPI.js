import httpInstance from '@/utils/http.js'
// 获取案例
export const findExampleAPI = function(ExampleType){
  return httpInstance.get('Web_Case/GetCaseData',{
  params:{
    ExampleType:ExampleType
  }
  })
}
export const getExempleTablistAPI = function(){
  return httpInstance.get('Web_CaseOpt/GetCaseOptData')
}
