"use client";

import { LayoutGrid, PlusSquare, Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#bdbdbd] flex items-stretch justify-stretch p-0">
      <div className="w-full h-screen bg-white rounded-none shadow-none overflow-hidden relative pt-12">
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
          <div className="border-b md:border-b-0 md:border-r border-gray-100 p-4 md:p-6 flex flex-col items-start md:items-center justify-start md:justify-between gap-4 relative overflow-hidden h-full">
            <div className="flex flex-col items-start md:items-center gap-2 z-10 w-full">
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
                    className="flex items-center gap-2 text-[12px] text-[#d41c4a] font-semibold"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </a>
                </div>
              </nav>
            </div>
            <img src="/Image/logo.png" alt="SGVP Logo" className="hidden md:block w-24 object-contain opacity-90 z-10" />
            <div className="hidden md:block absolute bottom-0 left-0 right-0 h-24 opacity-20 pointer-events-none">
              <img src="/Image/building.png" alt="Building" className="w-full h-full object-contain object-bottom" />
            </div>
          </div>

          {/* Main */}
          <div className="h-full w-full px-4 md:px-8 flex items-start justify-center pt-6">
            <div className="w-full max-w-5xl 2xl:max-w-6xl mx-auto">
              <h1 className="text-sm font-semibold text-[#d41c4a]">Settings</h1>
              <p className="text-xs text-gray-500 mt-1">Manage your SGVP Event Diary preferences.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="rounded-lg border border-gray-100 bg-orange-50/70 p-4">
                  <div className="text-[12px] font-semibold text-gray-700">Organization</div>
                  <div className="mt-3 space-y-3 text-[11px] text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Organization Name</span>
                      <span className="text-gray-800">SGVP Ahmedabad</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Campus</span>
                      <span className="text-gray-800">Memnagar</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-100 bg-sky-50/70 p-4">
                  <div className="text-[12px] font-semibold text-gray-700">Notifications</div>
                  <div className="mt-3 space-y-3 text-[11px] text-gray-600">
                    <label className="flex items-center justify-between">
                      <span>Email Alerts</span>
                      <input type="checkbox" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>SMS Alerts</span>
                      <input type="checkbox" />
                    </label>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-100 bg-green-50/70 p-4">
                  <div className="text-[12px] font-semibold text-gray-700">Theme</div>
                  <div className="mt-3 space-y-3 text-[11px] text-gray-600">
                    <label className="flex items-center justify-between">
                      <span>Light Mode</span>
                      <input type="radio" name="theme" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>Dark Mode</span>
                      <input type="radio" name="theme" />
                    </label>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-100 bg-pink-50/70 p-4">
                  <div className="text-[12px] font-semibold text-gray-700">Profile</div>
                  <div className="mt-3 space-y-3 text-[11px] text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Admin Name</span>
                      <span className="text-gray-800">Admin</span>
                    </div>
                    <button className="w-full mt-2 py-2 rounded-md bg-white border border-gray-200 text-[11px] text-gray-700 hover:bg-gray-50">
                      Edit Profile
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-100 bg-amber-50/70 p-4">
                  <div className="text-[12px] font-semibold text-gray-700">Event Defaults</div>
                  <div className="mt-3 space-y-3 text-[11px] text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Default Duration</span>
                      <span className="text-gray-800">2 Hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Default Venue</span>
                      <span className="text-gray-800">SGVP Grounds</span>
                    </div>
                    <label className="flex items-center justify-between">
                      <span>Auto Approve Events</span>
                      <input type="checkbox" />
                    </label>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-100 bg-violet-50/70 p-4">
                  <div className="text-[12px] font-semibold text-gray-700">Security</div>
                  <div className="mt-3 space-y-3 text-[11px] text-gray-600">
                    <label className="flex items-center justify-between">
                      <span>Two-Factor Auth</span>
                      <input type="checkbox" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>Login Alerts</span>
                      <input type="checkbox" defaultChecked />
                    </label>
                    <button className="w-full mt-2 py-2 rounded-md bg-white border border-gray-200 text-[11px] text-gray-700 hover:bg-gray-50">
                      Change Password
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-100 bg-teal-50/70 p-4">
                  <div className="text-[12px] font-semibold text-gray-700">Storage & Backup</div>
                  <div className="mt-3 space-y-3 text-[11px] text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Used Storage</span>
                      <span className="text-gray-800">12 GB / 30 GB</span>
                    </div>
                    <label className="flex items-center justify-between">
                      <span>Auto Backup</span>
                      <input type="checkbox" defaultChecked />
                    </label>
                    <button className="w-full mt-2 py-2 rounded-md bg-white border border-gray-200 text-[11px] text-gray-700 hover:bg-gray-50">
                      Download Backup
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-100 bg-slate-50/70 p-4">
                  <div className="text-[12px] font-semibold text-gray-700">Language & Region</div>
                  <div className="mt-3 space-y-3 text-[11px] text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Language</span>
                      <span className="text-gray-800">Gujarati</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Time Zone</span>
                      <span className="text-gray-800">Asia/Kolkata</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 rounded-md bg-[#d41c4a] text-white text-[11px] hover:bg-[#b5143e]">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
