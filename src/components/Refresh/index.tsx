import React, { useCallback } from 'react'
import { PickerStateSubject } from 'src/components/Picker'
import { setPartial } from 'src/hooks/useSharedState'

export const Refresh: React.SFC<{}> = (_) => {
  const handleClick = useCallback(() => setPartial(PickerStateSubject, {}), [])

  return (
    <button
      onClick={handleClick}
    >
      Refresh
    </button>
  )
}
