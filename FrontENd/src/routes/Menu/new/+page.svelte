<script>
  import { MENU_API_URL } from "$lib/config";

  let menu_title = "";
  let menu_url = "";
  let menu_order = 0;
  let menu_status = true;

  let loading = false;
  let error = "";

  async function submitForm() {
    loading = true;
    error = "";

    try {
      const res = await fetch(MENU_API_URL, {
        method: "POST",
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
        throw new Error(err.message || "Failed to create menu");
      }

      alert("Menu created successfully");
      window.location.href = "/Menu";
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }
</script>


  <div class="pt-10  mx-[80px] ">
 
  
    <form
    on:submit|preventDefault={submitForm}
    class="  space-y-4 mx-[0px]"
  >
    
    <div class="flex justify-between items-center mb-6">

      <h1 class="text-2xl font-bold mb-6">Create Menu</h1>
      
    </div>

  
    <input
      type="text"
      placeholder="Menu Title"
      bind:value={menu_title}
      required
      class="w-full border rounded p-2"
    />
<!--   
    <div>
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
      disabled={loading}
    >
      {loading ? "Saving..." : "Create Menu"}
    </button>
  </form>
  
  </div>
  
