<script>
    import { onMount } from "svelte";
    import { APPOINTMENT_API_URL } from "$lib/config";
  
    let loading = true;
    let saving = false;
    let error = "";
    let team_name = "";

  
    let title = "";
    let date = "";
    let start_time = "";
    let end_time = "";
    let person_name = "";
    let email = "";
    let mobile_number = "";
    let description = "";
  
    function getAppointmentId() {
      const parts = window.location.pathname.split("/");
      return parts[parts.length - 1];
    }
  
    async function loadAppointment() {
      try {
        const id = getAppointmentId();
        const res = await fetch(`${APPOINTMENT_API_URL}/${id}`);
  
        if (!res.ok) throw new Error("Failed to load appointment");
  
        const json = await res.json();
        const appt = json.data;
  
        title = appt.title || "";
        date = appt.date || "";
        start_time = appt.start_time || "";
        end_time = appt.end_time || "";
        person_name = appt.person_name || "";
        team_name = appt.team_name || "";

        email = appt.email || "";
        mobile_number = appt.mobile_number || "";
        description = appt.description || "";
  
        loading = false;
      } catch (err) {
        error = err.message;
        loading = false;
      }
    }
  
    async function updateAppointment() {
  saving = true;
  error = "";

  try {
    const id = getAppointmentId();

    const payload = {
      title,
      team_name,
      date,
      start_time,
      end_time,
      person_name,
      email,
      mobile_number,
      description
    };

    const res = await fetch(`${APPOINTMENT_API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update appointment");
    }

    alert("Appointment updated successfully");
    window.location.href = "/Appointments/apphander";

  } catch (err) {
    error = err.message;
    alert(err.message); // 🔔 SAME ALERT EXPERIENCE AS CREATE
  } finally {
    saving = false;
  }
}

  
    onMount(loadAppointment);
  </script>
  
  <h1 class="text-2xl font-bold mx-[80px] mt-10 mb-6">
    Edit Appointment
  </h1>
  
  <div class="flex justify-end mx-[80px] mb-6">
    <a
      href="/Appointments/apphander"
      class="bg-black text-white px-4 py-2 rounded"
    >
      Back
    </a>
  </div>
  
  {#if loading}
    <p class="mx-[80px]">Loading appointment...</p>
  {:else}
  <form
    on:submit|preventDefault={updateAppointment}
    class="space-y-5 mx-[80px] mb-10"
  >
    <input
      class="w-full border p-2"
      placeholder="Appointment Title"
      bind:value={title}
      required
    />
    <input
      class="w-full border p-2"
      placeholder="Person Name"
      bind:value={person_name}
      required
    />
    <select
  class="w-full border p-2"
  bind:value={team_name}
  required
>
  <option value="">Select Team</option>
  <option value="Team A">Team A</option>
  <option value="Team B">Team B</option>
  <option value="Team C">Team C</option>
</select>

<input
  class="w-full border p-2"
  placeholder="Email (optional)"
  bind:value={email}
/>
<input
  class="w-full border p-2"
  placeholder="Mobile Number"
  bind:value={mobile_number}
/>


  
<textarea
class="w-full border p-2"
rows="4"
placeholder="Description"
bind:value={description}
></textarea>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <!-- Date -->
  <div class="flex flex-col">
    <label class="text-sm font-medium mb-1">
      Date
    </label>
    <input
      type="date"
      class="border rounded p-2 w-full"
      bind:value={date}
      required
    />
  </div>

  <!-- Start Time -->
  <div class="flex flex-col">
    <label class="text-sm font-medium mb-1">
      Start Time
    </label>
    <input
      type="time"
      class="border rounded p-2 w-full"
      bind:value={start_time}
      required
    />
  </div>

  <!-- End Time -->
  <div class="flex flex-col">
    <label class="text-sm font-medium mb-1">
      End Time
    </label>
    <input
      type="time"
      class="border rounded p-2 w-full"
      bind:value={end_time}
      required
    />
  </div>
</div>

  


  
    {#if error}
      <p class="text-red-600">{error}</p>
    {/if}
  
    <button
      class="bg-blue-900 text-white px-6 py-2 rounded"
      disabled={saving}
    >
      {saving ? "Updating..." : "Update Appointment"}
    </button>
  </form>
  {/if}
  