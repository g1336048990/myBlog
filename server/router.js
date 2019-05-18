//引入核心模块
const express = require('express')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')

const videoPath = __dirname + '\\videos'
const imagePath = __dirname + '\\images'

//引入shcema
const Article = require('./schema/article')
const Notice = require('./schema/notice')
const Category = require('./schema/category')
const imageCategory = require('./schema/imageCategory')
const Comment = require('./schema/comment')
const Localhost = require('./schema/localhost')
const User = require('./schema/user')
const LoginLog = require('./schema/loginLog')
const Video = require('./schema/video')
const Image = require('./schema/image')
//引入封装的函数
const mongoApi = require('./method/mongoApi')
// var baseMethod = require('./method/baseMethod')
//实例路由
const router = express.Router()

// 配置全局路由拦截器，拦截不是规则内的请求,后期优化使用switch提高运行速度
router.all('*', (req, res, next) => {
	if(/control/.test(req.url)){
		next() 
	}else if(/view/.test(req.url)){
		next() 
	}else if(req.url.indexOf('/localhost') == 0){
		next() 
	}else if(req.url.indexOf('/change') == 0){
		next() 
	}else if(/login/.test(req.url)) {
		next() 
	}else if(/delete_loginLogs/.test(req.url)) {
		next()
	}else if(/upload_video/.test(req.url)) {
		next()
	}else if(/upload_pic/.test(req.url)) {
		next()
	}
	
	else{
		return res.status(404).json({
			err_code:3,
			msg:'请求错误，请检查请求路径是否正常！！！！',
			msgTitle:'请求错误'
		}) 
	}
})


router.post('/localhost', (req, res) => {
	mongoApi.saveData(Localhost, req.body, res) 
})
router.post('/login', (req, res) => {
	mongoApi.oneFind(User, {userName: req.body.userName}, success) 
	function success(data) {
		if(data == null) {
			res.status(200).json({code: '001'}) 
		}else {
			if(data.passPwd == req.body.userPwd){
				data.code = '000' 
				res.status(200).json(data) 
			}else {
				res.status(200).json({code: '002'}) 
			}
		}
	}
})
router.post('/loginLog', (req, res) => {
	mongoApi.saveData(LoginLog, req.body, res) 
})
router.get('/loginLog', (req, res) => {
	const condition = {name:1, host:1, createdTime:1, user_id: 1} 
	const timeCondition = {createdTime:-1} 
	mongoApi.someFind(LoginLog, success, condition, timeCondition, req.query.indexPage) 
	function success(data){
		return res.status(200).json(data) 
	}
})

router.get('/delete_loginLogs', (req, res) => {
	mongoApi.manyRemove(LoginLog, null, res) 
})

router.get('/delete_loginLogsByIds', (req, res) => {
	mongoApi.manyRemove(LoginLog, {user_id: req.query._id}, res) 
})
router.get('/delete_loginLogsById', (req, res) => {
	mongoApi.manyRemove(LoginLog, {_id: req.query._id}, res) 
})

/*-------------------------------------------分割线（Article配置）-------------------------------------------*/
//显示数据库里面的所有文章
router.get('/control/article', function(req, res){
	const condition = {title:1, category:1, tags:1, createdTime:1} 
	const timeCondition = {createdTime:-1} 
	mongoApi.someFind(Article, success, condition, timeCondition, req.query.indexPage) 
	function success(data){
		return res.status(200).json(data) 
	}
})

router.post('/view_clickArticle', function(req, res){
	mongoApi.upDate(Article, {_id: req.query._id}, {$set: req.body}, res) 
})

