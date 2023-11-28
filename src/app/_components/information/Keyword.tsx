interface KeywordProps {
  keywords: string[]
}

const Keyword = ({ keywords }: KeywordProps) => {
  // const keywords = [
  //   { title: '키워드1', key: 'first' },
  //   { title: '키워드2', key: 'second' },
  //   { title: '키워드3', key: 'third' },
  // ]
  return (
    <div className="flex text-[14px] ml-3 my-2">
      {keywords.map((keyword, i) => {
        return (
          <p
            key={keyword}
            className="px-5 py-1.5 rounded-[18px] mr-2 bg-[#FFE5E7] text-[#FC4F59] border border-[#FC4F59]"
          >
            {keyword}
          </p>
        )
      })}
    </div>
  )
}

export default Keyword
