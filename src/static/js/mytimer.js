function getTime(time){
      var data = new Date(time);
      var year = data.getFullYear();
      var month = data.getMonth()+1;
      month = month>9 ? month : "0" + month; 
      var date = data.getDate();
      date = date>9 ? date : "0" + date;
      var hour = data.getHours();
      hour = hour>9 ? hour : "0" + hour;
      var miunte = data.getMinutes();
      miunte = miunte>9 ? miunte : "0" + miunte;
      var second = data.getSeconds();
      second = second>9 ? second : "0" + second;
      var mytimer = year+"/"+month+"/"+date+" "+hour+":"+miunte+":"+second
      return mytimer
}

//方法导出不用加括号
export default getTime

 