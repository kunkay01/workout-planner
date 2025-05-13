<script>
  import ExerciseCard from "$lib/components/ExerciseCard.svelte";

  let { data } = $props();
  let workoutExercises = data.workoutExercises;
  let workout = data.workout;
  let exercises = $state(data.exercises);


  
</script>

<a href="/workouts/{workout._id}">Back</a>
<h1>Exercises for the Workout: "{workout.name}"</h1>

<form method="POST" action="?/create">
  <input name="id" class="form-control" type="hidden" value={workout._id} />

  <div class="mb-3">
    <label for="sets" class="form-label">Sets</label>
    <input name="sets" class="form-control" type="text" />
  </div>

  <div class="mb-3">
    <label for="repetitions" class="form-label">Repetitions</label>
    <input name="repetitions" class="form-control" type="text" />
  </div>

  <div class="mb-3">
    <label for="exercise" class="form-label">Exercise</label>
    <select name="exercise" class="form-select" aria-label="Default select example">
      {#each exercises.filter((exercise) => !workoutExercises.some(wE => wE.exercise._id === exercise._id)) as exercise}
        <option value={exercise._id}>{exercise.name}</option>
      {/each}
    </select>
  </div>

  <button type="submit" class="btn btn-primary"> Add Exercise </button>
</form>

<hr class="solid" />

<div class="exercises">
  {#each workoutExercises as workoutExercise}
    <div class="exercise-card">
      <div>
        <h3>{workoutExercise.exercise.name}</h3>
        <i>{workoutExercise.exercise.description}</i>
        <br />
        <b>Sets: {workoutExercise.sets}</b>
        <b>Repetitions: {workoutExercise.repetitions}</b>
      </div>
      <span class="spacer"></span>
      <div class="remove">
        <form method="POST" action="?/delete">
          <input
            name="id"
            class="form-control"
            type="hidden"
            value={workoutExercise._id}
          />
          <button type="submit" class="btn btn-danger">
            Remove Exercise
          </button>
        </form>
      </div>
    </div>
  {/each}
</div>

<style>
  .exercises {
    display: flex;
    gap: 10px;
    flex-direction: column;
    margin-top: 5px;
  }

  .exercise-card {
    border: 1px solid #555;
    height: 100%;
    width: 100%;
    background-color: #444;
    color: white;
    padding: 0.5em;
    display: flex;
    flex-direction: row;
  }

  .spacer {
    flex-grow: 1;
  }

  .remove {
    align-content: center;
  }
</style>
