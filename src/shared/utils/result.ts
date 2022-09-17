/* eslint-disable no-use-before-define */
export interface Match<T, E> {
  isOk(): this is Ok<T>;
  isErr(): this is Err<E>;
}

export interface Ok<T> extends Match<T, undefined> {
  value: T;
}

export interface Err<E> extends Match<undefined, E> {
  error: E;
}

export type Result<T, E> = Ok<T> | Err<E>;
export type ResultAsync<T, E> = Promise<Result<T, E>>;

export const ok = <T>(value: T): Ok<T> => ({
  value,
  isOk: () => true,
  isErr: () => false,
});

export const err = <E>(error: E): Err<E> => ({
  error,
  isOk: () => false,
  isErr: () => true,
});
