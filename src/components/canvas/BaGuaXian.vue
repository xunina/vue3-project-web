<template>
  <div class="bagua-ctn">
    <canvas ref="baGuaXianRef" width="300" height="300"> </canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const baGuaXianRef = ref<HTMLCanvasElement | null>(null)
// 乾 兑 离 震       坤 艮 坎 巽
const guaList = ['\u2630', '\u2631', '\u2632', '\u2633', '\u2637', '\u2636', '\u2635', '\u2634']
const guaTextList = ['乾', '兑', '离 ', '震', '坤', '艮', '坎', '巽']

onMounted(() => {
  const canvas = baGuaXianRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const cx = canvas.width / 2
  const cy = canvas.height / 2
  drawBaGua(ctx, cx, cy, 120, 150, guaList)
})

function drawBaGua(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  inR: number,
  outR: number,
  list: string[],
) {
  if (!ctx) return

  const textInR = 80
  const oneDeg = (Math.PI * 2) / list.length
  ctx.fillStyle = '#F2F0E6'
  ctx.fillRect(0, 0, cx * 2, cy * 2)

  ctx.font = '26px serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  list.forEach((gua, idx) => {
    const rad = -idx * oneDeg - Math.PI / 2
    const x = cx + Math.cos(rad) * (inR + (outR - inR) / 2)
    const y = cy + Math.sin(rad) * (inR + (outR - inR) / 2)
    ctx.fillStyle = '#333333'
    ctx.fillText(gua, x, y)

    const textX = cx + Math.cos(rad) * (textInR + (inR - textInR) / 2)
    const textY = cy + Math.sin(rad) * (textInR + (inR - textInR) / 2)
    ctx.fillStyle = '#8B0000'
    ctx.fillText(guaTextList[idx], textX, textY)
  })

  ctx.beginPath()
  ctx.fillStyle = '#333333'
  ctx.arc(cx, cy, inR, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.fillStyle = '#333333'
  ctx.arc(cx, cy, outR, 0, Math.PI * 2)
  ctx.stroke()
}
</script>

<style lang="css" scoped>
.bagua-ctn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
