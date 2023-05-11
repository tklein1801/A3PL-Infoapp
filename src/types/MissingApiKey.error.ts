import type { Reason } from '../components/NoResults';

export class CustomError extends Error {
  constructor(message: Reason) {
    super(message);
    this.name = 'CustomError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class MissingApiKey extends CustomError {
  constructor() {
    super('MISSING_API_KEY');
  }
}
