"use client";

import { useEffect, useRef } from "react";
import { API_BASE_URL } from "@/lib/config";

export default function AppointmentsCalendarPage() {
  const calendarRef = useRef<HTMLDivElement | null>(null);

  // ⏱ Update event time
  const updateEventTime = async (info: any) => {
    const start = info.event.start;
    const end = info.event.end;

    const payload = {
      date: start.toISOString().split("T")[0],
      start_time: start.toTimeString().slice(0, 5),
      end_time: end.toTimeString().slice(0, 5),
    };

    const res = await fetch(`${API_BASE_URL}/appointments/${info.event.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Time conflict or update failed");
      info.revert(); // ⛔ rollback UI
    }
  };

  useEffect(() => {
    const loadCalendar = async () => {
      // ✅ Load CSS
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.css";
      document.head.appendChild(link);

      // ✅ Load Script
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.js";

      script.onload = async () => {
        const res = await fetch(`${API_BASE_URL}/appointments`);
        const json = await res.json();

        const events = json.data.map((a: any) => ({
          id: a._id,
          title: `${a.team_name} • ${a.person_name}`,
          start: `${a.date}T${a.start_time}`,
          end: `${a.date}T${a.end_time}`,
          backgroundColor:
            a.team_name === "Team A"
              ? "#2563eb"
              : a.team_name === "Team B"
              ? "#059669"
              : a.team_name === "Team C"
              ? "#C21807"
              : "#7c3aed",
        }));

        const calendar = new (window as any).FullCalendar.Calendar(
          calendarRef.current,
          {
            initialView: "timeGridDay",

            headerToolbar: {
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            },

            navLinks: true,
            nowIndicator: true,

            editable: true,
            eventStartEditable: true,
            eventDurationEditable: true,

            eventAllow(dropInfo: any) {
              return dropInfo.start >= new Date();
            },

            eventDrop: async (info: any) => {
              await updateEventTime(info);
            },

            eventResize: async (info: any) => {
              await updateEventTime(info);
            },

            height: "80vh",
            expandRows: true,
            scrollTime: "01:00:00",

            slotMinTime: "00:00:00",
            slotMaxTime: "24:00:00",
            slotDuration: "00:30:00",

            allDaySlot: false,

            eventOverlap: true,
            slotEventOverlap: false,

            eventDisplay: "block",
            eventMaxStack: 3,

            eventTimeFormat: {
              hour: "2-digit",
              minute: "2-digit",
              meridiem: true,
            },

            dayHeaderFormat: {
              weekday: "short",
              day: "numeric",
            },

            events,

            eventDidMount(info: any) {
              info.el.style.borderRadius = "10px";
              info.el.style.padding = "6px 8px";
              info.el.style.fontSize = "13px";
              info.el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";
            },
          }
        );

        calendar.render();
      };

      document.body.appendChild(script);
    };

    loadCalendar();
  }, []);

  // ➕ Navigate
  const goToNewAppointment = () => {
    window.location.href = "/Appointments/new";
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mx-[80px] mb-6 mt-10">
        <h1 className="text-2xl font-bold mb-10">Appointments</h1>

        <button
          onClick={goToNewAppointment}
          className="bg-blue-900 text-white px-4 py-2 rounded"
        >
          + Add New Appointment
        </button>
      </div>

      {/* CALENDAR */}
      <div className="mx-[80px] mb-10 bg-white rounded-xl shadow-md p-6">
        <div ref={calendarRef}></div>
      </div>
    </>
  );
}
