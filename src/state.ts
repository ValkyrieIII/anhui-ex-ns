import { CACHE_KEY, CITY_LIST } from '@/const'

export const isDark = useDark()

export const eventBus = useEventBus<{ name: 'share' }>('chart-event-bus')

export const data = useLocalStorage<number[]>(
  CACHE_KEY,
  CITY_LIST.map(() => 0),
  {
    serializer: {
      read(v) {
        return v.split('').map(Number)
      },
      write(v) {
        return v.join('')
      },
    },
  },
)

export const score = computed(() => {
  return data.value.reduce((acc, cur) => acc + cur, 0)
})
