import { useState } from 'react'
import { Range } from 'react-range'

const STEP = 1
const MIN = 1994
const MAX = 2004

type RangeBarProps = {
  type: 'single' | 'range'
}

const RangeBar = ({ type }: RangeBarProps) => {
  const [values, setValues] = useState<number[]>(
    type === 'single' ? [MIN, MIN] : [MIN, MAX],
  )

  return (
    <div className="h-screen flex items-center justify-center">
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={values}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div {...props} className="h-1.5 w-full bg-gray-300 rounded-full">
            {type === 'range' && (
              <div
                className="absolute h-1.5 rounded-full bg-black"
                style={{
                  width: `${((values[1] - values[0]) / (MAX - MIN)) * 100}%`,
                  left: `${((values[0] - MIN) / (MAX - MIN)) * 100}%`,
                }}
              />
            )}
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="h-5 w-5 bg-black rounded-full flex items-center justify-center"
          >
            {type === 'single' && (
              <div className="absolute top-[-25px] text-white text-sm font-sans p-1 bg-black">
                {props['aria-valuenow'].toString().slice(-2)}
              </div>
            )}
          </div>
        )}
      />
      {type === 'range' && values.length > 1 && (
        <div className="absolute top-[calc(50%-25px)] left-1/2 transform -translate-x-1/2 text-white text-sm font-sans p-1 bg-black">
          {values[0].toString().slice(-2)} - {values[1].toString().slice(-2)}
        </div>
      )}
    </div>
  )
}

export default RangeBar
