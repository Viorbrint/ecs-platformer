export class ServiceContainer {
  private static instance: ServiceContainer;
  private services: Map<symbol, { factory: () => any; instance?: any }> =
    new Map();

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  register<T>(key: symbol, factory: () => T): void {
    this.services.set(key, { factory });
  }

  resolve<T>(key: symbol): T {
    const entry = this.services.get(key);
    if (!entry) throw new Error(`Service ${key.toString()} not registered`);

    if (!entry.instance) {
      entry.instance = entry.factory(); // Создаём экземпляр только при первом вызове
    }
    return entry.instance;
  }
}

export const RENDER_SERVICE = Symbol("RenderService");
export const INPUT_SERVICE = Symbol("InputService");
