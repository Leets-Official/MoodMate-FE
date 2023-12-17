const InactiveFirstText = () => {
  return (
    <div className="mt-1.5 flex items-center text-center flex-col mx-auto">
      <p className="pt-7 font-bold w-[260px] h-[106px] rounded-[8px] bg-[#FFE5E7] text-[#333333]">
        다음 매칭을 다시 <br /> 받아보고 싶으신가요?
      </p>
      <div
        className={`w-0 h-0
  border-l-[10px] border-l-transparent
  border-t-[18px] border-t-[#FFE5E7]
  border-r-[10px] border-r-transparent`}
      />
    </div>
  )
}

export default InactiveFirstText
