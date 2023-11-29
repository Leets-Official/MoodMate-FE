import { NETWORK } from '@/_constants/notfound'

const NotfoundpageFirstContainer = () => {
  return (
    <div className="flex flex-col text-center mt-48">
      <p className="text-[20px] font-semibold">{NETWORK.TITLE}</p>
      <p className="text-[16px] text-[#666666] mt-3">{NETWORK.DESCRIPTION}</p>
      <p className="text-[16px] text-[#666666]">{NETWORK.DESCRIPTIONTWO}</p>
    </div>
  )
}

export default NotfoundpageFirstContainer
