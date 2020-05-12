import React, { useEffect } from 'react'
import { BehaviorSubject } from 'rxjs'
import { useSharedState } from 'src/hooks/useSharedState'
import { Picker, Option } from 'src/components/Picker'
import { Refresh } from 'src/components/Refresh'
import { Post } from 'src/components/Post'
import { LastUpdated } from 'src/components/LastUpdated';
import { init } from 'src/services/redditService';

export const RedditStateSubject = new BehaviorSubject({
  isFetching: false,
  posts: [],
  lastUpdated: new Date(),
})

export const App = () => {
  const options = [Option.ReactJS, Option.Angular, Option.WebDevelopment]
  const [{ isFetching, posts }] = useSharedState(RedditStateSubject)
  const isLoading = isFetching && posts.length === 0
  const isEmpty = !isFetching && posts.length === 0

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <Picker options={options} />
      <LastUpdated />
      <Refresh />
      {isLoading && <h2>Loading...</h2>}
      {isEmpty && <h2>Empty</h2>}
      <ul>
        {posts.map((post: any) => (
          <Post key={post.title} post={post} />
        ))}
      </ul>
    </div>
  )
}
