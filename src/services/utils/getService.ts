import { PlainStoreService } from 'src/services/storeService';

const services = new Map();

export const getService = <
  State,
  Service extends PlainStoreService<State> = PlainStoreService<State>
>(
  Service: new () => Service
): Service => {
  if (!services.has(Service)) {
    const service = new Service();
    services.set(Service, service);

    return service;
  }

  return services.get(Service);
};
