import { BehaviorSubject } from 'rxjs';
import { PlainStoreService } from './plainStoreService';

export enum Option {
  ReactJS = 'reactjs',
  Angular = 'angular',
  WebDevelopment = 'webdevelopment',
}

export interface PickerState {
  value: string;
  options: Option[];
}

export type TPickerService = PickerService;

class PickerService extends PlainStoreService<PickerState> {
  constructor() {
    super();
    const initialState: PickerState = {
      value: Option.ReactJS,
      options: [Option.ReactJS, Option.Angular, Option.WebDevelopment]
    };

    this.state = new BehaviorSubject<PickerState>(initialState);
  }

  changeSubreddit(subreddit: string = 'angular') {
    this.setState({ value: subreddit });
  }
}

export const pickerService = new PickerService();
