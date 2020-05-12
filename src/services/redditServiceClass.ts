import { BehaviorSubject } from 'rxjs';
import { PlainStoreService } from './plainStoreService';

interface RedditState {
  isFetching: boolean;
  posts: any[];
  lastUpdated: Date;
}

export class RedditService extends PlainStoreService<RedditState> {
  constructor() {
    super();
    const initialState: RedditState = {
      isFetching: false,
      posts: [],
      lastUpdated: new Date(),
    };

    this.state = new BehaviorSubject<RedditState>(initialState);
  }

  fetchSubreddit(subreddit: string = 'angular') {
    this.setState({
      isFetching: true,
      posts: []
    });

    fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then((json) => {
        const { data: { children = [] } = {} } = json

        this.setState({
          isFetching: false,
          lastUpdated: new Date(),
          posts: children.map((c: any) => c.data)
        });
      });
  }
}
