import { Side } from './side';
import type { Sides } from './side';

export type PhoneResponse = {
  pid: string;
  phone: string;
  note: string;
  side: Sides;
  idNR: number;
  disabled: number;
  created_at: string;
  updated_at: string;
};

export class Phone {
  pid: string;
  phone: string;
  note: string;
  side: Side;
  idNR: number;
  disabled: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: PhoneResponse) {
    this.pid = data.pid;
    this.phone = data.phone;
    this.note = data.note;
    this.side = new Side(data.side);
    this.idNR = data.idNR;
    this.disabled = data.disabled === 1;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
  }

  getNoteLabel(): string {
    switch (this.note) {
      case 'default':
        return 'Standard';
      case 'bought':
        return 'Gekauft';
      default:
        return this.note;
    }
  }
}
