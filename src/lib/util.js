function getTotal(title) {
	$.get('/control/getTotal?name='+title, data => {
		return data;
	})
}


export default getTotal