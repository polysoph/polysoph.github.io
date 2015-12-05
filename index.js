/*!
 * domready (c) Dustin Diaz 2014 - License MIT
 */
!function(e,t){typeof module!="undefined"?module.exports=t():typeof define=="function"&&typeof define.amd=="object"?define(t):this[e]=t()}("domready",function(){var e=[],t,n=document,r=n.documentElement.doScroll,i="DOMContentLoaded",s=(r?/^loaded|^c/:/^loaded|^i|^c/).test(n.readyState);return s||n.addEventListener(i,t=function(){n.removeEventListener(i,t),s=1;while(t=e.shift())t()}),function(t){s?setTimeout(t,0):e.push(t)}})

;(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o']
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame']
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
			|| window[vendors[x]+'CancelRequestAnimationFrame']
	}

	if (!window.requestAnimationFrame)
	window.requestAnimationFrame = function(callback, element) {
		var currTime = new Date().getTime()
		var timeToCall = Math.max(0, 16 - (currTime - lastTime))
		var id = window.setTimeout(function() { callback(currTime + timeToCall) },
		timeToCall)
		lastTime = currTime + timeToCall
		return id
	};

	if (!window.cancelAnimationFrame)
	window.cancelAnimationFrame = function(id) {
		clearTimeout(id)
	}
}())


domready(function () {

	var TWO_PI = Math.PI * 2

	var canvas = document.querySelector('canvas')
	var ctx = canvas.getContext('2d')

	var width
	var height

	var particleCount = 4
	var frameCount

	function render () {
		ctx.clearRect(0, 0, width, height)
		ctx.fillStyle = '#fff'
		ctx.beginPath()
		ctx.arc(width / 2, height / 2, 15, 0, TWO_PI, true)
		ctx.fill()
	}

	function resize () {
		width = canvas.width
		height = canvas.height
	}

	resize()
	render()
})
