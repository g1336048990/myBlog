import Axios from 'axios'
/**
 * 请求文章栏目
 * func 必填参数，是个函数
 */
function request_article_category(func) {
	Axios.get("/control/category")
	.then(res => {
		func(res.data)
	})
	.catch(err => {
		alert(err)
	})
}
/**
 * 请求图片栏目
 * func 必填参数，是个函数
 */
function request_image_category(func) {
	
}
/**
 * 提交搜索数据
 * category 必填数据，传过来的字段数据
 * func 必填参数，是个函数
 */
function request_search_category(category, schema_name, func) {
	Axios.get('/request_search_category?name='+schema_name+'&category='+category)
	.then(res => {
		func(res.data)
	})
	.catch(err => {
		alert(err)
	})
}
/**
 * 提交搜索数据
 * data 必填数据，传过来的字段数据
 * func 必填参数，是个函数
 */
function request_search_data(data, schema_name, func) {
	Axios.get('/request_search_category?name='+schema_name+'&data='+data)
	.then(res => {
		func(res.data)
	})
	.catch(err => {
		alert(err)
	})
}

export default {
	request_article_category,
	request_image_category,
	request_search_category,
	request_search_data
}