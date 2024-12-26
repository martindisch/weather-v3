import { type RequestHandler, error } from "@sveltejs/kit";
import type { Measurement } from "$lib/types";
import { db } from "$lib/database";

export const POST: RequestHandler = async ({ request }) => {
  verifyApiKey(request.headers.get("x-api-key"), process.env["API_KEY"]!);

  const measurements: Measurement[] = await request.json();
  const insert = db.prepare(
    "REPLACE INTO measurements VALUES (@timestamp, @temperature, @humidity);",
  );
  const insertMany = db.transaction((measurements) => {
    for (const measurement of measurements) insert.run(measurement);
  });

  insertMany(measurements);

  return new Response(null, { status: 201 });
};

// Because this route is the only place we need the following code, it hasn't
// been turned into a middleware yet
const verifyApiKey = (headerKey: string | null, environmentKey: string) => {
  if (headerKey !== environmentKey) {
    throw error(401, "Invalid API key");
  }
};
