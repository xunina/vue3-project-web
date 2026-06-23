<template>
  <div>
    <h3>冒泡排序可视化演示</h3>
    <div class="bar-container" id="barContainer">
      <div
        v-for="(value, index) in targetArray"
        :key="index"
        class="bar"
        :style="{
          height: value * 2 + 'px',
          backgroundColor: getBarColor(index),
        }"
      >
        {{ value }}
      </div>
    </div>
    <div class="controls">
      <button @click="startSort" :disabled="isSorting">开始排序</button>
      <button @click="reset">重置数据</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Ref } from 'vue'
import { onUnmounted, ref } from 'vue'

const targetArray: Ref<number[]> = ref([])
const isSorting = ref(false)
const highlightIndices: Ref<number[]> = ref([]) // 高亮索引
const sortedIndices: Ref<Set<number>> = ref(new Set())
let abortController: AbortController | null = null

// generate array
const generateArray = (size: number = 20) => {
  targetArray.value = Array.from({ length: size }, () => Math.floor(Math.random() * 99))
}

// 核心延时函数，支持AbortController中断
const sleep = (ms: number) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms)
    abortController?.signal.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })
}

// 冒泡排序算法
const startSort = async () => {
  if (isSorting.value) return
  isSorting.value = true
  abortController = new AbortController()

  try {
    const len = targetArray.value.length
    for (let outI: number = 0; outI < len - 1; outI++) {
      sortedIndices.value.add(len - outI)
      for (let inJ: number = 0; inJ < len - 1 - outI; inJ++) {
        highlightIndices.value = [inJ, inJ + 1]
        await sleep(400)
        const curtVal = targetArray.value[inJ]!
        const nextVal = targetArray.value[inJ + 1]!
        if (curtVal > nextVal) {
          targetArray.value[inJ] = nextVal
          targetArray.value[inJ + 1] = curtVal
        }
      }
    }
  } catch (err) {
    if (err instanceof Error && err.name !== 'AbortError') console.error(err)
  } finally {
    isSorting.value = false
    highlightIndices.value = []
    sortedIndices.value = new Set()
  }
}
//重置状态
const reset = () => {
  abortController?.abort()
  isSorting.value = false
  generateArray()
}
function getBarColor(idx: number) {
  if (highlightIndices.value.includes(idx)) {
    return '#FF4500'
  }
  if (sortedIndices.value.has(idx)) {
    return '#98FB98'
  }
  return '#FFB6C1'
}

// 组件挂载时初始化
generateArray()

onUnmounted(() => {
  abortController?.abort()
})
</script>
<style lang="css" scoped>
.bar-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 200px;
  gap: 5px;
  margin-bottom: 10px;
}

.bar {
  width: 30px;
  transition:
    height 0.1s ease,
    background-color 0.1s ease;
}

.controls button {
  margin: 0 5px;
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  background: #409eff;
  color: #fff;
  border-radius: 4px;
}
.controls button:disabled {
  background: #aaa;
  cursor: not-allowed;
}
</style>
