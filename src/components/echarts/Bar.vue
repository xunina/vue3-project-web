<template>
  <div class="echarts-container">
    <div ref="chartRef" id="barChart" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, onMounted, onBeforeUnmount } from 'vue'

// // 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'

const chartRef = shallowRef<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  initBarChart()

  resizeBarChart()
})
onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  if (myChart) {
    myChart.dispose()
  }
})

function initBarChart() {
  // 初始化图表，设置配置项
  myChart = echarts.init(chartRef.value)
  myChart.setOption({
    title: {
      text: '柱状图示例',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 13],
        type: 'bar',
      },
    ],
  })
}
function resizeBarChart() {
  resizeObserver = new ResizeObserver((entries) => {
    if (myChart) myChart.resize()
  })
  if (chartRef.value) {
    resizeObserver.observe(chartRef.value)
  }
}
</script>

<style scoped>
.echarts-container {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
</style>
