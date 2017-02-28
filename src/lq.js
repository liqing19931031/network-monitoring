let lQuery = function (selector, context) {
	console.log(selector, context)
}
window.lQuery = window.$ = lQuery

export default lQuery
