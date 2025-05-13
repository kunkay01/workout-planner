
import db from "$lib/server/db.js";

export async function load() {
    return {
      exercises: await db.getExercises(),
    };
  }