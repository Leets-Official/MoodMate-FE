export const DEPARTMENT_LIST = [
  '경영학전공',
  '글로벌경영학전공',
  '회계세무학전공',
  '금융수학전공',
  '빅데이터경영전공',
  '미디어커뮤니케이션학과',
  '관광경영학과',
  '경제학과',
  '의료산업경영학과',
  '응용통계학과',
  '사회복지학과',
  '유아교육학과',
  '심리학과',
  '패션산업학과',
  '한국어문학과',
  '영미어문학과',
  '유럽어문학과',
  '법학과',
  '경찰행정학과',
  '행정학과',
  '도시계획학전공',
  '조경학전공',
  '실내건축학전공',
  '건축학전공',
  '건축공학전공',
  '설비소방공학과',
  '화공생명공학전공',
  '배터리공학전공',
  '기계공학전공',
  '산업공학전공',
  '스마트팩토리전공',
  '토목환경공학과',
  '신소재공학과',
  '미래자동차학과',
  '식품생명공학과',
  '식품영양학과',
  '바이오나노학과',
  '생명과학과',
  '물리학과',
  '화학과',
  '전자공학전공',
  '반도체공학전공',
  '차세대반도체설계전공',
  '반도체-디스플레이학과',
  '반도체설계학과',
  '클라우드공학과',
  '소프트웨어전공',
  '인공지능전공',
  '컴퓨터공학전공',
  '스마트보안전공',
  '전기공학과',
  '스마트시티학과',
  '의공학과',
  '바이오의료기기학과',
  '게임·영상학과학과',
  '한의예과',
  '회화·조소전공',
  '디자인전공',
  '성악전공',
  '기악전공',
  '작곡전공',
  '체육전공',
  '태권도전공',
  '연기예술학과',
  '운동재활학과',
  '자유전공',
  '의예과',
  '약학과',
  '바이오로직스학과',
  '간호학과',
  '치위생학과',
  '방사선학과',
  '물리치료학과',
  '응급구조학과',
] as const

export const NICK_NAME_PAGE = {
  GREETINGS1: '가입을 축하드려요!',
  GREETINGS2: '어떻게 불러드리면 될까요?',
  WARNINGS: '닉네임은 한번 정하면 수정할 수 없어요!',
  INPUTBOX: '닉네임을 입력하세요.',
  GUIDE: '5글자 이내로 한글만 입력해주세요.',
} as const

export const GENDER_PAGE = {
  GREETINGS1: '안녕하세요!',
  GREETINGS2: '무디에게 성별을 알려주세요.',
  MALE: '남자 무디',
  FEMALE: '여자 무디',
} as const

export const MY_AGE_PAGE = {
  GREETINGS: '무디가 당신의 나이를 궁금해해요!',
  WARNINGS: '출생년도를 기준으로 골라주세요.',
  MAX: '04',
  MIN: '94',
  AVG: '99',
} as const

export const MY_DEPARTMENT_PAGE = {
  GREETINGS: '무디에게 학과를 알려주세요!',
  WARNINGS: '학과를 선택하세요.',
  DEPARTMENT_LIST,
} as const

export const MY_KEYWORD_PAGE = {
  GREETINGS: '무디에게 여러분을 소개해주세요!',
  WARNINGS1: '여러분을 나타내는 키워드를',
  WARNINGS2: '3개 선택해주세요.',
  KEYWORD_LIST: [
    '인기짱',
    '고양이상',
    '강아지상',
    '혼자가 좋아',
    '감성충만',
    '상상력왕',
    '방콕러',
    '반려인',
    '배려왕',
    '쩝쩝박사',
    '몸짱',
    '얼굴천재',
    '패셔니스타',
    '프로게이머',
    '트렌드세터',
    '섹시도발',
    '마이웨이',
  ],
} as const

export const MOODIE_AGE_PAGE = {
  GREETINGS: '무디의 나이를 설정해주세요!',
  WARNINGS: '출생년도를 기준으로 골라주세요.',
  MAX: '04',
  MIN: '94',
  AVG: '99',
} as const

export const MATCHING_DEPARTMENT_PAGE = {
  GREETINGS: '어떤 것을 선호하시나요?',
  SAME_DEPT: '같은 학과도',
  LIKE: '좋아요!',
  DIFF_DEPT: '다른 학과가',
} as const

export const DATE_MOOD_PAGE = {
  GREETINGS: '무디와 어떤 데이트를 하고 싶나요?',
  DATE: '데이트',
  ACT: '활동적인',
  EMO: '감성 풍부한',
  NEW: '이색적인',
  FUN: '유쾌한',
} as const

export const PROGRESS_BAR = {
  1: '무드메이트에 오신걸 환영해요.',
  2: '무디가 여러분을 기다리고 있어요!',
  3: '무디에게 여러분에 대해 알려주세요.',
  4: '무디는 여러분이랑 친해지고 싶어요.',
  5: '무디가 여러분을 기다리고 있어요!',
  6: '거의 다 왔어요. 힘내요!',
  7: '벌써 7번째 질문이에요.',
  8: '드디어 마지막!',
  MAX: 8,
} as const

export const INPUT_NICKNAME = {
  MAX: 5,
} as const

export const BUTTON_TYPE = {
  GENDER: 'GENDER',
  KEYWORD: 'KEYWORD',
  MAJOR: 'MAJOR',
  MOOD: 'MOOD',
  DEFAULT: 'DEFAULT',
} as const

export const RANGE_BAR_AGE = {
  MIN: 1994,
  MAX: 2004,
  STEP: 1,
} as const
