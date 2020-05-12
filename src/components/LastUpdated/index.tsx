import React from 'react'
import { useSharedState } from 'src/hooks/useSharedState'
import { RedditStateSubject } from 'src/components/app/App'

export const LastUpdated = () => {
  const [{ lastUpdated }] = useSharedState(RedditStateSubject)
  return <p>Last updated at {new Date(lastUpdated).toLocaleTimeString()}. </p>
}
