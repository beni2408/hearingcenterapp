<script>
  import Gallery from "$lib/components/Gallery.svelte";

  export let data;

  let pageData;
  let error;

  // destructure load() data
  $: ({ pageData, error } = data);

  // ✅ DEFINE FUNCTION INSIDE SCRIPT
  function splitByGallery(content) {
    return content.split("[gallery]");
  }
</script>

{#if error}
  <p class="p-10 text-red-600">Page not found</p>

{:else if !pageData}
  <p class="p-10">Loading...</p>

{:else}
  <div class="px-[80px] py-10">
    <h1 class="text-3xl font-bold mb-6">
      {pageData.page_title}
    </h1>

    {#if pageData.page_content.includes("[gallery]")}
      {#each splitByGallery(pageData.page_content) as block, i}
        <div class="prose max-w-none">
          {@html block}
        </div>

        {#if i === 0}
          <Gallery />
        {/if}
      {/each}
    {:else}
      <div class="prose max-w-none">
        {@html pageData.page_content}
      </div>
    {/if}
  </div>
{/if}
