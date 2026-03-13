"use client";

import { LayoutGrid, PlusSquare, Settings } from "lucide-react";

export default function NotesPage() {
  const tabs = [
    { label: "Basic Info", color: "bg-[#fde7c7]", href: "/event-details" },
    { label: "Schedule", color: "bg-[#dff3f9]", href: "/schedule" },
    { label: "Participants", color: "bg-[#fde6e9]", href: "/participants" },
    { label: "Media", color: "bg-[#dff1d8]", href: "/media" },
    { label: "Data", color: "bg-[#fef1c8]", href: "/data" },
    { label: "Notes", color: "bg-[#eee7f9]", href: "/notes" },
  ];

  return (
    <div className="min-h-screen bg-[#bdbdbd] flex items-stretch justify-stretch p-0">
      <div className="w-full min-h-screen bg-white rounded-none shadow-none relative pt-12">
        <div className="absolute top-0 left-0 right-0 flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-4 md:px-6 py-3 border-b border-gray-100 bg-white z-10">
          <div className="flex items-center gap-4">
            <a
              href="/dashboard"
              className="text-[11px] font-semibold text-gray-600 hover:text-[#d41c4a] transition-colors"
            >
              ← Back
            </a>
            <div className="text-[10px] font-semibold tracking-[0.2em] text-gray-500 uppercase">
              || Jay Swaminarayan ||
            </div>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="h-8 w-44 rounded-md border border-gray-200 bg-gray-50 px-3 text-xs focus:outline-none"
              />
            </div>
            <div className="hidden md:block w-6 h-6 rounded-full bg-gray-100"></div>
            <div className="hidden md:block w-6 h-6 rounded-full bg-gray-100"></div>
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-semibold">
                A
              </div>
              Admin
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] min-h-screen items-start">
          <div className="border-b md:border-b-0 md:border-r border-gray-100 p-3 md:p-6 flex flex-row md:flex-col items-center md:items-center justify-between gap-3 relative overflow-hidden h-full">
            <div className="flex flex-row md:flex-col items-center gap-2 z-10 w-full md:w-auto">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center shadow-sm">
                <img src="/Image/event.jpg" alt="Event Logo" className="w-6 h-6 object-contain" />
              </div>
              <span className="hidden md:block text-[11px] text-[#d41c4a] font-semibold text-center">SGVP Event Diary</span>
            </div>
            <nav className="w-full md:mt-6 md:w-full overflow-x-auto">
              <div className="flex flex-row md:flex-col gap-4 md:gap-3 justify-center md:justify-start">
                  <a
                    href="/dashboard"
                    className="flex items-center gap-2 text-[12px] text-gray-700 hover:text-[#d41c4a] transition-colors whitespace-nowrap"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span className="hidden md:inline">Dashboard</span>
                  </a>
                  <div className="hidden md:block h-px bg-gray-100"></div>
                  <a
                    href="/create"
                    className="flex items-center gap-2 text-[12px] text-gray-700 hover:text-[#d41c4a] transition-colors whitespace-nowrap"
                  >
                    <PlusSquare className="w-4 h-4" />
                    <span className="hidden md:inline">Add Event</span>
                  </a>
                  <div className="hidden md:block h-px bg-gray-100"></div>
                  <a
                    href="/settings"
                    className="flex items-center gap-2 text-[12px] text-gray-700 hover:text-[#d41c4a] transition-colors whitespace-nowrap"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="hidden md:inline">Settings</span>
                  </a>
              </div>
            </nav>
            <img src="/Image/logo.png" alt="SGVP Logo" className="hidden md:block w-24 object-contain opacity-90 z-10" />
            <div className="hidden md:block absolute bottom-0 left-0 right-0 h-24 opacity-20 pointer-events-none">
              <img src="/Image/building.png" alt="Building" className="w-full h-full object-contain object-bottom" />
            </div>
          </div>

          <div className="h-screen w-full px-4 md:px-6 pt-6 pb-10 overflow-y-auto">
            <div className="w-full max-w-6xl 2xl:max-w-[88rem] mx-auto">
              <div className="flex items-center gap-3">
                <h1 className="text-sm font-semibold text-[#d41c4a]">Event Details</h1>
                <span className="text-[10px] px-2 py-[2px] border border-[#FFEBD3] text-black rounded-full">
                  Notes
                </span>
              </div>

              <div className="mt-4 flex gap-2 text-[11px] overflow-x-auto pb-2">
                {tabs.map((tab) => (
                  <a
                    key={tab.label}
                    href={tab.href}
                    className={`min-w-[96px] rounded-md ${tab.color} px-2 py-2 text-center font-semibold shadow-md ${
                      tab.label === "Notes"
                        ? "relative text-black border-b-2 border-[#FFEBD3] bg-[#FFEBD3]"
                        : "text-gray-700"
                    }`}
                  >
                    {tab.label}
                    {tab.label === "Notes" && (
                      <span className="absolute left-0 right-0 -bottom-2 h-[2px] bg-[#b32038]"></span>
                    )}
                  </a>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-gray-100 bg-white shadow-sm p-6">
                <div className="text-sm text-gray-500">Notes view will appear here.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
