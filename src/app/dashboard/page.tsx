"use client";

import { useEffect, useMemo, useState } from "react";
import { LayoutGrid, PlusSquare, Settings } from "lucide-react";

export default function DashboardPage() {
  const [percent, setPercent] = useState(78);
  const [series, setSeries] = useState<number[]>([60, 52, 68, 74, 63, 80]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    storage: 0,
    progress: 0,
  });

  useEffect(() => {
    const target = { users: 30, events: 300, storage: 30, progress: 75 };
    const start = performance.now();
    const duration = 900;
    let raf = 0;

    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setStats({
        users: Math.round(target.users * p),
        events: Math.round(target.events * p),
        storage: Math.round(target.storage * p),
        progress: Math.round(target.progress * p),
      });
      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const tick = () => {
      setPercent((p) => {
        const next = Math.max(55, Math.min(90, p + (Math.random() * 10 - 5)));
        return Math.round(next);
      });
      setSeries((prev) => {
        return prev.map((v) => {
          const next = Math.max(40, Math.min(95, v + (Math.random() * 12 - 6)));
          return Math.round(next);
        });
      });
    };

    const id = setInterval(tick, 2000);
    return () => clearInterval(id);
  }, []);

  const points = useMemo(() => {
    const width = 300;
    const height = 100;
    const top = 12;
    const bottom = 90;
    const step = (width - 20) / (series.length - 1);

    return series.map((v, i) => {
      const x = 10 + step * i;
      const y = bottom - ((v - 40) / 55) * (bottom - top);
      return { x, y };
    });
  }, [series]);

  const linePath = useMemo(() => {
    return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");
  }, [points]);

  const fillPath = useMemo(() => {
    if (points.length === 0) return "";
    const last = points[points.length - 1];
    const first = points[0];
    return `${linePath} L${last.x} 95 L${first.x} 95 Z`;
  }, [linePath, points]);
  return (
    <div className="min-h-screen bg-black flex items-stretch justify-stretch p-0">
      <div className="w-full min-h-screen bg-black rounded-none shadow-none overflow-visible flex flex-col">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-4 md:px-6 py-3 border-b border-gray-100 bg-white animate-fade-in shadow-[0_2px_8px_rgba(15,23,42,0.03)]" style={{ animationDelay: "80ms" }}>
          <div className="text-[10px] font-semibold tracking-[0.3em] text-gray-500 uppercase">
            || Jay Swaminarayan ||
          </div>
          <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="h-8 w-44 rounded-md border border-white/60 bg-white/80 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#d41c4a]"
              />
            </div>
            <div className="hidden md:block w-6 h-6 rounded-full bg-white/70 border border-white/70"></div>
            <div className="hidden md:block w-6 h-6 rounded-full bg-white/70 border border-white/70"></div>
            <div className="relative hidden md:block">
              <button
                className="flex items-center gap-2 text-xs text-gray-700"
                onClick={() => setAdminOpen((v) => !v)}
              >
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-semibold">
                  A
                </div>
                Admin
              </button>
              <div
                className={`absolute right-0 mt-2 w-24 rounded-md border border-gray-200 bg-white shadow-lg transition-opacity ${
                  adminOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <a
                  href="/login"
                  onClick={() => setAdminOpen(false)}
                  className="block px-3 py-2 text-[10px] text-gray-600 hover:bg-gray-50 hover:text-[#d41c4a]"
                >
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] flex-1 min-h-0">
          {/* Sidebar */}
          <div className="border-b md:border-b-0 md:border-r border-gray-200 bg-white p-2 md:p-6 h-14 md:h-full flex flex-row md:flex-col md:items-start justify-start gap-2 animate-fade-in shadow-[4px_0_16px_rgba(15,23,42,0.04)]" style={{ animationDelay: "120ms" }}>
            <div className="flex flex-row md:flex-col items-center gap-2 w-auto">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl border border-white/70 bg-white/80 flex items-center justify-center shadow-sm">
                <img src="/Image/event.jpg" alt="Event Logo" className="w-6 h-6 object-contain" />
              </div>
              <span className="hidden md:block text-[11px] text-[#d41c4a] font-semibold tracking-wide">SGVP Event Diary</span>
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
            <img src="/Image/logo.png" alt="SGVP Logo" className="hidden md:block w-24 object-contain opacity-90 md:mt-auto self-center" />
          </div>

          {/* Main */}
          <div className="p-8 bg-white w-full">
            <div className="w-full max-w-none mx-auto">
            <h1 className="text-base font-semibold text-[#d41c4a] tracking-wide animate-fade-up" style={{ animationDelay: "160ms" }}>
              SGVP Event Diary
            </h1>
            <div className="mt-2 rounded-lg border border-red-100/60 bg-red-50/40 p-3 animate-fade-up shimmer" style={{ animationDelay: "220ms" }}>
              <div className="text-sm font-semibold text-gray-800 tracking-wide">Jay Swaminarayan, Admin</div>
              <div className="text-xs text-gray-500 mt-1">
                Welcome to the admin panel of SGVP Event Diary.
              </div>
              <div className="text-xs text-gray-500">Manage users, events, and notices with ease.</div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
              <div className="rounded-xl bg-orange-100/70 p-5 min-h-[110px] animate-fade-up card-glow hover-lift" style={{ animationDelay: "280ms" }}>
                <div className="text-[11px] text-gray-600 font-semibold tracking-wide">Total Users</div>
                <div className="text-xl font-bold text-gray-800 mt-1">{stats.users}</div>
              </div>
              <div className="rounded-xl bg-sky-100/70 p-5 min-h-[110px] animate-fade-up card-glow hover-lift" style={{ animationDelay: "340ms" }}>
                <div className="text-[11px] text-gray-600 font-semibold tracking-wide">Total Events</div>
                <div className="text-xl font-bold text-gray-800 mt-1">{stats.events}</div>
              </div>
              <div className="rounded-xl bg-green-100/70 p-5 min-h-[110px] animate-fade-up card-glow hover-lift" style={{ animationDelay: "400ms" }}>
                <div className="text-[11px] text-gray-600 font-semibold tracking-wide">Storage</div>
                <div className="text-xl font-bold text-gray-800 mt-1">{stats.storage} GB</div>
              </div>
              <div className="rounded-xl bg-rose-100/70 p-5 min-h-[110px] flex items-center justify-between animate-fade-up card-glow hover-lift" style={{ animationDelay: "460ms" }}>
                <div>
                  <div className="text-[11px] text-gray-600 font-semibold tracking-wide">Progress</div>
                  <div className="text-xl font-bold text-gray-800 mt-1">{stats.progress}%</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-[conic-gradient(#f43f5e_0_270deg,#fde2e8_270deg_360deg)] flex items-center justify-center shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-white"></div>
                </div>
              </div>
            </div>

            {/* Event Analysis + Line Chart */}
            <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-7">
              <div className="rounded-xl border border-white/70 bg-white/70 p-6 flex items-center gap-6 min-h-[180px] animate-fade-up card-glow hover-lift" style={{ animationDelay: "520ms" }}>
                <div className="relative w-32 h-32 float-slow">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundImage: `conic-gradient(from 210deg, #f97316 0deg, #22c55e ${Math.round(
                        percent * 2.4
                      )}deg, #60a5fa 360deg)`,
                      transition: "background-image 600ms ease",
                    }}
                  ></div>
                  <div className="absolute inset-2 rounded-full bg-white shadow-inner"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-800">{percent}%</div>
                      <div className="text-[10px] uppercase tracking-wide text-gray-500">Events</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Event Analysis</div>
                  <div className="text-sm font-semibold text-gray-700 mt-1">Overall Participation</div>
                  <div className="text-xs text-gray-500 mt-1">Updated today</div>
                  <div className="flex items-center gap-3 mt-3 text-[11px] text-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                      High
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Medium
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                      Low
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/70 bg-white/70 p-6 min-h-[180px] animate-fade-up card-glow hover-lift" style={{ animationDelay: "580ms" }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Event Trends</div>
                  <div className="text-[11px] text-gray-500">Last 6 Months</div>
                </div>
                <div className="h-28">
                  <svg viewBox="0 0 300 100" className="w-full h-full">
                    <defs>
                      <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fda4af" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#fda4af" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={fillPath} fill="url(#lineFill)" />
                    <path
                      d={linePath}
                      fill="none"
                      stroke="#e11d48"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ transition: "d 600ms ease" }}
                    />
                    {points.map((p, i) => (
                      <circle key={i} cx={p.x} cy={p.y} r="3" fill="#e11d48" />
                    ))}
                  </svg>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>

            {/* Lower Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-7 mt-7">
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-3">Recent Events</div>
                <div className="rounded-lg border border-gray-100 p-4">
                  <div className="grid grid-cols-3 text-[11px] font-semibold text-gray-500 mb-2">
                    <div>Event</div>
                    <div>Location</div>
                    <div>Date</div>
                  </div>
                  <div className="space-y-2 text-[11px] text-gray-700">
                    <div className="grid grid-cols-3">
                      <div>Annual Sports Day</div>
                      <div>SGVP Memnagar</div>
                      <div>April 20, 2024</div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div>Guru Purnima Celebration</div>
                      <div>SGVP Memnagar</div>
                      <div>April 10, 2024</div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div>Parent-Teacher Meeting</div>
                      <div>SGVP</div>
                      <div>Date</div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div>Blood Donation Camp</div>
                      <div>Hospital</div>
                      <div>Jun 14, 2024</div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-3">
                    <button className="text-[11px] px-3 py-1 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 hover-lift">
                      View All
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-gray-700 mb-3">Quick Action</div>
              <div className="grid grid-cols-2 gap-3">
                <button className="rounded-lg bg-orange-100/70 px-3 py-2 text-[11px] font-semibold text-gray-700 hover-lift">
                  Add User
                </button>
                <a href="/create" className="rounded-lg bg-sky-100/70 px-3 py-2 text-[11px] font-semibold text-gray-700 text-center hover-lift">
                  Add Event
                </a>
                <button className="rounded-lg bg-green-100/70 px-3 py-2 text-[11px] font-semibold text-gray-700 hover-lift">
                  User Storage
                </button>
                <button className="rounded-lg bg-rose-100/70 px-3 py-2 text-[11px] font-semibold text-gray-700 hover-lift">
                  Add Department
                </button>
              </div>
            </div>
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
