// google-login

const CLIENT_ID =
  '546373424095-8ce625b9dqfrojcgk38qc5snsud107ja.apps.googleusercontent.com'
const SECRET_KEY = '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'
const GOOGLE_REDIRECT_URI = 'http://localhost:3000/login/google'
const SCOPE = 'https://www.googleapis.com/auth/userinfo.email'
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=${SCOPE}`
