(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1]);
