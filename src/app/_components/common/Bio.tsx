interface BioProps {
  gender?: 'MALE' | 'FEMALE'
}

const Bio = ({ gender }: BioProps) => {
  return <div className="w-[40px] h-[40px] mt-2 rounded-full bg-[#D8D8D8]" />
}

export default Bio
