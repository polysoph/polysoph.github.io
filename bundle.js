(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var ready = require('domready')
var raf = require('component-raf')

ready(function () {

	var canvas = document.querySelector('canvas')
	var ctx = canvas.getContext('2d')

	var TWO_PI = Math.PI * 2

	var width
	var height

	var particleCount = 4
	var frameCount = 0

	function render () {
		frameCount++
		ctx.fillStyle = 'rgba(32, 32, 32, 0.97)'
		ctx.rect(0, 0, width, height)
		ctx.fill()
		ctx.fillStyle = '#fff'
		ctx.beginPath()
		ctx.translate(width / 2, height / 2)
		ctx.arc(0, 0, 12, 0, TWO_PI, true)
		ctx.fill()
		for (let i = 0; i < particleCount; i++) {
			dot(width/2, height/2, Math.PI * (i/particleCount), width/4)
		}
		raf(render)
	}

	function dot (x, y, rotation, radius) {
		ctx.save()
		ctx.rotate(rotation)
		theta = frameCount / 20.0
		ctx.beginPath()
		ctx.arc(
			Math.cos(theta + radius) * radius / 2,
			Math.sin(theta + rotation) * radius * 1.5,
			4, 0, TWO_PI, true
		)
		ctx.fill()
		ctx.restore()
	}

	function resize () {
		width = canvas.width
		height = canvas.height
	}

	window.addEventListener('resize', resize)

	resize()
	render()
})

},{"component-raf":2,"domready":3}],2:[function(require,module,exports){
/**
 * Expose `requestAnimationFrame()`.
 */

exports = module.exports = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || fallback;

/**
 * Fallback implementation.
 */

var prev = new Date().getTime();
function fallback(fn) {
  var curr = new Date().getTime();
  var ms = Math.max(0, 16 - (curr - prev));
  var req = setTimeout(fn, ms);
  prev = curr;
  return req;
}

/**
 * Cancel.
 */

var cancel = window.cancelAnimationFrame
  || window.webkitCancelAnimationFrame
  || window.mozCancelAnimationFrame
  || window.clearTimeout;

exports.cancel = function(id){
  cancel.call(window, id);
};

},{}],3:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }

});

},{}]},{},[1]);
