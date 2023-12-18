'use client'

import { PROGRESS_BAR } from '@/_constants/info'
import { useEffect, useState } from 'react'

interface ProgressBarProps {
  current: keyof typeof PROGRESS_BAR
}

const ProgressBar = ({ current }: ProgressBarProps) => {
  const total = PROGRESS_BAR.MAX
  const [percentage, setPercentage] = useState(
    (parseInt(current.toString(), 10) / total) * 100,
  )
  const currentText = PROGRESS_BAR[current]
  const [initialRender, setInitialRender] = useState(true)

  useEffect(() => {
    setInitialRender(false)
    setPercentage((parseInt(current.toString(), 10) / total) * 100)
  }, [current])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[312px] bg-lightgray h-[10px] mb-[9px] rounded-full relative overflow-hidden">
        <div
          className={`h-full bg-primary rounded-full absolute left-0 top-0 ${
            initialRender ? 'transition-none' : ''
          }`}
          style={{
            width: `${percentage}%`,
            transitionProperty: 'width',
            transitionDuration: '500ms',
            transitionTimingFunction: 'ease-in-out',
          }}
        />
      </div>
      <div className="w-[312px] text-secondary text-[10px] flex items-center">
        <span className="w-[159px] ml-[10px] mr-[117px]">{currentText}</span>
        <span>
          {current}/{PROGRESS_BAR.MAX}
        </span>
      </div>
    </div>
  )
}

export default ProgressBar
