import { Component, ComponentConstructor } from "./Component";

export class Entity {
  private components: Map<string, Component> = new Map();

  addComponent<T extends Component>(component: T): T {
    this.components.set(component.constructor.name, component);
    return component;
  }

  getComponent<T extends Component>(
    componentClass: ComponentConstructor<T>,
  ): T | undefined {
    return this.components.get(componentClass.name) as T | undefined;
  }

  hasComponent<T extends Component>(
    componentClass: ComponentConstructor<T>,
  ): boolean {
    return this.components.has(componentClass.name);
  }

  removeComponent<T extends Component>(
    componentClass: ComponentConstructor<T>,
  ): void {
    this.components.delete(componentClass.name);
  }
}
