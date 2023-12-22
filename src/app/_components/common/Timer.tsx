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
        now.getDate() + (now.getHours() >= targetHour ? 1 : 0),
        targetHour,
        0,
        0,
      )
      return targetTime.getTime() - now.getTime()
    }

    const timeUntilNextTargetHour = calculateTimeUntilNextTargetHour()
    setTimeLeft(timeUntilNextTargetHour)

    const intervalID = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1000)
    }, 1000)

    return () => {
      clearInterval(intervalID)
    }
  }, [targetHour])

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
        <p className="mx-5">hrs</p>
        <p className="mx-6">min</p>
        <p className="mx-6">sec</p>
      </div>
    </div>
  )
}

export default Timer
