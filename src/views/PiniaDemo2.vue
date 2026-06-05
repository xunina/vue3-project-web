<template>
  <div class="pinia-demo-2">
    <el-card class="demo-card-2">
      <template #header>
        <div class="card-header-2">
          <span>Pinia演示页面 2</span>
        </div>
      </template>
      
      <div class="counter-status">
        <h3>实时计数器状态</h3>
        <div class="counter-values">
          <el-statistic title="当前计数" :value="counter.count" />
          <el-statistic title="双倍计数" :value="counter.doubleCount" />
        </div>
      </div>
      
      <div class="counter-controls">
        <h4>计数器控制</h4>
        <div class="button-group">
          <el-button type="success" @click="counter.increment">
            +1 增加
          </el-button>
          <el-button type="danger" @click="decrement">
            -1 减少
          </el-button>
          <el-button type="info" @click="resetCounter">
            重置为0
          </el-button>
        </div>
      </div>
      
      <div class="demo-explanation">
        <el-alert type="info" :closable="false">
          <p>这个页面与PiniaDemo1页面共享同一个Pinia store状态</p>
          <p>在任意页面修改计数，两个页面都会实时同步更新</p>
          <p>这展示了Pinia状态管理的跨组件通信能力</p>
        </el-alert>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

const decrement = () => {
  if (counter.count > 0) {
    counter.count--
  }
}

const resetCounter = () => {
  counter.count = 0
}
</script>

<style scoped>
.pinia-demo-2 {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.demo-card-2 {
  margin-bottom: 20px;
}

.card-header-2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: #409eff;
}

.counter-status {
  margin-bottom: 30px;
  text-align: center;
}

.counter-status h3 {
  margin-bottom: 20px;
  color: #303133;
}

.counter-values {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.counter-controls {
  margin-bottom: 30px;
  text-align: center;
}

.counter-controls h4 {
  margin-bottom: 15px;
  color: #606266;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.demo-explanation {
  margin-top: 20px;
}
</style>
