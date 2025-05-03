import { Entity } from "./Entity";
import { InputService } from "./InputService";
import { System } from "./System";

export class Game {
  entities: Entity[] = [];
  systems: System[] = [];
  services = {
    input: new InputService(),
  };
  state = {};

  addEntity(entity: Entity) {
    this.entities.push(entity);
    return entity;
  }

  addSystem(system: System) {
    this.systems.push(system);
    return system;
  }

  update(deltaTime: number) {
    this.systems.forEach((system) => system.update(deltaTime));
  }
}
