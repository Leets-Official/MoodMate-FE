interface NewProps {
  news: string
  mainNews?: boolean
}

const News = ({ news, mainNews }: NewProps) => {
  return (
    <div
      className={`rounded-[10px] px-4 py-4 text-[14px] mt-3 mx-7 border border-twopink ${
        mainNews ? 'bg-threepink text-white ' : 'bg-onepink text-gray-600 '
      } `}
    >
      {news}
    </div>
  )
}

export default News
