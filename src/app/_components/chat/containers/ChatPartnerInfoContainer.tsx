'use client'

import profile from '@/_components/information/Profile'
import Keyword from '@/_components/information/Keyword'
import DateMood from '@/_components/information/DateMood'
import { useQuery } from '@tanstack/react-query'
import { getPartnerInfo } from '@/_service/partner'
import Bio from '@/_components/common/Bio'
import Header from '@/_components/layout/Header'

interface ChatPartnerInfoContainerProps {
  userId: number
}

const ChatPartnerInfoContainer = ({
  userId,
}: ChatPartnerInfoContainerProps) => {
  const queryKey = ['chat/partner-info', userId]
  const {
    isLoading,
    isError,
    data: partner,
  } = useQuery<PartnerInfo, Error>({
    queryKey,
    queryFn: () => getPartnerInfo(),
  })

  return (
    <section className="flex flex-col  items-center">
      {partner && (
        <>
          <Header partner />
          <Bio gender="FEMALE" size="LARGE" />
          <div className="flex flex-col fixed rounded-[52px] bg-[#FFE5E7] h-[67%] bottom-0 w-screen translate-y-10">
            <p className="text-center font-bold text-[20px] mt-8">
              {partner.nickname}
            </p>
            <div className="mt-3 justify-center px-4 pt-[4px] h-[30px] text-[14px] text-[#999999] flex mx-auto border border-[#999999] rounded-[25px]">
              <p className="mr-3">{partner.year}</p>
              <p className="mr-3 ">|</p>
              <p>{partner.department}</p>
            </div>
            <div className="flex items-center flex-col mt-10">
              <Keyword keywords={partner.keywords} />
              <DateMood mood={partner.preferMood} />
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default ChatPartnerInfoContainer
