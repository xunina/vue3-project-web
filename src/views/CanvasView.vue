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
          <span>星星(裁剪区域)</span>
        </div>
      </template>
      <ClipStar></ClipStar>
    </el-card>
  </div>
</template>

<style lang="css" scoped>
.card-ctn {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px auto;
  width: 100%;
  padding: 20px;
}
.card-com {
  width: 100%;
  height: 100%;
}
</style>
