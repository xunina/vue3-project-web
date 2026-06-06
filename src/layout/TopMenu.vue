<template>
  <nav class="top-menu">
    <el-menu
      class="menu-nav"
      mode="horizontal"
      :default-active="activeIndex"
      @select="handleSelect"
    >
      <el-menu-item v-for="menuRo in menuRoutes" :key="menuRo.name" :index="menuRo.name">
        {{ menuRo.meta?.title || menuRo.name }}
      </el-menu-item>
    </el-menu>
  </nav>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// 通过props接收父组件传递的菜单数据
const props = defineProps<{
  menuRoutes: any[]
}>()

const router = useRouter()
const route = useRoute()

// 使用props传递的菜单数据
const menuRoutes = computed(() => props.menuRoutes)
// 当前激活的路由
const activeIndex = computed(() => {
  const matched = route.matched
  const topMenuNames = menuRoutes.value.map((item) => item.name)
  for (let i = 0; i < matched.length; i++) {
    if (topMenuNames.includes(matched[i]?.name)) {
      return matched[i]?.name?.toString()
    }
  }

  console.log(route.name?.toString(), route?.matched)
  return route.name?.toString() || ''
})

const handleSelect = (key: string) => {
  router.push({ name: key })
}
</script>

<style scoped>
.top-menu {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.menu-nav {
  flex: 1;
  border-bottom: none;
  background-color: transparent;
}

.menu-nav .el-menu-item {
  color: #fff;
  border-bottom: 2px solid transparent;
}

.menu-nav .el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.menu-nav .el-menu-item.is-active {
  background-color: rgba(255, 255, 255, 0.2);
  border-bottom-color: #409eff;
  color: #fff;
}
</style>
