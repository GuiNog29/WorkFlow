import { container } from 'tsyringe';

export function GetService<T>(service: new (...args: any[]) => T): T {
  return container.resolve(service);
}
