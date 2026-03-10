import { useCookies } from '@vueuse/integrations/useCookies'
import { ref } from 'vue'

export const useFont = () => {
    const cookies = useCookies()
    
    const fontSize = ref(parseFloat(cookies.get('font-size') ?? '1.25'))
    const fontFamily = ref(cookies.get('font-family') ?? 'Times New Roman')

    const setFontSize = (size) => {
        const normalizedSize = Math.max(0.25, size)
        cookies.set('font-size', normalizedSize)
        fontSize.value = normalizedSize 
    }

    const setFontFamily = (font) => {
        cookies.set('font-family', font)
        fontFamily.value = font
    }

    return [
        {
            family: fontFamily,
            size: fontSize
        },
        setFontFamily,
        setFontSize
    ]
}