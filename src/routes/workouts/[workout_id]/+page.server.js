import db from "$lib/server/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  return {
    workout: await db.getWorkout(params.workout_id),
  };
}

export const actions = {
  update: async ({ request }) => {
    const data = await request.formData();
    let workout = {
      _id: data.get("id"),
      name: data.get("name"),
      description: data.get("description"),
      duration: data.get("duration"),
      tags: data.get("tags") !== "" ? data.get("tags").split(",") : []
    }

    await db.updateWorkout(workout);

    return { success: true };
  },
  delete: async ({request}) => {
    const data = await request.formData();
    await db.deleteWorkout(data.get("id"));

    return redirect(301, '/workouts');
  }
}
