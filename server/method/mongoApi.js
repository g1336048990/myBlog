//增加数据
module.exports.saveData = function(Obj, jsonData, res){
	// console.log(jsonData)
	new Obj(jsonData).save(function(savsmallErr){
		if(savsmallErr){
			return res.status(500).json({
				smallErr_code:2,
				msg:'数据添加失败，请检查服务器！！！',
				msgTitle:'服务器出现问题'
			})
		}
		console.log("连接成功");
		if(('videoName' in jsonData || 'imageName' in jsonData) && 'filePath' in jsonData) {
			return res.status(200).json({
				smallErr_code:0,
				msg:'文章添加成功！！！',
				msgTitle:'恭喜恭喜！！！！！！',
				videoName: 'videoName' in jsonData? jsonData.videoName: jsonData.imageName,
				filePath: jsonData.filePath
			})
		}else {
			console.log('添加文章测试')
			return res.status(200).json({
				smallErr_code:0,
				msg:'文章添加成功！！！',
				msgTitle:'恭喜恭喜！！！！！！'
			})
		}
		
	})
}
//更新数据
module.exports.upDate = function(Obj, query, jsonData, res){
	Obj.updateOne(query, jsonData, function(smallErr){
		if(smallErr){
			throw smallErr;
		}else {
			if(Obj == 'User') {
				res.status(200).json(jsonData)
			}else {
				res.status(200).json('chenggong')
			}
			
		}
	})
}
module.exports.upDate_head_pic = function(Obj, query, jsonData, imageUrl,res){
	Obj.updateOne(query, jsonData, function(smallErr){
		if(smallErr){
			throw smallErr;
		}else {
			res.status(200).json(imageUrl)	
		}
	})
}
//只要某些的数据,并且按照时间顺序降序
module.exports.someFind = function(Obj, func, condition, timeCondition, indexPage){
	Obj.find({}, condition, function(smallErr,ret){
		if(smallErr){
			throw smallErr;
		}else{
			func(ret);
		}
	}).sort(timeCondition).skip(Number(indexPage)*10).limit((Number(indexPage)+1)*10)
}
//查询出符合条件的数据,并且按照时间顺序降序
module.exports.categoryFind = function(Obj, func, query, timeCondition, indexPage){
	Obj.find(query, function(smallErr,ret){
		if(smallErr){
			throw smallErr;
		}else{
			func(ret);
		}
	}).sort(timeCondition).skip(Number(indexPage)*10).limit((Number(indexPage)+1)*10)
}

module.exports.categoryAllFind = function(Obj, func, timeCondition, indexPage){
	Obj.find(function(smallErr,ret){
		if(smallErr){
			throw smallErr;
		}else{
			func(ret);
		}
	}).sort(timeCondition).skip(Number(indexPage)*10).limit((Number(indexPage)+1)*10)
}

//根据id找数据
module.exports.idFind = function(Obj, query, func){
	Obj.findById(query, function(smallErr,ret){
		if(smallErr){
			throw smallErr;
		}else{
			func(ret);
		}
	})
}
//删除数据
module.exports.idDelete = function(Obj, query, res){
	Obj.deleteOne(query, function(smallErr){
		if(smallErr){
			throw smallErr;
		}else {
			res.status(200).json('sahnchuchengong')
		}
	})
}
module.exports.manyRemove = function(Obj, query, res){
	Obj.deleteMany(query, function(smallErr){
		if(smallErr){
			throw smallErr;
		}else {
			res.status(200).json('sahnchuchengong')
		}
	})
}
//数据条数
module.exports.dataCount = function(Obj, func){
	Obj.find().count(function(err,num){
		func(num);
	})
}
//数据条数,条件限制
module.exports.dataCounts = function(Obj, condition, func){
	Obj.find(condition).count(function(err,num){
		func(num);
	})
}
//无条件获取所有数据
module.exports.allFind = function(Obj, func){
	Obj.find(function(err,num){
		func(num);
	})
}

//只要某些的数据,并且按照时间顺序降序
module.exports.allFind_indexPage = function(Obj, func, indexPage){
	Obj.find(function(smallErr,ret){
		if(smallErr){
			throw smallErr;
		}else{
			func(ret);
		}
	}).skip(Number(indexPage)*10).limit((Number(indexPage)+1)*10)
}
//无条件获取所有数据
module.exports.oneFind = function(Obj, query, func){
	Obj.findOne(query, function(err,num){
		func(num);
	})
}

module.exports.upDataComment = function(Obj, query, res){
	Obj.updateOne({articleid: query.articleid}, {$push: {comment: query.comment}}, function(err){
		if(err) {
			console.log(err)
		}else{
			console.log("chengogng")
			res.status(200).json("成功");
		}
	})
}

module.exports.findAllComment = (Obj, query, func) => {
	Obj.findOne({articleid: query}, {comment: 1}, (err, num) => {
		func(num);
	})
}


module.exports.idFindAndDeleteOne = (Obj, query, body, res) => {
	delete body.createdTime;
	console.log(body);
	Obj.updateOne(query, {$pull: {"comment": body}}, function(err){
		if(err) {
		}else{
			res.status(200).json("成功");
		}
	})
}

module.exports.getFiveNotice = function(Obj, func, condition, timeCondition){
	Obj.find({}, condition, function(smallErr,ret){
		if(smallErr){
			throw smallErr;
		}else{
			func(ret);
		}
	}).sort(timeCondition).skip(0).limit(5)
}
module.exports.getTenArticle = function(Obj, func, condition, timeCondition){
	Obj.find({}, condition, function(smallErr,ret){
		if(smallErr){
			throw smallErr;
		}else{
			func(ret);
		}
	}).sort(timeCondition).skip(0).limit(10)
}










module.exports.get_search_data = (Obj, query, func) => {
	Obj.find(query, function(err, data){
		if(err){
			func({code: 1})
		}else{
			func(data);
		}
	})
}