import type { PageServerLoad } from "./$types";
import { db } from "$lib/database";

export const load: PageServerLoad = () => {
  const measurements = db
    .prepare(
      `
        SELECT * FROM measurements
        WHERE timestamp > unixepoch() - 86400
        ORDER BY timestamp ASC;
      `,
    )
    .all();

  return { measurements };
};
