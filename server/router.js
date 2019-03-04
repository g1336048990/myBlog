//引入核心模块
var express = require('express')
var formidable = require('formidable')
var path = require('path')
//引入shcema
var Article = require('./schema/article')
var Notice = require('./schema/notice')
//引入封装的函数
var mongoApi = require('./method/mongoApi')
// var baseMethod = require('./method/baseMethod')
//实例路由
var router = express.Router()

// 配置全局路由拦截器，拦截不是规则内的请求,后期优化使用switch提高运行速度
router.all('*', (req, res, next) => {
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
	}
	else if(req.url.indexOf('/server') == 0){
		res.end("");
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
	// console.log(req.body);
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

/*-------------------------------------------分割线（全局配置）-------------------------------------------*/

//全局配置图片上传根据上传携带的数据进行判断是哪个类型的
router.post('/change', (req, res, next) => {
    var form = new formidable.IncomingForm();
    //为了能更好的保存文件在本地服务器目录,需要手动创建文件目录
    form.uploadDir = path.join(__dirname, 'files');
    //设置大小
    form.keepExtensions = true;
    //保留后缀名
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