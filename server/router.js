//引入核心模块
const express = require('express')
const formidable = require('formidable')
const path = require('path')
//引入shcema
const Article = require('./schema/article')
const Notice = require('./schema/notice')
const Category = require('./schema/category')
const Comment = require('./schema/comment')
const Localhost = require('./schema/localhost')

//引入封装的函数
const mongoApi = require('./method/mongoApi')
// var baseMethod = require('./method/baseMethod')
//实例路由
const router = express.Router()

// 配置全局路由拦截器，拦截不是规则内的请求,后期优化使用switch提高运行速度
router.all('*', (req, res, next) => {
	console.log("111")
	if(req.url.indexOf('/control/article') == 0){
		next();
	}else if(req.url.indexOf('/control/addArticle') == 0){
		next();
	}else if(req.url.indexOf('/control/updateArticle') == 0){
		next();
	}else if(req.url.indexOf('/control/deleteArticle') == 0){
		next();
	}else if(req.url.indexOf('/control/notice') == 0){
		next();
	}else if(req.url.indexOf('/control/addNotice') == 0){
		next();
	}else if(req.url.indexOf('/control/updateNotice') == 0){
		next();
	}else if(req.url.indexOf('/control/deleteNotice') == 0){
		next();
	}else if(req.url.indexOf('/control/addCategory') == 0){
		next();
	}else if(req.url.indexOf('/control/category') == 0){
		next();
	}else if(req.url.indexOf('/view/') == 0){
		next();
	}
	else if(req.url.indexOf('/view/comment') == 0){
		next();
	}
	else if(req.url.indexOf('/localhost') == 0){
		console.log("xiaoguo");
		next();
	}
	
	else if(req.url.indexOf('/control/getTotal') == 0){
		next();
	}else if(req.url.indexOf('/change') == 0){
		next();
	}else{
		return res.status(404).json({
			err_code:3,
			msg:'请求错误，请检查请求路径是否正常！！！！',
			msgTitle:'请求错误'
		});
	}
})


router.post('/localhost', (req, res) => {
	console.log(req.body);
	mongoApi.saveData(Localhost, req.body, res);
})




/*-------------------------------------------分割线（Article配置）-------------------------------------------*/
//显示数据库里面的所有文章
router.get('/control/article', function(req, res){
	console.log('---------华丽而又不失优雅的分割线--------');
	var condition = {title:1, category:1, tags:1, createdTime:1};
	var timeCondition = {createdTime:-1};
	mongoApi.someFind(Article, success, condition, timeCondition, req.query.indexPage);
	function success(data){
		return res.status(200).json(data);
	}
})
//增加文章/control/addArticle
router.post('/control/addArticle', function(req, res){
	console.log(req.body.content);
	req.body.content = req.body.content.replace(/\n/gi, "<br />");
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
		mongoApi.saveData(Article, req.body, res);
	}
})
//根据id获取文章信息
router.get('/control/updateArticle', function(req ,res){
	mongoApi.idFind(Article, req.query._id, success);
	function success(data){
		return res.status(200).json(data);
	}
})
//提交修改后的文章
router.post('/control/updateArticle', function(req ,res){
	req.body.content = req.body.content.replace(/\n/gi, "<br />");
	mongoApi.idFind(Article, req.body._id, success);
	function success(data){
		mongoApi.upDate(Article, {_id:req.body._id}, {$set:req.body});
		return res.status(200).json({
			err_code:0,
			msg:'修改成功，返回页面！！',
			msgTitle:'修改成功',
		});
	}
})
//删除文章
router.get('/control/deleteArticle', function(req ,res){
	mongoApi.idFind(Article, req.query._id, success);
	function success(data){
		mongoApi.idDelete(Article, {_id:req.query._id});
		return res.status(200).json({
				err_code:0,
				msg:'删除成功，返回页面！！',
				msgTitle:'删除成功',
		});
	}
	console.log('---------华丽而又不失优雅的分割线--------');
})

