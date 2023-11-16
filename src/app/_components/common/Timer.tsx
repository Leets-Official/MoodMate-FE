'use client'

import React, { useState, useEffect } from 'react'

interface TimerProps {
  targetHour: number
}

const Timer = ({ targetHour }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0)

  useEffect(() => {
    const calculateTimeUntilNextTargetHour = () => {
      const now = new Date()
      const targetTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + (now.getHours() >= targetHour ? 1 : 0), // 현재 시간이 대상 시간 이후인 경우 다음 날로 설정
        targetHour, // 대상 시간으로 변경 (예: 20 또는 22)
        0, // 분
        0, // 초
      )
      return targetTime.getTime() - now.getTime() // 대상 시간까지의 시간 간격 계산
    }

    const timeUntilNextTargetHour = calculateTimeUntilNextTargetHour()
    setTimeLeft(timeUntilNextTargetHour)

    const intervalID = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1000) // 1초마다 시간 감소
    }, 1000)

    return () => {
      clearInterval(intervalID) // 컴포넌트가 unmount될 때 interval 정리
    }
  }, [targetHour]) // targetHour 값이 변경될 때마다 useEffect 재실행

  // 남은 시간을 시, 분, 초로 변환
  const hours = String(Math.floor((timeLeft / (1000 * 60 * 60)) % 24)).padStart(
    2,
    '0',
  )
  const minutes = String(Math.floor((timeLeft / 1000 / 60) % 60)).padStart(
    2,
    '0',
  )
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0')

  return (
    <div className="mx-auto">
      <p className="text-[40px] font-bold text-[#333333]">
        {hours} : {minutes} : {seconds}
      </p>
      <div className="flex text-[#b3b3b3] -mt-2 mx-auto">
        <p className="mx-6">hrs</p>
        <p className="mx-6">min</p>
        <p className="mx-6">sec</p>
      </div>
    </div>
  )
}

export default Timer
