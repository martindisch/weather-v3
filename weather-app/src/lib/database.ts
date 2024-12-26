import Database from "better-sqlite3";

export const db = new Database("measurements.sqlite3");

// We're actively not using WAL because our app just doesn't need the perf
// db.pragma("journal_mode = WAL");
