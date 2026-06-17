<script setup lang="ts">
import VChart from 'vue-echarts'
import type { ECharts } from 'echarts'
import { registerMap } from 'echarts/core'
import { saveAs } from 'file-saver'
import { LEVEL_LIST, CITY_LIST } from '@/const'
import AnhuiJSON from '@/assets/map/anhui.json'
import { data, eventBus, isDark, score } from '@/state'

registerMap('anhui', AnhuiJSON as any)

const selectorRef = ref<HTMLDivElement>()
const chartRef = ref<ECharts>()

const currentIndex = ref<number>()
const currentValue = computed({
  get() {
    return isDefined(currentIndex) ? data.value[currentIndex.value] : 0
  },
  set(value) {
    isDefined(currentIndex) && (data.value[currentIndex.value] = value)
  },
})

const option = computed(() => {
  return {
    backgroundColor: 'transparent',
    title: [
      {
        text: '安徽制霸',
        left: '5%',
        top: '3%',
        textStyle: {
          fontSize: 40,
          fontFamily: 'Noto Serif SC',
        },
      },
      {
        text: `分数：${score.value}`,
        left: '5%',
        bottom: '3%',
        textStyle: {
          fontSize: 45,
          fontFamily: 'Noto Serif SC',
        },
      },
    ],
    tooltip: {
      show: true,
      triggerOn: 'click',
      enterable: true,
      padding: 0,
      borderWidth: 2,
      formatter(params) {
        const { name } = params as { name: string }
        currentIndex.value = CITY_LIST.findIndex(item => item === name)
        return unref(selectorRef) || ''
      },
    },
    visualMap: {
      type: 'piecewise',
      right: '5%',
      bottom: '5%',
      orient: 'vertical',
      min: -1,
      max: 5,
      itemGap: 0,
      splitNumber: 6,
      inRange: {
        color: LEVEL_LIST.map(item => item.color),
      },
      formatter(opt) {
        return LEVEL_LIST[Number(opt) + 1]?.text
      },
      itemSymbol: 'rect',
      itemHeight: 25,
      itemWidth: 60,
      textStyle: {
        fontSize: 18,
        fontFamily: 'Noto Serif SC',
      },
    },
    series: [
      {
        type: 'map',
        map: 'anhui',
        roam: true,
        label: {
          show: true,
          fontFamily: 'Noto Serif SC',
          fontSize: 12,
        },
        itemStyle: {
          borderWidth: 2,
        },
        emphasis: {
          disabled: true,
        },
        selectedMode: false,
        data: data.value.map((value, index) => ({
          name: CITY_LIST[index],
          value: +value,
        })),
      },
    ],
    media: [
      {
        query: { maxWidth: 600 },
        option: {
          title: [
            {
              textStyle: { fontSize: 26 },
            },
            {
              textStyle: { fontSize: 30 },
            },
          ],
          visualMap: {
            orient: 'horizontal',
            left: 'center',
            right: 'auto',
            bottom: '3%',
            itemHeight: 16,
            itemWidth: 42,
            textStyle: { fontSize: 14 },
          },
          series: [
            {
              roam: false,
              label: { fontSize: 10 },
            },
          ],
        },
      },
    ],
  } as EChartsOption
})

onMounted(() => {
  if (isDefined(selectorRef))
    unref(selectorRef)?.parentNode?.removeChild(unref(selectorRef))
})

// 地图 eventbus
eventBus.on(({ name }) => {
  if (name === 'share') downLoad()
})

function downLoad() {
  const dataURL = chartRef.value?.getDataURL({
    type: 'png',
    pixelRatio: 2,
    backgroundColor: unref(isDark) ? '#333' : '#efb4b4',
  })
  if (dataURL) saveAs(dataURL, `安徽制霸-${Date.now()}.png`)
}
</script>

<template>
  <div class="h-full">
    <VChart
      ref="chartRef"
      :theme="isDark ? 'dark' : ''"
      :option="option"
      autoresize
    />
    <div ref="selectorRef">
      <Selector v-model="currentValue" :idx="currentIndex" />
    </div>
  </div>
</template>
