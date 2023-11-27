export const getToken = (code: string) => {
  // API 엔드포인트 URL
  const apiUrl = 'backendAPI'

  // 요청 헤더
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${code}`,
  }
  const requestOptions = {
    method: 'POST',
    headers,
  }
  fetch(apiUrl, requestOptions)
    .then((response) => {
      console.log('요청이 완료되었습니다.', response)
    })
    .catch((error) => {
      console.error('요청 중 오류가 발생했습니다.', error)
    })
}
