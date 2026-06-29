<template>
  <div class="color-ctn">
    <div class="tool-wrap">
      <el-select v-model="optionValue" placeholder="Select" style="width: 240px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button style="margin-left: 20px" @click="clickRefresh"> 生成 </el-button>
    </div>
    <div class="color-card-wrap">
      <!-- 根据颜色属生成对应的色块 -->
      <div
        v-for="item in colorList"
        :key="item.colorName"
        class="color-card"
        :style="{ background: item.colorName }"
      >
        <div>{{ item.colorDesc }}</div>
        <div>{{ item.colorName }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
interface Color {
  colorName: string
  colorDesc: string
}

const colorList = ref<Color[]>([])
const optionValue = ref<number>(2)
const options = [
  {
    value: 2,
    label: 2,
  },
  {
    value: 3,
    label: 3,
  },
  {
    value: 4,
    label: 4,
  },
]

watch(optionValue, () => {
  generateColor()
})

const clickRefresh = () => {
  generateColor()
}

const generateColor = () => {
  switch (optionValue.value) {
    case 2:
      generateTwoColor()
      break
    case 3:
      generateThreeColor()
      break
    case 4:
      generateFourColor()
      break
  }
}

// 互补色： 主色相  主色相+180
const generateTwoColor = () => {
  const mainHue = Math.floor(Math.random() * 360) // 随机一个颜色值
  const colorFirst = hslToHex(mainHue, 75, 60)
  const colorSecond = hslToHex((mainHue + 180) % 360, 75, 60)
  colorList.value = [
    {
      colorName: colorFirst,
      colorDesc: '主色',
    },
    {
      colorName: colorSecond,
      colorDesc: '互补强调色',
    },
  ]
}
// 三配色： 颜色每隔120
const generateThreeColor = () => {
  const mainHue = Math.floor(Math.random() * 360) // 随机一个颜色值
  const colorFirst = hslToHex(mainHue, 75, 60)
  const colorSecond = hslToHex((mainHue + 120) % 360, 75, 60)
  const colorThrid = hslToHex((mainHue + 240) % 360, 75, 60)
  colorList.value = [
    {
      colorName: colorFirst,
      colorDesc: '主色',
    },
    {
      colorName: colorSecond,
      colorDesc: '辅助色1',
    },
    {
      colorName: colorThrid,
      colorDesc: '辅助色2',
    },
  ]
}
// 四分色  主色  主色+30  互补色 互补色+30
const generateFourColor = () => {
  const mainHue = Math.floor(Math.random() * 360) // 随机一个颜色值
  const colorFirst = hslToHex(mainHue, 75, 60)
  const colorSecond = hslToHex((mainHue + 30) % 360, 75, 60)
  const colorThrid = hslToHex((mainHue + 180) % 360, 75, 60)
  const colorFour = hslToHex((mainHue + 210) % 360, 75, 60)

  colorList.value = [
    {
      colorName: colorFirst,
      colorDesc: '主色',
    },
    {
      colorName: colorSecond,
      colorDesc: '次要主色',
    },
    {
      colorName: colorThrid,
      colorDesc: '互补强调色',
    },
    {
      colorName: colorFour,
      colorDesc: '辅助强调色',
    },
  ]
}

/**
 * @param h 色相
 * @param s 饱和度
 * @param l 亮度
 */
const hslToHex = (h: number, s: number, l: number): string => {
  // 将输入值转换为0-1之间的数
  h /= 360
  s /= 100
  l /= 100
  let r: number = 0
  let g: number = 0
  let b: number = 0
  if (s === 0) {
    // 如果饱和度为0,RGB三个通道的值都等于亮度l
    r = g = b = 1
  } else {
    // q代表了颜色分量在亮部的基准值
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hueToRgb(p, q, h + 1 / 3)
    g = hueToRgb(p, q, h)
    b = hueToRgb(p, q, h - 1 / 3)
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

const toHex = (x: number) => ('00' + Math.round(x * 255).toString(16)).slice(-2)

const hueToRgb = (p: number, q: number, t: number): number => {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

generateColor()
</script>
<style lang="css" scoped>
.color-ctn {
  width: 100%;
  height: 100%;
}
.tool-wrap {
  display: flex;
  flex-direction: row;
}
.color-card-wrap {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
}
.color-card {
  width: 100px;
  height: 130px;
  color: #fff;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
