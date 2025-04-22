import { ref, onUnmounted, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export function useTranslation() {
    const { t } = useI18n()
    return t
}

export function useLocale() {
    const { locale } = useI18n({ useScope: 'global' })
    return locale
}

export function useAsset(file) {
    const fileRef = ref()
    file.then(module => fileRef.value = module.default)
    return fileRef
}

export function useInnerWidth() {
    const width = ref(window.innerWidth);
    const syncWidth = () => width.value = window.innerWidth;
    onMounted(() => window.addEventListener('resize', syncWidth));
    onUnmounted(() => window.removeEventListener('resize', syncWidth));
    return width;
}

export function useUrl() {
    const route = useRoute()
    const url = ref(window.location.origin + route.fullPath)
    return url
}