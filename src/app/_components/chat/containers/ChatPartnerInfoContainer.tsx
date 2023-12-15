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
  // const queryKey = ['chat/partner-info', userId]
  // const {
  //   isLoading,
  //   isError,
  //   data: partner,
  // } = useQuery<PartnerInfo, Error>({
  //   queryKey,
  //   queryFn: getPartnerInfo,
  // })

  const partner = {
    nickname: '내영',
    year: 2000,
    department: '경영학전공',
    keywords: ['sdfdf', 'dfsdfs', 'dfdsfs'],
    preferMood: 'sdfsdf',
  }

  return (
    <section className="h-screen w-full">
      <Header partner />
      {partner && (
        <div className="flex flex-col justify-center items-center gap-[40px] h-full w-full">
          <div className="flex justify-center h-[20%] w-full">
            <Bio gender="FEMALE" size="LARGE" type="partnerInfo" />
          </div>
          <div className="flex flex-col rounded-[52px] bg-[#FFE5E7] h-[65%] w-full ">
            <p className="text-center font-bold text-[20px] mt-8">
              {partner.nickname}
            </p>
            <div className="mt-3 justify-center px-4 pt-[4px] h-[30px] text-[14px] text-primary flex mx-auto border border-primary rounded-[25px]">
              <p className="mr-3">{partner.year}</p>
              <p className="mr-3 ">|</p>
              <p>{partner.department}</p>
            </div>
            <div className="flex items-center justify-center flex-col mt-10 w-full">
              <Keyword keywords={partner.keywords} />
              <DateMood mood={partner.preferMood} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ChatPartnerInfoContainer
