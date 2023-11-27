export const BUTTON_STYLE = {
  GENDER: (color: string) => `w-[148px] h-[166px] bg-${color}-500`,
  KEYWORD: (color: string) => `bg-${color}-500`,
  MOOD: (color: string) => `w-[148px] h-[166px] bg-${color}-500`,
  MAJOR: (color: string) => `w-[148px] h-[166px] bg-${color}-500`,
  DEFAULT: () => 'w-full h-full',
} as const
