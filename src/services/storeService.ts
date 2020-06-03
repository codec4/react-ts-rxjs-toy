import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

export abstract class PlainStoreService<T> {
  protected subjectState: BehaviorSubject<T>;

  public select<K extends keyof T>(key: K): Observable<T[K]> {
    return this.subjectState.asObservable().pipe(pluck(key));
  }

  public selectSnapshot<K extends keyof T>(key: K): T[K] {
    return this.subjectState.getValue()[key];
  }

  public set<K extends keyof T>(key: K, data: T[K]) {
    this.subjectState.next({ ...this.subjectState.value, [key]: data });
  }

  public setState(partialState: Partial<T>) {
    const currentState = this.subjectState.getValue();
    const nextState = { ...currentState, ...partialState };

    this.subjectState.next(nextState);
  }

  public getState(): T {
    return this.subjectState.getValue();
  }

  public subscribe(subscription: (s: T) => any) {
    return this.subjectState.subscribe(subscription);
  }
}
