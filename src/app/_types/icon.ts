import { SVGProps } from 'react'

export interface IconPathTypes {
  path: string
  width: number
  height: number
  fill: string
  options?: IconOptions
}
interface IconOptions {
  stroke: string
  strokeWidth: number
  strokeLinecap?: 'round' | 'butt' | 'square' | 'inherit' | undefined
  strokeLinejoin?: 'round' | 'bevel' | 'miter' | 'inherit' | undefined
}
