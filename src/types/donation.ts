import type { TimezoneResponse } from './api_response';
import { Timezone } from './api_response';

export type DonationResponse = {
  amount: 10;
  level: 1;
  duration: -1;
  active: 1;
  activated_at: '2020-08-06 23:23:35';
  created_at: '2020-08-06 23:23:35';
  valid_until: TimezoneResponse;
  days_left: 0;
};

export class Donation {
  amount: number;
  level: number;
  duration: number;
  active: boolean;
  activated_at: Date;
  created_at: Date;
  valid_until: Timezone;
  days_left: number;

  constructor(data: DonationResponse) {
    this.amount = data.amount;
    this.level = data.level;
    this.duration = data.duration;
    this.active = data.active === 1;
    this.activated_at = new Date(data.activated_at);
    this.created_at = new Date(data.created_at);
    this.valid_until = new Timezone(data.valid_until);
    this.days_left = data.days_left;
  }
}
