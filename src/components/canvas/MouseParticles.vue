<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const particles = []
const particleCount = 30
const cursor = { x: 0, y: 0 }

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D

const initCanvas = () => {
  canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '9999'
  document.body.appendChild(canvas)

  ctx = canvas.getContext('2d')!
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.2 + 0.1,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    })
  }
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach((p) => {
    p.x += (cursor.x - p.x) * p.speed
    p.y += (cursor.y - p.y) * p.speed

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = p.color
    ctx.fill()
  })

  requestAnimationFrame(animate)
}

const handleResize = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

const handleMouseMove = (e: MouseEvent) => {
  cursor.x = e.clientX
  cursor.y = e.clientY
}

onMounted(() => {
  initCanvas()
  animate()
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.body.removeChild(canvas)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <!-- Canvas is dynamically appended to body -->
</template>

<style scoped>
/* Styles handled in script */
</style>
