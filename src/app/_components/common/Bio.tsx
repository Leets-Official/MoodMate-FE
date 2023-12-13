import Image, { StaticImageData } from 'next/image'

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

const Bio = ({ gender, size }: BioProps) => {
  const imageSrc = require(
    `/public/illustration/${gender.toLowerCase()}/chat/partnerprofile.png`,
  ) as StaticImageData

  return (
    <>
      <Image
        src={imageSrc}
        alt="bio"
        width={43}
        height={43}
        className={`${getBioStyle(size)} mt-2 rounded-full`}
      />
    </>
  )
}

export default Bio
