'use client'

import ErrorPage from '@/(route)/error'
import Keyword from '@/_components/information/Keyword'
import DateMood from '@/_components/information/DateMood'
import { useQuery } from '@tanstack/react-query'
import { getPartnerInfo } from '@/_service/partner'
import Bio from '@/_components/common/Bio'
import Header from '@/_components/layout/Header'
import Loading from '@/_components/common/Loading'

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
    queryFn: getPartnerInfo,
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ErrorPage />
  }

  return (
    <section className="h-screen w-full">
      <Header partner />
      {partner && (
        <div className="flex flex-col justify-center items-center gap-[40px] h-full w-full">
          <div className="flex justify-center h-[20%] w-full">
            <Bio
              gender={partner.gender === 'FEMALE' ? 'MALE' : 'FEMALE'}
              size="LARGE"
              type="partnerInfo"
            />
          </div>
          <div className="flex flex-col rounded-t-[52px] bg-onepink h-[65%] w-full ">
            <p className="text-center font-bold text-[20px] mt-8">
              {partner.nickname}
            </p>
            <div className="mt-3 justify-center px-4 pt-[4px] h-[30px] text-[14px] text-primary flex mx-auto border border-primary rounded-[25px]">
              <p className="mr-3">{partner.year.toString().slice(-2)}년생</p>
              <p className="mr-3 ">|</p>
              <p>{partner.department}</p>
            </div>
            <div className="flex items-center justify-center flex-col mt-10 w-full">
              <Keyword keywords={partner.keywords} partner />
              <DateMood mood={partner.preferMood} partner />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ChatPartnerInfoContainer
