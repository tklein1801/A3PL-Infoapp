export type BankAccountResponse = {
  id: number;
  pid: string;
  iban: string;
  balance: number;
  default_account: number;
  disabled: number;
  created_at: string;
  updated_at: string;
};

export class BankAccount {
  id: number;
  pid: string;
  iban: string;
  owner: string;
  balance: number;
  default_account: boolean;
  disabled: boolean;
  created_at: Date;
  updated_at: Date;

  constructor(data: BankAccountResponse, owner = 'Unknown') {
    this.id = data.id;
    this.pid = data.pid;
    this.iban = data.iban;
    this.owner = owner;
    this.balance = data.balance;
    this.default_account = data.default_account === 1;
    this.disabled = data.disabled === 1;
    this.created_at = new Date(data.created_at);
    this.updated_at = new Date(data.updated_at);
  }
}
