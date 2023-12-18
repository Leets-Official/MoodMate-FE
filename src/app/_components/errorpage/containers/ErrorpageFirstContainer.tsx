import { NETWORK } from '@/_constants/errors'

const ErrorpageFirstContainer = () => {
  return (
    <div className="flex flex-col text-center mt-16">
      <p className="text-[20px] font-semibold">{NETWORK.TITLE}</p>
      <p className="text-[16px] text-[#666666] mt-3">{NETWORK.DESCRIPTION}</p>
      <p className="text-[16px] text-[#666666]">{NETWORK.DESCRIPTIONTWO}</p>
    </div>
  )
}

export default ErrorpageFirstContainer
