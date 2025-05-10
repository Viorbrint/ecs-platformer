import { Component, ComponentConstructor } from "./Component";
import { Entity } from "./Entity";
import { System } from "./System";

export class Game {
  private lastTime = performance.now();
  private entities: Entity[] = [];
  private systems: System[] = [];
  private queryCache: Map<string, Entity[]> = new Map();

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
    this.clearQueryCache();
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
    const cacheKey = componentClasses.map((c) => c.name).join("|");

    if (this.queryCache.has(cacheKey)) {
      return this.queryCache.get(cacheKey)!;
    }

    const result = this.entities.filter((entity) =>
      componentClasses.every((compClass) => entity.hasComponent(compClass)),
    );

    this.queryCache.set(cacheKey, result);
    return result;
  }

  private clearQueryCache() {
    this.queryCache.clear();
  }
}
