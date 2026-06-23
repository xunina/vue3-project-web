<template>
  <div class="echarts-container">
    <div ref="chartRef" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef } from 'vue'
import * as echarts from 'echarts/core'

const chartRef = shallowRef<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  initRadarChart()
  resizeChart()
})
onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  if (myChart) {
    myChart.dispose()
  }
})

function initRadarChart() {
  myChart = echarts.init(chartRef.value)
  myChart.setOption({
    title: {
      text: '雷达图',
    },
    legend: {
      data: ['Allocated Budget', 'Actual Spending'],
    },
    radar: {
      indicator: [
        { name: 'Sales', max: 6500 },
        { name: 'Administration', max: 16000 },
        { name: 'Information Technology', max: 30000 },
        { name: 'Customer Support', max: 38000 },
        { name: 'Development', max: 52000 },
        { name: 'Marketing', max: 25000 },
      ],
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: 'Allocated Budget',
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: 'Actual Spending',
          },
        ],
      },
    ],
  })
}
function resizeChart() {
  resizeObserver = new ResizeObserver(() => {
    if (myChart) myChart.resize()
  })
  if (chartRef.value) {
    resizeObserver.observe(chartRef.value)
  }
}
</script>

<style lang="css" scoped>
.echarts-container {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
</style>
