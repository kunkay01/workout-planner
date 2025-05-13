<script>
  let { data } = $props();
  let workout = $state(data.workout);

  let newTag = $state("");

  function addTag() {
    const trimmed = newTag.trim();
    if (trimmed && !workout.tags.includes(trimmed)) {
      workout.tags = [...workout.tags, trimmed];
      newTag = "";
    }
  }

  function removeTag(tagToRemove) {
    workout.tags = workout.tags.filter((tag) => tag !== tagToRemove);
  }
</script>

<a href="/workouts">Back</a>
<h1>{workout.name}</h1>

<form method="POST" action="?/update">
  <div class="mb-3">
    <input name="id" class="form-control" type="hidden" value={workout._id} />
  </div>
  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input name="name" class="form-control" type="text" value={workout.name} />
  </div>
  <div class="mb-3">
    <label for="description" class="form-label">Description</label>
    <input
      name="description"
      class="form-control"
      type="text"
      value={workout.description}
    />
  </div>
  <div class="mb-3">
    <label for="duration" class="form-label">Duration</label>
    <input
      name="duration"
      class="form-control"
      type="text"
      value={workout.duration}
    />
  </div>

  <div class="mb-3">
    <label for="tags" class="form-label">Tags</label>
    <div class="d-flex flex-wrap gap-2 mb-2">
      {#each workout.tags as tag}
        <span class="badge bg-primary">
          {tag}
          <button
            type="button"
            class="btn-close btn-close-white btn-sm ms-2"
            aria-label="Remove"
            onclick={() => removeTag(tag)}
          ></button>
        </span>
      {/each}
    </div>

    <div class="input-group">
      <input
        name="tagsAdd"
        type="text"
        bind:value={newTag}
        class="form-control"
        placeholder="Add a tag"
      />
      <button class="btn btn-outline-secondary" type="button" onclick={addTag}>
        Add
      </button>
    </div>
  </div>
  <div class="mb-3">
    <input name="tags" class="form-control" type="hidden" value={workout.tags} />
  </div>

  <button type="submit" class="btn btn-primary"> Update Workout </button>
</form>
