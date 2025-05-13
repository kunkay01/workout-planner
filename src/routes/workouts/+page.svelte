<script>
  import WorkoutCard from "$lib/components/WorkoutCard.svelte";

  let { data } = $props();

  let workouts = data.workouts;

  function create() {
    window.location.href = "workouts/create";
  }
</script>

<h1>Workouts</h1>
<p>These are your workouts, you can create, edit and delete them</p>
<div class="action">
  <button type="button" class="btn btn-primary" onclick={create}>
    Create Workout
  </button>
</div>

<div class="row">
  {#each workouts as workout}
    <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2 workout">
      <WorkoutCard {workout}></WorkoutCard>
    </div>
  {/each}
</div>

<style>
  .action {
    margin-bottom: 15px;
  }
</style>
