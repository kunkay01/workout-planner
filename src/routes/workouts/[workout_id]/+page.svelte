<script>
  import { _ } from "svelte-i18n";
  let { data, form } = $props();
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

  function exerciseEdit() {
    window.location = workout._id +"/exercises";
  }
</script>

<div class="actions">
  <a href="/workouts">{$_("general.back")}</a>
  <span class="spacer"></span>
  <button type="button" class="btn btn-primary" onclick={exerciseEdit}>{$_("workouts.action_exercises")}</button>
  <form method="POST" action="?/delete">
    <input name="id" class="form-control" type="hidden" value={workout._id} />
    <button type="submit" class="btn btn-danger"> {$_("workouts.action_delete")} </button>
  </form>
</div>
<h1>{workout.name}</h1>

{#if form?.success}
  <div class="alert alert-success" role="alert">{$_("workouts.edit.success")}</div>
{/if}

<form method="POST" action="?/update">
  <div class="mb-3">
    <input name="id" class="form-control" type="hidden" value={workout._id} />
  </div>
  <div class="mb-3">
    <label for="name" class="form-label">{$_("workouts.fields.name")}</label>
    <input name="name" class="form-control" type="text" value={workout.name} />
  </div>
  <div class="mb-3">
    <label for="description" class="form-label">{$_("workouts.fields.description")}</label>
    <input
      name="description"
      class="form-control"
      type="text"
      value={workout.description}
    />
  </div>
  <div class="mb-3">
    <label for="duration" class="form-label">{$_("workouts.fields.duration")}</label>
    <input
      name="duration"
      class="form-control"
      type="text"
      value={workout.duration}
    />
  </div>

  <div class="mb-3">
    <label for="tags" class="form-label">{$_("workouts.fields.tags")}</label>
    <div class="d-flex flex-wrap gap-2 mb-2">
      {#each workout.tags as tag}
        <span class="badge text-bg-success">
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
      <button class="btn btn-success" type="button" onclick={addTag}>
        {$_("workouts.fields.tags_add")}
      </button>
    </div>
  </div>
  <div class="mb-3">
    <input
      name="tags"
      class="form-control"
      type="hidden"
      value={workout.tags}
    />
  </div>

  <button type="submit" class="btn btn-primary"> {$_("workouts.action_update")} </button>
</form>

<style>
  .actions {
    display: flex;
    gap: 5px;
  }

  .spacer {
    flex-grow: 1;
  }
</style>
