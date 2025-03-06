export function getLocalTime(timestamp: string) {
  const date = new Date(timestamp)

  const timeString = date.toLocaleTimeString('ko-KR', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return timeString
}
