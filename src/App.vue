<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, RouterView, useRoute } from 'vue-router'
import MouseParticles from '@/components/canvas/MouseParticles.vue'

const router = useRouter()
const route = useRoute()
const activeIndex = computed(() => route.name?.toString() || 'home')

// 过滤需要显示在菜单中的路由
const menuRoutes = computed(() => {
  return router
    .getRoutes()
    .filter((r) => r.meta?.showInMenu)
    .sort((a, b) => (a.meta?.order || 0) - (b.meta?.order || 0))
})

const handleSelect = (key: string) => {
  console.log('key', key)
  router.push({ name: key })
}
</script>

<template>
  <header>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="r in menuRoutes" :key="r.name" :index="r.name?.toString()">
        {{ r.meta?.title || r.name }}
      </el-menu-item>
    </el-menu>
  </header>

  <MouseParticles />
  <RouterView />
</template>

<style scoped>
@media (min-width: 1024px) {
}
</style>
