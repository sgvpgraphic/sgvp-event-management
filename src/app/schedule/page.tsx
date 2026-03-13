"use client";

import { useRef, useState } from "react";
import { LayoutGrid, PlusSquare, Settings } from "lucide-react";

export default function SchedulePage() {
  const tabs = [
    { label: "Basic Info", color: "bg-[#fde7c7]", href: "/event-details" },
    { label: "Schedule", color: "bg-[#dff3f9]", href: "/schedule" },
    { label: "Participants", color: "bg-[#fde6e9]", href: "/participants" },
    { label: "Media", color: "bg-[#dff1d8]", href: "/media" },
    { label: "Data", color: "bg-[#fef1c8]", href: "/data" },
    { label: "Notes", color: "bg-[#eee7f9]", href: "/notes" },
  ];
  const timeRefs = useRef<HTMLInputElement[]>([]);
  const [activeTimeIndex, setActiveTimeIndex] = useState<number | null>(null);
  const [rows, setRows] = useState<number[]>([1, 2]);
  const [speakerRows, setSpeakerRows] = useState<string[]>([""]);
  const formatNow = () => {
    const d = new Date();
    let h = d.getHours();
    const m = d.getMinutes();
    const ampm = h >= 12 ? "pm" : "am";
    h = h % 12;
    if (h === 0) h = 12;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${ampm}`;
  };
  const setNow = (idx: number) => {
    const el = timeRefs.current[idx];
    if (el) el.value = formatNow();
  };
  const setNowForRow = (indices: number[]) => {
    if (activeTimeIndex !== null && indices.includes(activeTimeIndex)) {
      setNow(activeTimeIndex);
      return;
    }
    setNow(indices[0]);
  };
  const addRow = () => {
    setRows((prev) => {
      const nextId = prev.length === 0 ? 1 : Math.max(...prev) + 1;
      return [...prev, nextId];
    });
  };
  const removeRow = (id: number) => {
    if (!window.confirm("Remove this schedule row?")) return;
    setRows((prev) => prev.filter((r) => r !== id));
  };
  const addSpeakerRow = () => {
    setSpeakerRows((prev) => [...prev, ""]);
  };
  const updateSpeakerRow = (idx: number, value: string) => {
    setSpeakerRows((prev) => prev.map((v, i) => (i === idx ? value : v)));
  };
  const removeSpeakerRow = (idx: number) => {
    if (!window.confirm("Remove this speaker row?")) return;
    setSpeakerRows((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen bg-[#bdbdbd] flex items-stretch justify-stretch p-0">
      <div className="w-full min-h-screen bg-white rounded-none shadow-none relative pt-12">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-4 md:px-6 py-3 border-b border-gray-100 bg-white z-10">
          <div className="flex items-center gap-4">
            <a
              href="/dashboard"
              className="text-[12px] font-semibold text-gray-600 hover:text-[#d41c4a] transition-colors"
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
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-700">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-semibold">
                A
              </div>
              Admin
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] min-h-screen items-start">
          {/* Sidebar */}
          <div className="border-b md:border-b-0 md:border-r border-gray-100 p-2 md:p-6 h-14 md:h-full flex flex-row md:flex-col md:items-start justify-start gap-2 relative overflow-hidden h-full">
            <div className="flex flex-row md:flex-col items-center gap-2 z-10 w-auto">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center shadow-sm">
                <img src="/Image/event.jpg" alt="Event Logo" className="w-6 h-6 object-contain" />
              </div>
              <span className="hidden md:block text-[12px] text-[#d41c4a] font-semibold text-center">SGVP Event Diary</span>
            </div>
            <nav className="w-auto md:mt-6 md:w-full overflow-x-auto no-scrollbar">
              <div className="flex flex-row md:flex-col gap-4 md:gap-3 items-start">
                  <a
                    href="/dashboard"
                    className="flex items-center gap-2 text-[12px] text-gray-700 hover:text-[#d41c4a] transition-colors whitespace-nowrap"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span className="hidden md:inline">Dashboard</span>
                  </a>
                  <div className="hidden md:block h-px bg-gray-300 w-28 mx-auto"></div>
                  <a
                    href="/create"
                    className="flex items-center gap-2 text-[12px] text-gray-700 hover:text-[#d41c4a] transition-colors whitespace-nowrap"
                  >
                    <PlusSquare className="w-4 h-4" />
                    <span className="hidden md:inline">Add Event</span>
                  </a>
                  <div className="hidden md:block h-px bg-gray-300 w-28 mx-auto"></div>
                  <a
                    href="/settings"
                    className="flex items-center gap-2 text-[12px] text-gray-700 hover:text-[#d41c4a] transition-colors whitespace-nowrap"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="hidden md:inline">Settings</span>
                  </a>
              </div>
            </nav>
            <img src="/Image/logo.png" alt="SGVP Logo" className="hidden md:block w-24 object-contain opacity-90 md:mt-auto self-center z-10" />
            <div className="hidden md:block absolute bottom-0 left-0 right-0 h-24 opacity-20 pointer-events-none">
              <img src="/Image/building.png" alt="Building" className="w-full h-full object-contain object-bottom" />
            </div>
          </div>

          {/* Main */}
          <div className="h-screen w-full px-4 md:px-6 pt-6 pb-10 overflow-y-auto">
            <div className="w-full max-w-none mx-auto">
              <div className="flex items-center gap-3">
                <h1 className="text-sm font-semibold text-[#d41c4a]">Event Details</h1>
                <span className="text-[10px] px-2 py-[2px] border border-[#FFEBD3] text-black rounded-full">
                  Schedule
                </span>
              </div>

              <div className="mt-4 flex gap-2 md:gap-3 text-[12px] overflow-x-auto md:overflow-visible no-scrollbar pb-2 md:pb-0 md:justify-between">
                {tabs.map((tab) => (
                  <a
                    key={tab.label}
                    href={tab.href}
                    className={`min-w-[96px] md:min-w-0 md:flex-1 rounded-md ${tab.color} px-2 py-3 text-center font-semibold shadow-md ${
                      tab.label === "Schedule"
                        ? "relative text-black border-b-2 border-[#FFEBD3] bg-[#FFEBD3]"
                        : "text-gray-700"
                    }`}
                  >
                    {tab.label}
                    {tab.label === "Schedule" && (
                      <span className="absolute left-0 right-0 -bottom-2 h-[2px] bg-[#b32038]"></span>
                    )}
                  </a>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-gray-100 bg-white shadow-sm p-4 schedule-print">
              <div className="grid grid-cols-[auto_auto_auto_1fr_1fr_1fr_auto_auto] gap-2 text-[12px]">
                <div className="flex items-center gap-0">
                  <input
                    ref={(el) => {
                      if (el) timeRefs.current[0] = el;
                    }}
                    onFocus={() => setActiveTimeIndex(0)}
                    className="h-10 w-24 rounded-lg border border-gray-200 bg-gray-50 px-2"
                    defaultValue="05:00 pm"
                  />
                </div>
                <div className="flex items-center justify-center text-gray-400 px-2">to</div>
                <div className="flex items-center gap-0">
                  <input
                    ref={(el) => {
                      if (el) timeRefs.current[1] = el;
                    }}
                    onFocus={() => setActiveTimeIndex(1)}
                    className="h-10 w-24 rounded-lg border border-gray-200 bg-gray-50 px-2"
                    defaultValue="05:15 am"
                  />
                </div>
                <input className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-2" defaultValue="પૂજન અને સ્વાગત" />
                <input className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-2" defaultValue="પરમ પુજ્ય શ્રીલાડુદાસજી સ્વામી" />
                <input className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-2" defaultValue="Other" />
                <div className="flex items-center gap-0">
                  <input
                    ref={(el) => {
                      if (el) timeRefs.current[2] = el;
                    }}
                    onFocus={() => setActiveTimeIndex(2)}
                    className="h-10 w-24 rounded-lg border border-gray-200 bg-gray-50 px-2"
                    defaultValue="05:15 pm"
                  />
                  <div className="text-gray-400 px-1">to</div>
                  <input
                    ref={(el) => {
                      if (el) timeRefs.current[3] = el;
                    }}
                    onFocus={() => setActiveTimeIndex(3)}
                    className="h-10 w-24 rounded-lg border border-gray-200 bg-gray-50 px-2"
                    defaultValue="05:30 am"
                  />
                  <button
                    onClick={() => setNowForRow([0, 1, 2, 3])}
                    className="no-print h-10 w-12 rounded-lg border border-gray-200 text-[11px] text-gray-600 hover:text-[#d41c4a] ml-1"
                  >
                    Now
                  </button>
                  
                </div>
                <button
                  onClick={() => removeRow(0)}
                  className="no-print h-10 w-10 rounded-lg border border-gray-200 text-[11px] text-gray-600 hover:text-red-600 hover:border-red-300"
                  title="Remove row"
                >
                  ✕
                </button>
              </div>

              {rows.map((id, idx) => {
                const base = 4 + idx * 4;
                const rowIndices = [base, base + 1, base + 2, base + 3];
                return (
                <div key={id} className="grid grid-cols-[auto_auto_auto_1fr_1fr_1fr_auto_auto] gap-2 text-[12px] mt-3">
                  <div className="flex items-center gap-0">
                    <input
                      ref={(el) => {
                        if (el) timeRefs.current[base] = el;
                      }}
                      onFocus={() => setActiveTimeIndex(base)}
                      className="h-10 w-24 rounded-lg border border-gray-200 bg-gray-50 px-2"
                      placeholder="Time"
                    />
                  </div>
                  <div className="flex items-center justify-center text-gray-400 px-2">to</div>
                  <div className="flex items-center gap-0">
                    <input
                      ref={(el) => {
                        if (el) timeRefs.current[base + 1] = el;
                      }}
                      onFocus={() => setActiveTimeIndex(base + 1)}
                      className="h-10 w-24 rounded-lg border border-gray-200 bg-gray-50 px-2"
                      placeholder="Time"
                    />
                  </div>
                  <input className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-2" placeholder="Program Details" />
                  <input className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-2" placeholder="Name" />
                  <input className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-2" placeholder="Other" />
                  <div className="flex items-center gap-0">
                    <input
                      ref={(el) => {
                        if (el) timeRefs.current[base + 2] = el;
                      }}
                      onFocus={() => setActiveTimeIndex(base + 2)}
                      className="h-10 w-24 rounded-lg border border-gray-200 bg-gray-50 px-2"
                      placeholder="A Time"
                    />
                    <div className="text-gray-400 px-1">to</div>
                    <input
                      ref={(el) => {
                        if (el) timeRefs.current[base + 3] = el;
                      }}
                      onFocus={() => setActiveTimeIndex(base + 3)}
                      className="h-10 w-24 rounded-lg border border-gray-200 bg-gray-50 px-2"
                      placeholder="A Time"
                    />
                    <button
                      onClick={() => setNowForRow(rowIndices)}
                      className="no-print h-10 w-12 rounded-lg border border-gray-200 text-[11px] text-gray-600 hover:text-[#d41c4a] ml-1"
                    >
                      Now
                    </button>
                    
                  </div>
                  <button
                    onClick={() => removeRow(id)}
                    className="no-print h-10 w-10 rounded-lg border border-gray-200 text-[11px] text-gray-600 hover:text-red-600 hover:border-red-300"
                    title="Remove row"
                  >
                    ✕
                  </button>
                </div>
              )})}

              <div className="mt-4 flex items-center gap-4 text-[12px] text-gray-600">
                <button onClick={addRow} className="no-print hover:text-[#d41c4a]">+ Add Schedule</button>
                <button
                  onClick={() => window.print()}
                  className="no-print hover:text-[#d41c4a]"
                >
                  Print A4
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={addSpeakerRow}
                    className="no-print text-[12px] text-gray-600 hover:text-[#d41c4a]"
                  >
                    + Add Speaker
                  </button>
                </div>
                {speakerRows.map((value, idx) => (
                  <div key={idx} className="flex items-center justify-end gap-2">
                    <span className="text-[12px] text-gray-500">Add Speaker</span>
                    <input
                      value={value}
                      onChange={(e) => updateSpeakerRow(idx, e.target.value)}
                      placeholder="Speaker"
                      className="h-10 w-64 rounded-lg border border-gray-200 bg-gray-50 px-2 text-[12px] text-gray-700"
                    />
                    <button
                      onClick={() => removeSpeakerRow(idx)}
                      className="no-print h-10 w-10 rounded-lg border border-gray-200 text-[11px] text-gray-600 hover:text-red-600 hover:border-red-300"
                      title="Remove speaker"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
