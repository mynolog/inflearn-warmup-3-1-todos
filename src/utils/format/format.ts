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

export function getCurrentDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()

  const daysOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  const dayOfWeek = daysOfWeek[today.getDay()]

  const dayMessages: { [key: string]: string } = {
    일요일: ' ☀️ 편히 쉬세요',
    월요일: ' 💼 한 주의 시작!',
    화요일: ' 🔥 더 열심히!',
    수요일: ' 💪 주반으로 가는 길!',
    목요일: ' 🌟 조금만 더 힘내세요!',
    금요일: ' 🎉 불금! 주말이 다가옵니다!',
    토요일: ' 🌈 즐거운 주말!',
  }

  return {
    date: `${year}년 ${month}월 ${day}일`,
    dayOfWeek,
    message: dayMessages[dayOfWeek],
  }
}
