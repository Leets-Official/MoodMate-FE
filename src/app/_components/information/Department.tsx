interface DepartmentProps {
  department: boolean
}
const Department = ({ department }: DepartmentProps) => {
  return (
    <div className="flex text-[14px] ml-3 my-2">
      ({department} ?
      <p className="px-5 py-1.5 rounded-[18px] mr-2 bg-[#FFE5E7] text-[#FC4F59] border border-[#FC4F59]">
        같은학과가 좋아요
      </p>
      :
      <p className="px-5 py-1.5 rounded-[18px] mr-2 bg-[#FFE5E7] text-[#FC4F59] border border-[#FC4F59]">
        다른학과가 좋아요
      </p>
      )
    </div>
  )
}

export default Department
