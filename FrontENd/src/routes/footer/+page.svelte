<script>
  import { onMount } from "svelte";
  import { API_BASE_URL } from "$lib/config";
  
  import LogoUpload from "./LogoUpload.svelte";



  let company = {
    name: "",
    address: "",
    phone: "",
    email: "",
    logo: ""
  };

  let office_hours = [];
  let footer_links = [];

  let map_url = "";
  let loading = true;
  let saving = false;
  let error = "";


  async function loadFooter() {
    const res = await fetch(`${API_BASE_URL}/footer`);
    if (!res.ok) throw new Error("Failed to load footer");

    const json = await res.json();
    const data = json.data;

    company = data.company || company;
    office_hours = data.office_hours || [];
    footer_links = data.footer_links || [];
    map_url = data.map_url || "";
  }

  async function saveFooter() {
    saving = true;
    error = "";

    try {
      const res = await fetch(`${API_BASE_URL}/footer`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company,
          office_hours,
          footer_links,
          map_url
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Update failed");
      }

      alert("Footer updated successfully");
    } catch (err) {
      error = err.message;
    } finally {
      saving = false;
    }
  }

  onMount(async () => {
    try {
      await loadFooter();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });
</script>

<h1 class="text-2xl font-bold mb-6 mx-[80px]">Footer Settings</h1>

{#if loading}
  <p class="mx-[80px]">Loading footer...</p>
{:else}
<form
  on:submit|preventDefault={saveFooter}
  class="space-y-6 mx-[80px]"
>


  <h2 class="text-xl font-semibold">Company Details</h2>

  <input class="w-full border p-2" placeholder="Company Name" bind:value={company.name} />
  <input class="w-full border p-2" placeholder="Address" bind:value={company.address} />
  <input class="w-full border p-2" placeholder="Phone" bind:value={company.phone} />
  <input class="w-full border p-2" placeholder="Email" bind:value={company.email} />

<h3 class="text-lg font-semibold mt-4">Company Logo</h3>

{#if company.logo}
  <img
    src={company.logo}
    alt="Company Logo"
    class="h-24 mb-3 border rounded-2xl"
  />
{/if}

<LogoUpload />



  <h2 class="text-xl font-semibold">Map</h2>
  <input
    class="w-full border p-2"
    placeholder="Google Map Embed URL"
    bind:value={map_url}
  />


  <h2 class="text-xl font-semibold">Footer Links</h2>

  {#each footer_links as link, i}
    <div class="flex gap-3">
      <input
        class="border p-2 w-1/2"
        placeholder="Title"
        bind:value={link.title}
      />
      <input
        class="border p-2 w-1/2"
        placeholder="URL"
        bind:value={link.url}
      />
      <button
        type="button"
        on:click={() => footer_links = footer_links.filter((_, index) => index !== i)}

        class="text-red-600"
      >
        Remove
      </button>
    </div>
  {/each}

  <button
    type="button"
    class="bg-gray-300 px-3 py-1 rounded"
    on:click={() => footer_links = [...footer_links, { title: "", url: "" }]}

  >
    + Add Link
  </button>


  <h2 class="text-xl font-semibold">Office Hours</h2>

  {#each office_hours as hour, i}
    <div class="flex gap-3">
      <input
        class="border p-2 w-1/2"
        placeholder="Day"
        bind:value={hour.day}
      />
      <input
        class="border p-2 w-1/2"
        placeholder="Time"
        bind:value={hour.time}
      />
      <button
        type="button"
        on:click={() => office_hours = office_hours.filter((_, index) => index !== i)}

        class="text-red-600"
      >
        Remove
      </button>
    </div>
  {/each}

  <button
    type="button"
    class="bg-gray-300 px-3 py-1 rounded"
    on:click={() => office_hours = [...office_hours, { day: "", time: "" }]}

  >
    + Add Office Hour
  </button>

  {#if error}
    <p class="text-red-600">{error}</p>
  {/if}

  <button
    class="bg-black text-white px-6 py-2 rounded"
    disabled={saving}
  >
    {saving ? "Saving..." : "Save Footer"}
  </button>

</form>
{/if}