//增加文章/control/addArticle
router.post('/control/addArticle', function(req, res){
	// req.body.content = req.body.content.replace(/\n/gi, "<br />") 
	if(req.body.title == '' || req.body.title.length > 15){
		return res.status(200).json({
			err_code:1,
			msg:'标题内容为空或过长，请重新输入内容！！',
			msgTitle:'标题错误',
		})
	}
	else if(req.body.content == ''){
		return res.status(200).json({
			err_code:1,
			msg:'主要内容为空，请输入内容！！',
			msgTitle:'内容错误',
		})
	}
	else if(req.body.keywords == ''){
		return res.status(200).json({
			err_code:1,
			msg:'关键字内容为空，请输入内容！！',
			msgTitle:'关键字错误',
		})
	}
	else if(req.body.describe == ''){
		return res.status(200).json({
			err_code:1,
			msg:'描述内容为空，请输入内容！！',
			msgTitle:'描述错误',
		})
	}
	else if(req.body.tags == ''){
		return res.status(200).json({
			err_code:1,
			msg:'标签内容为空，请输入内容！！',
			msgTitle:'标签错误',
		})
	}
	else{
		mongoApi.saveData(Article, req.body, res) 
	}
})
//根据id获取文章信息
router.get('/control/updateArticle', function(req ,res){
	mongoApi.idFind(Article, req.query._id, success) 
	function success(data){
		return res.status(200).json(data) 
	}
})
//提交修改后的文章
router.post('/control/updateArticle', function(req ,res){
	req.body.content = req.body.content.replace(/\n/gi, "<br />") 
	mongoApi.idFind(Article, req.body._id, success) 
	function success(data){
		mongoApi.upDate(Article, {_id:req.body._id}, {$set:req.body}, res) 
		return res.status(200).json({
			err_code:0,
			msg:'修改成功，返回页面！！',
			msgTitle:'修改成功',
		}) 
	}
})
//删除文章
router.get('/control/deleteArticle', function(req ,res){
	mongoApi.idFind(Article, req.query._id, success) 
	function success(data){
		mongoApi.idDelete(Article, {_id:req.query._id}, res) 
		return res.status(200).json({
				err_code:0,
				msg:'删除成功，返回页面！！',
				msgTitle:'删除成功',
		}) 
	}
	console.log('---------华丽而又不失优雅的分割线--------') 
})

/*-------------------------------------------分割线（Notice配置）-------------------------------------------*/
//显示数据库里面的所有文章
router.get('/control/Notice', function(req, res){
	var condition = {content:1, createdTime:1} 
	var timeCondition = {createdTime:-1} 
	mongoApi.someFind(Notice, success, condition, timeCondition, req.query.indexPage) 
	function success(data){
		return res.status(200).json(data) 
	}
})
router.get('/control_getFiveNotice', function(req, res){
	var condition = {content:1, createdTime:1} 
	var timeCondition = {createdTime:-1} 
	mongoApi.getFiveNotice(Notice, success, condition, timeCondition) 
	function success(data){
		return res.status(200).json(data) 
	}
})
router.get('/control_getTenArticle', function(req, res){
	var condition = {title:1, createdTime:1, count:1, comment:1} 
	var timeCondition = {count:-1} 
	mongoApi.getTenArticle(Article, success, condition, timeCondition) 
	function success(data){
		return res.status(200).json(data) 
	}
})
//增加文章/control/addNotice
router.post('/control/addNotice', function(req, res){
	// console.log(req.body) 
	 if(req.body.content == ''){
		return res.status(200).json({
			err_code:1,
			msg:'主要内容为空，请输入内容！！',
			msgTitle:'内容错误',
		})
	}else{
		mongoApi.saveData(Notice, req.body, res) 
	}
})
//根据id获取文章信息
router.get('/control/updateNotice', function(req ,res){
	mongoApi.idFind(Notice, req.query._id, success) 
	function success(data){
		return res.status(200).json(data) 
	}
})
//提交修改后的文章
router.post('/control/updateNotice', function(req ,res){
	mongoApi.idFind(Notice, req.body._id, success) 
	function success(data){
		mongoApi.upDate(Notice, {_id:req.body._id}, {$set:req.body}, res) 
		return res.status(200).json({
			err_code:0,
			msg:'修改成功，返回页面！！',
			msgTitle:'修改成功',
		}) 
	}
})
//删除文章
router.get('/control/deleteNotice', function(req ,res){
	mongoApi.idFind(Notice, req.query._id, success) 
	function success(data){
		mongoApi.idDelete(Notice, {_id:req.query._id}, res) 
		return res.status(200).json({
				err_code:0,
				msg:'删除成功，返回页面！！',
				msgTitle:'删除成功',
		}) 
	}
	console.log('---------华丽而又不失优雅的分割线--------') 
})



