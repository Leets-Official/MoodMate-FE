'use client'

import axios from 'axios'
import { useState } from 'react'

function Authentication() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginUrl = 'https://cyber.gachon.ac.kr/login/index.php'

  const handleLogin = async () => {
    const formData = new FormData()
    formData.append('username', email)
    formData.append('password', password)

    try {
      const response = await axios.post(loginUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      console.log(response.data)
      // if (response.data.status_code === 200 && response.data.success) {
      //   console.log("Authentication successful")
      // } else {
      //   console.log("Authentication failed")
      // }
    } catch (e) {
      console.log('Authentication failed', e)
    }
  }

  return (
    <div>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  )
}

export default Authentication
