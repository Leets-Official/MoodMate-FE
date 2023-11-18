import { useRecoilValue } from 'recoil'
import { currentQuestionState } from '@/_atom/progress'

interface ProgressBarProps {
  total: number
  color: string
}

const ProgressBar = ({ total, color }: ProgressBarProps) => {
  const current = useRecoilValue(currentQuestionState)
  const percentage = (current / total) * 100

  return (
    <div className="flex items-center">
      <div className="w-full bg-gray-300 h-5 mr-2">
        <div
          className={`h-full bg-${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div>{`${current}/${total}`}</div>
    </div>
  )
}

export default ProgressBar
