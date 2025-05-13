
import db from "$lib/server/db.js";

export async function load() {
    return {
      workouts: await db.getWorkouts(),
    };
  }