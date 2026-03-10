import { useRoute } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'

export const useChapterNumber = () => {
    const route = useRoute()
    const cookies = useCookies()
   
    const title = route.params.title
    const routedChapter = route.params.chapter
  
    if(routedChapter)
        return Number(routedChapter)
    else
        return parseInt(cookies.get(`${title}_chapter`) ?? '1')
}
