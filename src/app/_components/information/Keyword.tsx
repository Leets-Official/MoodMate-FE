interface KeywordProps {
  partner?: boolean
  keywords: string[]
}

const Keyword = ({ keywords, partner }: KeywordProps) => {
  return (
    <div className={`flex text-[14px] ${!partner && 'ml-3 my-2'}`}>
      {keywords.map((keyword, i) => {
        return (
          <p
            key={keyword}
            className={`px-5 py-1.5 rounded-[18px] mr-2 ${
              // eslint-disable-next-line no-nested-ternary
              partner
                ? i % 2 === 0
                  ? 'bg-twopink text-white'
                  : 'bg-threepink text-white'
                : ' bg-onepink text-primary border border-primary'
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
