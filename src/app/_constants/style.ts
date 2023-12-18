export const BUTTON_STYLE = {
  GENDER: (className: string) => `w-[147px] h-[164px] ${className}`,
  KEYWORD: (className: string) => `${className}`,
  MOOD: (className: string) => `w-[148px] h-[166px] ${className}`,
  MAJOR: (className: string) => `w-[148px] h-[166px] ${className}`,
  DEFAULT: () => 'w-full h-full',
} as const
