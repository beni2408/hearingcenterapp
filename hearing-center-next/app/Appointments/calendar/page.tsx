"use client";

import { useEffect, useRef } from "react";
import { API_BASE_URL } from "@/lib/config";

export default function AppointmentsCalendarPage() {
  const calendarRef = useRef<HTMLDivElement | null>(null);

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
      info.revert();
    }
  };

  useEffect(() => {
    const loadCalendar = async () => {
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

  const goToNewAppointment = () => {
    window.location.href = "/Appointments/new";
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-14 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
                Appointments
              </span>
            </h1>

            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Manage and schedule your team appointments
            </p>

            <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>

          <button
            onClick={goToNewAppointment}
            className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition hover:scale-[1.02]"
          >
            + Add Appointment
          </button>
        </div>

        {/* CALENDAR CARD */}
        <div className="relative bg-white/80 backdrop-blur border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 sm:p-6">
          {/* subtle glow layer */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-white/40 to-transparent pointer-events-none" />

          <div className="relative min-h-[500px]" ref={calendarRef}></div>
        </div>
      </div>
    </div>
  );
}
