<script>
    import { onMount } from "svelte";
    import { APPOINTMENT_API_URL } from "$lib/config";
  
    let appointments = [];
    let loading = true;
  
    onMount(async () => {
      const res = await fetch(APPOINTMENT_API_URL);
      const json = await res.json();
      appointments = json.data;
      loading = false;
    });
  
    async function deleteAppointment(id) {
      if (!confirm("Delete this appointment?")) return;
  
      await fetch(`${APPOINTMENT_API_URL}/${id}`, {
        method: "DELETE"
      });
  
      appointments = appointments.filter(a => a._id !== id);
    }

    function goToNewAppointment() {
  window.location.href = "/Appointments/new";
}
  </script>
<h1 class="text-2xl font-bold mx-[80px] mb-6">
    Appointment manangement
  </h1>
  
  
  
  <div class="flex justify-between items-center mb-6 mx-[80px] mt-10">

    <h1 class="text-2xl font-bold mb-6">New Appointment</h1>
    <div class="flex justify-end hover:cursor-pointer mb-6">
      <div class="bg-black text-white text-xl w-[80px] h-[40px] rounded-4xl items-center flex justify-center">
          <i class="fas fa-angle-left text-[15px]" ></i>

          <button
          on:click={goToNewAppointment}
          class="bg-blue-900 text-white px-4 py-2 rounded text"
        >
          + Add New Appointment
        </button>
      </div>
   
  </div>
  </div>
  {#if loading}
    <p class="mx-[80px] mt-6">Loading...</p>
  {:else}
  <table class="w-[1300px] border mt-6 mx-[80px] mb-10">
    <thead class="bg-gray-100">
      <tr>
        <th class="border p-2">Title</th>
        <th class="border p-2">Team</th>
        <th class="border p-2">Date</th>
        <th class="border p-2">Time</th>
        <th class="border p-2">Person</th>
        <th class="border p-2">Action</th>
      </tr>
    </thead>
  
    <tbody>
      {#each appointments as appt}
        <tr>
          <td class="border p-2">{appt.title}</td>
          <td class="border p-2 font-medium text-blue-600">
            {appt.team_name}
          </td>
          <td class="border p-2">{appt.date}</td>
          <td class="border p-2">
            {appt.start_time} – {appt.end_time}
          </td>
          <td class="border p-2">{appt.person_name}</td>
          <td class="border p-2 space-x-3">
            <a
              href={`/Appointments/edit/${appt._id}`}
              class="text-blue-600 underline"
            >
              Edit
            </a>
  
            <button
              class="text-red-600 underline"
              on:click={() => deleteAppointment(appt._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  {/if}
    