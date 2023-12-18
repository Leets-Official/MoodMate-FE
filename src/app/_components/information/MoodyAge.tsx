interface AgeProps {
  preferYearMin: number
  preferYearMax: number
}
const MoodyAge = ({ preferYearMin, preferYearMax }: AgeProps) => {
  const birthYearRange = `${preferYearMin} - ${preferYearMax} 년생`
  return (
    <div className="flex text-[14px] ml-3 my-2">
      <p className="px-5 py-1.5 rounded-[18px] mr-2 bg-onepink text-primary border border-primary">
        {birthYearRange}
      </p>
    </div>
  )
}

export default MoodyAge
