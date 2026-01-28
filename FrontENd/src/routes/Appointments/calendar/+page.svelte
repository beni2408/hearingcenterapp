<script>
    import { onMount } from "svelte";
    import { API_BASE_URL } from "$lib/config";
  
    let calendarEl;
  
    onMount(async () => {
   
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.css";
      document.head.appendChild(link);
  
     
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.js";
  
      script.onload = async () => {
        const res = await fetch(`${API_BASE_URL}/appointments`);
        const json = await res.json();
  
        const events = json.data.map((a) => ({
          title: `${a.person_name} - ${a.title}`,
          start: `${a.date}T${a.start_time}`,
          end: `${a.date}T${a.end_time}`,
        }));
  
        const calendar = new window.FullCalendar.Calendar(calendarEl, {
          initialView: "timeGridWeek",
          headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          },
          slotMinTime: "08:00:00",
          slotMaxTime: "20:00:00",
          height: "auto",
          events,
        });
  
        calendar.render();
      };
  
      document.body.appendChild(script);
    });
    function goToNewAppointment() {
  window.location.href = "/Appointments/new";
}

  </script>
<div class="flex justify-between items-center mx-[80px] mb-10 mt-10">
    <h1 class="text-2xl font-bold mb-10">
      Appointments 
    </h1>
  
    <button
      on:click={goToNewAppointment}
      class="bg-blue-900 text-white px-4 py-2 rounded"
    >
      + Add New Appointment
    </button>
  </div>
  
  
  <div class="mx-[80px] mb-10">
    <div bind:this={calendarEl}></div>
  </div>
  