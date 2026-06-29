<template>
  <div class="random-ctn">
    <el-card class="card-com">
      <template #header>
        <div>
          <span>随即配色生成</span>
        </div>
      </template>
      <RandomColor></RandomColor>
    </el-card>
    <el-card class="card-com">
      <template #header>
        <div>
          <span>随即昵称生成</span>
        </div>
      </template>
      <RandomName></RandomName>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import RandomName from '@/components/small-tools/RandomName.vue'
import RandomColor from '@/components/small-tools/RandomColor.vue'
</script>
<style lang="css" scoped>
.random-ctn {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  height: 100%;
}
.card-com {
  width: 100%;
  height: 100%;
}
</style>
