import MyinfoPageComponents from '@/_components/common/myinfo/MyinfoPageComponents'

interface MyinfoPageProps {
  params: {
    slug: string
  }
}

export default function MyinfoPage({ params }: MyinfoPageProps) {
  const pageNumber = params.slug

  return (
    <section>
      <MyinfoPageComponents slug={pageNumber} />
    </section>
  )
}
