<template>
  <div class="star-ctn">
    <canvas ref="starRef" width="300" height="300"> </canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const starRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const canvas = starRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const centerX = canvas.width / 2
  const centerY = canvas.height / 2

  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.translate(centerX, centerY)

  // Create a circular clipping path
  ctx.beginPath()
  ctx.arc(0, 0, centerX - 20, 0, Math.PI * 2, true)
  ctx.clip()

  // draw background
  const lingrad = ctx.createLinearGradient(0, -centerX, 0, centerX)
  lingrad.addColorStop(0, '#232256')
  lingrad.addColorStop(1, '#143778')

  ctx.fillStyle = lingrad
  ctx.fillRect(-centerX, -centerY, canvas.width, canvas.height)

  // draw star
  for (let i = 1; i < 75; i++) {
    ctx.save()
    ctx.fillStyle = '#fff'
    ctx.translate(
      centerX - Math.floor(Math.random() * canvas.width),
      centerY - Math.floor(Math.random() * canvas.height),
    )
    drawStar(ctx, Math.floor(Math.random() * 4) + 2)
    ctx?.restore()
  }
})

function drawStar(ctx: CanvasRenderingContext2D, r: number) {
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(r, 0)
  for (let i = 0; i < 9; i++) {
    ctx.rotate(Math.PI / 5)
    if (i % 2 === 0) {
      ctx.lineTo((r / 0.525731) * 0.200811, 0)
    } else {
      ctx.lineTo(r, 0)
    }
  }
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}
</script>

<style lang="css" scoped>
.star-ctn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
