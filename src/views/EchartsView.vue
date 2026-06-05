<template>
  <div class="echarts-ctn">
    <Line :option="lineOption" />
    <Bar></Bar>
  </div>
</template>

<script setup lang="ts">
import Bar from '@/components/echarts/Bar.vue'
import Line from '@/components/echarts/Line.vue'

const lineOption = {
  title: {
    text: '月度销售趋势',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['产品A', '产品B', '产品C'],
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '产品A',
      type: 'line',
      data: [120, 200, 150, 80, 70, 110],
      smooth: true,
    },
    {
      name: '产品B',
      type: 'line',
      data: [85, 95, 90, 95, 110, 130],
      smooth: true,
    },
    {
      name: '产品C',
      type: 'line',
      data: [60, 80, 75, 110, 90, 100],
      smooth: true,
    },
  ],
}
</script>

<style scoped>
.echarts-ctn {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px auto;
  width: 100%;
  padding: 20px;
}
</style>
