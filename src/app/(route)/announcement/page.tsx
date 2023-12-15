import News from '@/_components/common/News'
import Header from '@/_components/layout/Header'

export default function AnnouncementPage() {
  return (
    <section>
      <div className="mt-6">
        <Header partner />
      </div>
      <p className="mb-10 mt-8 ml-7 text-primary font-bold text-2xl">공지사항</p>
      <News news="안녕하세요 저는 은지에열" />
      <News news="안녕하세요 저는 나영이에열" />
      <News news="안녕하세요 저는 혜원이에열" />
    </section>
  )
}
