<script setup lang="ts">
import TaiJiRotate from '@/components/canvas/TaiJiRotate.vue'
import BaGuaXian from '@/components/canvas/BaGuaXian.vue'
import ClipStar from '@/components/canvas/ClipStar.vue'
</script>

<template>
  <div class="card-ctn">
    <el-card class="card-com">
      <template #header>
        <div>
          <span>太极图</span>
        </div>
      </template>
      <TaiJiRotate></TaiJiRotate>
    </el-card>
    <el-card class="card-com">
      <template #header>
        <div>
          <span>先天八卦</span>
        </div>
      </template>
      <BaGuaXian></BaGuaXian>
    </el-card>
    <el-card class="card-com">
      <template #header>
        <div>
          <span>星星</span>
        </div>
      </template>
      <ClipStar></ClipStar>
    </el-card>
  </div>
</template>

<style lang="css" scoped>
.card-ctn {
  min-width: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.card-com {
  max-width: 400px;
  margin: 1rem;
}
</style>
