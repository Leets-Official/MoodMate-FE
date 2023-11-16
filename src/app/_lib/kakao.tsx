//kakao-login

const REST_API_KEY = '22500e5d628500778a3583713d21cefe'
const KAKAO_REDIRECT_URI = 'http://localhost:3000/login/kakao'
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`