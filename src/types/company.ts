import { BankAccount } from './bank-account';
import type { BankAccountResponse } from './bank-account';

export type CompanyResponse = {
  id: number;
  name: string;
  description: string;
  phone: string;
  bank_1: string;
  bank_2: string;
  icon: string;
  level: number;
  non_profit: number;
  special_type: string;
  perms: string;
  payed_for: number;
  disabled: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  bank_details?: {
    bank_1: BankAccountResponse;
    bank_2: BankAccountResponse;
  };
  shops?: unknown[];
};

export class Company {
  id: number;
  name: string;
  description: string;
  phone: string;
  bank_1: string;
  bank_2: string;
  icon: string;
  level: number;
  non_profit: number;
  special_type: string;
  perms: string;
  payed_for: number;
  disabled: boolean;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  bank_details?: {
    bank_1: BankAccount;
    bank_2: BankAccount;
  };
  shops?: unknown[];

  constructor(data: CompanyResponse) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.phone = data.phone;
    this.bank_1 = data.bank_1;
    this.bank_2 = data.bank_2;
    this.icon = data.icon;
    this.level = data.level;
    this.non_profit = data.non_profit;
    this.special_type = data.special_type;
    this.perms = data.perms;
    this.payed_for = data.payed_for;
    this.disabled = data.disabled === 1;
    this.created_by = data.created_by;
    this.created_at = new Date(data.created_at);
    this.updated_at = new Date(data.updated_at);
    if (data.bank_details) {
      this.bank_details = {
        bank_1: new BankAccount(data.bank_details.bank_1, data.name),
        bank_2: new BankAccount(data.bank_details.bank_2, data.name),
      };
    }
    if (data.shops) this.shops = data.shops;
  }

  getBankAccounts(): BankAccount[] {
    if (!this.bank_details) return [] as BankAccount[];
    return Object.keys(this.bank_details).map(
      (key) =>
        // @ts-expect-error
        this.bank_details[key]
    );
  }
}
