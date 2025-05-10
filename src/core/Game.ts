import { InputService } from "../input/InputService";
import { Component, ComponentConstructor } from "./Component";
import { Entity } from "./Entity";
import { System } from "./System";

export class Game {
  private lastTime = performance.now();
  private entities: Entity[] = [];
  private systems: System[] = [];
  public readonly services = {
    input: new InputService(),
  };

  public start() {
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  private gameLoop(timestamp: number) {
    const deltaTime = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;

    this.update(deltaTime);
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  addEntity(entity: Entity): Entity {
    this.entities.push(entity);
    return entity;
  }

  addSystem<T extends System>(system: T): T {
    this.systems.push(system);
    return system;
  }

  update(deltaTime: number): void {
    this.systems.forEach((system) => system.update(deltaTime));
  }

  getEntities(): ReadonlyArray<Entity> {
    return this.entities;
  }

  queryEntities<T extends Component>(
    ...componentClasses: ComponentConstructor<T>[]
  ): Entity[] {
    return this.entities.filter((entity) =>
      componentClasses.every((compClass) => entity.hasComponent(compClass)),
    );
  }

  destroy() {
    this.services.input.destroy();
  }
}
