import Database from "better-sqlite3";

const db = new Database("measurements.sqlite3");

db.exec(`
  DROP TABLE IF EXISTS measurements;
  CREATE TABLE measurements (timestamp INTEGER PRIMARY KEY ASC, temperature Real, humidity Real);
`);
