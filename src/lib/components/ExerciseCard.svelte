<script>
  let { exercise } = $props();
</script>

<div class="exercise-card">
  <div>
    <img class="img-fluid" src={exercise.img} alt="" />
  </div>
  <div class="details">
    <div class="name">
      {exercise.name}
    </div>
    <i>
      {exercise.description}
    </i>
    <div class="tags">
      {#each exercise.muscle_groups as muscle_group}
        <span class="badge rounded-pill text-bg-success">{muscle_group}</span>
      {/each}
    </div>
  </div>
</div>

<style>
  .exercise-card {
    border: 1px solid #555;
    height: 100%;
    background-color: #444;
    color: white;
    padding: 0.5em;
  }

  .name {
    font-weight: bold;
  }

  .tags {
    margin-top: 5px;
  }

  .badge {
    margin-right: 5px;
  }
</style>
