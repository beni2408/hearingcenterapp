<script>




    import { onMount } from "svelte";
    import { MENU_API_URL } from "$lib/config";
  
    let menus = [];
    let loading = true;
    
    
    async function deleteMenu(menuId) {
  const ok = confirm("Are you sure you want to delete this menu?");
  if (!ok) return;

  const res = await fetch(`${MENU_API_URL}/${menuId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    alert("Delete failed");
    return;
  }

  fetchMenus(); 
}

    async function fetchMenus() {
      const res = await fetch(MENU_API_URL);
      const json = await res.json();
      menus = json.data;
      loading = false;
    }
  
    async function toggleStatus(menu) {
      await fetch(`http://localhost:4000/api/menu/${menu._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menu_status: !menu.menu_status,
        }),
      });
  
      fetchMenus(); 
    }
  
    onMount(fetchMenus);
  </script>
  
  <div class="pt-8 mx-[80px]">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Menu Management</h1>
  
      <a href="/Menu/new" class="bg-blue-900 text-white px-4 py-2 rounded ">
        + New Menu
      </a>
    </div>
  
    {#if loading}
      <p>Loading menus...</p>
    {:else if menus.length === 0}
      <p>No menus created yet.</p>
    {:else}
      <table class="w-full border">
        <thead class="bg-gray-100">
          <tr>
            <th class="text-left p-3">Title</th>
            <th class="text-left p-3">URL</th>
            <th class="text-left p-3">Order</th>
            <th class="text-left p-3">Status</th>
            <th class="text-left p-3">Action</th>
          </tr>
        </thead>
      
        <tbody>
          {#each menus as menu}
            <tr class="border-t">
              <td class="p-3">{menu.menu_title}</td>
              <td class="p-3">{menu.menu_url}</td>
              <td class="p-3">{menu.menu_order}</td>
      
              <td class="p-3">
                <button
                  class={`px-3 py-1 rounded text-white ${
                    menu.menu_status ? "bg-green-500" : "bg-red-500"
                  }`}
                  on:click={() => toggleStatus(menu)}
                >
                  {menu.menu_status ? "Enabled" : "Disabled"}
                </button>
              </td>
      
              <td class="p-3 space-x-4">
                <a
                  href={`/Menu/edit/${menu._id}`}
                  class="text-blue-600 underline"
                >
                  Edit
                </a>
              
                <button
                  class="text-red-600 underline cursor-pointer"
                  on:click={() => deleteMenu(menu._id)}
                  
                >
                  Delete
                </button>
              </td>
              
            </tr>
          {/each}
        </tbody>
      </table>
      
    {/if}
  </div>
  

  