/*-------------------------------------------分割线（Category配置）-------------------------------------------*/
//显示数据库里面的所有文章
router.get('/control/Notice', function(req, res){
	console.log('---------华丽而又不失优雅的分割线--------') 
	var condition = {title:1, createdTime:1} 
	var timeCondition = {createdTime:-1} 
	mongoApi.someFind(Notice, success, condition, timeCondition, req.query.indexPage) 
	function success(data){
		return res.status(200).json(data) 
	}
})
//增加文章/control/addNotice
router.post('/control/addNotice', function(req, res){
	// console.log(req.body) 
	if(req.body.title == '' || req.body.title.length > 15){
		return res.status(200).json({
			err_code:1,
			msg:'标题内容为空或过长，请重新输入内容！！',
			msgTitle:'标题错误',
		})
	}else if(req.body.content == ''){
		return res.status(200).json({
			err_code:1,
			msg:'主要内容为空，请输入内容！！',
			msgTitle:'内容错误',
		})
	}else if(req.body.keywords == ''){
		return res.status(200).json({
			err_code:1,
			msg:'关键字内容为空，请输入内容！！',
			msgTitle:'关键字错误',
		})
	}else if(req.body.describe == ''){
		return res.status(200).json({
			err_code:1,
			msg:'描述内容为空，请输入内容！！',
			msgTitle:'描述错误',
		})
	}else{
		mongoApi.saveData(Notice, req.body, res) 
	}
})
//根据id获取文章信息
router.get('/control/updateNotice', function(req ,res){
	mongoApi.idFind(Notice, req.query._id, success) 
	function success(data){
		return res.status(200).json(data) 
	}
})
//提交修改后的文章
router.post('/control/updateNotice', function(req ,res){
	mongoApi.idFind(Notice, req.body._id, success) 
	function success(data){
		mongoApi.upDate(Notice, {_id:req.body._id}, {$set:req.body}, res) 
		return res.status(200).json({
			err_code:0,
			msg:'修改成功，返回页面！！',
			msgTitle:'修改成功',
		}) 
	}
})
//删除文章
router.get('/control/deleteNotice', function(req ,res){
	mongoApi.idFind(Notice, req.query._id, success) 
	function success(){
		mongoApi.idDelete(Notice, {_id:req.query._id}, res) 
		return res.status(200).json({
				err_code:0,
				msg:'删除成功，返回页面！！',
				msgTitle:'删除成功',
		}) 
	}
})

/*-------------------------------------------分割线（category配置）-------------------------------------------*/
//添加文章栏目
router.post('/control/addCategory', function(req, res){
	console.log("添加栏目信息设置") 
	console.log(req.body) 
	mongoApi.saveData(Category, req.body, res)
})
//显示所有文章栏目
router.get('/control/category', function(req, res){
	mongoApi.allFind(Category, success) 
	function success(data){
		res.status(200).json(data)
	}
})


router.post('/control/adduser', (req, res) => {
	mongoApi.saveData(User, req.body, res)
})
router.get('/control_userInfo', (req, res) => {
	let condition = {name:1, userName:1, telephone:1, passPwd:1, createdTime:1} 
	let timeCondition = {createdTime:-1} 
	mongoApi.someFind(User, success, condition, timeCondition, req.query.indexPage) 
	function success(data){
		return res.status(200).json(data) 
	}
})
router.post('/control_editUser', (req, res) => {
	mongoApi.upDate(User, {_id: req.body._id}, {$set:req.body}, res) 
})
router.get('/control_deleteUser', (req, res) => {
	mongoApi.idDelete(User, {_id: req.query._id}, res)
})


//前台视图,首页文章加载数据
router.get("/view/index", (req, res) => {
	if("type" in req.query && req.query.type != '') {
		mongoApi.categoryFind(Article, success, {category: req.query.type}, {createdTime:-1}, req.query.indexPage) 
	}else {
		mongoApi.categoryAllFind(Article, success, {createdTime:-1}, req.query.indexPage) 
	}	
	function success(data) {
		res.status(200).json(data) 
	}
})

//根据id获取文章信息
router.get('/view/article', function(req ,res){
	mongoApi.idFind(Article, req.query._id, success) 
	function success(data){
		return res.status(200).json(data) 
	}
})

router.post('/view/comment', (req, res) => {
	mongoApi.oneFind(Comment, {articleid: req.body.articleid}, success) 
	function success(data) {
		if(data) {
			mongoApi.upDataComment(Comment, req.body, res) 
		}else{
			mongoApi.saveData(Comment, req.body, res) 
		}
	}
})

