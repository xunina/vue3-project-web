<template>
  <div class="echarts-container">
    <div ref="chartRef" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, watch, onMounted, onBeforeUnmount } from 'vue'
import { init } from 'echarts/core'

const props = defineProps({
  width: {
    type: String,
    default: '600px',
  },
  height: {
    type: String,
    default: '400px',
  },
  option: {
    type: Object,
    required: true,
  },
})

const chartRef = shallowRef<HTMLElement>()
let chart: any = null
let resizeObserver: ResizeObserver | null = null

const initChart = () => {
  if (!chartRef.value) return

  chart = init(chartRef.value, null, {
    renderer: 'svg',
  })

  updateChart()
}

const updateChart = () => {
  if (!chart) return
  chart.setOption(props.option)
}

function resizeChart() {
  resizeObserver = new ResizeObserver(() => {
    if (chart) chart.resize()
  })
  if (chartRef.value) {
    resizeObserver.observe(chartRef.value)
  }
}

onMounted(() => {
  initChart()
  resizeChart()
})
onBeforeUnmount(() => {
  chart?.dispose()
  resizeObserver?.disconnect()
})
watch(() => props.option, updateChart, { deep: true })
</script>
<style scoped>
.echarts-container {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
</style>
