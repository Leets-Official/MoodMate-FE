import { PROGRESS_BAR } from '@/_constants/info'

interface ProgressBarProps {
  current: number
}

const ProgressBar = ({ current }: ProgressBarProps) => {
  const total = PROGRESS_BAR.MAX
  const percentage = (current / total) * 100

  return (
    <div className="flex items-center justify-center mt-[90px] mx-13 ">
      <div className="w-[312px] bg-[#E6E6E6] h-[10px] mr-0.5 rounded-full">
        <div
          className={'h-full bg-[#FC4F59] rounded-full'}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
