const Keyword = () => {
  const keywords = ['키워드1', '키워드2', '키워드3']
  return (
    <div className="flex text-[14px] ml-3 my-2">
      {keywords.map(function (a, i) {
        return (
          // eslint-disable-next-line react/jsx-key
          <p className="px-5 py-1.5 rounded-[18px] mr-2 bg-[#666666] text-white">
            {keywords[i]}
          </p>
        )
      })}
    </div>
  )
}

export default Keyword
