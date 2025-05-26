<script>
  import ExerciseCard from "$lib/components/ExerciseCard.svelte";
  import { _ } from "svelte-i18n";

  let { data } = $props();
  let exercises = data.exercises;  
</script>

<h1>{$_("exercises.title")}</h1>
<p>{$_("exercises.subtitle")}</p>

<div class="row">
  {#each exercises as exercise}
    <div class="col-sm-6 col-lg-3 g-2">
      <ExerciseCard {exercise}></ExerciseCard>
    </div>
  {/each}
</div>
