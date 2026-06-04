<template>
  <div class="echarts-container">
    <div ref="chartRef" id="barChart" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// // 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'

const chartRef = ref<HTMLElement | null>(null)

onMounted(() => {
  initBarChart()
})

function initBarChart() {
  // 接下来的使用就跟之前一样，初始化图表，设置配置项
  const myChart = echarts.init(chartRef.value)
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
</script>

<style scoped>
.echarts-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}
</style>
