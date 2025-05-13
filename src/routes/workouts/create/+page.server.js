import db from "$lib/server/db.js";

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    console.log();
    let workout = {
      name: data.get("name"),
      description: data.get("description"),
      duration: data.get("duration"),
      tags: data.get("tags") !== "" ? data.get("tags").split(",") : []
    }

    await db.createWorkout(workout);

    return { success: true };
  }
}
