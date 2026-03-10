import { useRoute } from 'vue-router'

export const useDocumentType = () => {
    const route = useRoute()

    return route?.params?.type ?? 'story'
}