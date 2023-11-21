const Keyword = () => {
  const keywords = [
    { title: '키워드1', key: 'first' },
    { title: '키워드2', key: 'second' },
    { title: '키워드3', key: 'third' },
  ]
  return (
    <div className="flex text-[14px] ml-3 my-2">
      {keywords.map((keyword, i) => {
        return (
          <p
            key={keyword.key}
            className="px-5 py-1.5 rounded-[18px] mr-2 bg-[#666666] text-white"
          >
            {keyword.title}
          </p>
        )
      })}
    </div>
  )
}

export default Keyword
