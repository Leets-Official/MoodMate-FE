export const extractTimeFromDate = (dateString: string) => {
  const date = new Date(dateString)
  date.setUTCHours(date.getUTCHours() + 9)

  let hours = date.getUTCHours()
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')

  const ampm = hours >= 12 ? '오후' : '오전'
  hours %= 12
  hours = hours || 12

  const formattedTime = `${ampm} ${hours
    .toString()
    .padStart(2, '0')}:${minutes}`
  return formattedTime
}

export const displayNewDate = (dateString: string) => {
  const date = new Date(dateString)
  date.setUTCHours(date.getUTCHours() + 9)

  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
}