router.get('/view/comment', (req, res) => {
	mongoApi.findAllComment(Comment, req.query.articleid, success) 
	function success(data){
		res.status(200).json(data) 
	}
})

router.get('/view/comments_byId', (req, res) => {
	mongoApi.idFind(Comment, {_id: req.query._id}, success) 
	function success(data){
		res.status(200).json(data) 
	}
})

router.post('/control/delete_commentDetil', (req, res) => {
	mongoApi.idFindAndDeleteOne(Comment, {_id: req.query._id}, req.body, res) 
})


router.get('/view/comments', (req, res) => {
	mongoApi.allFind(Comment, success) 
	function success(data){
		res.status(200).json(data) 
	}
})


/*-------------------------------------------分割线（全局配置）-------------------------------------------*/
// 1. fs.stat  检测是文件还是目录(目录 文件是否存在)  
// 2. fs.mkdir  创建目录 （创建之前先判断是否存在）  
// 3. fs.writeFile  写入文件(文件不存在就创建,但不能创建目录)  
// 4. fs.appendFile 写入追加文件  
// 5. fs.readFile 读取文件  
// 6. fs.readdir 读取目录  
// 7. fs.rename 重命名  
// 8. fs.rmdir  删除目录  
// 9. fs.unlink 删除文件 
//10. fs.createReadStream  从文件流中读取数据，读取的文件比较大时建议用流的方式读取，文件比较大会多次读取。
//11. fs.createWriteStream  写入文件流  
//12. pipe 管道流 
//13. fs.access 判断目录、文件是否存在(读写权限)
//全局配置图片上传根据上传携带的数据进行判断是哪个类型的
router.post('/upload_video', (req, res, next) => {
	/**
	 * 读取文件并检测是否存在文件，存在就不创建，不存在就创建
	 */
	req.query.selected = req.query.selected == ''? 'other':req.query.selected 
	const videoPaths = videoPath + '\\' + req.query.selected 
	new Promise((resolve, reject) => {
		if(fs.existsSync(videoPaths)) {
			resolve()
		}else {
			fs.mkdir(videoPaths, (mkDirErr) => {
				if(mkDirErr) {
					throw mkDirErr
				}
				resolve()
			})
		}
	})
	.then(() => {
		let form = new formidable.IncomingForm() 
		//为了能更好的保存文件在本地服务器目录,需要手动创建文件目录
		form.uploadDir = videoPaths  
		//保留后缀名
		form.keepExtensions = true 
		//设置大小
		form.maxFieldsSize = 2*1024*1024*1024 
		form.maxFileSize = 2*1024*1024*1024 
		//解析请求
		form.parse(req, function(err, fields, files) {
			const nowFileName = Date.now() + '_' + files.file.name
			const filename = videoPaths + '\\' + nowFileName
			fs.renameSync(files.file.path, filename)
			mongoApi.saveData(Video, {videoName: nowFileName, filePath: req.query.selected, size: files.file.size, userName: fields.userName, createdTime: Date.now()}, res)
			// next()
		})  
	})
})

router.get('/control_deleteVideo', (req, res) => {
	const videoPaths = videoPath + '\\' + req.query.filePath + '\\' + req.query.videoName
	new Promise((resolve, reject) => {
		if(fs.statSync(videoPaths).isFile()) {
			fs.unlink(videoPaths, (err) => {
				if(err) {
					throw err
				}
				resolve()
				console.log('删除文件成功')	
			})
		}
		console.log('不存在该文件')
	})
	.then(() => {
		'_id' in req.query? mongoApi.idDelete(Video, {_id: req.query._id}, res): mongoApi.idDelete(Video, {videoName: req.query.videoName}, res)
		// mongoApi.idDelete(Video, {videoName: req.query.videoName}, res)
	})
})

router.get('/control_videoList', (req, res) => {
	mongoApi.categoryAllFind(Video, success, {createdTime: -1}, req.query.indexPage)
	function success(data) {
		res.status(200).json(data)
	}
})










