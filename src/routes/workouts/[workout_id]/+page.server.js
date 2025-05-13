import db from "$lib/server/db.js";

export async function load({ params }) {
  return {
    workout: await db.getWorkout(params.workout_id),
  };
}

export const actions = {
  update: async ({ request }) => {
    const data = await request.formData();
    console.log();
    let workout = {
      _id: data.get("id"),
      name: data.get("name"),
      description: data.get("description"),
      duration: data.get("duration"),
      tags: data.get("tags").split(",")
    }

    await db.updateWorkout(workout);
  }
}
