<script setup lang="ts">
import TaiJiRotate from '@/components/TaiJiRotate.vue'
import BaGuaXian from '@/components/BaGuaXian.vue'
</script>

<template>
  <main class="card-ctn">
    <el-card class="card-com">
      <template #header>
        <div>
          <span> 太极图 canvas </span>
        </div>
      </template>
      <TaiJiRotate></TaiJiRotate>
    </el-card>
    <el-card class="card-com">
      <template #header>
        <div>
          <span>先天八卦 canvas</span>
        </div>
      </template>
      <BaGuaXian></BaGuaXian>
    </el-card>
  </main>
</template>

<style lang="css" scoped>
.card-ctn {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.card-com {
  max-width: 410px;
  margin: 1rem;
}
</style>
