import { Side } from './side';
import type { Sides } from './side';

export type LicenseResponse = {
  pid: string;
  license: string;
  created_at: string;
  export_licence: {
    id: number;
    license: string;
    name: string;
    price: number;
    illegal: number;
    side: Sides;
    level: number;
  } | null;
};

export class License {
  pid: string;
  license: string;
  created_at: Date;
  export_licence: {
    id: number;
    license: string;
    name: string;
    price: number;
    illegal: boolean;
    side: Side;
    level: number;
  } | null;

  constructor(data: LicenseResponse) {
    this.pid = data.pid;
    this.license = data.license;
    this.created_at = new Date(data.created_at);
    this.export_licence = data.export_licence
      ? {
          ...data.export_licence,
          side: new Side(data.export_licence.side),
          illegal: data.export_licence.illegal === 1,
        }
      : null;
  }
}
