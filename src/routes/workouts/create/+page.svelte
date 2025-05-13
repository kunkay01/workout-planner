<script>
  let { form } = $props();

  let newTag = $state("");
  let tags = $state([]);

  function addTag() {
    const trimmed = newTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      tags = [...tags, trimmed];
      newTag = "";
    }
  }

  function removeTag(tagToRemove) {
    tags = tags.filter((tag) => tag !== tagToRemove);
  }
</script>

<a href="/workouts">Back</a>
<h1>Add a Workout</h1>

{#if form?.success}
  <div class="alert alert-success" role="alert">Workout created</div>
{/if}

<form method="POST" action="?/create">
  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input name="name" class="form-control" type="text" />
  </div>
  <div class="mb-3">
    <label for="description" class="form-label">Description</label>
    <input name="description" class="form-control" type="text" />
  </div>
  <div class="mb-3">
    <label for="duration" class="form-label">Duration</label>
    <input name="duration" class="form-control" type="text" />
  </div>

  <div class="mb-3">
    <label for="tags" class="form-label">Tags</label>
    <div class="d-flex flex-wrap gap-2 mb-2">
      {#each tags as tag}
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
    <input
      name="tags"
      class="form-control"
      type="hidden"
      value={tags}
    />
  </div>

  <button type="submit" class="btn btn-primary"> Create Workout </button>
</form>


