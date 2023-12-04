import { Errors } from '@/_constants/errors'

const NotfoundpageFirstContainer = () => {
  return (
    <div className="flex flex-col text-center mt-48">
      <p className="text-[20px] font-semibold">{Errors.TITLE}</p>
      <p className="text-[16px] text-[#666666] mt-3">{Errors.DESCRIPTION}</p>
      <p className="text-[16px] text-[#666666]">{Errors.DESCRIPTIONTWO}</p>
    </div>
  )
}

export default NotfoundpageFirstContainer
