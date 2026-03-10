import { ref } from 'vue'
import { useRoute } from 'vue-router'

export function useUrl() {
    const route = useRoute()
    const url = ref(window.location.origin + route.fullPath)
    return url
}