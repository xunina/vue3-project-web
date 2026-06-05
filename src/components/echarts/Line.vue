<template>
  <div class="echarts-container">
    <div ref="chartRef" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { init } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'

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

const chartRef = ref<HTMLElement>()
let chart: any = null
let resizeObserver: ResizeObserver | null = null

const initChart = () => {
  if (!chartRef.value) return

  chart = init(chartRef.value, null, {
    renderer: 'svg',
    components: [GridComponent, TooltipComponent, LegendComponent, LineChart],
  })

  updateChart()
}

const updateChart = () => {
  if (!chart) return
  chart.setOption(props.option)
}

function resizeChart() {
  resizeObserver = new ResizeObserver((entries) => {
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
