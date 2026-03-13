"use client";

import { LayoutGrid, PlusSquare, Settings } from "lucide-react";

export default function ParticipantsPage() {
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
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-white z-10">
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
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="h-8 w-44 rounded-md border border-gray-200 bg-gray-50 px-3 text-xs focus:outline-none"
              />
            </div>
            <div className="w-6 h-6 rounded-full bg-gray-100"></div>
            <div className="w-6 h-6 rounded-full bg-gray-100"></div>
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-semibold">
                A
              </div>
              Admin
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] min-h-screen items-start">
          <div className="border-r border-gray-100 p-6 flex flex-col items-center justify-between relative overflow-hidden h-full">
            <div className="flex flex-col items-center gap-2 z-10 w-full">
              <div className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center shadow-sm">
                <img src="/Image/event.jpg" alt="Event Logo" className="w-6 h-6 object-contain" />
              </div>
              <span className="text-[11px] text-[#d41c4a] font-semibold text-center">SGVP Event Diary</span>
              <nav className="mt-6 w-full">
                <div className="flex flex-col gap-3">
                  <a
                    href="/dashboard"
                    className="flex items-center gap-2 text-[12px] text-gray-700 hover:text-[#d41c4a] transition-colors"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    Dashboard
                  </a>
                  <div className="h-px bg-gray-100"></div>
                  <a
                    href="/create"
                    className="flex items-center gap-2 text-[12px] text-gray-700 hover:text-[#d41c4a] transition-colors"
                  >
                    <PlusSquare className="w-4 h-4" />
                    Add Event
                  </a>
                  <div className="h-px bg-gray-100"></div>
                  <a
                    href="/settings"
                    className="flex items-center gap-2 text-[12px] text-gray-700 hover:text-[#d41c4a] transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </a>
                </div>
              </nav>
            </div>
            <img src="/Image/logo.png" alt="SGVP Logo" className="w-24 object-contain opacity-90 z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-24 opacity-20 pointer-events-none">
              <img src="/Image/building.png" alt="Building" className="w-full h-full object-contain object-bottom" />
            </div>
          </div>

          <div className="h-screen w-full px-6 pt-6 pb-10 overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold text-gray-700">Participants -03 March 2026</div>
            </div>

            <div className="mt-4 grid grid-cols-6 gap-2 text-[11px]">
              {tabs.map((tab) => (
                <a
                  key={tab.label}
                  href={tab.href}
                  className={`rounded-md ${tab.color} px-2 py-2 text-center font-semibold shadow-md min-w-[120px] ${
                    tab.label === "Participants"
                      ? "relative text-black border-b-2 border-[#FFEBD3] bg-[#FFEBD3]"
                      : "text-gray-700"
                  }`}
                >
                  {tab.label}
                  {tab.label === "Participants" && (
                    <span className="absolute left-0 right-0 -bottom-2 h-[2px] bg-[#b32038]"></span>
                  )}
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-gray-100 bg-white shadow-sm p-6">
              <div className="text-sm text-gray-500">Participants view will appear here.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
