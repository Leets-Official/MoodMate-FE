'use client'

import { useState } from 'react'

export default function Home() {
  const fixedMinPrice = 0
  const fixedMaxPrice = 100000
  const priceGap = 10000

  const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice)
  const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice)
  const [rangeMinPercent, setRangeMinPercent] = useState(0)
  const [rangeMaxPercent, setRangeMaxPercent] = useState(0)

  const priceRangeMinValueHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRangeMinValue(parseInt(e.target.value))
  }

  const priceRangeMaxValueHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRangeMaxValue(parseInt(e.target.value))
  }

  const twoRangeHandler = () => {
    if (rangeMaxValue - rangeMinValue < priceGap) {
      setRangeMaxValue((rangeMinValue) => rangeMinValue + priceGap)
      setRangeMinValue((rangeMaxValue) => rangeMaxValue - priceGap)
    } else {
      setRangeMinPercent(() => (rangeMinValue / fixedMaxPrice) * 100)
      setRangeMaxPercent(() => 100 - (rangeMaxValue / fixedMaxPrice) * 100)
    }
  }

  return (
    <div>
      <div className="relative h-1 w-160 rounded-full bg-gray-300">
        <div
          style={{
            left: `${rangeMinPercent}%`,
            right: `${rangeMaxPercent}%`,
          }}
          className="absolute h-1 rounded-full bg-gray-500"
        />
      </div>

      <div className="relative">
        <input
          type="range"
          min={fixedMinPrice}
          max={fixedMaxPrice - priceGap}
          step="1000"
          value={rangeMinValue}
          onChange={(e) => {
            priceRangeMinValueHandler(e)
            twoRangeHandler()
          }}
          className="absolute top-[-9px] h-1.5 w-full appearance-none bg-transparent pointer-events-none"
        />
        <input
          type="range"
          min={fixedMinPrice + priceGap}
          max={fixedMaxPrice}
          step="1000"
          value={rangeMaxValue}
          onChange={(e) => {
            priceRangeMaxValueHandler(e)
            twoRangeHandler()
          }}
          className="absolute top-[-9px] h-1.5 w-full appearance-none bg-transparent pointer-events-none"
        />
      </div>
    </div>
  )
}
