import Image, { StaticImageData } from 'next/image'

interface BioProps {
  gender: 'MALE' | 'FEMALE'
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  type?: string
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

const Bio = ({ gender, size, type }: BioProps) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require
  const imageSrc = require(
    `/public/illustration/${gender.toLowerCase()}/chat/partnerprofile.png`,
  ) as StaticImageData

  return (
    <div>
      <Image
        src={imageSrc}
        alt="bio"
        width={type === 'partnerInfo' ? 158 : 43}
        height={type === 'partnerInfo' ? 158 : 43}
        className={`${getBioStyle(size)} mt-2 rounded-full`}
      />
    </div>
  )
}

export default Bio
