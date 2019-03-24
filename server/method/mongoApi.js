//增加数据
module.exports.saveData = function(Obj, jsonData, res){
	// console.log(Obj, jsonData)
	new Obj(jsonData).save(function(savsmallErr){
		if(savsmallErr){
			console.log("连接失败");
			return res.status(500).json({
				smallErr_code:2,
				msg:'数据添加失败，请检查服务器！！！',
				msgTitle:'服务器出现问题'
			})
		}
		console.log("连接成功");
		return res.status(200).json({
			smallErr_code:0,
			msg:'文章添加成功！！！',
			msgTitle:'恭喜恭喜！！！！！！'
		})
	})
}
//更新数据
module.exports.upDate = function(Obj, query, jsonData){
	Obj.updateOne(query, jsonData, function(smallErr){
		if(smallErr){
			throw smallErr;
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
module.exports.idDelete = function(Obj, query){
	Obj.deleteOne(query, function(smallErr){
		if(smallErr){
			throw smallErr;
		}
	})
}
//数据条数
module.exports.dataCount = function(Obj, func){
	Obj.find().count(function(err,num){
		func(num);
	})
}
//无条件获取所有数据
module.exports.allFind = function(Obj, func){
	Obj.find(function(err,num){
		func(num);
	})
}

//无条件获取所有数据
module.exports.oneFind = function(Obj, query, func){
	Obj.findOne(query, function(err,num){
		func(num);
	})
}

module.exports.upDataComment = function(Obj, query, res){	
// 	new Obj(query).save(function(err, succ){
// 		console.log(err,succ);
// 	});
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



//根据id更新数据
// module.exports.idUpdata = function(Obj, query, func){
// 	Obj.updataOne(query, function(smallErr,ret){
// 		if(smallErr){
// 			throw smallErr;
// 		}else{
// 			func(ret);
// 		}
// 	})
// }
//所有数据
// module.exports.allFind = function(Obj, func){
// 	Obj.find(function(smallErr,ret){
// 		if(smallErr){
// 			throw smallErr;
// 		}else{
// 			console.log(ret.length);
// 			func(ret);
// 		}
// 	})
// }











// Article.find({$or:[{picpath:''}, {titlepic:''}]}, function(smallErr,ret){
        	// 	if(smallErr){
        	// 		console.log('没有');
        	// 	}
        	// })
        	// Article.remove