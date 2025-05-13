<script>
  let { workout } = $props();

  function handleClick() {
    console.log("Div clicked!");
  }
</script>

<a href={"/workouts/" + workout._id}>
  <div class="workout-card">
    <div class="details">
      <div class="name">
        {workout.name}
      </div>
      <div>
        Description: {workout.description}
      </div>
      <div>
        Duration: {workout.duration} min
      </div>
      <div class="tags">
        {#each workout.tags as tag}
          <span class="badge rounded-pill text-bg-success">{tag}</span>
        {/each}
      </div>
    </div>
  </div>
</a>

<style>
  .workout-card {
    border: 1px solid #555;
    height: 100%;
    background-color: #444;
    color: white;
  }
  .details {
    padding: 0.5em;
  }
  .name {
    font-weight: bold;
  }

  a {
    all: unset;
  }

  .badge {
    margin-right: 5px;
  }
</style>