/*-------------------------------------------分割线（Notice配置）-------------------------------------------*/
//显示数据库里面的所有文章
router.get('/control/Notice', function(req, res){
	console.log('---------华丽而又不失优雅的分割线--------');
	var condition = {content:1, createdTime:1};
	var timeCondition = {createdTime:-1};
	mongoApi.someFind(Notice, success, condition, timeCondition, req.query.indexPage);
	function success(data){
		return res.status(200).json(data);
	}
})
//增加文章/control/addNotice
router.post('/control/addNotice', function(req, res){
	// console.log(req.body);
	 if(req.body.content == ''){
		return res.status(200).json({
			err_code:1,
			msg:'主要内容为空，请输入内容！！',
			msgTitle:'内容错误',
		})
	}else{
		mongoApi.saveData(Notice, req.body, res);
	}
})
//根据id获取文章信息
router.get('/control/updateNotice', function(req ,res){
	mongoApi.idFind(Notice, req.query._id, success);
	function success(data){
		return res.status(200).json(data);
	}
})
//提交修改后的文章
router.post('/control/updateNotice', function(req ,res){
	mongoApi.idFind(Notice, req.body._id, success);
	function success(data){
		mongoApi.upDate(Notice, {_id:req.body._id}, {$set:req.body});
		return res.status(200).json({
			err_code:0,
			msg:'修改成功，返回页面！！',
			msgTitle:'修改成功',
		});
	}
})
//删除文章
router.get('/control/deleteNotice', function(req ,res){
	mongoApi.idFind(Notice, req.query._id, success);
	function success(data){
		mongoApi.idDelete(Notice, {_id:req.query._id});
		return res.status(200).json({
				err_code:0,
				msg:'删除成功，返回页面！！',
				msgTitle:'删除成功',
		});
	}
	console.log('---------华丽而又不失优雅的分割线--------');
})



/*-------------------------------------------分割线（Category配置）-------------------------------------------*/
//显示数据库里面的所有文章
router.get('/control/Notice', function(req, res){
	console.log('---------华丽而又不失优雅的分割线--------');
	var condition = {title:1, createdTime:1};
	var timeCondition = {createdTime:-1};
	mongoApi.someFind(Notice, success, condition, timeCondition, req.query.indexPage);
	function success(data){
		return res.status(200).json(data);
	}
})
//增加文章/control/addNotice
router.post('/control/addNotice', function(req, res){
	// console.log(req.body);
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
		mongoApi.saveData(Notice, req.body, res);
	}
})
//根据id获取文章信息
router.get('/control/updateNotice', function(req ,res){
	mongoApi.idFind(Notice, req.query._id, success);
	function success(data){
		return res.status(200).json(data);
	}
})
//提交修改后的文章
router.post('/control/updateNotice', function(req ,res){
	mongoApi.idFind(Notice, req.body._id, success);
	function success(data){
		mongoApi.upDate(Notice, {_id:req.body._id}, {$set:req.body});
		return res.status(200).json({
			err_code:0,
			msg:'修改成功，返回页面！！',
			msgTitle:'修改成功',
		});
	}
})
//删除文章
router.get('/control/deleteNotice', function(req ,res){
	mongoApi.idFind(Notice, req.query._id, success);
	function success(){
		mongoApi.idDelete(Notice, {_id:req.query._id});
		return res.status(200).json({
				err_code:0,
				msg:'删除成功，返回页面！！',
				msgTitle:'删除成功',
		});
	}
	console.log('---------华丽而又不失优雅的分割线--------');
})