router.post('/control_addImageCategory', function(req, res){
	const imagePaths = imagePath + '\\' + req.body.imageCategory 
	new Promise((resolve, reject) => {
		if(fs.existsSync(imagePaths)) {
			resolve()
		}else {
			fs.mkdir(imagePaths, (mkDirErr) => {
				if(mkDirErr) {
					throw mkDirErr
				}
				resolve()
			})
		}
	})
	.then(() => {
		mongoApi.saveData(imageCategory, req.body, res)
	})
})
router.get('/control_ImageCategory', function(req, res){
	mongoApi.allFind(imageCategory, success) 
	function success(data){
		res.status(200).json(data)
	}
})


router.post('/upload_pic', (req, res, next) => {
	/**
	 * 读取文件并检测是否存在文件，存在就不创建，不存在就创建
	 */
	req.query.selected = req.query.selected == ''? 'other':req.query.selected 
	const imagePaths = imagePath + '\\' + req.query.selected 
	new Promise((resolve, reject) => {
		if(fs.existsSync(imagePaths)) {
			resolve()
		}else {
			fs.mkdir(imagePaths, (mkDirErr) => {
				if(mkDirErr) {
					throw mkDirErr
				}
				resolve()
			})
		}
	})
	.then(() => {
		let form = new formidable.IncomingForm() 
		//为了能更好的保存文件在本地服务器目录,需要手动创建文件目录
		form.uploadDir = imagePaths  
		//保留后缀名
		form.keepExtensions = true 
		//设置大小
		form.maxFieldsSize = 2*1024*1024 
		form.maxFileSize = 2*1024*1024 
		//解析请求
		form.parse(req, function(err, fields, files) {
			const nowFileName = Date.now() + '_' + files.file.name
			const filename = imagePaths + '\\' + nowFileName
			fs.renameSync(files.file.path, filename)
			if(req.query.selected == 'head_pic' && "_id" in req.query) {
				mongoApi.upDate_head_pic(User, {_id:req.query._id}, {$set:{imageName: nowFileName, filePath: req.query.selected}}, {imageName: nowFileName, filePath: req.query.selected}, res)
			}else {
				mongoApi.saveData(Image, {imageName: nowFileName, filePath: req.query.selected, size: files.file.size, userName: fields.userName, createdTime: Date.now()}, res)
			}
			
			// next()
		})  
	})
})

router.get('/control_deleteImage', (req, res) => {
	const imagePaths = imagePath + '\\' + req.query.filePath + '\\' + req.query.imageName
	new Promise((resolve, reject) => {
		if(fs.statSync(imagePaths).isFile()) {
			fs.unlink(imagePaths, (err) => {
				if(err) {
					throw err
				}
				resolve()
				console.log('删除文件成功')	
			})
		}
		console.log('不存在该文件')
	})
	.then(() => {
		'_id' in req.query? mongoApi.idDelete(Image, {_id: req.query._id}, res): mongoApi.idDelete(Image, {imageName: req.query.imageName}, res)
	})
})

router.get('/control_imageList', (req, res) => {
	mongoApi.categoryAllFind(Image, success, {createdTime: -1}, req.query.indexPage)
	function success(data) {
		res.status(200).json(data)
	}
})

//获取数据总数
router.get('/control/getTotal', function(req ,res) {
	if(req.query.name.indexOf('Article') == 0) {
		if('category' in req.query && req.query.category != 1) {
			mongoApi.dataCounts(Article, {category: req.query.category}, success) 
		}else {
			mongoApi.dataCount(Article, success) 
		}
	}else if(req.query.name.indexOf('Notice') == 0) {
		mongoApi.dataCount(Notice, success) 
	}else if(req.query.name.indexOf('User') == 0) {
		mongoApi.dataCount(User, success) 
	}else if(req.query.name.indexOf('LoginLog') == 0) {
		mongoApi.dataCount(LoginLog, success) 
	}else if(req.query.name.indexOf('Comment') == 0) {
		mongoApi.dataCount(Comment, success) 
	}else if(req.query.name.indexOf('Category') == 0) {
		mongoApi.dataCount(Category, success) 
	}else if(req.query.name.indexOf('Video') == 0) {
		mongoApi.dataCount(Video, success) 
	}else if(req.query.name.indexOf('Image') == 0) {
		mongoApi.dataCount(Image, success) 
	}
	
	function success(num) {
		res.status(200).json(num) 
	}
})
















module.exports = router

