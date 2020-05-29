import { useState, useEffect, Dispatch } from 'react'
import { PlainStoreService } from 'src/services/plainStoreService'

export const useService = <State = {}, Service extends PlainStoreService<State> = PlainStoreService<State>>(
  service: Service
): [State, Dispatch<Partial<State>>] => {
  const [value, setState] = useState(service.selectAll())

  useEffect(() => {
    const subscription = service.subscribe((s) => setState(s));
    return () => subscription.unsubscribe();
  /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const newSetState = (s: Partial<State>) => service.setState(s);

  return [value, newSetState];
}
