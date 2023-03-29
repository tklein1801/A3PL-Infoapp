/** Contains a stringified array with numbers for `x`, `y`, `z` */
export type PositionResponse = string;

export class Position {
  valid: boolean;
  pos: { x: number; y: number; z: number };

  constructor(position: PositionResponse) {
    if (!this.receivedValidPositionString(position)) {
      console.warn(`'${position}' is not a valid argument for this constructor`);
      this.valid = false;
      this.pos = { x: 0, y: 0, z: 0 };
      return;
    }

    const [x, y, z] = JSON.parse(position);
    this.valid = true;
    this.pos = {
      x: x.toFixed(),
      y: y.toFixed(),
      z: z.toFixed(),
    };
  }

  private receivedValidPositionString(positionString: string): boolean {
    const position = JSON.parse(positionString);
    return position && position.length === 3;
  }

  getMapUrl(): string {
    if (!this.valid) {
      console.warn("Provided link won't show the actual location");
    }
    const { x, y } = this.pos;
    return `https://info.panthor.de/map?x=${x}&y=${y}`;
  }
}
