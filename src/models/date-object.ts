import { Units } from './units';

export type DateObject<T = string | number> = Partial<Record<Units, T>>;
