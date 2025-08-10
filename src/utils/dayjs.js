import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/en'
import 'dayjs/locale/pl'

dayjs.extend(relativeTime)

export function formatFullDate(date, locale) {
    return dayjs(date, "DD.MM.YYYY").locale(locale).format('DD MMMM YYYY')
}
