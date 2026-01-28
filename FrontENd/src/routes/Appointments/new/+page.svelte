<script>
    
    import { API_BASE_URL } from "$lib/config";
    let team_name = "";

    let title = "";
    let person_name = "";
    let email = "";
    let mobile_number = "";
    let description = "";
    let date = "";
    let start_time = "";
    let end_time = "";
  
    let loading = false;
    let error = "";
    
  
    async function submitAppointment() {
      loading = true;
      error = "";
  
      try {
        const res = await fetch(`${API_BASE_URL}/appointments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            person_name,
            team_name,
            email,
            mobile_number,
            description,
            date,
            start_time,
            end_time,
          }),
        });
  
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to create appointment");
        }
  
        alert("Appointment created successfully");
        window.location.href = "/Appointments/calendar";
      } catch (err) {
        error = err.message;
        alert(err.message);

      } finally {
        loading = false;
      }
    }
  </script>
  
  <div class="flex justify-between items-center mb-6 mx-[80px] mt-10">

    <h1 class="text-2xl font-bold mb-6">New Appointment</h1>
    <div class="flex justify-end hover:cursor-pointer mb-6">
      <div class="bg-black text-white text-xl w-[80px] h-[40px] rounded-4xl items-center flex justify-center">
          <i class="fas fa-angle-left text-[15px]" ></i>


          <a href="/Appointments/calendar" class="text-[15px]">Back</a>
      </div>
   
  </div>
  </div>
  
  <form
    on:submit|preventDefault={submitAppointment}
    class="space-y-4 mx-[80px] mb-10"
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
      type="email"
    />
  
    <input
      class="w-full border p-2"
      placeholder="Mobile Number"
      bind:value={mobile_number}
    />
  
    <textarea
      class="w-full border p-2"
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
      class="bg-black text-white px-6 py-2 rounded"
      disabled={loading}
    >
      {loading ? "Saving..." : "Create Appointment"}
    </button>
  </form>
  