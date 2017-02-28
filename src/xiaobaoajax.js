let createXHR = function () {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest()
	} else {
	}
}
let params = function (data) {
	let arr = []
	for (let i in data) {
		arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]))
	}
	return arr.join('&')
}
let ajax = function (obj) {
	let xhr = createXHR()
	let callback = function () {
		if (xhr.status === 200) {
            obj.callBack(xhr.responseText)
        } else {
            alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText)
        }
	}
	obj.url = obj.url + '?rand=' + Math.random()
	obj.data = params(obj.data)
	if (obj.method === 'get') {
        obj.url += obj.url.indexOf('?') === -1 ? '?' + obj.data : '&' + obj.data
    }
    if (obj.async === true) {
    	xhr.onreadystatechange = function () {
    		if (xhr.readyState === 4) {
    			callback()
    		}
    	}
    }
    xhr.open(obj.method, obj.url, obj.async)
    if (obj.method === 'post') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(obj.data)
    } else {
        xhr.send(null)
    }
    if (obj.async === false) {
        callback()
    }
}

export default ajax
