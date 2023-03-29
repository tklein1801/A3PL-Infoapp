export type ApiResponse<T> = {
  /** Response data */
  data: T[];
  /** UNIX-Timestamp */
  requested_at: number;
};

export type ErrorResponse = {
  status: 'Error';
  requested_at?: number;
};

export type ValidSecretResponse = {
  status: 'Success';
  name: string;
  requested_at: number;
};

export type TimezoneResponse =
  | {
      date: string;
      timezone_type: number;
      timezone: string;
    }
  | '-';

export class Timezone {
  date: Date;
  timezone_type: number;
  timezone: string;

  constructor(data: TimezoneResponse) {
    if (data !== '-') {
      this.date = new Date(data.date);
      this.timezone_type = data.timezone_type;
      this.timezone = data.timezone;
    } else {
      this.date = new Date();
      this.timezone_type = -1;
      this.timezone = '';
    }
  }
}
