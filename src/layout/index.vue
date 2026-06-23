<template>
  <div class="layout-container">
    <!-- 顶部导航 -->
    <header class="layout-header">
      <TopMenu :menuRoutes="topMenuRoutes" />
    </header>
    <button class="button-com" v-if="isMobile && leftMenuRoutes.length > 0" @click="toggleLeftMenu">
      {{ isLeftMenuOpen ? '关闭' : '打开' }}左侧树
    </button>

    <div class="layout-body">
      <!-- 左侧边栏 -->
      <aside v-if="isMobile && isLeftMenuOpen">
        <leftTree :menuRoutes="leftMenuRoutes" />
      </aside>
      <aside v-if="!isMobile && leftMenuRoutes.length" class="layout-sidebar">
        <leftTree :menuRoutes="leftMenuRoutes" />
      </aside>

      <!-- 主内容区域 -->
      <main class="layout-main">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'
import TopMenu from './TopMenu.vue'
import leftTree from './leftTree.vue'

const router = useRouter()
const route = useRoute()

const isLeftMenuOpen = ref(false)
const isMobile = ref(false)

const toggleLeftMenu = () => {
  isLeftMenuOpen.value = !isLeftMenuOpen.value
}

const handleResize = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// 获取顶部菜单数据 - 第一层路由
const topMenuRoutes = computed(() => {
  return router.getRoutes().filter((r) => r.meta?.showInMenu && r.path.split('/').length === 2)
})

// 获取左侧菜单数据 - 当前激活路由的子路由
const leftMenuRoutes = computed(() => {
  let targetParent = null
  for (let i = 0; i < route.matched.length; i++) {
    const record = route.matched[i]
    if (record?.meta?.isTopMenu) {
      targetParent = record
      break
    }
  }

  if (!targetParent && route.matched.length > 0) {
    targetParent = route.matched[0]
  }

  if (targetParent && targetParent.children) {
    return targetParent.children.filter((r) => r.meta?.showInMenu)
  }

  return []
})
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header {
  height: 60px;
  background-color: #001529;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.layout-body {
  flex: 1;
  display: flex;
  height: calc(100% - 60px);
}

.layout-sidebar {
  width: 240px;
  background-color: #f5f5f5;
  border-right: 1px solid #e8e8e8;
  overflow-y: auto;
}

.layout-main {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  overflow-y: auto;
}

.button-com {
  background-color: #001529;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
