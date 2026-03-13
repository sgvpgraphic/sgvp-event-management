"use client";

import { useEffect, useMemo, useState } from "react";
import { LayoutGrid, PlusSquare, Settings } from "lucide-react";

const DEFAULT_FIELDS = [
  "Category",
  "Place",
  "Time",
  "Location",
  "Flyer",
  "Count",
  "Name",
  "Year",
  "Day",
];

const DEFAULT_SET = new Set(DEFAULT_FIELDS);

type FieldOption = {
  name: string;
  type?: "text" | "checkbox" | "dropdown" | "date";
  custom?: boolean;
};

export default function EventDetailsPage() {
  const [showPicker, setShowPicker] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [customField, setCustomField] = useState("");
  const [customType, setCustomType] = useState<FieldOption["type"]>("text");
  const [options, setOptions] = useState<FieldOption[]>(
    DEFAULT_FIELDS.map((name) => ({ name }))
  );
  const [customDropdownOptions, setCustomDropdownOptions] = useState<Record<string, string[]>>({});
  const [dropdownSearch, setDropdownSearch] = useState<Record<string, string>>({});
  const [dropdownAdd, setDropdownAdd] = useState<Record<string, string>>({});
  const [openDropdownField, setOpenDropdownField] = useState<string | null>(null);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<Record<string, string>>({});
  const [startHour, setStartHour] = useState(8);
  const [startMinute, setStartMinute] = useState(30);
  const [startPeriod, setStartPeriod] = useState<"AM" | "PM">("AM");
  const [endHour, setEndHour] = useState(8);
  const [endMinute, setEndMinute] = useState(30);
  const [endPeriod, setEndPeriod] = useState<"AM" | "PM">("PM");
  const [states, setStates] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [villages, setVillages] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [locLoading, setLocLoading] = useState(false);
  const [flyerPreviews, setFlyerPreviews] = useState<(string | null)[]>([null, null]);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([
    "Satsang",
    "Mahapooja",
    "Celebration",
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [showCategoryAdd, setShowCategoryAdd] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const toggleField = (field: string) => {
    setSelected((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };
  const addCustomField = () => {
    const value = customField.trim();
    if (!value) return;
    if (!options.some((o) => o.name === value)) {
      setOptions((prev) => [...prev, { name: value, type: customType, custom: true }]);
    }
    if (!selected.includes(value)) {
      setSelected((prev) => [...prev, value]);
    }
    setCustomField("");
  };

  const addCustomDropdownOption = (field: string) => {
    const value = (dropdownAdd[field] || "").trim();
    if (!value) return;
    setCustomDropdownOptions((prev) => {
      const current = prev[field] ?? [];
      if (current.includes(value)) return prev;
      return { ...prev, [field]: [...current, value] };
    });
    setDropdownAdd((prev) => ({ ...prev, [field]: "" }));
  };
  const addCategory = () => {
    const value = newCategory.trim();
    if (!value) return;
    if (!categoryOptions.includes(value)) {
      setCategoryOptions((prev) => [...prev, value]);
    }
    setSelectedCategory(value);
    setNewCategory("");
  };

  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      setCurrentLocation("Geolocation not supported");
      return;
    }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCurrentLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        setLocLoading(false);
      },
      () => {
        setCurrentLocation("Permission denied");
        setLocLoading(false);
      }
    );
  };

  const handleFlyerChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFlyerPreviews((prev) => {
      const next = [...prev];
      next[index] = url;
      return next;
    });
  };

  const formatTimeParts = (h: number, m: number, p: "AM" | "PM") => {
    const mm = m.toString().padStart(2, "0");
    return `${h}:${mm} ${p}`;
  };

  const hourAngle = (h: number) => {
    // Shifted 90° clockwise: 12 at 3 o'clock, 3 at 6 o'clock
    const map: Record<number, number> = {
      12: 0,
      1: 30,
      2: 60,
      3: 90,
      4: 120,
      5: 150,
      6: 180,
      7: 210,
      8: 240,
      9: 270,
      10: 300,
      11: 330,
    };
    return map[h] ?? 0;
  };

  const angleToHour = (angle: number) => {
    const normalized = (angle + 360) % 360;
    const index = Math.round(normalized / 30) % 12;
    const map = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    return map[index];
  };

  const handleClockDrag = (
    e: React.MouseEvent<HTMLDivElement>,
    setHour: (h: number) => void
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = e.clientX - cx;
    const y = e.clientY - cy;
    const angle = (Math.atan2(y, x) * 180) / Math.PI;
    setHour(angleToHour(angle));
  };

  useEffect(() => {
    fetch("/api/locations?level=states")
      .then((r) => r.json())
      .then((data) => setStates(data))
      .catch(() => setStates([]));
  }, []);

  useEffect(() => {
    if (!selectedState) {
      setDistricts([]);
      setSelectedDistrict("");
      return;
    }
    fetch(`/api/locations?level=districts&state=${encodeURIComponent(selectedState)}`)
      .then((r) => r.json())
      .then((data) => setDistricts(data))
      .catch(() => setDistricts([]));
  }, [selectedState]);

  useEffect(() => {
    if (!selectedState || !selectedDistrict) {
      setVillages([]);
      setSelectedVillage("");
      return;
    }
    fetch(
      `/api/locations?level=villages&state=${encodeURIComponent(
        selectedState
      )}&district=${encodeURIComponent(selectedDistrict)}`
    )
      .then((r) => r.json())
      .then((data) => setVillages(data))
      .catch(() => setVillages([]));
  }, [selectedState, selectedDistrict]);

  const optionMap = useMemo(
    () => Object.fromEntries(options.map((o) => [o.name, o])),
    [options]
  );
  const fields = useMemo(() => selected, [selected]);
  const customSelected = useMemo(
    () => fields.filter((f) => !DEFAULT_SET.has(f)),
    [fields]
  );
  const has = (f: string) => fields.includes(f);

  return (
    <div className="min-h-screen bg-[#bdbdbd] flex items-stretch justify-stretch p-0">
      <div className="w-full min-h-screen bg-white rounded-none shadow-none relative pt-12">
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
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] min-h-screen items-start">
          {/* Sidebar */}
          <div className="border-b md:border-b-0 md:border-r border-gray-100 p-2 md:p-6 h-14 md:h-auto flex flex-row md:flex-col items-center md:items-center justify-between gap-2 relative overflow-hidden h-full">
            <div className="flex flex-row md:flex-col items-center gap-2 z-10 w-auto">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center shadow-sm">
                <img src="/Image/event.jpg" alt="Event Logo" className="w-6 h-6 object-contain" />
              </div>
              <span className="hidden md:block text-[11px] text-[#d41c4a] font-semibold text-center">SGVP Event Diary</span>
            </div>
            <nav className="w-auto md:mt-6 md:w-full overflow-x-auto no-scrollbar">
              <div className="flex flex-row md:flex-col gap-4 md:gap-3 items-center md:items-start">
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

          {/* Main */}
          <div className="h-screen w-full px-4 md:px-6 flex items-start justify-start pt-6 overflow-y-auto">
            <div className="w-full max-w-6xl 2xl:max-w-[88rem] mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="text-sm font-semibold text-[#d41c4a]">Event Details</h1>
                  <span className="text-[10px] px-2 py-[2px] border border-[#FFEBD3] text-black rounded-full">
                    Basic Info
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2 text-[11px] overflow-x-auto no-scrollbar pb-2">
                {[
                  { label: "Basic Info", color: "bg-[#fde7c7]", href: "/event-details" },
                  { label: "Schedule", color: "bg-[#dff3f9]", href: "/schedule" },
                  { label: "Participants", color: "bg-[#fde6e9]", href: "#" },
                  { label: "Media", color: "bg-[#dff1d8]", href: "#" },
                  { label: "Data", color: "bg-[#fef1c8]", href: "#" },
                  { label: "Notes", color: "bg-[#eee7f9]", href: "#" },
                ].map((tab) => (
                  <a
                    key={tab.label}
                    href={tab.href}
                    className={`min-w-[96px] rounded-md ${tab.color} px-2 py-2 text-center font-semibold shadow-md ${
                      tab.label === "Basic Info"
                        ? "relative text-black border-b-2 border-[#FFEBD3] bg-[#FFEBD3]"
                        : "text-gray-700"
                    }`}
                  >
                    {tab.label}
                    {tab.label === "Basic Info" && (
                      <span className="absolute left-0 right-0 -bottom-2 h-[2px] bg-[#b32038]"></span>
                    )}
                  </a>
                ))}
              </div>
              <div className="mt-5 flex justify-center">
                <button
                  onClick={() => setShowPicker(true)}
                  className="px-4 py-2 rounded-md bg-black text-white text-[11px] hover:bg-gray-800"
                >
                  + Add
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {fields.length === 0 && (
                  <div className="text-xs text-gray-400">Add button par click karo, fields select karo.</div>
                )}

                {(has("Category") || has("Place") || has("Time") || has("Location") || has("Flyer")) && (
                  <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {has("Category") && (
                        <div className="md:col-span-2">
                          <div className="text-[11px] font-semibold text-gray-600">Category</div>
                          <div className="mt-2 relative">
                            <button
                              onClick={() => setShowCategoryAdd((v) => !v)}
                              className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 px-2 text-[11px] text-gray-600 text-left"
                            >
                              {selectedCategory || "Select"}
                            </button>
                            {showCategoryAdd && (
                              <div className="absolute left-0 right-0 mt-2 rounded-lg border border-gray-200 bg-white shadow-lg p-2 z-10">
                                <input
                                  value={categorySearch}
                                  onChange={(e) => setCategorySearch(e.target.value)}
                                  placeholder="Search..."
                                  className="h-8 w-full rounded-md border border-gray-200 px-2 text-[11px]"
                                />
                                <div className="mt-2 max-h-36 overflow-auto text-[11px]">
                                  {categoryOptions
                                    .filter((opt) =>
                                      opt.toLowerCase().includes(categorySearch.toLowerCase())
                                    )
                                    .map((opt) => (
                                      <button
                                        key={opt}
                                        onClick={() => {
                                          setSelectedCategory(opt);
                                          setShowCategoryAdd(false);
                                          setCategorySearch("");
                                        }}
                                        className="w-full text-left px-2 py-1 rounded hover:bg-gray-50"
                                      >
                                        {opt}
                                      </button>
                                    ))}
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                  <input
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") addCategory();
                                    }}
                                    placeholder="Add"
                                    className="h-8 flex-1 rounded-md border border-gray-200 px-2 text-[11px]"
                                  />
                                  <button
                                    onClick={addCategory}
                                    className="h-8 w-10 rounded-md border border-gray-200 text-gray-600 hover:text-[#d41c4a] hover:border-[#f2b7c3]"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {has("Place") && (
                        <div className="md:col-span-2">
                          <div className="text-[11px] font-semibold text-gray-600">Place</div>
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                            <select
                              value={selectedState}
                              onChange={(e) => setSelectedState(e.target.value)}
                              className="h-9 rounded-lg border border-gray-200 bg-gray-50 px-2 text-[11px] text-gray-600"
                            >
                              <option value="">State</option>
                              {states.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                            <select
                              value={selectedDistrict}
                              onChange={(e) => setSelectedDistrict(e.target.value)}
                              className="h-9 rounded-lg border border-gray-200 bg-gray-50 px-2 text-[11px] text-gray-600"
                              disabled={!selectedState}
                            >
                              <option value="">District</option>
                              {districts.map((d) => (
                                <option key={d} value={d}>
                                  {d}
                                </option>
                              ))}
                            </select>
                            <select
                              value={selectedVillage}
                              onChange={(e) => setSelectedVillage(e.target.value)}
                              className="h-9 rounded-lg border border-gray-200 bg-gray-50 px-2 text-[11px] text-gray-600"
                              disabled={!selectedDistrict}
                            >
                              <option value="">Village</option>
                              {villages.map((v) => (
                                <option key={v} value={v}>
                                  {v}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                      {has("Time") && (
                        <div className="md:col-span-2">
                          <div className="text-[11px] font-semibold text-gray-600">Time</div>
                          <div className="mt-2 grid grid-cols-2 gap-3">
                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                              <div className="flex items-center justify-between text-[11px] text-gray-600 mb-2">
                                <span>Start</span>
                                <span>{formatTimeParts(startHour, startMinute, startPeriod)}</span>
                              </div>
                              <div
                                className="relative w-40 h-40 mx-auto my-2 rounded-full border-2 border-gray-300 bg-white"
                                onMouseMove={(e) => {
                                  if (e.buttons === 1) handleClockDrag(e, setStartHour);
                                }}
                                onMouseDown={(e) => handleClockDrag(e, setStartHour)}
                              >
                                {[...Array(12)].map((_, i) => {
                                  const angle = i * 30;
                                  return (
                                    <div
                                      key={`st-${i}`}
                                      className="absolute left-1/2 top-1/2 w-1 h-3 bg-gray-400"
                                      style={{
                                        transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -76px)`,
                                      }}
                                    />
                                  );
                                })}
                                <div
                                  className="absolute left-1/2 top-1/2 w-1 h-14 bg-gray-700 origin-bottom"
                                  style={{
                                    transform: `translate(-50%, -100%) rotate(${hourAngle(startHour)}deg)`,
                                  }}
                                />
                                <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-gray-800 rounded-full" style={{ transform: "translate(-50%, -50%)" }} />
                                {[12,1,2,3,4,5,6,7,8,9,10,11].map((h) => {
                                  const angle = hourAngle(h);
                                  return (
                                    <button
                                      key={`sh-${h}`}
                                      onClick={() => setStartHour(h)}
                                      style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -62px) rotate(${-angle}deg)` }}
                                      className={`absolute left-1/2 top-1/2 w-8 h-8 text-[12px] font-semibold ${
                                        startHour === h ? "text-[#d41c4a]" : "text-gray-700"
                                      }`}
                                    >
                                      {h}
                                    </button>
                                  );
                                })}
                              </div>
                              <div className="grid grid-cols-4 gap-2 text-[11px]">
                                {[0,15,30,45].map((m) => (
                                  <button
                                    key={`sm-${m}`}
                                    onClick={() => setStartMinute(m)}
                                    className={`h-7 rounded-md border ${
                                      startMinute === m ? "border-[#d41c4a] text-[#d41c4a]" : "border-gray-200 text-gray-600"
                                    }`}
                                  >
                                    {m.toString().padStart(2, "0")}
                                  </button>
                                ))}
                                {(["AM","PM"] as const).map((p) => (
                                  <button
                                    key={`sp-${p}`}
                                    onClick={() => setStartPeriod(p)}
                                    className={`h-7 rounded-md border ${
                                      startPeriod === p ? "border-[#d41c4a] text-[#d41c4a]" : "border-gray-200 text-gray-600"
                                    }`}
                                  >
                                    {p}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                              <div className="flex items-center justify-between text-[11px] text-gray-600 mb-2">
                                <span>End</span>
                                <span>{formatTimeParts(endHour, endMinute, endPeriod)}</span>
                              </div>
                              <div
                                className="relative w-40 h-40 mx-auto my-2 rounded-full border-2 border-gray-300 bg-white"
                                onMouseMove={(e) => {
                                  if (e.buttons === 1) handleClockDrag(e, setEndHour);
                                }}
                                onMouseDown={(e) => handleClockDrag(e, setEndHour)}
                              >
                                {[...Array(12)].map((_, i) => {
                                  const angle = i * 30;
                                  return (
                                    <div
                                      key={`et-${i}`}
                                      className="absolute left-1/2 top-1/2 w-1 h-3 bg-gray-400"
                                      style={{
                                        transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -76px)`,
                                      }}
                                    />
                                  );
                                })}
                                <div
                                  className="absolute left-1/2 top-1/2 w-1 h-14 bg-gray-700 origin-bottom"
                                  style={{
                                    transform: `translate(-50%, -100%) rotate(${hourAngle(endHour)}deg)`,
                                  }}
                                />
                                <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-gray-800 rounded-full" style={{ transform: "translate(-50%, -50%)" }} />
                                {[12,1,2,3,4,5,6,7,8,9,10,11].map((h) => {
                                  const angle = hourAngle(h);
                                  return (
                                    <button
                                      key={`eh-${h}`}
                                      onClick={() => setEndHour(h)}
                                      style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -62px) rotate(${-angle}deg)` }}
                                      className={`absolute left-1/2 top-1/2 w-8 h-8 text-[12px] font-semibold ${
                                        endHour === h ? "text-[#d41c4a]" : "text-gray-700"
                                      }`}
                                    >
                                      {h}
                                    </button>
                                  );
                                })}
                              </div>
                              <div className="grid grid-cols-4 gap-2 text-[11px]">
                                {[0,15,30,45].map((m) => (
                                  <button
                                    key={`em-${m}`}
                                    onClick={() => setEndMinute(m)}
                                    className={`h-7 rounded-md border ${
                                      endMinute === m ? "border-[#d41c4a] text-[#d41c4a]" : "border-gray-200 text-gray-600"
                                    }`}
                                  >
                                    {m.toString().padStart(2, "0")}
                                  </button>
                                ))}
                                {(["AM","PM"] as const).map((p) => (
                                  <button
                                    key={`ep-${p}`}
                                    onClick={() => setEndPeriod(p)}
                                    className={`h-7 rounded-md border ${
                                      endPeriod === p ? "border-[#d41c4a] text-[#d41c4a]" : "border-gray-200 text-gray-600"
                                    }`}
                                  >
                                    {p}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {has("Location") && (
                        <div className="md:col-span-2">
                          <div className="text-[11px] font-semibold text-gray-600">Location</div>
                          <div className="mt-2 grid grid-cols-2 gap-3">
                            <button
                              onClick={fetchCurrentLocation}
                              className="h-9 rounded-lg border border-gray-200 bg-gray-50 px-2 text-left text-[11px] text-gray-600 hover:border-[#d41c4a]"
                            >
                              {locLoading
                                ? "Locating..."
                                : currentLocation
                                ? `Current: ${currentLocation}`
                                : "Use Current Location"}
                            </button>
                            <input
                              placeholder="Paste Link"
                              className="h-9 rounded-lg border border-gray-200 bg-gray-50 px-2 text-[11px] text-gray-600"
                            />
                          </div>
                        </div>
                      )}
                      {has("Flyer") && (
                        <div className="md:col-span-2">
                          <div className="text-[11px] font-semibold text-gray-600">Flyer</div>
                          <div className="mt-2 flex items-center gap-3">
                            {[0,1].map((i) => (
                              <label key={i} className="w-20 h-20 rounded-lg border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-[10px] text-gray-500 cursor-pointer hover:border-[#d41c4a] overflow-hidden">
                                {flyerPreviews[i] ? (
                                  <img
                                    src={flyerPreviews[i] as string}
                                    alt={`Flyer ${i+1}`}
                                    className="w-full h-full object-cover"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setPreviewIndex(i);
                                    }}
                                  />
                                ) : (
                                  <>
                                    <span className="text-lg leading-none">＋</span>
                                    Add
                                  </>
                                )}
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFlyerChange(i, e)} />
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {customSelected.map((field) => (
                        <div key={field}>
                          <div className="text-[11px] font-semibold text-gray-600">{field}</div>
                          {optionMap[field]?.type === "checkbox" && (
                            <label className="mt-2 h-9 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-between px-3 text-[11px] text-gray-600">
                              <span>Enable</span>
                              <input type="checkbox" />
                            </label>
                          )}
                          {optionMap[field]?.type === "dropdown" && (
                            <div className="mt-2 relative">
                              <button
                                onClick={() => setOpenDropdownField((v) => (v === field ? null : field))}
                                className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 px-2 text-[11px] text-gray-600 text-left"
                              >
                                {selectedDropdownValue[field] || "Select"}
                              </button>
                              {openDropdownField === field && (
                                <div className="absolute left-0 right-0 mt-2 rounded-lg border border-gray-200 bg-white shadow-lg p-2 z-10">
                                  <input
                                    value={dropdownSearch[field] || ""}
                                    onChange={(e) =>
                                      setDropdownSearch((prev) => ({ ...prev, [field]: e.target.value }))
                                    }
                                    placeholder="Search..."
                                    className="h-8 w-full rounded-md border border-gray-200 px-2 text-[11px]"
                                  />
                                  <div className="mt-2 max-h-28 overflow-auto text-[11px]">
                                    {(customDropdownOptions[field] ?? [])
                                      .filter((opt) =>
                                        opt.toLowerCase().includes((dropdownSearch[field] || "").toLowerCase())
                                      )
                                      .map((opt) => (
                                        <button
                                          key={opt}
                                          onClick={() => {
                                            setSelectedDropdownValue((prev) => ({ ...prev, [field]: opt }));
                                            setOpenDropdownField(null);
                                          }}
                                          className="w-full text-left px-2 py-1 rounded hover:bg-gray-50"
                                        >
                                          {opt}
                                        </button>
                                      ))}
                                  </div>
                                  <div className="mt-2 flex items-center gap-2">
                                    <input
                                      value={dropdownAdd[field] || ""}
                                      onChange={(e) =>
                                        setDropdownAdd((prev) => ({ ...prev, [field]: e.target.value }))
                                      }
                                      placeholder="Add new"
                                      className="h-8 flex-1 rounded-md border border-gray-200 px-2 text-[11px]"
                                    />
                                    <button
                                      onClick={() => addCustomDropdownOption(field)}
                                      className="h-8 w-10 rounded-md border border-gray-200 text-gray-600 hover:text-[#d41c4a] hover:border-[#f2b7c3]"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          {optionMap[field]?.type === "date" && (
                            <input
                              type="date"
                              className="mt-2 h-9 w-full rounded-lg border border-gray-200 bg-gray-50 px-2 text-[11px] text-gray-600"
                            />
                          )}
                          {!optionMap[field]?.type || optionMap[field]?.type === "text" ? (
                            <div className="mt-2 h-9 rounded-lg border border-gray-200 bg-gray-50"></div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(has("Count") || has("Name") || has("Year") || has("Day")) && (
                  <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {has("Count") && (
                        <div>
                          <div className="text-[11px] font-semibold text-gray-600">Count</div>
                          <div className="mt-2 h-9 rounded-lg border border-gray-200 bg-gray-50"></div>
                        </div>
                      )}
                      {has("Name") && (
                        <div>
                          <div className="text-[11px] font-semibold text-gray-600">Name</div>
                          <div className="mt-2 h-9 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-end pr-2 text-gray-400 text-xs">+</div>
                        </div>
                      )}
                      {has("Year") && (
                        <div>
                          <div className="text-[11px] font-semibold text-gray-600">Year</div>
                          <div className="mt-2 h-9 rounded-lg border border-gray-200 bg-gray-50"></div>
                        </div>
                      )}
                      {has("Day") && (
                        <div>
                          <div className="text-[11px] font-semibold text-gray-600">Day</div>
                          <div className="mt-2 h-9 rounded-lg border border-gray-200 bg-gray-50"></div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Picker Modal */}
        {showPicker && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-20">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-5">
              <div className="flex items-center justify-between">
                <div className="text-[12px] font-semibold text-gray-700">Select Basic Info Fields</div>
                <button
                  onClick={() => setShowPicker(false)}
                  className="text-[12px] text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-[12px]">
                {options.map((field) => (
                  <label key={field.name} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(field.name)}
                      onChange={() => toggleField(field.name)}
                    />
                    {field.name}
                  </label>
                ))}
              </div>
              <div className="mt-4">
                <div className="text-[11px] text-gray-600 mb-2">Add Custom Field</div>
                <div className="flex items-center gap-2">
                  <input
                    value={customField}
                    onChange={(e) => setCustomField(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addCustomField();
                    }}
                    placeholder="New field name"
                    className="h-8 flex-1 rounded-md border border-gray-200 px-2 text-[11px]"
                  />
                  <select
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value as FieldOption["type"])}
                    className="h-8 rounded-md border border-gray-200 px-2 text-[11px]"
                  >
                    <option value="text">Text</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="dropdown">Dropdown</option>
                    <option value="date">Date</option>
                  </select>
                  <button
                    onClick={addCustomField}
                    className="h-8 px-3 rounded-md bg-[#d41c4a] text-white text-[11px] hover:bg-[#b5143e]"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <button
                  onClick={() => setShowPicker(false)}
                  className="px-3 py-2 rounded-md border border-gray-200 text-[11px] text-gray-600 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => setShowPicker(false)}
                  className="px-3 py-2 rounded-md bg-[#d41c4a] text-white text-[11px] hover:bg-[#b5143e]"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {previewIndex !== null && flyerPreviews[previewIndex] && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg p-4 w-full max-w-md">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[12px] font-semibold text-gray-700">Image Preview</div>
              <button
                onClick={() => setPreviewIndex(null)}
                className="text-[12px] text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="w-full h-80 rounded-md overflow-hidden border border-gray-200 bg-gray-50">
              <img
                src={flyerPreviews[previewIndex] as string}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <label className="px-3 py-2 rounded-md bg-[#d41c4a] text-white text-[11px] hover:bg-[#b5143e] cursor-pointer">
                Change
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    handleFlyerChange(previewIndex, e);
                    setPreviewIndex(null);
                  }}
                />
              </label>
              <button
                onClick={() => setPreviewIndex(null)}
                className="px-3 py-2 rounded-md border border-gray-200 text-[11px] text-gray-600 hover:bg-gray-50"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
