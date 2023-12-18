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
  date.setUTCHours(date.getUTCHours())

  const year = date.getFullYear().toString().padStart(4, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}년 ${month}월 ${day}일`
}
