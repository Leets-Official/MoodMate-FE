import News from '@/_components/common/News'
import Header from '@/_components/layout/Header'
import { MAIN_NEWS_231218, SUB_NEWS_231218 } from '@/_constants/announcement'

export default function AnnouncementPage() {
  return (
    <section>
      <div className="mt-6">
        <Header partner />
      </div>
      <p className="mb-7 mt-8 ml-7 text-primary font-bold text-2xl">
        📣 공지사항
      </p>
      <News news={SUB_NEWS_231218.five} mainNews />
      <News news={SUB_NEWS_231218.two} />
      <News news={SUB_NEWS_231218.three} />
      <News news={SUB_NEWS_231218.four} />
      <News news={MAIN_NEWS_231218.detail} />
      <div className="mt-6 mx-6">
        <hr />
        <div className="text-[14px] text-gray-500 p-4 ">
          <p>더 궁금한 점이 있다면?</p>
          <p className="underline">
            <a href="https://open.kakao.com/o/sGZ8MvYf">
              🛎️ 무드메이트 상담소 오픈채팅 바로가기
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
