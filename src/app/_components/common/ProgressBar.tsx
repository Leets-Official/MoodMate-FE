import { PROGRESS_BAR } from '@/_constants/info'

interface ProgressBarProps {
  current: keyof typeof PROGRESS_BAR
}

const ProgressBar = ({ current }: ProgressBarProps) => {
  const total = PROGRESS_BAR.MAX
  const percentage = (parseInt(current.toString(), 10) / total) * 100
  const currentText = PROGRESS_BAR[current]

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[312px] bg-lightgray h-[10px] mb-[9px] rounded-full">
        <div
          className="h-full bg-primary rounded-full"
          style={{ width: `${percentage}%` }}
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
