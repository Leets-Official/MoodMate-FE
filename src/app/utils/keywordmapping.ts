import { MY_KEYWORD_PAGE } from '@/_constants'

export const mapKeywordToEmojiKeyword = (keyword: string) => {
  for (const item of MY_KEYWORD_PAGE.KEYWORD_LIST) {
    if (item.includes(keyword)) {
      return item
    }
  }
  return keyword
}
