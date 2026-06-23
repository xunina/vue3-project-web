<template>
  <nav class="left-tree">
    <el-menu class="tree-nav" mode="vertical" :default-active="activeIndex" @select="handleSelect">
      <el-menu-item
        v-for="route in menuRoutes"
        :key="route.name"
        :index="route.name"
        class="tree-item"
      >
        <span class="item-text">
          {{ route.meta?.title || route.name }}
        </span>
      </el-menu-item>
    </el-menu>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 通过props接收父组件传递的菜单数据
const props = defineProps<{
  menuRoutes: RouteRecordRaw[]
}>()

const router = useRouter()
const route = useRoute()

// 使用props传递的菜单数据
const menuRoutes = computed(() => props.menuRoutes)

// 当前激活的路由
const activeIndex = computed(() => route.name?.toString())

const handleSelect = (key: string) => {
  router.push({ name: key })
}
</script>

<style scoped>
.left-tree {
  height: 100%;
  background-color: #001529;
  color: #fff;
}

.tree-nav {
  border-right: none;
  background-color: transparent;
}

.tree-item {
  color: rgba(255, 255, 255, 0.65);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tree-item:hover {
  background-color: rgba(24, 144, 255, 0.1);
  color: #fff;
}

.tree-item.is-active {
  background-color: #1890ff;
  color: #fff;
  border-right: 3px solid #52c41a;
}

.item-text {
  font-size: 14px;
  font-weight: normal;
}
</style>
