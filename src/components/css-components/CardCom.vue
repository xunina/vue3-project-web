<template>
  <div
    class="stack-container"
    :class="{ 'is-active': active }"
    @touchstart="active = true"
    @touchend="active = false"
  >
    <div class="card card-1">
      <div class="card-content">
        <h3>UI设计</h3>
        <p class="desc">掌握视觉规范与组件布局</p>
        <div class="details">核心知识点：栅格系统、色彩理论、响应式适配</div>
      </div>
    </div>
    <div class="card card-2">
      <div class="card-content">
        <h3>交互逻辑</h3>
        <p class="desc">掌握事件</p>
        <div class="details">核心知识点：浏览器的事件流，捕获阶段、目标阶段、冒泡阶段</div>
      </div>
    </div>
    <div class="card card-3">
      <div class="card-content">
        <h3>性能优化</h3>
        <p class="desc">掌握性能优化原理</p>
        <div class="details">
          核心知识点：网络加载优化、js代码执行优化、DOM&渲染优化、接口与数据请求优化、构建打包优化、框架专项优化
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref(false)
</script>

<style lang="css" scoped>
.stack-container {
  --card-width: 280px;
  --card-height: 380px;
  --glass-bg: rgba(39, 42, 207, 0.15);
  --card1-color: rgba(100, 181, 246, 0.2);

  position: relative;
  width: var(--card-width);
  height: var(--card-height);
  perspective: 1000px;
}

.card {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: var(--glass-bg);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(250, 10, 10, 0.15);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-content {
  text-align: center;
  color: #fff;
  padding: 20px;
  width: 100%;
}

.card-1 {
  z-index: 3;
  background: var(--card1-color);
  transform: translateZ(0);
}
.card-2 {
  z-index: 2;
  transform: translateZ(-30px) translateY(-20) scale(0.95);
}
.card-3 {
  z-index: 1;
  transform: translateZ(-60px) translateY(-40px) scale(0.9);
}

@media (hover: hover) {
  .stack-container:hover .card-1 {
    transform: translateX(-120px) rotate(-10deg);
  }
  .stack-container:hover .card-2 {
    transform: translateX(0) rotate(1.05);
  }
  .stack-container:hover .card-3 {
    transform: translateX(120px) rotate(10deg);
  }
}
.stack-container.is-active .card-1 {
  transform: translateX(-120px) rotate(-10deg);
}
.stack-container.is-active .card-2 {
  transform: translateX(0) rotate(1.05);
}
.stack-container.is-active .card-3 {
  transform: translateX(120px) rotate(10deg);
}
</style>
