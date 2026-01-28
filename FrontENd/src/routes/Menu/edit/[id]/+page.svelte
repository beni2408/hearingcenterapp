<script>
  import { onMount } from "svelte";
  import { MENU_API_URL } from "$lib/config";

  let menu_title = "";
  let menu_url = "";
  let menu_order = 0;
  let menu_status = true;

  let loading = true;
  let saving = false;
  let error = "";

  let menuId = "";

  function getMenuId() {
    const segments = window.location.pathname
      .split("/")
      .filter(Boolean);
    return segments[segments.length - 1];
  }

  async function loadMenu() {
    const res = await fetch(`${MENU_API_URL}/${menuId}`);
    if (!res.ok) throw new Error("Menu fetch failed");

    const json = await res.json();
    const menu = json.data;

    menu_title = menu.menu_title;
    menu_url = menu.menu_url;
    menu_order = menu.menu_order;
    menu_status = menu.menu_status;
  }

  async function updateMenu() {
    saving = true;
    error = "";

    try {
      const res = await fetch(`${MENU_API_URL}/${menuId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          menu_title,
          menu_url,
          menu_order,
          menu_status,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Update failed");
      }

      alert("Menu updated successfully");
      window.location.href = "/Menu";
    } catch (err) {
      error = err.message;
    } finally {
      saving = false;
    }
  }

  onMount(async () => {
    try {
      menuId = getMenuId();
      await loadMenu();
    } catch (err) {
      console.error(err);
      error = "Failed to load menu";
    } finally {
      loading = false;
    }
  });
</script>


  
  <div class="pt-10 mx-[80px] ">
    <div class="flex justify-between items-center mb-6">

      <h1 class="text-2xl font-bold mb-6">Edit Menu</h1>
      <div class="flex justify-end hover:cursor-pointer mb-6">
        <div class="bg-black text-white text-xl w-[80px] h-[40px] rounded-4xl items-center flex justify-center">
            <i class="fas fa-angle-left text-[15px]" ></i>
  
  
            <a href="/Menu" class="text-[15px]">Back</a>
        </div>
     
    </div>
    </div>
  
    {#if loading}
  <p class="p-8">Loading menu...</p>
{:else}
  <form
    on:submit|preventDefault={updateMenu}
    class=" space-y-4"
  >
    

    <input
      type="text"
      placeholder="Menu Title"
      bind:value={menu_title}
      required
      class="w-full border rounded p-2"
    />

    <!-- <div>
      <label class="block mb-1 text-sm font-medium">
        Menu URL
      </label>
    
      <select
        class="w-full border rounded p-2"
        bind:value={menu_url}
        required
      >
        <option value="" disabled>Select a page</option>
    
        {#each pages as page}
          <option value={page.page_url}>
            {page.page_title} ({page.page_url})
          </option>
        {/each}
      </select>
    </div> -->
    

    <input
    type="text"
    placeholder="Menu URL (eg: /about, /contact)"
    bind:value={menu_url}
    required
    class="w-full border rounded p-2"
  />
  

    <input
      type="number"
      placeholder="Menu Order"
      bind:value={menu_order}
      class="w-full border rounded p-2"
    />

    <label class="flex items-center gap-2">
      <input type="checkbox" bind:checked={menu_status} />
      Enable Menu
    </label>

    {#if error}
      <p class="text-red-600">{error}</p>
    {/if}

    <button
      type="submit"
      class="bg-black text-white px-4 py-2 rounded"
      disabled={saving}
    >
      {saving ? "Updating..." : "Update Menu"}
    </button>
  </form>
{/if}

  </div>
  
 
  