import { AxiosError } from 'axios';
import { isReason } from '../components/NoResults';
import type { Reason } from '../components/NoResults';

export type TServiceResponse<T> = {
  data: T;
  error?: Error | null;
  errorReason?: Reason | null;
};

export function ServiceResponse<T>(
  data: T,
  error: TServiceResponse<T>['error'] = null,
  errorReason: TServiceResponse<T>['errorReason'] = null
): TServiceResponse<T> {
  let reason = errorReason;
  if (error && !errorReason) reason = 'UNKNOWN_ERROR';
  return {
    data: data,
    error: error,
    errorReason: reason,
  };
}

export function handleServiceError<T>(fallbackData: T, error: any): TServiceResponse<T> {
  if (error instanceof Error || error instanceof AxiosError) {
    return ServiceResponse(fallbackData, error, isReason(error.message) ? (error.message as Reason) : 'UNKNOWN_ERROR');
  } else return ServiceResponse(fallbackData, error);
}
