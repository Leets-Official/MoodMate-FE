'use client'

import FirstGuide from '@/_components/guide/FirstGuide'
import SecondGuide from '@/_components/guide/SecondGuide'
import { useState } from 'react'

export default function MyPage() {
  const [showSecondGuide, setShowSecondGuide] = useState(false)

  return (
    <div>
      {!showSecondGuide ? (
        <FirstGuide onNext={() => setShowSecondGuide(true)} />
      ) : (
        <SecondGuide btn="다음" />
      )}
    </div>
  )
}
