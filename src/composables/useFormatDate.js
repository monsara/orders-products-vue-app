import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export function useFormatDate() {
  const formatDate = (dateString, formatString) => {
    return format(new Date(dateString), formatString, { locale: ru })
      .replace(/\./g, '')
      .replace(/^\w/, (c) => c.toUpperCase())
  }

  return { formatDate }
}
