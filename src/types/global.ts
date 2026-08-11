export type Nullable<T> = T | null;

export type Maybe<T> = T | null | undefined;

export type ValueOf<T> = T[keyof T];

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';
