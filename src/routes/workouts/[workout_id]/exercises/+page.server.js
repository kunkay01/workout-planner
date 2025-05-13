import db from "$lib/server/db.js";

export async function load({ params }) {
  return {
    workoutExercises: await db.getWorkoutExercises(params.workout_id),
    workout: await db.getWorkout(params.workout_id),
    exercises: await db.getExercises(),
  };
}

export const actions = {
  delete: async ({request}) => {
    const data = await request.formData();
    await db.deleteWorkoutExercise(data.get("id"));

    return {success: true}
  },
   create: async ({request}) => {
    const data = await request.formData();
        let workoutExercise = {
          workout_id: data.get("id"),
          exercise_id: data.get("exercise"),
          sets: data.get("sets"),
          repetitions: data.get("repetitions"),
        }

        await db.createWorkoutExercise(workoutExercise);
    
        return { success: true };
  },
}
