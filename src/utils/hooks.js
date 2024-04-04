import { ref } from "vue";
import { useI18n } from "vue-i18n";

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