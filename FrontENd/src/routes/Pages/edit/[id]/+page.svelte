
<script>
  import { onMount } from "svelte";
  import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
  import { PAGE_API_URL } from "$lib/config";
  let editorElement;
  let editorInstance = null;
  import Gallery from '$lib/components/Gallery.svelte';

  let page_title = "";
  let page_url = "";
  let page_content = "";
  let page_status = true;
  // let page_menu = true;

  let loading = true;
  let saving = false;

  function getPageId() {
  const parts = window.location.pathname.split("/");
  const id = parts[parts.length - 1];
  console.log("Page ID:", id);
  return id;
}


async function loadPage() {
  try {
    const id = getPageId(); 
    const res = await fetch(`${PAGE_API_URL}/${id}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch page data: ${res.status}`);
    }

    const json = await res.json();
    const page = json.data;

    // set simple fields
    page_title = page.page_title || "";
    page_url = page.page_url || "";
    page_status = page.page_status ?? true;

    // IMPORTANT: set content
    page_content = page.page_content || "";

    // IMPORTANT: inject content into CKEditor
    if (editorInstance) {
      editorInstance.setData(page_content);
    }

    loading = false;
  } catch (error) {
    console.error("Error loading page:", error);
    loading = false;
  }
}


  async function updatePage() {
    try {
      saving = true;
      const id = getPageId(); 

      const payload = {
        page_title,
        page_url,
        page_content,
        page_status,
        // page_menu,
      };

      const res = await fetch(`${PAGE_API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Failed to update page: ${res.status}`);
      }

      alert("Page updated successfully");
      window.location.href = "/";
    } catch (error) {
      console.error("Error updating page:", error); 
      alert("Failed to update page. Please check the console for details.");
    } finally {
      saving = false;
    }
  }

  onMount(async () => {
  try {
    editorInstance = await ClassicEditor.create(editorElement, {
      toolbar: [
        "bold",
        "italic",
        "numberedList",
        "bulletedList",
        "link",
        "blockQuote",
        "insertTable",
        "undo",
        "redo",
      ],
    });

    editorInstance.model.document.on("change:data", () => {
      page_content = editorInstance.getData() || "";
    });

    await loadPage();
  } catch (error) {
    console.error("Editor init error:", error);
    alert("Editor failed to load");
    loading = false;
  }
});

</script>
<!-- 
{#if loading}
<p class="p-10">Loading page...</p>
{:else} -->

<div class="flex justify-between items-center mb-2 mx-[80px] mt-10">

  <h1 class="text-2xl font-bold mb-6">Update Page</h1>
  <div class="flex justify-end hover:cursor-pointer mb-6">
    <div class="bg-black text-white text-xl w-[80px] h-[40px] rounded-4xl items-center flex justify-center">
        <i class="fas fa-angle-left text-[15px]" ></i>


        <a href="/Pages" class="text-[15px]">Back</a>
    </div>
 
</div>
</div>
<form on:submit|preventDefault={updatePage} class="space-y-5 px-20 pt-10">

  {#if loading}
    <p class="p-5">Loading page...</p>
  {/if}

  <div>
    <label class="block text-sm font-medium">Page Title</label>
    <input class="border p-2 w-full" bind:value={page_title} />
  </div>

  <div>
    <label class="block text-sm font-medium">Page URL</label>
    <input class="border p-2 w-full" bind:value={page_url} />
  </div>

  <div>
    <label class="block text-sm font-medium">Page Content</label>
    <div bind:this={editorElement}></div>
  </div>

  <div>
    <label>Page Status</label>
    <select bind:value={page_status}>
      <option value={true}>Enable</option>
      <option value={false}>Disable</option>
    </select>
  </div>


  <!-- <div>
    <label>Show in Menu</label>
    <select bind:value={page_menu}>
      <option value={true}>Enable</option>
      <option value={false}>Disable</option>
    </select>
  </div> -->

  <button class="bg-blue-900 text-white px-6 py-2 rounded">
    Update Page
  </button>

</form>

