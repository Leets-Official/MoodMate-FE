/* eslint-disable react/jsx-props-no-spreading */
import { Range } from 'react-range'
import { RANGE_BAR_AGE } from '@/_constants'

interface RangeBarProps {
  type: 'single' | 'range'
  values: number[]
  onChange: (values: number[]) => void
}

const RangeBar = ({ type, values, onChange }: RangeBarProps) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Range
        step={RANGE_BAR_AGE.STEP}
        min={RANGE_BAR_AGE.MIN}
        max={RANGE_BAR_AGE.MAX}
        values={values}
        // eslint-disable-next-line @typescript-eslint/no-shadow
        onChange={(values) => onChange(values)}
        renderTrack={({ props, children }) => (
          <div {...props} className="h-1.5 w-full bg-gray-300 rounded-full">
            {type === 'range' && (
              <div
                className="absolute h-1.5 rounded-full bg-black"
                style={{
                  width: `${
                    ((values[1] - values[0]) /
                      (RANGE_BAR_AGE.MAX - RANGE_BAR_AGE.MIN)) *
                    100
                  }%`,
                  left: `${
                    ((values[0] - RANGE_BAR_AGE.MIN) /
                      (RANGE_BAR_AGE.MAX - RANGE_BAR_AGE.MIN)) *
                    100
                  }%`,
                }}
              />
            )}
            {children}
          </div>
        )}
        renderThumb={({ props, index }) =>
          type === 'range' || index === 0 ? (
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
          ) : null
        }
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
