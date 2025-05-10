import { Component } from "./Component";
import { Entity } from "./Entity";

export class EntityBuilder {
  private entity: Entity;
  private components: Component[] = [];

  constructor() {
    this.entity = new Entity();
  }

  add(component: Component): this {
    this.components.push(component);
    return this;
  }

  build(): Entity {
    this.components.forEach((component) => {
      this.entity.addComponent(component);
    });
    return this.entity;
  }
}
