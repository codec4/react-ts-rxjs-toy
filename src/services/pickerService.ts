import { BehaviorSubject } from 'rxjs';
import { PlainStoreService } from './storeService';

export enum Option {
  ReactJS = 'reactjs',
  Angular = 'angular',
  WebDevelopment = 'webdevelopment'
}

export interface PickerState {
  value: string;
  options: Option[];
}

export type TPickerService = PickerService;

export class PickerService extends PlainStoreService<PickerState> {
  constructor() {
    super();
    const initialState: PickerState = {
      value: Option.ReactJS,
      options: [Option.ReactJS, Option.Angular, Option.WebDevelopment]
    };

    this.subjectState = new BehaviorSubject<PickerState>(initialState);
  }

  changeSubreddit(subreddit: string = 'angular') {
    this.setState({ value: subreddit });
  }
}

export const pickerService = new PickerService();
