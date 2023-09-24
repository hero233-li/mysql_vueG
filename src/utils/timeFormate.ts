import dayjs from 'dayjs'
export function formatUTC(utcString: string) {
  return dayjs(utcString).format('YYYY-MM-DD HH:mm:ss')
}
