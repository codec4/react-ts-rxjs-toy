import { PickerStateSubject } from 'src/components/Picker'
import { RedditStateSubject } from 'src/components/app/App'
import { setPartial } from 'src/hooks/useSharedState'

export const init = () => {
  PickerStateSubject.subscribe(({ value: subreddit }) => {
    setPartial(RedditStateSubject, {
      isFetching: true,
      posts: [],
    })

    fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => {
        const prevState = RedditStateSubject.getValue()
        const { data: { children = [] } = {} } = json
        RedditStateSubject.next({
          ...prevState,
          isFetching: false,
          lastUpdated: new Date(),
          posts: children.map((c: any) => c.data),
        })
      });
  })
}