/*-------------------------------------------分割线（category配置）-------------------------------------------*/
//添加文章栏目
router.post('/control/addCategory', function(req, res){
	console.log("添加栏目信息设置");
	console.log(req.body);
	mongoApi.saveData(Category, req.body, res)
})
//显示所有文章栏目
router.get('/control/category', function(req, res){
	console.log("添加栏目信息设置");
	mongoApi.allFind(Category, success);
	function success(data){
		res.status(200).json(data)
	}
})
/*-------------------------------------------分割线（comment配置）-------------------------------------------*/
// //显示数据库里面的所有文章
// router.get('/control/Notice', function(req, res){
// 	console.log('---------华丽而又不失优雅的分割线--------');
// 	var condition = {title:1, createdTime:1};
// 	var timeCondition = {createdTime:-1};
// 	mongoApi.someFind(Notice, success, condition, timeCondition, req.query.indexPage);
// 	function success(data){
// 		return res.status(200).json(data);
// 	}
// })
// //增加文章/control/addNotice
// router.post('/control/addNotice', function(req, res){
// 	// console.log(req.body);
// 	if(req.body.title == '' || req.body.title.length > 15){
// 		return res.status(200).json({
// 			err_code:1,
// 			msg:'标题内容为空或过长，请重新输入内容！！',
// 			msgTitle:'标题错误',
// 		})
// 	}else if(req.body.content == ''){
// 		return res.status(200).json({
// 			err_code:1,
// 			msg:'主要内容为空，请输入内容！！',
// 			msgTitle:'内容错误',
// 		})
// 	}else if(req.body.keywords == ''){
// 		return res.status(200).json({
// 			err_code:1,
// 			msg:'关键字内容为空，请输入内容！！',
// 			msgTitle:'关键字错误',
// 		})
// 	}else if(req.body.describe == ''){
// 		return res.status(200).json({
// 			err_code:1,
// 			msg:'描述内容为空，请输入内容！！',
// 			msgTitle:'描述错误',
// 		})
// 	}else{
// 		mongoApi.saveData(Notice, req.body, res);
// 	}
// })
// //根据id获取文章信息
// router.get('/control/updateNotice', function(req ,res){
// 	mongoApi.idFind(Notice, req.query._id, success);
// 	function success(data){
// 		return res.status(200).json(data);
// 	}
// })
// //提交修改后的文章
// router.post('/control/updateNotice', function(req ,res){
// 	mongoApi.idFind(Notice, req.body._id, success);
// 	function success(data){
// 		mongoApi.upDate(Notice, {_id:req.body._id}, {$set:req.body});
// 		return res.status(200).json({
// 			err_code:0,
// 			msg:'修改成功，返回页面！！',
// 			msgTitle:'修改成功',
// 		});
// 	}
// })
// //删除文章
// router.get('/control/deleteNotice', function(req ,res){
// 	mongoApi.idFind(Notice, req.query._id, success);
// 	function success(data){
// 		mongoApi.idDelete(Notice, {_id:req.query._id});
// 		return res.status(200).json({
// 				err_code:0,
// 				msg:'删除成功，返回页面！！',
// 				msgTitle:'删除成功',
// 		});
// 	}
// 	console.log('---------华丽而又不失优雅的分割线--------');
// })


//前台视图,首页文章加载数据
router.get("/view/index", (req, res) => {
	mongoApi.allFind(Article, success);
	function success(data) {
		res.status(200).json(data);
	}
})

//根据id获取文章信息
router.get('/view/article', function(req ,res){
	mongoApi.idFind(Article, req.query._id, success);
	function success(data){
		return res.status(200).json(data);
	}
})

router.post('/view/comment', (req, res) => {
	mongoApi.oneFind(Comment, {articleid: req.body.articleid}, success);
	function success(data) {
		if(data) {
			console.log(data);
			console.log("正确");
			mongoApi.upDataComment(Comment, req.body, res);
		}else{
			console.log("错误");
			mongoApi.saveData(Comment, req.body, res);
		}
	}
})

router.get('/view/comment', (req, res) => {
	mongoApi.findAllComment(Comment, req.query.articleid, success);
	function success(data){
		res.status(200).json(data);
	}
})


/*-------------------------------------------分割线（全局配置）-------------------------------------------*/

//全局配置图片上传根据上传携带的数据进行判断是哪个类型的
router.post('/change', (req, res, next) => {
    var form = new formidable.IncomingForm();
    //为了能更好的保存文件在本地服务器目录,需要手动创建文件目录
    form.uploadDir = path.join(__dirname, 'files');
    //保留后缀名
    form.keepExtensions = true;
    //设置大小
    form.maxFieldsSize = 2*1024*1024;
    //解析请求
    form.parse(req, function(err, fields, files) {
        if(err){
        	next(err);
        }else{
	    	var num = fields.num;
	    	switch(num){
	    		case '0':
		    		mongoApi.upDate(Article, {createdTime:fields.categoryId}, {$set:{titlepic:files.file.name,picpath:files.file.path}});
		    		break;
		    	case '1':
			    	console.log('2222');
			    	break;
	    	}
		   
        }
    }); 
})
//获取数据总数
router.get('/control/getTotal', function(req ,res){
	if(req.query.name.indexOf('Article') == 0){
		mongoApi.dataCount(Article, success);
	}else if(req.query.name.indexOf('Notice') == 0){
		mongoApi.dataCount(Notice, success);
	}
	function success(num){
		res.status(200).json(num);
	}
})
















module.exports = router