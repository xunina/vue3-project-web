<template>
  <div class="pinia-demo">
    <el-card class="demo-card">
      <template #header>
        <div class="card-header">
          <span>Pinia演示页面 1</span>
        </div>
      </template>
      
      <div class="counter-display">
        <h3>计数器状态</h3>
        <p>当前计数: {{ counter.count }}</p>
        <p>双倍计数: {{ counter.doubleCount }}</p>
      </div>
      
      <div class="counter-actions">
        <el-button type="primary" @click="counter.increment">
          增加计数
        </el-button>
        <el-button @click="resetCounter">
          重置计数
        </el-button>
      </div>
      
      <div class="demo-info">
        <p>这个页面与PiniaDemo2页面共享同一个Pinia store状态</p>
        <p>在一个页面中修改计数，另一个页面会实时更新</p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

const resetCounter = () => {
  counter.count = 0
}
</script>

<style scoped>
.pinia-demo {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.demo-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.counter-display {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.counter-display h3 {
  margin-top: 0;
  color: #409eff;
}

.counter-actions {
  margin-bottom: 20px;
}

.demo-info {
  padding: 10px;
  background-color: #f0f9ff;
  border-left: 4px solid #409eff;
  border-radius: 4px;
}

.demo-info p {
  margin: 5px 0;
  color: #666;
  font-size: 14px;
}
</style>
