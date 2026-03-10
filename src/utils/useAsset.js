import { ref } from 'vue'

export function useAsset(file) {
    const fileRef = ref()
    file.then(module => fileRef.value = module.default)
    return fileRef
}
