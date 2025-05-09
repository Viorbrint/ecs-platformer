import { Component, ComponentConstructor } from "./Component";
import { Entity } from "./Entity";
import { Game } from "./Game";

export abstract class System {
  constructor(protected readonly game: Game) {}

  abstract update(deltaTime: number): void;

  protected query<C extends Component[]>(
    ...componentTypes: { [K in keyof C]: ComponentConstructor<C[K]> }
  ): Entity[] {
    return this.game.queryEntities(...componentTypes);
  }
}
