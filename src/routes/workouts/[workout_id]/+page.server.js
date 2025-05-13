import db from "$lib/server/db.js";

export async function load({ params }) {
  return {
    workout: await db.getWorkout(params.workout_id),
  };
}
