import Database from "better-sqlite3";

const db = new Database("measurements.sqlite3");

const insert = db.prepare(
  "REPLACE INTO measurements VALUES (@timestamp, @temperature, @humidity);",
);
const insertMany = db.transaction((measurements) => {
  for (const measurement of measurements) insert.run(measurement);
});

const currentTimestamp = Math.floor(Date.now() / 1000) - 86400;
const measurements = [...Array(288).keys()].map((i) => ({
  timestamp: currentTimestamp + i * 5 * 60,
  temperature: 10 + i * 0.03472,
  humidity: 20 - i * 0.03472,
}));

insertMany(measurements);
