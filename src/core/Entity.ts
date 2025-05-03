export class Entity {
  components = {};
  constructor() {}

  addComponent(component) {
    this.components[component.constructor.name] = component;
    component.entity = this;
  }

  getComponent(ComponentClass) {
    return this.components[ComponentClass.name];
  }
}
