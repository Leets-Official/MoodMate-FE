import UserinfoPageComponents from '@/_components/common/userinfo/UserinfoPageComponents'

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
