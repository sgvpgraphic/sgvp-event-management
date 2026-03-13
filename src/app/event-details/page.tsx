"use client";

import { useMemo, useState } from "react";
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
  const [categoryOptions, setCategoryOptions] = useState<string[]>([
    "Satsang",
    "Mahapooja",
    "Celebration",
  ]);
  const [newCategory, setNewCategory] = useState("");

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
  const addCategory = () => {
    const value = newCategory.trim();
    if (!value) return;
    if (!categoryOptions.includes(value)) {
      setCategoryOptions((prev) => [...prev, value]);
    }
    setNewCategory("");
  };

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
      <div className="w-full h-screen bg-white rounded-none shadow-none overflow-hidden relative pt-12">
        {/* Top Bar */}
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
                className="h-8 w-44 rounded-md border border-gray-200 bg-gray-50 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#d41c4a]"
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

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] h-screen items-center">
          {/* Sidebar */}
          <div className="border-r border-gray-100 p-6 flex flex-col items-center justify-between relative overflow-hidden h-full">
            <div className="flex flex-col items-center gap-2 z-10 w-full">
              <div className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center shadow-sm">
                <img src="/images/event.jpg" alt="Event Logo" className="w-6 h-6 object-contain" />
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
            <img src="/images/logo.png" alt="SGVP Logo" className="w-24 object-contain opacity-90 z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-24 opacity-20 pointer-events-none">
              <img src="/images/building.png" alt="Building" className="w-full h-full object-contain object-bottom" />
            </div>
          </div>

          {/* Main */}
          <div className="h-full w-full px-8 flex items-start justify-center pt-6">
            <div className="w-full max-w-4xl">
              <div className="flex items-center justify-between">
                <h1 className="text-sm font-semibold text-[#d41c4a]">Event Details</h1>
                <button
                  onClick={() => setShowPicker(true)}
                  className="px-4 py-2 rounded-md bg-black text-white text-[11px] hover:bg-gray-800"
                >
                  + Add
                </button>
              </div>

              <div className="mt-4 grid grid-cols-6 gap-2 text-[11px]">
                {[
                  { label: "Basic Info", color: "bg-[#fde7c7]" },
                  { label: "Schedule", color: "bg-[#dff3f9]" },
                  { label: "Participants", color: "bg-[#fde6e9]" },
                  { label: "Media", color: "bg-[#dff1d8]" },
                  { label: "Data", color: "bg-[#fef1c8]" },
                  { label: "Notes", color: "bg-[#eee7f9]" },
                ].map((tab) => (
                  <div
                    key={tab.label}
                    className={`rounded-md ${tab.color} px-2 py-2 text-center font-semibold text-gray-700`}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {fields.length === 0 && (
                  <div className="text-xs text-gray-400">Add button par click karo, fields select karo.</div>
                )}

                {(has("Category") || has("Place") || has("Time") || has("Location") || has("Flyer")) && (
                  <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {has("Category") && (
                        <div>
                          <div className="text-[11px] font-semibold text-gray-600">Category</div>
                          <div className="mt-2 flex items-center gap-2">
                            <select className="h-9 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-2 text-[11px] text-gray-600">
                              <option>Select</option>
                              {categoryOptions.map((opt) => (
                                <option key={opt}>{opt}</option>
                              ))}
                            </select>
                            <input
                              value={newCategory}
                              onChange={(e) => setNewCategory(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") addCategory();
                              }}
                              placeholder="Add"
                              className="h-9 w-20 rounded-lg border border-gray-200 px-2 text-[11px]"
                            />
                            <button
                              onClick={addCategory}
                              className="h-9 w-9 rounded-lg border border-gray-200 text-gray-600 hover:text-[#d41c4a] hover:border-[#f2b7c3]"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}
                      {has("Place") && (
                        <div>
                          <div className="text-[11px] font-semibold text-gray-600">Place</div>
                          <div className="mt-2 h-9 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-end pr-2 text-gray-400 text-xs">+</div>
                        </div>
                      )}
                      {has("Time") && (
                        <div className="md:col-span-2">
                          <div className="text-[11px] font-semibold text-gray-600">Time</div>
                          <div className="mt-2 grid grid-cols-2 gap-3">
                            <div className="h-9 rounded-lg border border-gray-200 bg-gray-50"></div>
                            <div className="h-9 rounded-lg border border-gray-200 bg-gray-50"></div>
                          </div>
                        </div>
                      )}
                      {has("Location") && (
                        <div className="md:col-span-2">
                          <div className="text-[11px] font-semibold text-gray-600">Location</div>
                          <div className="mt-2 grid grid-cols-2 gap-3">
                            <div className="h-9 rounded-lg border border-gray-200 bg-gray-50"></div>
                            <div className="h-9 rounded-lg border border-gray-200 bg-gray-50"></div>
                          </div>
                        </div>
                      )}
                      {has("Flyer") && (
                        <div className="md:col-span-2">
                          <div className="text-[11px] font-semibold text-gray-600">Flyer</div>
                          <div className="mt-2 flex items-center gap-3">
                            <div className="w-16 h-16 rounded-lg border border-gray-200 bg-gray-50"></div>
                            <div className="w-16 h-16 rounded-lg border border-gray-200 bg-gray-50"></div>
                          </div>
                        </div>
                      )}
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

                {customSelected.length > 0 && (
                  <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5 lg:col-span-2">
                    <div className="text-[12px] font-semibold text-gray-700 mb-3">Custom Fields</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                            <select className="mt-2 h-9 w-full rounded-lg border border-gray-200 bg-gray-50 px-2 text-[11px] text-gray-600">
                              <option>Select</option>
                            </select>
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
    </div>
  );
}
