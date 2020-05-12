import { BehaviorSubject } from 'rxjs';
import { PlainStoreService } from './plainStoreService';

export enum Option {
  ReactJS = 'reactjs',
  Angular = 'angular',
  WebDevelopment = 'webdevelopment',
}

interface PickerState {
  value: string;
}

export class PickerService extends PlainStoreService<PickerState> {
  constructor() {
    super();
    const initialState: PickerState = {
      value: Option.ReactJS
    };

    this.state = new BehaviorSubject<PickerState>(initialState);
  }

  changeSubreddit(subreddit: string = 'angular') {
    this.setState({ value: subreddit });
  }
}
