import { ref } from 'vue'

export function useMetaindex() {
    const fileRef = ref()
    import('@/assets/metaindex.json').then(module => fileRef.value = module.default)
    return fileRef
}
