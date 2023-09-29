import dayjs from 'dayjs'
export function formatUTC(utcString: string) {
  if (typeof utcString === 'undefined') return null
  return dayjs(utcString).format('YYYY-MM-DD HH:mm:ss')
}
