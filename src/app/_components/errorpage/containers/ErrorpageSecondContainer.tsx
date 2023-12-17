const ErrorpageSecondContainer = () => {
  const refreshPage = () => {
    window.location.reload()
  }
  return (
    <div className="flex text-center">
      {/* eslint-disable-next-line react/button-has-type */}
      <button
        onClick={refreshPage}
        className="mt-12 mx-auto pt-1.5 bg-[#FFE5E7] w-[146px] h-[36px] rounded-[8px] text-[#666666]"
      >
        새로고침
      </button>
    </div>
  )
}

export default ErrorpageSecondContainer
