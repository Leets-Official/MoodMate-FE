'use client'

import { useState } from 'react'
import { Range } from 'react-range'

const STEP = 1
const MIN = 4
const MAX = 94

type RangeBarProps = {
  type: 'single' | 'range'
}

const RangeBar = ({ type }: RangeBarProps) => {
  const [values, setValues] = useState<number[]>(
    type === 'single' ? [MIN] : [MIN, MAX],
  )

  return (
    <div className="w-3/10 mx-auto">
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={values}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              backgroundColor: '#ccc',
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '20px',
              width: '20px',
              backgroundColor: '#333',
              borderRadius: '50%',
            }}
          />
        )}
      />
    </div>
  )
}

export default RangeBar
