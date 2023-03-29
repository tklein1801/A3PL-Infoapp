import { Side } from './side';
import type { Sides } from './side';

export type PhonebookResponse = {
  pid: string;
  /** Identity Nr */
  idNR: number;
  phonebook: {
    number: string;
    name: string;
    type: string;
    special: string;
    iban: string;
  }[];
  updated_at: string;
  created_at: string;
  laravel_through_key: string;
  side: Sides;
  identity: {
    id: number;
    pid: string;
    side: Sides;
    name: string;
    created_at: Date;
    id_birthday: Date;
    id_nationality: string;
    rac_membership: string;
    variables: string;
  };
};

export class Phonebook {
  pid: string;
  idNR: number;
  phonebook: {
    number: string | null;
    name: string;
    type: string;
    special: string;
    iban: string | null;
  }[];
  updated_at: Date;
  created_at: Date;
  laravel_through_key: string;
  side: Side;
  identity: {
    id: number;
    pid: string;
    side: Side;
    name: string;
    created_at: Date;
    id_birthday: Date;
    id_nationality: string;
    rac_membership: string;
    variables: string;
  };

  constructor(data: PhonebookResponse) {
    this.pid = data.pid;
    this.idNR = data.idNR;
    this.phonebook = data.phonebook.map((contact) => ({
      ...contact,
      number: contact.number.length > 0 ? contact.number : null,
      iban: contact.iban.length > 0 ? contact.iban : null,
    }));
    this.updated_at = new Date(data.updated_at);
    this.created_at = new Date(data.created_at);
    this.laravel_through_key = data.laravel_through_key;
    this.side = new Side(data.side);
    this.identity = {
      ...data.identity,
      side: new Side(data.identity.side),
      created_at: new Date(data.identity.created_at),
    };
  }
}
