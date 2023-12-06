/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Range } from 'react-range'
import { RANGE_BAR_AGE, MY_AGE_PAGE } from '@/_constants'

interface RangeBarProps {
  type: 'single' | 'range'
  values: number[]
  onChange: (values: number[]) => void
}

const RangeBar = ({ type, values, onChange }: RangeBarProps) => {
  const textStyles = {
    color: '#333',
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: 'Noto Sans KR',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
  }

  const renderCirclesAndNumbers = () => (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        bottom: '10px',
        left: '8%',
      }}
    >
      <p style={{ ...textStyles, marginRight: '4px' }}>{MY_AGE_PAGE.MIN}</p>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#D9D9D9',
              margin: '0px 13px',
            }}
          />
        ))}
      </div>
      <p style={{ ...textStyles }}>{MY_AGE_PAGE.AVG}</p>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#D9D9D9',
              margin: '0px 13px',
            }}
          />
        ))}
      </div>
      <p style={{ ...textStyles, marginLeft: '4px' }}>{MY_AGE_PAGE.MAX}</p>
    </div>
  )

  const renderSelectedValues = () => {
    if (type === 'range' && values.length > 1) {
      return (
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '132px',
              padding: '8px 10px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              borderRadius: '30px',
              background: '#333',
              color: '#FFFFFF',
              fontSize: '14px',
            }}
          >
            {values[0].toString().slice(-2)} 년생 ~{' '}
            {values[1].toString().slice(-2)} 년생
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '-6.5px',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="7"
              viewBox="0 0 13 7"
              fill="none"
              style={{ marginTop: '-6px' }}
            >
              <path
                d="M6.45455 7L0.786015 0.25L12.1231 0.250001L6.45455 7Z"
                fill="#333"
              />
            </svg>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div
      style={{
        height: '105px',
        width: '357px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Range
        step={RANGE_BAR_AGE.STEP}
        min={RANGE_BAR_AGE.MIN}
        max={RANGE_BAR_AGE.MAX}
        values={values}
        onChange={(newValues) => onChange(newValues)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              height: '5px',
              width: '281px',
              background: 'lightgray',
              borderRadius: '5px',
              position: 'relative',
              bottom: '-10px',
            }}
          >
            {type === 'range' && (
              <div
                style={{
                  position: 'absolute',
                  height: '5px',
                  borderRadius: 'full',
                  background: '#FC4F59',
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
        renderThumb={({ props, index }) => {
          const { key, style, ...restProps } = props

          if (type === 'range' || index === 0) {
            return (
              <div
                key={key}
                style={{
                  ...style,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: type === 'single' ? '#FC4F59' : '#333333',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  outline: 'none',
                }}
                {...restProps}
              >
                {type === 'single' && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '27px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        width: '68px',
                        padding: '8px 13px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '30px',
                        background: '#4D4D4D',
                        color: '#FFFFFF',
                        fontSize: '14px',
                      }}
                    >
                      {restProps['aria-valuenow'].toString().slice(-2)}년생
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-6px',
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="7"
                        viewBox="0 0 13 7"
                        fill="none"
                      >
                        <path
                          d="M6.45455 7L0.786015 0.25L12.1231 0.250001L6.45455 7Z"
                          fill="#4D4D4D"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            )
          }
          return null
        }}
      />
      {renderSelectedValues()}
      {renderCirclesAndNumbers()}
    </div>
  )
}

export default RangeBar
