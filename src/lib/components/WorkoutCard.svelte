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
        {workout.name} ({workout.duration} min)
      </div>
      <i>{workout.description} </i>
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

  .tags {
    margin-top: 5px;
  }

  .badge {
    margin-right: 5px;
  }
</style>
