export abstract class Component {}

export type ComponentConstructor<T extends Component> = new (
  ...args: any[]
) => T;
