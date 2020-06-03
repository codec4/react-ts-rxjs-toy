import { BehaviorSubject } from 'rxjs';
import { PlainStoreService } from './storeService';
import { Axios } from '../module/axiosObservable';
import { map } from 'rxjs/operators';

export interface RedditState {
  isFetching: boolean;
  posts: any[];
  lastUpdated: Date;
}

export type TRedditService = RedditService;

class RedditService extends PlainStoreService<RedditState> {
  constructor() {
    super();
    const initialState: RedditState = {
      isFetching: false,
      posts: [],
      lastUpdated: new Date()
    };

    this.subjectState = new BehaviorSubject<RedditState>(initialState);
  }

  fetchSubreddit(subreddit: string) {
    this.setState({
      isFetching: true,
      posts: []
    });

    Axios.get(`https://www.reddit.com/r/${subreddit}.json`)
      .pipe(
        map((response) => {
          const {
            data: { children = [] }
          } = response.data;

          return children.map((c: any) => c.data);
        })
      )
      .subscribe(
        (posts: any) =>
          this.setState({ isFetching: false, lastUpdated: new Date(), posts }),
        (err) => console.log(err)
      );
  }
}

export const redditService = new RedditService();
