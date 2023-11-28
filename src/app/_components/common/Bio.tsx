interface BioProps {
  gender: 'MALE' | 'FEMALE'
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
}

const getBioStyle = (size: string) => {
  switch (size) {
    case 'SMALL':
      return 'w-[40px] h-[40px]'
    case 'MEDIUM':
      return 'w-[80px] h-[80px]'
    case 'LARGE':
      return 'w-[137px] h-[136px]'
    default:
      return 'w-[40px] h-[40px]'
  }
}

// gender에 따라 구별
const Bio = ({ gender, size }: BioProps) => {
  return (
    <div
      className={`${getBioStyle(size)} mt-2 rounded-full border border-black`}
    />
  )
}

export default Bio
