<script>
  import WorkoutCard from "$lib/components/WorkoutCard.svelte";
  import { _ } from "svelte-i18n";
  let { data } = $props();

  let workouts = data.workouts;

  function create() {
    window.location.href = "workouts/create";
  }
</script>

<div class="header">
  <div>
    <h1>{$_("workouts.title")}</h1>
    <p>{$_("workouts.subtitle")}</p>
  </div>
  <span class="spacer"></span>
  <div class="action">
    <button type="button" class="btn btn-primary" onclick={create}>
      {$_("workouts.action_create")}
    </button>
  </div>
</div>

<div class="row">
  {#each workouts as workout}
    <div class="col-sm-6 col-lg-3 g-2 workout">
      <WorkoutCard {workout}></WorkoutCard>
    </div>
  {/each}
</div>

<style>
  .header {
    display: flex;
  }

  .action {
    align-content: center;
  }

  .spacer {
    flex-grow: 1;
  }
</style>
