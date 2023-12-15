interface NewProps {
  news: string
}

const News = ({ news }: NewProps) => {
  return (
    <div className="rounded-[10px] px-4 py-4 text-[15px] mt-4 mx-7 border border-twopink text-gray-600">
      {news}
    </div>
  )
}

export default News
