import EditComponents from '@/_components/edit/EditComponents'

interface EditPageProps {
  params: {
    slug: string
  }
  userKeywords: string[]
  preferYearMax: number
  preferYearMin: number
  preferMood: string
}

export default function EditPage({
  params,
  userKeywords,
  preferYearMax,
  preferYearMin,
  preferMood,
}: EditPageProps) {
  return (
    <section>
      <div>
        <EditComponents
          slug={params.slug}
          userKeywords={userKeywords}
          preferYearMax={preferYearMax}
          preferYearMin={preferYearMin}
          preferMood={preferMood}
        />
      </div>
    </section>
  )
}
