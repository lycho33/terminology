import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Term = {
    id: Generated<number>;
    name: string;
    definition: string;
    usage: string | null;
    example: unknown | null;
    topicId: number;
};
export type Topic = {
    id: Generated<number>;
    name: string;
};
export type DB = {
    Term: Term;
    Topic: Topic;
};
