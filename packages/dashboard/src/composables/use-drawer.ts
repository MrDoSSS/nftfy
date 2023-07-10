import { ref } from 'vue'

export const useDrawer = () => {
  const shown = ref(false)

  const show = () => (shown.value = true)
  const hide = () => (shown.value = false)

  return { shown, show, hide }
}
