import { useRoute } from 'vue-router'

export const useDocumentId = () => {
    const route = useRoute()

    return route.params.title
}