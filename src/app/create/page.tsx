"use client";

import { useState } from "react";
import { LayoutGrid, PlusSquare, Settings } from "lucide-react";

export default function CreateEventPage() {
  const [locations, setLocations] = useState<string[]>([
    "SGVP Ahmedabad",
    "SGVP Memnagar",
    "Memnagar School",
    "SGVP Ahmedabad",
  ]);
  const [newLocation, setNewLocation] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [lockedInput, setLockedInput] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const addLocation = () => {
    const value = newLocation.trim();
    if (!value) return;
    setLocations((prev) => [...prev, value]);
    setNewLocation("");
    setShowInput(false);
    setLockedInput(false);
  };

  return (
    <div className="min-h-screen bg-[#bdbdbd] flex items-stretch justify-stretch p-0">
      <div className="w-full min-h-screen bg-white rounded-none shadow-none overflow-hidden relative pt-12 flex flex-col">
        {/* Top Bar */}
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
                className="h-8 w-44 rounded-md border border-gray-200 bg-gray-50 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#d41c4a]"
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
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] flex-1 min-h-0 items-start md:items-center">
          {/* Sidebar */}
          <div className="border-b md:border-b-0 md:border-r border-gray-100 p-2 md:p-6 h-14 md:h-full flex flex-row md:flex-col md:items-start justify-start gap-2 relative overflow-hidden h-full">
            <div className="flex flex-row md:flex-col items-center gap-2 z-10 w-auto">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center shadow-sm">
                <img src="/Image/event.jpg" alt="Event Logo" className="w-6 h-6 object-contain" />
              </div>
              <span className="hidden md:block text-[11px] text-[#d41c4a] font-semibold text-center">SGVP Event Diary</span>
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
                    href="#"
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
          <div className="h-full w-full px-4 md:px-8 flex items-center justify-center overflow-y-auto">
            <div
              className={`grid items-center transition-all duration-300 w-full max-w-6xl 2xl:max-w-[88rem] mx-auto ${
                selectedIndex === null
                  ? "grid-cols-1 gap-0 justify-items-center"
                  : "grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 w-full"
              }`}
            >
              {/* Left Boxes */}
              <div className="flex flex-col items-center gap-6">
                <div
                  className="flex flex-col items-center gap-2"
                  onMouseLeave={() => {
                    if (!lockedInput) {
                      setShowInput(false);
                      setNewLocation("");
                    }
                  }}
                >
                {!showInput && (
                  <button
                    onClick={() => {
                      setLockedInput(true);
                      setShowInput(true);
                    }}
                    className="h-9 w-28 rounded-lg bg-black text-white text-[11px] font-semibold hover:bg-gray-800 transition-colors"
                  >
                    + Add
                  </button>
                )}
                  {showInput && (
                    <div className="flex items-center gap-2">
                      <input
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") addLocation();
                          if (e.key === "Escape") {
                            setShowInput(false);
                            setNewLocation("");
                            setLockedInput(false);
                          }
                        }}
                        onFocus={() => setLockedInput(true)}
                        onClick={() => setLockedInput(true)}
                        placeholder="Add location"
                        className="h-9 w-56 rounded-lg border border-gray-200 bg-white px-3 text-[11px] focus:outline-none focus:ring-2 focus:ring-[#d41c4a]"
                        autoFocus
                      />
                      <button
                        onClick={addLocation}
                        className="h-9 w-9 rounded-lg bg-black text-white text-sm hover:bg-gray-800 transition-colors"
                      >
                        ✓
                      </button>
                    </div>
                  )}
                </div>

                {locations.map((label, idx) => {
                  const colorClass = [
                    "bg-[#fde7c7]",
                    "bg-[#dff3f9]",
                    "bg-[#dff1d8]",
                    "bg-[#fde6e9]",
                    "bg-[#fef1c8]",
                    "bg-[#eee7f9]",
                    "bg-[#fde6d7]",
                    "bg-[#eeeeee]",
                  ][idx % 8];
                  const borderClass = [
                    "border-[#f3c98c]",
                    "border-[#a9ddea]",
                    "border-[#a9d9a1]",
                    "border-[#f3b8c4]",
                    "border-[#f3d488]",
                    "border-[#cbb8ee]",
                    "border-[#f2b79c]",
                    "border-[#cfcfcf]",
                  ][idx % 8];

                  const isSelected = selectedIndex === idx;

                  return (
                    <button
                      key={`${label}-${idx}`}
                      onClick={() => setSelectedIndex(idx)}
                      className={`w-56 h-10 rounded-lg ${colorClass} text-[11px] font-semibold text-gray-700 hover-lift transition-all duration-500 ease-out ${
                        selectedIndex === null
                          ? "translate-x-0"
                          : isSelected
                          ? `shadow-xl scale-105 border-2 ${borderClass} translate-x-6`
                          : "opacity-70 -translate-y-1"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Divider */}
              {selectedIndex !== null && (
                <div className="hidden lg:flex items-center justify-center self-center">
                  <div className="h-32 w-px bg-gray-200"></div>
                </div>
              )}

              {/* Right Details */}
              <div
                className={`transition-all duration-500 ease-out flex justify-center self-center ${
                  selectedIndex === null
                    ? "opacity-0 translate-x-10 pointer-events-none"
                    : "opacity-100 translate-x-0 animate-slide-in"
                }`}
              >
                {selectedIndex !== null && (
                  <div className="animate-fade-up">
                    <div className="text-sm font-semibold text-gray-700 mb-6 border-b border-gray-300 pb-1 w-40 text-center mx-auto">
                      {locations[selectedIndex] ?? "SGVP Ahmedabad"}
                    </div>
                    <div className="w-56 space-y-6 mx-auto">
                    <div className="relative flex items-center gap-2 bg-orange-100/70 rounded-lg px-2 py-2 pt-4 text-[12px] text-gray-700">
                      <span className="absolute -top-4 left-2 text-[12px] text-orange-700">
                        Detail
                      </span>
                      <span className="flex-1"></span>
                      <div className="w-px h-4 bg-orange-200"></div>
                      <button className="w-6 h-6 rounded-md bg-white text-gray-500 text-xs hover-lift">+</button>
                    </div>
                    <div className="relative grid grid-cols-3 gap-3 pt-4">
                      <span className="absolute -top-4 left-2 text-[12px] text-sky-700">
                        Date
                      </span>
                      <div className="bg-sky-100/70 rounded-lg px-2 py-2 text-center text-[12px] text-gray-700">03</div>
                      <div className="bg-sky-100/70 rounded-lg px-2 py-2 text-center text-[12px] text-gray-700">March</div>
                      <div className="bg-sky-100/70 rounded-lg px-2 py-2 text-center text-[12px] text-gray-700">2026</div>
                    </div>
                    <div className="relative flex items-center gap-2 bg-pink-100/70 rounded-lg px-2 py-2 pt-4 text-[12px] text-gray-700">
                      <span className="absolute -top-4 left-2 text-[12px] text-pink-700">
                        Tithi
                      </span>
                      <span className="flex-1"></span>
                      <div className="w-px h-4 bg-pink-200"></div>
                      <button className="w-6 h-6 rounded-md bg-white text-gray-500 text-xs hover-lift">▾</button>
                    </div>
                    <div className="flex justify-end">
                      <a
                        href="/event-details"
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-gray-200 text-gray-600 hover:text-[#d41c4a] hover:border-[#f2b7c3] transition-colors text-sm"
                        title="Open Details"
                      >
                        →
                      </a>
                    </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
