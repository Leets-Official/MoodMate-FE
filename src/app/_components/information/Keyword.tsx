interface KeywordProps {
  keywords: string[]
}

const Keyword = ({ keywords }: KeywordProps) => {
  return (
    <div className="flex text-[14px] ">
      {keywords.map((keyword, i) => {
        return (
          <p
            key={keyword}
            className={`px-5 py-1.5 rounded-[18px] mr-2 ${
              i % 2 === 0 ? 'bg-twopink text-white' : 'bg-threepink text-white'
            }`}
          >
            {keyword}
          </p>
        )
      })}
    </div>
  )
}

export default Keyword
