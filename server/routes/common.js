/**
 * 引入核心模块
 */
const express = require('express')
/**
 * 引入表结构
 */
const Article = require('../schema/article')
const Notice = require('../schema/notice')
const Category = require('../schema/category')
const imageCategory = require('../schema/imageCategory')
const Comment = require('../schema/comment')
const Localhost = require('../schema/localhost')
const User = require('../schema/user')
const LoginLog = require('../schema/loginLog')
const Video = require('../schema/video')
const Image = require('../schema/image')
//引入封装的函数
const mongoApi = require('../method/mongoApi')
// var baseMethod = require('./method/baseMethod')
//实例路由
const router = express.Router()

router.get('/request_search_category', (req, res) => {
	switch(req.query.name) {
		case 'article':
			mongoApi.get_search_data(Article, {title: {$regex:req.query.data, $options:"mi"}}, data => {
				res.status(200).json(data)
			});
			break;
		case 'notice':
			mongoApi.get_search_data(Notice, {content: {$regex:req.query.data, $options:"mi"}}, data => {
				res.status(200).json(data)
			});
			break;
		case 'comment':
			mongoApi.get_search_data(Comment, {articleName: {$regex:req.query.data, $options:"mi"}}, data => {
				res.status(200).json(data)
			});
			break;
		case 'user':
			mongoApi.get_search_data(User, {userName: {$regex:req.query.data, $options:"mi"}}, data => {
				res.status(200).json(data)
			});
			break;
		case 'loginLog':
			mongoApi.get_search_data(LoginLog, {name: {$regex:req.query.data, $options:"mi"}}, data => {
				res.status(200).json(data)
			});
			break;
		case 'video':
			mongoApi.get_search_data(Video, {videoName: {$regex:req.query.data, $options:"mi"}}, data => {
				res.status(200).json(data)
			});
			break;
		case 'image':
			mongoApi.get_search_data(Image, {imageName: {$regex:req.query.data, $options:"mi"}}, data => {
				res.status(200).json(data)
			});
			break;
	}
})

module.exports = router