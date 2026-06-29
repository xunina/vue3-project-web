<template>
  <div>
    <el-button @click="clickRefresh"> 生成 </el-button>
    <el-button @click="clickCopy"> 复制 </el-button>
    <el-input
      v-model="chineseName"
      style="display: block; margin-top: 20px; width: 240px"
      placeholder="Please input"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CHINA_NAME, CHINA_CHAR } from '@/constants/common'

const chineseName = ref<string>('')

const getNameFirst = (): string => {
  const index = Math.floor(Math.random() * CHINA_NAME.length)
  return CHINA_NAME[index] || ''
}

const getNameSecond = (): string => {
  const index = Math.floor(Math.random() * CHINA_CHAR.length)
  return CHINA_CHAR[index] || ''
}

const getAllName = () => {
  return getNameFirst() + getNameSecond() + getNameSecond()
}

chineseName.value = getAllName()

const clickRefresh = () => {
  chineseName.value = getAllName()
}

const clickCopy = () => {
  navigator.clipboard
    .writeText(chineseName.value)
    .then(() => {
      ElMessage({
        message: '已成功复制到剪贴板！',
        type: 'success',
      })
    })
    .catch((err) => {
      console.error('复制失败:', err)
      ElMessage.error('复制失败，请重试')
    })
}
</script>
<style lang="css" scoped></style>
