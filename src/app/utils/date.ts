export const extractTimeFromDate = (dateString: string) => {
  const date = new Date(dateString)

  let hours = date.getUTCHours()
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')

  const ampm = hours >= 12 ? '오후' : '오전'
  hours %= 12
  hours = hours || 12 // 0시를 12시로 변경

  const formattedTime = `${ampm} ${hours
    .toString()
    .padStart(2, '0')}:${minutes}`
  return formattedTime
}
