import { addHours } from 'date-fns';
import type { PositionResponse } from './position';
import { Position } from './position';

/**
 * Attributes for server houses
 */
export type ServerHouseResponse = {
  id: number;
  location: PositionResponse;
  players: string[];
};

export class ServerHouse {
  id: number;
  location: Position;
  players: string[];

  constructor({ id, location, players }: ServerHouseResponse) {
    this.id = id;
    this.location = new Position(location);
    this.players = players;
  }
}

export type HouseResponse = ServerHouseResponse & {
  /** `payed_for` in hours */
  payed_for: number;
  disabled: number;
};

export class House extends ServerHouse {
  /** `payed_for` in hours */
  payed_for: number;
  active_until: Date;
  disabled: boolean;

  constructor(data: HouseResponse) {
    super({ ...data });
    this.payed_for = data.payed_for;
    this.active_until = addHours(new Date(), data.payed_for);
    this.disabled = data.disabled === 1;
  }
}

export type RentalResponse = {
  id: number;
  /** `payed_for` in hours */
  payed_for: number;
  disabled: number;
  active: number;
};

export class Rental {
  id: number;
  /** `payed_for` in hours */
  payed_for: number;
  active_until: Date;
  disabled: boolean;
  active: boolean;

  constructor(data: RentalResponse) {
    this.id = data.id;
    this.payed_for = data.payed_for;
    this.active_until = addHours(new Date(), data.payed_for);
    this.disabled = data.disabled === 1;
    this.active = data.active === 1;
  }
}

export type BuildingResponse = ServerHouseResponse & {
  classname: string;
  stage: number;
  disabled: number;
};

export class Building extends ServerHouse {
  classname: string;
  stage: number;
  disabled: boolean;

  constructor(data: BuildingResponse) {
    super({ ...data });
    this.classname = data.classname;
    this.stage = data.stage;
    this.disabled = data.disabled === 1 || data.stage < 1;
  }
}
