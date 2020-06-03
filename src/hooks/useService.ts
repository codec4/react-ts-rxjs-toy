import { useState, useEffect } from 'react';
import { PlainStoreService } from 'src/services/storeService';

export const useService = <
  State = {},
  Service extends PlainStoreService<State> = PlainStoreService<State>
>(
  service: Service
): State => {
  const [value, setState] = useState(service.getState());

  useEffect(() => {
    const subscription = service.subscribe(setState);
    return () => subscription.unsubscribe();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return value;
};
