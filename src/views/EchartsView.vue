<template>
  <div class="echarts-container">
    <Bar></Bar>
  </div>
</template>

<script setup lang="ts">
import Bar from '@/components/echarts/Bar.vue'
</script>

<style scoped>
.echarts-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
}
</style>
