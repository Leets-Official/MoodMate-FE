import React, { useState } from 'react'
import { downarrow, rightarrow } from '@/_ui/IconsPath'
import Icons from '@/_components/common/Icons'
import NormalButton from '@/_components/common/NormalButton'

interface InfoDetailProps {
  titleText: string
  component: React.ReactNode
  className: string
}

const InfoDetail = ({ titleText, component, className }: InfoDetailProps) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [arrowIcon, setArrowIcon] = useState(rightarrow)

  const toggleArrowIcon = () => {
    setArrowIcon(arrowIcon === rightarrow ? downarrow : rightarrow)
  }

  return (
    <div>
      <div
        className="flex mt-4"
        onClick={() => {
          setVisible(!visible)
          toggleArrowIcon()
        }}
      >
        <Icons name={arrowIcon} className="mt-2.5" />
        <NormalButton
          buttonText={titleText}
          buttonType="small"
          className={className}
          isActive
        />
      </div>
      {visible && component}
    </div>
  )
}

export default InfoDetail
