interface TimerProps {
  status: string
}

const getInputSort = (status: string) => {
  switch (status) {
    case 'after_matching':
      return {
        input: 'w-[312px] h-[39px]',
      }
    case 'before_matching':
      return {
        input: 'w-[312px] h-[45px]',
      }
    default:
      return {
        input: 'w-full h-full',
      }
  }
}

const Input = ({ status }: TimerProps) => {
  return (
    <div>
      <p>dkdk</p>
    </div>
  )
}

export default Input
