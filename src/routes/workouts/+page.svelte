<script>
  import WorkoutCard from "$lib/components/WorkoutCard.svelte";

  let { data } = $props();

  let workouts = data.workouts;
</script>

<div class="row">
  {#each workouts as workout}
    <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2 workout">
        <WorkoutCard {workout}></WorkoutCard>
    </div>
  {/each}
</div>
