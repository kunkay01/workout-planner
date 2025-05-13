<script>
  import ExerciseCard from "$lib/components/ExerciseCard.svelte";

  let { data } = $props();
  let exercises = data.exercises;  
</script>

<h1>Exercises</h1>
<p>These are the exercises which you can choose from to create your perfect workout</p>

<div class="row">
  {#each exercises as exercise}
    <div class="col-sm-6 col-md-6 col-lg-3 mb-2 gx-2">
      <ExerciseCard {exercise}></ExerciseCard>
    </div>
  {/each}
</div>
