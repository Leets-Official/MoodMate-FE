interface DepartmentProps {
  department: boolean
}
const Department = ({ department }: DepartmentProps) => {
  const text = department ? '같은학과가 좋아요' : '다른학과가 좋아요'
  return (
    <div className="flex text-[14px] ml-3 my-2">
      <p className="px-5 py-1.5 rounded-[18px] mr-2 bg-[#FFE5E7] text-[#FC4F59] border border-[#FC4F59]">
        {text}
      </p>
    </div>
  )
}

export default Department
