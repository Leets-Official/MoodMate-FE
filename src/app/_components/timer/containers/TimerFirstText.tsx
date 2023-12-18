import { AFTER_TIMER_GUIDE, BEFORE_TIMER_GUIDE } from '@/_constants/main'

interface TextProps {
  type: 'BEFORE' | 'AFTER'
}

const getTextStyle = (type: string) => {
  switch (type) {
    case 'BEFORE':
      return (
        <div>
          <p className="text-[12px] text-[#919191]">
            {BEFORE_TIMER_GUIDE.TITLE}
          </p>
          <p className="text-[21px] text-[#FC4F59] font-extrabold">
            {BEFORE_TIMER_GUIDE.SUB_TITLE}
          </p>
        </div>
      )
    case 'AFTER':
      return (
        <p className="text-[21px] mt-5 text-[#FC4F59] font-extrabold">
          {AFTER_TIMER_GUIDE.SUB_TITLE}
        </p>
      )
    default:
      return <p>디폴트</p>
  }
}

const TimerFirstText = ({ type }: TextProps) => {
  return <section className="mx-auto text-center">{getTextStyle(type)}</section>
}
export default TimerFirstText
