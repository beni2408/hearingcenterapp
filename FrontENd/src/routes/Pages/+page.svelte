
<script>
  import { onMount } from "svelte";
  import { PAGE_API_URL } from "$lib/config";

  let pages = [];
  let loading = true;

  onMount(async () => {
    const res = await fetch(PAGE_API_URL);
    const json = await res.json();
    pages = json.data.pages;
    loading = false;
  });

  async function deletePage(id) {
if (!confirm("Are you sure you want to delete this page?")) return;

try {
  const res = await fetch(`${PAGE_API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Delete failed");
  }

  // remove deleted page from table instantly
  pages = pages.filter(page => page._id !== id);
} catch (error) {
  alert(error.message);
}
}

</script>

<h1 class="text-2xl font-bold mb-6 mx-[80px]"> Pages List</h1>

<a href="/Pages/new" class="bg-blue-900 text-white px-4 py-2 rounded mx-[80px]">
  + New Page
</a>

{#if loading}
  <p class="mt-6">Loading...</p>
{:else}
<table class="w-[1300px] border mt-6 mx-[80px]">
  <thead class="bg-gray-100">
    <tr>
      <th class="p-2 border">Title</th>
      <th class="p-2 border">URL</th>
      <th class="p-2 border">Status</th>
      <th class="p-2 border">Menu</th>
      <th class="p-2 border">Action</th>
    </tr>
  </thead>
  <tbody>
    {#each pages as page}
      <tr>
        <td class="p-2 border">{page.page_title}</td>
        <td class="p-2 border">{page.page_url}</td>
        <td class="p-2 border">
          {page.page_status ? "Enabled" : "Disabled"}
        </td>
        <td class="p-2 border">
          {page.page_menu ? "Enabled" : "Disabled"}
        </td>
        <td class="p-2 border space-x-4">
          <a
            href={`/Pages/edit/${page._id}`}
            class="text-blue-600 underline"
          >
            Edit
          </a>
        
          <button
            on:click={() => deletePage(page._id)}
            class="text-red-600 underline cursor-pointer"
          >
            Delete
          </button>
        </td>
        
      </tr>
    {/each}
  </tbody>
</table>
{/if}
