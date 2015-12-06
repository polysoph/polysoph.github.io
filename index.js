
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
