<script>
  import { _ } from "svelte-i18n";
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

<a href="/workouts">{$_("general.back")}</a>
<h1>{$_("workouts.create.title")}</h1>

{#if form?.success}
  <div class="alert alert-success" role="alert">{$_("workouts.create.success")}</div>
{/if}

<form method="POST" action="?/create">
  <div class="mb-3">
    <label for="name" class="form-label">{$_("workouts.fields.name")}</label>
    <input name="name" class="form-control" type="text" />
  </div>
  <div class="mb-3">
    <label for="description" class="form-label">{$_("workouts.fields.description")}</label>
    <input name="description" class="form-control" type="text" />
  </div>
  <div class="mb-3">
    <label for="duration" class="form-label">{$_("workouts.fields.duration")}</label>
    <input name="duration" class="form-control" type="text" />
  </div>

  <div class="mb-3">
    <label for="tags" class="form-label">{$_("workouts.fields.tags")}</label>
    <div class="d-flex flex-wrap gap-2 mb-2">
      {#each tags as tag}
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
      value={tags}
    />
  </div>

  <button type="submit" class="btn btn-primary"> {$_("workouts.action_create")} </button>
</form>