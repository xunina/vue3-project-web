<template>
  <div class="taiji-ctn">
    <canvas ref="taijiCanvasRef" width="300" height="300"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const taijiCanvasRef = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const radius = 150
const angle = ref<number>(0)
const speed = ref<number>(0.02)

onMounted(() => {
  const canvas = taijiCanvasRef.value
  if (canvas) {
    ctx.value = canvas.getContext('2d')
    animate()
  }
})

function drawTaiJi(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  if (canvas && ctx) {
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#F2F0E6'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(angle.value)

    ctx.beginPath()
    ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2, false)
    ctx.fillStyle = 'white'
    ctx.fill()

    ctx.beginPath()
    ctx.arc(0, 0, radius, Math.PI / 2, -Math.PI / 2, false)
    ctx.fillStyle = 'black'
    ctx.fill()
    // 黑鱼白眼球
    ctx.beginPath()
    ctx.arc(0, 0 - radius / 2, radius / 2, 0, 2 * Math.PI)
    ctx.fillStyle = 'black'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(0, 0 - radius / 2, radius / 6, 0, 2 * Math.PI)
    ctx.fillStyle = 'white'
    ctx.fill()
    // 白鱼黑眼球
    ctx.beginPath()
    ctx.arc(0, 0 + radius / 2, radius / 2, 0, 2 * Math.PI)
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(0, 0 + radius / 2, radius / 6, 0, 2 * Math.PI)
    ctx.fillStyle = 'black'
    ctx.fill()

    ctx.restore()
  }
}

function animate() {
  if (taijiCanvasRef.value && ctx.value) {
    angle.value += speed.value
    drawTaiJi(taijiCanvasRef.value, ctx.value)
  }
  requestAnimationFrame(animate)
}
</script>

<style scoped>
.taiji-ctn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
