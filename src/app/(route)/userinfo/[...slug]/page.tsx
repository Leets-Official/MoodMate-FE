import UserinfoPageComponents from '@/_components/common/myinfo/MyinfoPageComponents'

interface UserinfoPageProps {
  params: {
    slug: string
  }
}

export default function UserinfoPage({ params }: UserinfoPageProps) {
  const pageNumber = params.slug

  return (
    <section>
      <UserinfoPageComponents slug={pageNumber} />
    </section>
  )
}
