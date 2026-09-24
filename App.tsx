import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import India from "@svg-maps/india";
import {
  LayoutDashboard,
  BarChart3,
  Map,
  FileText,
  Users,
  Network,
  Brain,
  MessageSquare,
  FileBarChart,
  Settings,
  ShieldAlert,
  Bell,
  Search,
  Activity,
  AlertTriangle,
  ArrowLeft,
  TrendingUp,
  MapPin,
  Database,
  X,
} from "lucide-react";

type FIR = {
  fir_id: string;
  crime_type: string;
  district: string;
  state: string;
  status: string;
  priority: string;
};

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

function App() {
  const [page, setPage] = useState("dashboard");

  const [stats, setStats] = useState({
    total_firs: 0,
    active_cases: 0,
    women_safety_cases: 0,
    high_priority: 0,
  });

  const [firs, setFirs] = useState<FIR[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log(err));

    fetch("http://127.0.0.1:8000/api/firs")
      .then((res) => res.json())
      .then((data) => setFirs(data))
      .catch((err) => console.log(err));
  }, []);

  const menu = [
    ["dashboard", "Executive Dashboard", <LayoutDashboard size={18} />],
    ["analytics", "Crime Analytics", <BarChart3 size={18} />],
    ["map", "Interactive Map", <Map size={18} />],
    ["firs", "FIR Management", <FileText size={18} />],
    ["victims", "Victim Analytics", <Users size={18} />],
    ["accused", "Accused Analytics", <Users size={18} />],
    ["complainants", "Complainant Analytics", <Users size={18} />],
    ["officers", "Officer Performance", <Activity size={18} />],
    ["network", "Criminal Network", <Network size={18} />],
    ["predictions", "AI Predictions", <Brain size={18} />],
    ["assistant", "AI Assistant", <MessageSquare size={18} />],
    ["reports", "Reports Center", <FileBarChart size={18} />],
    ["settings", "Settings & Audit", <Settings size={18} />],
  ];

  const currentTitle =
    menu.find((item) => item[0] === page)?.[1] ||
    "Executive Dashboard";

  return (
    <div className="min-h-screen bg-[#050d18] text-white flex">

      <aside className="w-64 min-h-screen bg-[#081423] border-r border-slate-800 p-4">

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-cyan-500/15 p-2 rounded-xl">
            <ShieldAlert className="text-cyan-400" size={26} />
          </div>

          <div>
            <h1 className="font-bold text-lg">CrimeIntel AI</h1>
            <p className="text-[10px] text-slate-500">
              INTELLIGENCE PLATFORM
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-3">
          MAIN MENU
        </p>

        <div className="space-y-1">
          {menu.map(([id, name, icon]) => (
            <button
              key={id as string}
              onClick={() => setPage(id as string)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition ${
                page === id
                  ? "bg-cyan-500/10 text-cyan-300 border-l-2 border-cyan-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {icon as ReactNode}
              {name as string}
            </button>
          ))}
        </div>

        <div className="mt-8 p-3 rounded-xl bg-pink-500/5 border border-pink-500/10">
          <div className="flex items-center gap-2">
            <ShieldAlert size={16} className="text-pink-400" />
            <p className="text-xs text-pink-300 font-semibold">
              WOMEN SAFETY
            </p>
          </div>

          <p className="text-[11px] text-slate-500 mt-2">
            AI-powered safety intelligence enabled
          </p>
        </div>

      </aside>

      <main className="flex-1">

        <header className="h-20 border-b border-slate-800 bg-[#07111e] px-7 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold">
              {currentTitle}
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              AI-Powered Criminal Network Analysis System
            </p>
          </div>

          <div className="flex items-center gap-5">

            <div className="flex items-center bg-[#0d1b2b] border border-slate-800 rounded-lg px-3 py-2">

              <Search size={17} className="text-slate-500" />

              <input
                className="bg-transparent outline-none px-2 text-sm w-48"
                placeholder="Search..."
              />

            </div>

            <Bell className="text-slate-400" />

            <div>
              <p className="text-sm font-medium">
                Investigator
              </p>

              <p className="text-[11px] text-slate-500">
                Authorized Officer
              </p>
            </div>

          </div>

        </header>

        {page === "dashboard" && (
          <Dashboard stats={stats} firs={firs} />
        )}

        {page === "analytics" && (
          <AnalyticsPage
            firs={firs}
            onBack={() => setPage("dashboard")}
          />
        )}

        {page === "map" && (
          <MapPage
            firs={firs}
            onBack={() => setPage("dashboard")}
          />
        )}

        {page === "firs" && (
          <FIRPage
            firs={firs}
            onBack={() => setPage("dashboard")}
          />
        )}

        {page !== "dashboard" &&
          page !== "analytics" &&
          page !== "map" &&
          page !== "firs" && (
            <ComingSoon
              title={currentTitle}
              onBack={() => setPage("dashboard")}
            />
          )}

      </main>
    </div>
  );
}


/* ================= DASHBOARD ================= */

function Dashboard({
  stats,
  firs,
}: {
  stats: {
    total_firs: number;
    active_cases: number;
    women_safety_cases: number;
    high_priority: number;
  };
  firs: FIR[];
}) {
  const crimeCounts: Record<string, number> = {};
  const stateCounts: Record<string, number> = {};

  firs.forEach((fir) => {
    crimeCounts[fir.crime_type] = (crimeCounts[fir.crime_type] || 0) + 1;
    stateCounts[fir.state] = (stateCounts[fir.state] || 0) + 1;
  });

  const topCrimes = Object.entries(crimeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const topStates = Object.entries(stateCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const maxCrime = topCrimes[0]?.[1] || 1;
  const maxState = topStates[0]?.[1] || 1;

  const womenTypes = [
    "Human Trafficking",
    "Cyber Exploitation",
    "Online Harassment",
    "Stalking",
  ];

  const womenCounts = womenTypes.map((type) => ({
    type,
    count: firs.filter((fir) => fir.crime_type === type).length,
  }));

  return (
    <section className="p-7">

      <div className="mb-7">
        <p className="text-cyan-400 text-xs font-semibold tracking-wider">
          INTELLIGENCE OVERVIEW
        </p>
        <h1 className="text-3xl font-bold mt-1">Command Center</h1>
        <p className="text-slate-500 text-sm mt-2">
          Live overview from the connected FIR intelligence database.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-5">
        <StatCard
          title="Total FIRs"
          value={stats.total_firs}
          icon={<FileText />}
          iconClass="text-cyan-400 bg-cyan-500/10"
        />
        <StatCard
          title="Active Cases"
          value={stats.active_cases}
          icon={<Activity />}
          iconClass="text-green-400 bg-green-500/10"
        />
        <StatCard
          title="Women Safety Cases"
          value={stats.women_safety_cases}
          icon={<ShieldAlert />}
          iconClass="text-pink-400 bg-pink-500/10"
        />
        <StatCard
          title="High Priority"
          value={stats.high_priority}
          icon={<AlertTriangle />}
          iconClass="text-red-400 bg-red-500/10"
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">

        <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-bold text-lg">Crime Categories</h2>
              <p className="text-xs text-slate-500 mt-1">
                Top categories in current FIR data
              </p>
            </div>
            <BarChart3 className="text-cyan-400" />
          </div>

          {topCrimes.length === 0 ? (
            <p className="text-sm text-slate-500">No FIR data available.</p>
          ) : (
            <div className="space-y-5">
              {topCrimes.map(([name, count]) => (
                <div key={name}>
                  <div className="flex justify-between text-xs mb-2">
                    <span>{name}</span>
                    <span className="text-cyan-400 font-semibold">{count}</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      style={{ width: `${(count / maxCrime) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-bold text-lg">State Activity</h2>
              <p className="text-xs text-slate-500 mt-1">
                States with the highest FIR volume
              </p>
            </div>
            <MapPin className="text-purple-400" />
          </div>

          {topStates.length === 0 ? (
            <p className="text-sm text-slate-500">No state data available.</p>
          ) : (
            <div className="space-y-5">
              {topStates.map(([name, count], index) => (
                <div key={name}>
                  <div className="flex justify-between text-xs mb-2">
                    <span>
                      {index + 1}. {name}
                    </span>
                    <span className="text-purple-400 font-semibold">{count}</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
                      style={{ width: `${(count / maxState) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <div className="mt-6 bg-[#111426] border border-pink-500/20 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-5">
          <ShieldAlert className="text-pink-400" />
          <div>
            <h2 className="font-bold text-lg">
              Women Safety Intelligence
            </h2>
            <p className="text-xs text-slate-500">
              Crime categories relevant to women-safety monitoring
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {womenCounts.map(({ type, count }) => (
            <SafetyCard
              key={type}
              title={type}
              value={String(count)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">

        <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between mb-6">
            <div>
              <h2 className="font-bold text-lg">Case Activity</h2>
              <p className="text-xs text-slate-500 mt-1">
                Current FIR distribution
              </p>
            </div>
            <TrendingUp className="text-cyan-400" />
          </div>

          <div className="h-48 flex items-end gap-3">
            {firs.slice(-10).map((fir, index) => {
              const height =
                fir.priority === "HIGH"
                  ? 90
                  : fir.priority === "MEDIUM"
                  ? 65
                  : 40;

              return (
                <div
                  key={`${fir.fir_id}-${index}`}
                  className="flex-1 bg-gradient-to-t from-cyan-600/20 via-blue-500/60 to-cyan-300 rounded-t-lg"
                  style={{ height: `${height}%` }}
                  title={`${fir.fir_id} • ${fir.priority}`}
                />
              );
            })}

            {firs.length === 0 && (
              <div className="w-full text-center text-sm text-slate-600 self-center">
                Waiting for FIR data...
              </div>
            )}
          </div>

          <div className="flex justify-between text-[9px] text-slate-600 mt-3">
            {firs.slice(-10).map((fir) => (
              <span key={fir.fir_id}>{fir.fir_id.replace("FIR", "")}</span>
            ))}
          </div>
        </div>

        <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <Brain className="text-purple-400" />
            <h2 className="font-bold">Emerging Intelligence</h2>
          </div>

          <Insight text={`${stats.high_priority} high-priority case(s) require attention`} />
          <Insight text={`${stats.active_cases} case(s) are currently active`} />
          <Insight text={`${Object.keys(stateCounts).length} state(s) have FIR records`} />
          <Insight text="Review hotspot states through the Interactive Map" />
        </div>

      </div>

      <div className="mt-6 p-4 rounded-xl bg-green-500/5 border border-green-500/20 text-xs text-green-300">
        ● Backend Database Connected • Dashboard metrics update from /api/stats and /api/firs
      </div>

    </section>
  );
}

/* ================= INDIA MAP ================= */

function MapPage({
  firs,
  onBack,
}: {
  firs: FIR[];
  onBack: () => void;
}) {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const stateNames: Record<string, string> = {
    ap: "Andhra Pradesh",
    ar: "Arunachal Pradesh",
    as: "Assam",
    br: "Bihar",
    ct: "Chhattisgarh",
    ga: "Goa",
    gj: "Gujarat",
    hr: "Haryana",
    hp: "Himachal Pradesh",
    jh: "Jharkhand",
    ka: "Karnataka",
    kl: "Kerala",
    mp: "Madhya Pradesh",
    mh: "Maharashtra",
    mn: "Manipur",
    ml: "Meghalaya",
    mz: "Mizoram",
    nl: "Nagaland",
    od: "Odisha",
    pb: "Punjab",
    rj: "Rajasthan",
    sk: "Sikkim",
    tn: "Tamil Nadu",
    tg: "Telangana",
    tr: "Tripura",
    up: "Uttar Pradesh",
    ut: "Uttarakhand",
    wb: "West Bengal",
    dl: "Delhi",
    jk: "Jammu and Kashmir",
    an: "Andaman and Nicobar Islands",
    ch: "Chandigarh",
    dn: "Dadra and Nagar Haveli",
    dd: "Daman and Diu",
    ld: "Lakshadweep",
    py: "Puducherry",
  };

  const indiaMap = India as any;
  const locations = Array.isArray(indiaMap.locations)
    ? indiaMap.locations
    : [];

  const stateCount = (state: string) =>
    firs.filter((fir) => fir.state === state).length;

  const stateHigh = (state: string) =>
    firs.filter(
      (fir) => fir.state === state && fir.priority === "HIGH"
    ).length;

  const selectedFirs = selectedState
    ? firs.filter((fir) => fir.state === selectedState)
    : [];

  const womenCases = selectedFirs.filter((fir) =>
    [
      "Human Trafficking",
      "Cyber Exploitation",
      "Online Harassment",
      "Stalking",
    ].includes(fir.crime_type)
  ).length;

  const cyberCases = selectedFirs.filter((fir) =>
    fir.crime_type.toLowerCase().includes("cyber")
  ).length;

  const highCases = selectedFirs.filter(
    (fir) => fir.priority === "HIGH"
  ).length;

  const activeCases = selectedFirs.filter(
    (fir) => fir.status === "Active"
  ).length;

  const getStateName = (location: any) => {
    const id = String(location?.id ?? "").toLowerCase();
    return stateNames[id] ?? location?.name ?? "";
  };

  const getStateColor = (state: string) => {
    const total = stateCount(state);
    const high = stateHigh(state);

    if (high > 0) return "#7f1d1d";
    if (total > 0) return "#155e75";
    return "#10283d";
  };

  const districtCounts: Record<string, number> = {};
  selectedFirs.forEach((fir) => {
    districtCounts[fir.district] =
      (districtCounts[fir.district] || 0) + 1;
  });

  const topDistricts = Object.entries(districtCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const hotspotPositions: Record<
    string,
    { left: string; top: string }
  > = {
    Bengaluru: { left: "48%", top: "65%" },
    Mysuru: { left: "45%", top: "71%" },
    Mangaluru: { left: "39%", top: "61%" },
    Hubballi: { left: "42%", top: "51%" },
    Belagavi: { left: "39%", top: "45%" },
    Hyderabad: { left: "56%", top: "52%" },
    Mumbai: { left: "30%", top: "47%" },
    Delhi: { left: "52%", top: "20%" },
    Kolkata: { left: "76%", top: "38%" },
    Chennai: { left: "59%", top: "75%" },
  };

  const hotspots = Object.entries(districtCounts)
    .filter(([district]) => hotspotPositions[district])
    .map(([district, count]) => ({
      district,
      count,
      ...hotspotPositions[district],
    }));

  return (
    <section className="p-7">

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-white mb-6"
      >
        <ArrowLeft size={17} />
        Back to Dashboard
      </button>

      <div className="flex justify-between items-end mb-7">
        <div>
          <p className="text-cyan-400 text-xs font-semibold tracking-wider">
            GEOSPATIAL INTELLIGENCE
          </p>

          <h1 className="text-3xl font-bold mt-1">
            India Crime Intelligence Map
          </h1>

          <p className="text-slate-500 text-sm mt-2">
            Select a state to inspect crime, scam and women-safety intelligence.
          </p>
        </div>

        <div className="flex items-center gap-5 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-400" />
            Low
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            Medium
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            High
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <InfoCard
          title="Total FIRs"
          value={String(firs.length)}
          icon={<FileText size={20} />}
        />
        <InfoCard
          title="States With Cases"
          value={String(new Set(firs.map((fir) => fir.state)).size)}
          icon={<MapPin size={20} />}
        />
        <InfoCard
          title="High Priority"
          value={String(firs.filter((fir) => fir.priority === "HIGH").length)}
          icon={<AlertTriangle size={20} />}
        />
        <InfoCard
          title="Active Cases"
          value={String(firs.filter((fir) => fir.status === "Active").length)}
          icon={<Activity size={20} />}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2 bg-[#0b1929] border border-slate-800 rounded-2xl p-6">

          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="font-bold text-lg">
                India State Intelligence
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Click a state • red = high priority • blue = active intelligence
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              BACKEND CONNECTED
            </div>
          </div>

          <div className="relative rounded-2xl bg-[#06111d] border border-slate-800 min-h-[620px] overflow-hidden">

            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(34,211,238,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.12)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="relative z-10 flex items-center justify-center min-h-[620px] p-5">

              {locations.length > 0 ? (
                <svg
                  viewBox={indiaMap.viewBox || "0 0 507 570"}
                  className="india-svg-map"
                  role="img"
                  aria-label="Interactive map of India"
                >
                  {locations.map((location: any) => {
                    const stateName = getStateName(location);
                    const total = stateCount(stateName);
                    const isSelected = selectedState === stateName;

                    return (
                      <g key={location.id}>
                        <path
                          d={location.path}
                          className={`india-map-state ${
                            total > 0 ? "has-cases" : ""
                          } ${isSelected ? "selected" : ""}`}
                          style={{
                            fill: isSelected
                              ? "#06b6d4"
                              : getStateColor(stateName),
                          }}
                          onClick={() => setSelectedState(stateName)}
                          tabIndex={0}
                          role="button"
                          aria-label={`Open ${stateName} report`}
                          onKeyDown={(event) => {
                            if (
                              event.key === "Enter" ||
                              event.key === " "
                            ) {
                              setSelectedState(stateName);
                            }
                          }}
                        />
                        <title>
                          {stateName} • {total} FIR record
                          {total === 1 ? "" : "s"}
                        </title>
                      </g>
                    );
                  })}
                </svg>
              ) : (
                <div className="text-center">
                  <MapPin
                    size={45}
                    className="text-red-400 mx-auto mb-3"
                  />
                  <p className="text-red-300 font-semibold">
                    India map data could not be loaded.
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Check the @svg-maps/india package installation.
                  </p>
                </div>
              )}

              {hotspots.map((spot) => (
                <button
                  key={spot.district}
                  onClick={() => {
                    const state =
                      firs.find((fir) => fir.district === spot.district)?.state;
                    if (state) setSelectedState(state);
                  }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: spot.left, top: spot.top }}
                  title={`${spot.district}: ${spot.count} FIRs`}
                >
                  <span className="absolute inset-0 rounded-full bg-red-500/30 animate-ping" />
                  <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-red-500 border-2 border-white shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </span>
                  <span className="absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap px-2 py-1 rounded bg-[#07111f]/95 border border-red-500/30 text-[9px] text-red-200 opacity-0 group-hover:opacity-100 transition">
                    {spot.district} • {spot.count}
                  </span>
                </button>
              ))}

            </div>

            <div className="absolute bottom-5 left-5 z-20 bg-[#081423]/95 border border-slate-700 rounded-xl px-4 py-3">
              <p className="text-[10px] text-slate-500">
                DATA SOURCE
              </p>
              <p className="text-xs text-green-400 mt-1">
                ● Synthetic FIR database connected
              </p>
            </div>

            {hotspots.length > 0 && (
              <div className="absolute top-5 right-5 z-20 bg-[#081423]/95 border border-red-500/20 rounded-xl px-4 py-3">
                <p className="text-[10px] text-slate-500">
                  ACTIVE HOTSPOTS
                </p>
                <p className="text-xs text-red-300 mt-1">
                  ● {hotspots.length} location{hotspots.length === 1 ? "" : "s"} detected
                </p>
              </div>
            )}

          </div>
        </div>

        <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">

          {!selectedState ? (
            <div className="h-full min-h-[620px] flex items-center justify-center text-center">
              <div>
                <MapPin
                  size={48}
                  className="text-cyan-400 mx-auto mb-4"
                />
                <h2 className="font-bold text-lg">
                  Select a State
                </h2>
                <p className="text-xs text-slate-500 mt-2 max-w-[250px] mx-auto">
                  Click a state or a red hotspot to open its complete intelligence report.
                </p>

                <div className="mt-7 text-left bg-[#07111f] border border-slate-800 rounded-xl p-4">
                  <p className="text-xs font-semibold text-slate-300">
                    Demo hotspots
                  </p>
                  <div className="mt-3 space-y-2">
                    {firs.slice(0, 5).map((fir) => (
                      <button
                        key={fir.fir_id}
                        onClick={() => setSelectedState(fir.state)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-cyan-500/10 text-xs"
                      >
                        <span className="text-cyan-300">
                          {fir.district}
                        </span>
                        <span className="text-slate-600 mx-2">•</span>
                        <span className="text-slate-500">
                          {fir.crime_type}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>

              <div className="flex justify-between items-start">
                <div>
                  <p className="text-cyan-400 text-xs font-semibold">
                    STATE INTELLIGENCE
                  </p>
                  <h2 className="text-2xl font-bold mt-1">
                    {selectedState}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedState(null)}
                  className="text-slate-500 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">

                <ReportBox
                  title="FIR Cases"
                  value={selectedFirs.length}
                  icon={<FileText size={17} />}
                />

                <ReportBox
                  title="Women Safety"
                  value={womenCases}
                  icon={<ShieldAlert size={17} />}
                />

                <ReportBox
                  title="Cyber / Scam"
                  value={cyberCases}
                  icon={<Brain size={17} />}
                />

                <ReportBox
                  title="High Priority"
                  value={highCases}
                  icon={<AlertTriangle size={17} />}
                />

              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="bg-[#07111f] border border-slate-800 rounded-xl p-3">
                  <p className="text-[10px] text-slate-500">
                    ACTIVE
                  </p>
                  <p className="text-xl font-bold mt-1 text-green-400">
                    {activeCases}
                  </p>
                </div>

                <div className="bg-[#07111f] border border-slate-800 rounded-xl p-3">
                  <p className="text-[10px] text-slate-500">
                    DISTRICTS
                  </p>
                  <p className="text-xl font-bold mt-1 text-cyan-400">
                    {Object.keys(districtCounts).length}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">
                    Top Hotspot Districts
                  </h3>
                </div>

                {topDistricts.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    No district records available.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {topDistricts.map(([district, count]) => (
                      <div
                        key={district}
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#07111f] border border-slate-800"
                      >
                        <span className="text-xs">
                          {district}
                        </span>
                        <span className="text-xs text-red-400 font-bold">
                          {count} cases
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6">

                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">
                    Crime Reports
                  </h3>

                  <span className="text-[10px] text-slate-500">
                    {selectedFirs.length} RECORDS
                  </span>
                </div>

                {selectedFirs.length === 0 ? (
                  <div className="p-5 rounded-xl bg-[#07111f] border border-slate-800 text-center">
                    <Database
                      size={28}
                      className="text-slate-600 mx-auto mb-3"
                    />
                    <p className="text-sm text-slate-500">
                      No FIR records found for this state.
                    </p>
                    <p className="text-[10px] text-slate-600 mt-2">
                      More synthetic state data can be added later.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {selectedFirs.map((fir) => (
                      <div
                        key={fir.fir_id}
                        className="p-4 rounded-xl bg-[#07111f] border border-slate-800 hover:border-cyan-500/30 transition"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-cyan-300 text-xs font-bold">
                            {fir.fir_id}
                          </span>

                          <span
                            className={
                              fir.priority === "HIGH"
                                ? "text-red-400 text-[10px] font-bold"
                                : fir.priority === "MEDIUM"
                                ? "text-yellow-400 text-[10px] font-bold"
                                : "text-green-400 text-[10px] font-bold"
                            }
                          >
                            {fir.priority}
                          </span>
                        </div>

                        <p className="text-sm mt-2">
                          {fir.crime_type}
                        </p>

                        <p className="text-[10px] text-slate-500 mt-1">
                          {fir.district} • {fir.status}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

              </div>

            </div>
          )}

        </div>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs text-yellow-300">
        ⚠ All displayed crime intelligence is synthetic prototype data.
        The system is intended for investigation decision-support, not for establishing guilt.
      </div>

    </section>
  );
}

/* ================= STATE MARKER ================= */

/* ================= STATE MARKER ================= */


function StateMarker({
  name,
  top,
  left,
  onClick,
  active,
}: {
  name: string;
  top: string;
  left: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{ top, left }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 group ${
        active ? "z-30" : "z-10"
      }`}
    >

      <span
        className={`block w-4 h-4 rounded-full border-2 transition ${
          active
            ? "bg-cyan-300 border-white scale-150 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
            : "bg-cyan-500 border-cyan-200 hover:scale-150"
        }`}
      />

      <span
        className={`absolute left-1/2 -translate-x-1/2 top-6 whitespace-nowrap px-2 py-1 rounded-md text-[9px] border ${
          active
            ? "bg-cyan-500 text-black border-cyan-300"
            : "bg-[#081423] text-slate-300 border-slate-700 opacity-0 group-hover:opacity-100"
        }`}
      >
        {name}
      </span>

    </button>
  );
}


/* ================= REPORT BOX ================= */

function ReportBox({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: ReactNode;
}) {
  return (
    <div className="bg-[#07111f] border border-slate-800 rounded-xl p-4">

      <div className="flex justify-between">

        <div>

          <p className="text-[10px] text-slate-500">
            {title}
          </p>

          <p className="text-2xl font-bold mt-1">
            {value}
          </p>

        </div>

        <div className="text-cyan-400">
          {icon}
        </div>

      </div>

    </div>
  );
}


/* ================= ANALYTICS ================= */

function AnalyticsPage({
  firs,
  onBack,
}: {
  firs: FIR[];
  onBack: () => void;
}) {
  const [crimeFilter, setCrimeFilter] = useState("ALL");
  const [stateFilter, setStateFilter] = useState("ALL");

  const crimeTypes = [...new Set(firs.map((fir) => fir.crime_type))];
  const stateTypes = [...new Set(firs.map((fir) => fir.state))];

  const filtered = firs.filter((fir) => {
    return (
      (crimeFilter === "ALL" || fir.crime_type === crimeFilter) &&
      (stateFilter === "ALL" || fir.state === stateFilter)
    );
  });

  const crimeCounts: Record<string, number> = {};
  const stateCounts: Record<string, number> = {};

  filtered.forEach((fir) => {
    crimeCounts[fir.crime_type] =
      (crimeCounts[fir.crime_type] || 0) + 1;

    stateCounts[fir.state] =
      (stateCounts[fir.state] || 0) + 1;
  });

  const crimes = Object.entries(crimeCounts).sort(
    (a, b) => b[1] - a[1]
  );

  const statesList = Object.entries(stateCounts).sort(
    (a, b) => b[1] - a[1]
  );

  const high = filtered.filter(
    (fir) => fir.priority === "HIGH"
  ).length;

  const medium = filtered.filter(
    (fir) => fir.priority === "MEDIUM"
  ).length;

  const low = filtered.filter(
    (fir) => fir.priority === "LOW"
  ).length;

  const active = filtered.filter(
    (fir) => fir.status === "Active"
  ).length;

  const maxCrime =
    crimes.length > 0
      ? Math.max(...crimes.map((item) => item[1]))
      : 1;

  const maxState =
    statesList.length > 0
      ? Math.max(...statesList.map((item) => item[1]))
      : 1;

  return (
    <section className="p-7">

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-white mb-6"
      >
        <ArrowLeft size={17} />
        Back to Dashboard
      </button>

      <div className="flex justify-between items-end mb-7">

        <div>
          <p className="text-cyan-400 text-xs font-semibold tracking-wider">
            DATA INTELLIGENCE
          </p>

          <h1 className="text-3xl font-bold mt-1">
            Crime Analytics
          </h1>

          <p className="text-slate-500 text-sm mt-2">
            Visual analysis of live FIR database records.
          </p>
        </div>

        <div className="flex gap-3">

          <select
            value={crimeFilter}
            onChange={(e) => setCrimeFilter(e.target.value)}
            className="bg-[#0b1929] border border-slate-700 rounded-lg px-3 py-2 text-xs outline-none"
          >
            <option value="ALL">All Crime Types</option>

            {crimeTypes.map((crime) => (
              <option key={crime} value={crime}>
                {crime}
              </option>
            ))}
          </select>

          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="bg-[#0b1929] border border-slate-700 rounded-lg px-3 py-2 text-xs outline-none"
          >
            <option value="ALL">All States</option>

            {stateTypes.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

        </div>

      </div>

      <div className="grid grid-cols-4 gap-5 mb-6">

        <InfoCard
          title="Total Cases"
          value={String(filtered.length)}
          icon={<FileText size={20} />}
        />

        <InfoCard
          title="Active Cases"
          value={String(active)}
          icon={<Activity size={20} />}
        />

        <InfoCard
          title="High Priority"
          value={String(high)}
          icon={<AlertTriangle size={20} />}
        />

        <InfoCard
          title="Crime Categories"
          value={String(crimes.length)}
          icon={<BarChart3 size={20} />}
        />

      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">

          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-bold text-lg">
                Crime Distribution
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Number of FIRs by crime category
              </p>
            </div>

            <BarChart3 className="text-cyan-400" size={20} />
          </div>

          {crimes.length === 0 ? (
            <p className="text-sm text-slate-500">
              No data available.
            </p>
          ) : (
            <div className="space-y-5">

              {crimes.map(([crime, count]) => (

                <div key={crime}>

                  <div className="flex justify-between mb-2 text-sm">
                    <span>{crime}</span>
                    <span className="text-cyan-400 font-bold">
                      {count}
                    </span>
                  </div>

                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all"
                      style={{
                        width: `${(count / maxCrime) * 100}%`,
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

        <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">

          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-bold text-lg">
                Priority Analysis
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Case severity distribution
              </p>
            </div>

            <AlertTriangle className="text-red-400" size={20} />
          </div>

          <div className="flex items-end justify-center gap-10 h-64">

            <AnalyticsBar
              label="HIGH"
              value={high}
              max={Math.max(high, medium, low, 1)}
              className="bg-gradient-to-t from-red-700 to-red-400"
            />

            <AnalyticsBar
              label="MEDIUM"
              value={medium}
              max={Math.max(high, medium, low, 1)}
              className="bg-gradient-to-t from-yellow-700 to-yellow-300"
            />

            <AnalyticsBar
              label="LOW"
              value={low}
              max={Math.max(high, medium, low, 1)}
              className="bg-gradient-to-t from-green-700 to-green-400"
            />

          </div>

        </div>

        <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">

          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-bold text-lg">
                State-wise Cases
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Geographic distribution of FIRs
              </p>
            </div>

            <MapPin className="text-purple-400" size={20} />
          </div>

          <div className="space-y-4">

            {statesList.slice(0, 7).map(([state, count], index) => (

              <div key={state}>

                <div className="flex justify-between text-xs mb-2">
                  <span>
                    {index + 1}. {state}
                  </span>

                  <span className="text-purple-300 font-bold">
                    {count}
                  </span>
                </div>

                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
                    style={{
                      width: `${(count / maxState) * 100}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">
            <Brain className="text-purple-400" />

            <div>
              <h2 className="font-bold text-lg">
                Intelligence Summary
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Automated observations from current records
              </p>
            </div>
          </div>

          <Insight
            text={`${high} high-priority cases require immediate officer review.`}
          />

          <Insight
            text={`${active} cases are currently active in the investigation system.`}
          />

          <Insight
            text={`${crimes.length} different crime categories are represented in the filtered data.`}
          />

          <Insight
            text={`Top state currently has ${statesList[0]?.[1] || 0} FIR records.`}
          />

        </div>

      </div>

      <div className="mt-6 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs text-yellow-300">
        ⚠ Analytics are based on synthetic prototype FIR data and are intended for investigation decision-support only.
      </div>

    </section>
  );
}

function AnalyticsBar({
  label,
  value,
  max,
  className,
}: {
  label: string;
  value: number;
  max: number;
  className: string;
}) {
  const height = value === 0 ? 8 : Math.max((value / max) * 180, 18);

  return (
    <div className="h-full flex flex-col items-center justify-end">

      <span className="text-sm font-bold mb-2">
        {value}
      </span>

      <div
        className={`w-16 rounded-t-xl ${className}`}
        style={{ height: `${height}px` }}
      />

      <span className="text-[10px] text-slate-500 mt-2">
        {label}
      </span>

    </div>
  );
}

/* ================= FIR PAGE ================= */

function FIRPage({
  firs,
  onBack,
}: {
  firs: FIR[];
  onBack: () => void;
}) {
  const [search, setSearch] = useState("");
  const [crimeFilter, setCrimeFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedFir, setSelectedFir] = useState<FIR | null>(null);

  const crimeTypes = [...new Set(firs.map((fir) => fir.crime_type))];
  const statuses = [...new Set(firs.map((fir) => fir.status))];

  const filteredFirs = firs.filter((fir) => {
    const query = search.toLowerCase();

    const matchesSearch =
      fir.fir_id.toLowerCase().includes(query) ||
      fir.crime_type.toLowerCase().includes(query) ||
      fir.district.toLowerCase().includes(query) ||
      fir.state.toLowerCase().includes(query);

    const matchesCrime =
      crimeFilter === "ALL" ||
      fir.crime_type === crimeFilter;

    const matchesPriority =
      priorityFilter === "ALL" ||
      fir.priority === priorityFilter;

    const matchesStatus =
      statusFilter === "ALL" ||
      fir.status === statusFilter;

    return (
      matchesSearch &&
      matchesCrime &&
      matchesPriority &&
      matchesStatus
    );
  });

  const active = firs.filter((f) => f.status === "Active").length;
  const high = firs.filter((f) => f.priority === "HIGH").length;
  const closed = firs.filter((f) => f.status === "Closed").length;

  return (
    <section className="p-7">

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-white mb-6"
      >
        <ArrowLeft size={17} />
        Back to Dashboard
      </button>

      <div className="flex justify-between items-end mb-7">

        <div>
          <p className="text-cyan-400 text-xs font-semibold tracking-wider">
            CASE MANAGEMENT
          </p>

          <h1 className="text-3xl font-bold mt-1">
            FIR Management
          </h1>

          <p className="text-slate-500 text-sm mt-2">
            Search, filter and inspect FIR records from the backend database.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-green-400">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          LIVE DATABASE
        </div>

      </div>

      <div className="grid grid-cols-4 gap-5 mb-6">

        <InfoCard
          title="Total FIRs"
          value={String(firs.length)}
          icon={<FileText size={20} />}
        />

        <InfoCard
          title="Active Cases"
          value={String(active)}
          icon={<Activity size={20} />}
        />

        <InfoCard
          title="High Priority"
          value={String(high)}
          icon={<AlertTriangle size={20} />}
        />

        <InfoCard
          title="Closed Cases"
          value={String(closed)}
          icon={<ShieldAlert size={20} />}
        />

      </div>

      <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-5 mb-5">

        <div className="grid grid-cols-4 gap-3">

          <div className="flex items-center bg-[#07111f] border border-slate-700 rounded-lg px-3">
            <Search size={17} className="text-slate-500" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search FIR, crime, district..."
              className="bg-transparent outline-none px-2 py-3 text-sm w-full"
            />
          </div>

          <select
            value={crimeFilter}
            onChange={(e) => setCrimeFilter(e.target.value)}
            className="bg-[#07111f] border border-slate-700 rounded-lg px-3 text-sm outline-none"
          >
            <option value="ALL">All Crime Types</option>

            {crimeTypes.map((crime) => (
              <option key={crime} value={crime}>
                {crime}
              </option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-[#07111f] border border-slate-700 rounded-lg px-3 text-sm outline-none"
          >
            <option value="ALL">All Priorities</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#07111f] border border-slate-700 rounded-lg px-3 text-sm outline-none"
          >
            <option value="ALL">All Status</option>

            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

        </div>

        <div className="flex justify-between mt-4">

          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="text-cyan-400 font-semibold">
              {filteredFirs.length}
            </span>{" "}
            of {firs.length} records
          </p>

          <button
            onClick={() => {
              setSearch("");
              setCrimeFilter("ALL");
              setPriorityFilter("ALL");
              setStatusFilter("ALL");
            }}
            className="text-xs text-slate-500 hover:text-cyan-300"
          >
            Clear Filters
          </button>

        </div>

      </div>

      <div className="bg-[#0b1929] border border-slate-800 rounded-2xl overflow-hidden">

        <div className="p-5 border-b border-slate-800 flex justify-between items-center">

          <div>
            <h2 className="font-bold">
              FIR Registry
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Select any record to view full details.
            </p>
          </div>

          <FileText
            size={20}
            className="text-cyan-400"
          />

        </div>

        {filteredFirs.length === 0 ? (
          <div className="p-16 text-center">

            <Search
              size={40}
              className="text-slate-700 mx-auto mb-4"
            />

            <p className="font-semibold">
              No FIR records found
            </p>

            <p className="text-xs text-slate-500 mt-2">
              Try changing the search or filters.
            </p>

          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-[#07111f] text-slate-400">

                <tr>
                  <th className="text-left p-4">FIR ID</th>
                  <th className="text-left p-4">Crime Type</th>
                  <th className="text-left p-4">District</th>
                  <th className="text-left p-4">State</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Priority</th>
                  <th className="text-center p-4">View</th>
                </tr>

              </thead>

              <tbody>

                {filteredFirs.map((fir) => (

                  <tr
                    key={fir.fir_id}
                    className="border-t border-slate-800 hover:bg-cyan-500/[0.03] transition"
                  >

                    <td className="p-4 text-cyan-300 font-semibold">
                      {fir.fir_id}
                    </td>

                    <td className="p-4">
                      {fir.crime_type}
                    </td>

                    <td className="p-4 text-slate-300">
                      {fir.district}
                    </td>

                    <td className="p-4 text-slate-400">
                      {fir.state}
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] bg-green-500/10 text-green-400 border border-green-500/20">
                        {fir.status}
                      </span>
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] border ${
                          fir.priority === "HIGH"
                            ? "text-red-300 bg-red-500/10 border-red-500/20"
                            : fir.priority === "MEDIUM"
                            ? "text-yellow-300 bg-yellow-500/10 border-yellow-500/20"
                            : "text-green-300 bg-green-500/10 border-green-500/20"
                        }`}
                      >
                        {fir.priority}
                      </span>

                    </td>

                    <td className="p-4 text-center">

                      <button
                        onClick={() => setSelectedFir(fir)}
                        className="px-3 py-1.5 rounded-lg text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20"
                      >
                        View
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {selectedFir && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6">

          <div className="w-full max-w-2xl bg-[#0b1929] border border-slate-700 rounded-2xl shadow-2xl">

            <div className="p-6 border-b border-slate-800 flex justify-between items-start">

              <div>
                <p className="text-cyan-400 text-xs font-semibold">
                  FIR RECORD
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  {selectedFir.fir_id}
                </h2>
              </div>

              <button
                onClick={() => setSelectedFir(null)}
                className="text-slate-500 hover:text-white"
              >
                <X size={20} />
              </button>

            </div>

            <div className="p-6 grid grid-cols-2 gap-4">

              <DetailItem
                label="Crime Type"
                value={selectedFir.crime_type}
              />

              <DetailItem
                label="District"
                value={selectedFir.district}
              />

              <DetailItem
                label="State"
                value={selectedFir.state}
              />

              <DetailItem
                label="Status"
                value={selectedFir.status}
              />

              <DetailItem
                label="Priority"
                value={selectedFir.priority}
              />

              <DetailItem
                label="Record ID"
                value={selectedFir.fir_id}
              />

            </div>

            <div className="p-6 pt-0">

              <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">

                <p className="text-xs text-yellow-300">
                  ⚠ Prototype intelligence data
                </p>

                <p className="text-[11px] text-slate-500 mt-1">
                  This record is intended for investigation decision-support
                  and does not establish guilt.
                </p>

              </div>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}


function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#07111f] border border-slate-800 rounded-xl p-4">

      <p className="text-[10px] text-slate-500 uppercase">
        {label}
      </p>

      <p className="text-sm font-semibold mt-1">
        {value}
      </p>

    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({
  title,
  value,
  icon,
  iconClass,
}: {
  title: string;
  value: number;
  icon: ReactNode;
  iconClass: string;
}) {
  return (
    <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/30 transition">

      <div className="flex justify-between">

        <div>

          <p className="text-xs text-slate-500">
            {title}
          </p>

          <p className="text-3xl font-bold mt-2">
            {value.toLocaleString()}
          </p>

        </div>

        <div className={`p-3 rounded-xl ${iconClass}`}>
          {icon}
        </div>

      </div>

    </div>
  );
}


function SafetyCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-[#07111f] border border-slate-800 rounded-xl p-4 hover:border-pink-500/30 transition">

      <p className="text-xs text-slate-500">
        {title}
      </p>

      <p className="text-2xl font-bold mt-2">
        {value}
      </p>

      <p className="text-[10px] text-slate-600 mt-1">
        Active investigations
      </p>

    </div>
  );
}


function Insight({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-[#07111f] border border-slate-800 rounded-xl p-4 mb-3">

      <div className="w-2 h-2 rounded-full bg-cyan-400" />

      <p className="text-sm text-slate-300">
        {text}
      </p>

    </div>
  );
}


function PriorityBar({
  label,
  value,
  height,
  className,
}: {
  label: string;
  value: number;
  height: number;
  className: string;
}) {
  return (
    <div className="flex flex-col items-center justify-end h-full">

      <span className="text-sm font-bold mb-2">
        {value}
      </span>

      <div
        className={`w-14 rounded-t-xl ${className}`}
        style={{ height: `${height}px` }}
      />

      <span className="text-xs text-slate-500 mt-2">
        {label}
      </span>

    </div>
  );
}


function Chart() {
  const values = [35, 48, 42, 65, 55, 78, 68];

  return (
    <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">

      <div className="flex justify-between mb-6">

        <div>
          <h2 className="font-bold text-lg">
            Crime Activity Trend
          </h2>

          <p className="text-xs text-slate-500">
            Recent crime activity
          </p>
        </div>

        <TrendingUp className="text-cyan-400" />

      </div>

      <div className="h-48 flex items-end gap-4">

        {values.map((height, index) => (

          <div
            key={index}
            className="flex-1 bg-gradient-to-t from-cyan-600/20 via-blue-500/60 to-cyan-300 rounded-t-lg"
            style={{ height: `${height}%` }}
          />

        ))}

      </div>

      <div className="flex justify-between text-[10px] text-slate-600 mt-3">

        <span>JAN</span>
        <span>FEB</span>
        <span>MAR</span>
        <span>APR</span>
        <span>MAY</span>
        <span>JUN</span>
        <span>JUL</span>

      </div>

    </div>
  );
}


function ComingSoon({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) {
  if (title === "Victim Analytics") {
    return (
      <ModulePage
        title={title}
        subtitle="Victim and women-safety intelligence."
        onBack={onBack}
      >
        <div className="grid grid-cols-4 gap-5">
          <InfoCard title="Total Victims" value="128" icon={<Users />} />
          <InfoCard title="Women Victims" value="64" icon={<ShieldAlert />} />
          <InfoCard title="High Risk" value="22" icon={<AlertTriangle />} />
          <InfoCard title="Support Required" value="31" icon={<Activity />} />
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <SimpleBars
            title="Victim Case Categories"
            items={[
              ["Cyber Crime", 82],
              ["Harassment", 67],
              ["Fraud", 54],
              ["Violence", 41],
            ]}
          />

          <SimpleTable
            title="Recent Victim Intelligence"
            rows={[
              ["V-1024", "Cyber Exploitation", "High"],
              ["V-1021", "Online Harassment", "Medium"],
              ["V-1018", "Human Trafficking", "High"],
              ["V-1012", "Fraud", "Low"],
            ]}
          />
        </div>

        <div className="grid grid-cols-3 gap-5 mt-6">
          <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">
            <p className="text-xs text-slate-500">Women Safety Share</p>
            <p className="text-3xl font-bold mt-2">50%</p>
            <div className="h-3 bg-slate-800 rounded-full mt-4 overflow-hidden">
              <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
            </div>
          </div>

          <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">
            <p className="text-xs text-slate-500">High-Risk Share</p>
            <p className="text-3xl font-bold mt-2">17%</p>
            <div className="h-3 bg-slate-800 rounded-full mt-4 overflow-hidden">
              <div className="h-full w-[17%] rounded-full bg-gradient-to-r from-red-500 to-orange-400" />
            </div>
          </div>

          <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">
            <p className="text-xs text-slate-500">Support Required</p>
            <p className="text-3xl font-bold mt-2">31</p>
            <p className="text-[11px] text-slate-600 mt-2">
              Cases flagged for follow-up
            </p>
          </div>
        </div>
      </ModulePage>
    );
  }

  if (title === "Accused Analytics") {
    return (
      <ModulePage
        title={title}
        subtitle="Accused profiling and repeat-offender intelligence."
        onBack={onBack}
      >
        <div className="grid grid-cols-4 gap-5">
          <InfoCard title="Known Accused" value="94" icon={<Users />} />
          <InfoCard title="Repeat Offenders" value="27" icon={<Network />} />
          <InfoCard title="High Risk" value="18" icon={<AlertTriangle />} />
          <InfoCard title="Under Watch" value="41" icon={<ShieldAlert />} />
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <SimpleBars
            title="Accused Risk Profile"
            items={[
              ["High Risk", 78],
              ["Medium Risk", 61],
              ["Low Risk", 39],
            ]}
          />

          <SimpleTable
            title="Priority Profiles"
            rows={[
              ["A-204", "Repeat Offender", "HIGH"],
              ["A-198", "Cyber Fraud", "HIGH"],
              ["A-177", "Fraud Network", "MEDIUM"],
              ["A-165", "Stalking", "MEDIUM"],
            ]}
          />
        </div>

        <div className="grid grid-cols-3 gap-5 mt-6">
          <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">
            <p className="text-xs text-slate-500">Repeat Offender Rate</p>
            <p className="text-3xl font-bold mt-2">29%</p>
            <div className="h-3 bg-slate-800 rounded-full mt-4 overflow-hidden">
              <div className="h-full w-[29%] rounded-full bg-gradient-to-r from-red-500 to-purple-500" />
            </div>
          </div>

          <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">
            <p className="text-xs text-slate-500">High Risk Profiles</p>
            <p className="text-3xl font-bold mt-2">18</p>
            <p className="text-[11px] text-slate-600 mt-2">
              Require closer officer review
            </p>
          </div>

          <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">
            <p className="text-xs text-slate-500">Under Watch</p>
            <p className="text-3xl font-bold mt-2">41</p>
            <p className="text-[11px] text-slate-600 mt-2">
              Active monitoring profiles
            </p>
          </div>
        </div>
      </ModulePage>
    );
  }

  if (title === "Complainant Analytics") {
    return (
      <ModulePage title={title} subtitle="Complaint intake, verification and escalation." onBack={onBack}>
        <div className="grid grid-cols-4 gap-5">
          <InfoCard title="Total Complaints" value="156" icon={<MessageSquare />} />
          <InfoCard title="Verified" value="121" icon={<ShieldAlert />} />
          <InfoCard title="Pending" value="23" icon={<Activity />} />
          <InfoCard title="Escalated" value="12" icon={<AlertTriangle />} />
        </div>
        <div className="grid grid-cols-2 gap-6 mt-6">
          <SimpleBars title="Complaint Channels" items={[
            ["Online Portal", 82], ["Police Station", 63], ["Helpline", 48], ["Mobile App", 37]
          ]} />
          <SimpleTable title="Complaint Status" rows={[
            ["C-501", "Verified", "Resolved"],
            ["C-498", "Pending", "Review"],
            ["C-491", "Escalated", "High"],
            ["C-483", "Verified", "Active"],
          ]} />
        </div>
      </ModulePage>
    );
  }

  if (title === "Officer Performance") {
    return (
      <ModulePage title={title} subtitle="Investigation workload and operational performance." onBack={onBack}>
        <div className="grid grid-cols-4 gap-5">
          <InfoCard title="Active Officers" value="42" icon={<Users />} />
          <InfoCard title="Cases Assigned" value="186" icon={<FileText />} />
          <InfoCard title="Cases Closed" value="119" icon={<Activity />} />
          <InfoCard title="Avg. Resolution" value="8.4d" icon={<TrendingUp />} />
        </div>
        <div className="grid grid-cols-2 gap-6 mt-6">
          <SimpleBars title="Performance Score" items={[
            ["Investigation", 88], ["Response", 81], ["Resolution", 74], ["Documentation", 92]
          ]} />
          <SimpleTable title="Officer Summary" rows={[
            ["OFF-021", "34 cases", "92%"],
            ["OFF-014", "29 cases", "89%"],
            ["OFF-033", "27 cases", "86%"],
            ["OFF-009", "24 cases", "82%"],
          ]} />
        </div>
      </ModulePage>
    );
  }

  if (title === "Criminal Network") {
    return (
      <ModulePage title={title} subtitle="Relationship intelligence across people, cases and locations." onBack={onBack}>
        <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">
          <div className="h-[520px] relative rounded-2xl bg-[#06111d] border border-slate-800 overflow-hidden">
            <NetworkNode label="ACCUSED A" left="50%" top="42%" main />
            <NetworkNode label="FIR-001" left="24%" top="25%" />
            <NetworkNode label="FIR-004" left="76%" top="25%" />
            <NetworkNode label="PHONE" left="20%" top="72%" />
            <NetworkNode label="LOCATION" left="80%" top="72%" />
            <NetworkNode label="ACCUSED B" left="50%" top="78%" />
            <div className="absolute left-[30%] top-[34%] w-[40%] border-t border-cyan-500/30 rotate-[20deg]" />
            <div className="absolute left-[30%] top-[34%] w-[40%] border-t border-cyan-500/30 rotate-[-20deg]" />
            <div className="absolute left-[36%] top-[51%] w-[28%] border-t border-cyan-500/30" />
            <div className="absolute left-[50%] top-[50%] h-[28%] border-l border-cyan-500/30" />
          </div>
        </div>
      </ModulePage>
    );
  }

  if (title === "AI Predictions") {
    return (
      <ModulePage title={title} subtitle="Prototype risk scoring and emerging-pattern intelligence." onBack={onBack}>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">
            <h2 className="font-bold text-lg">Risk Predictions</h2>
            <p className="text-xs text-slate-500 mt-1 mb-6">Synthetic prototype scores</p>
            {[
              ["Cyber fraud cluster", 87, "HIGH"],
              ["Women safety hotspot", 91, "HIGH"],
              ["Repeat offender risk", 64, "MEDIUM"],
              ["Cross-district activity", 58, "MEDIUM"],
            ].map(([name, score, level]) => (
              <div key={name as string} className="mb-5">
                <div className="flex justify-between text-sm mb-2">
                  <span>{name as string}</span>
                  <span className={level === "HIGH" ? "text-red-400" : "text-yellow-400"}>
                    {level as string} • {score as number}%
                  </span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full">
                  <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
                    style={{ width: `${score}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">
            <h2 className="font-bold text-lg">Why the model flagged these areas</h2>
            <div className="mt-5 space-y-3">
              <Insight text="Repeated locations detected across cases" />
              <Insight text="Similar crime categories appearing together" />
              <Insight text="Common contact identifiers found" />
              <Insight text="High-priority pattern requires officer review" />
            </div>
          </div>
        </div>
      </ModulePage>
    );
  }

  if (title === "AI Assistant") {
    return <AssistantPage onBack={onBack} />;
  }

  if (title === "Reports Center") {
    return (
      <ModulePage title={title} subtitle="Generate investigation and intelligence reports." onBack={onBack}>
        <div className="grid grid-cols-3 gap-5">
          {[
            ["Crime Intelligence Report", <BarChart3 />],
            ["Women Safety Report", <ShieldAlert />],
            ["FIR Summary Report", <FileText />],
            ["Officer Performance", <Activity />],
            ["State Crime Report", <Map />],
            ["AI Prediction Report", <Brain />],
          ].map(([name, icon]) => (
            <div key={name as string} className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">
              <div className="text-cyan-400 mb-4">{icon as ReactNode}</div>
              <h2 className="font-bold">{name as string}</h2>
              <p className="text-xs text-slate-500 mt-2">Prototype export-ready report</p>
              <button
                onClick={() => alert(`${name} generated successfully.`)}
                className="mt-5 px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs"
              >
                Generate Report
              </button>
            </div>
          ))}
        </div>
      </ModulePage>
    );
  }

  if (title === "Settings & Audit") {
    return <SettingsPage onBack={onBack} />;
  }

  return (
    <ModulePage title={title} subtitle="Intelligence module." onBack={onBack}>
      <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-8">
        <div className="flex items-center gap-3">
          <Brain className="text-cyan-400" />
          <div>
            <h2 className="font-bold text-lg">Module Ready</h2>
            <p className="text-sm text-slate-500 mt-1">
              This module is connected to the dashboard navigation.
            </p>
          </div>
        </div>
      </div>
    </ModulePage>
  );
}

function ModulePage({
  title,
  subtitle,
  onBack,
  children,
}: {
  title: string;
  subtitle: string;
  onBack: () => void;
  children: ReactNode;
}) {
  return (
    <section className="p-7">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 hover:text-white mb-6">
        <ArrowLeft size={17} />
        Back to Dashboard
      </button>
      <p className="text-cyan-400 text-xs font-semibold tracking-wider">INTELLIGENCE MODULE</p>
      <h1 className="text-3xl font-bold mt-1">{title}</h1>
      <p className="text-slate-500 text-sm mt-2 mb-7">{subtitle}</p>
      {children}
    </section>
  );
}

function InfoCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-5">
      <div className="flex justify-between">
        <div>
          <p className="text-xs text-slate-500">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">{icon}</div>
      </div>
    </div>
  );
}

function SimpleBars({
  title,
  items,
}: {
  title: string;
  items: [string, number][];
}) {
  return (
    <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="text-xs text-slate-500 mt-1 mb-6">Current intelligence indicators</p>
      <div className="space-y-5">
        {items.map(([label, value]) => (
          <div key={label}>
            <div className="flex justify-between text-sm mb-2">
              <span>{label}</span>
              <span className="text-cyan-400">{value}%</span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimpleTable({
  title,
  rows,
}: {
  title: string;
  rows: [string, string, string][];
}) {
  return (
    <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6">
      <h2 className="font-bold text-lg mb-4">{title}</h2>
      <div className="overflow-hidden rounded-xl border border-slate-800">
        {rows.map(([a, b, c]) => (
          <div key={a} className="grid grid-cols-3 gap-3 px-4 py-4 bg-[#07111f] border-b border-slate-800 last:border-0 text-sm">
            <span className="text-cyan-300 font-semibold">{a}</span>
            <span className="text-slate-400">{b}</span>
            <span className="text-slate-300">{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NetworkNode({
  label,
  left,
  top,
  main = false,
}: {
  label: string;
  left: string;
  top: string;
  main?: boolean;
}) {
  return (
    <div
      style={{ left, top }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 px-4 py-3 rounded-xl border ${
        main
          ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
          : "bg-[#0b1929] border-slate-700 text-slate-300"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400" />
        <span className="text-xs font-semibold">{label}</span>
      </div>
    </div>
  );
}

function AssistantPage({ onBack }: { onBack: () => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hello Investigator. Ask about FIRs, crime patterns or case intelligence." },
  ]);

  const send = () => {
    if (!input.trim()) return;
    const question = input.trim();
    setMessages((old) => [
      ...old,
      { from: "user", text: question },
      { from: "ai", text: "Prototype response: I can analyze connected FIR records and surface relevant patterns for officer review." },
    ]);
    setInput("");
  };

  return (
    <ModulePage title="AI Assistant" subtitle="Decision-support chat interface." onBack={onBack}>
      <div className="bg-[#0b1929] border border-slate-800 rounded-2xl overflow-hidden max-w-5xl">
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <Brain className="text-cyan-400" />
          <div>
            <h2 className="font-bold">Investigation Assistant</h2>
            <p className="text-xs text-slate-500">Prototype intelligence assistant</p>
          </div>
        </div>
        <div className="h-[420px] overflow-y-auto p-5 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-4 py-3 rounded-xl text-sm ${
                m.from === "user"
                  ? "bg-cyan-500/15 border border-cyan-500/20"
                  : "bg-[#07111f] border border-slate-800 text-slate-300"
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-slate-800 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            className="flex-1 bg-[#07111f] border border-slate-700 rounded-xl px-4 py-3 outline-none text-sm"
            placeholder="Ask about crime intelligence..."
          />
          <button onClick={send} className="px-5 rounded-xl bg-cyan-500 text-black font-semibold text-sm">
            Send
          </button>
        </div>
      </div>
    </ModulePage>
  );
}

function SettingsPage({ onBack }: { onBack: () => void }) {
  const [audit, setAudit] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const [ai, setAi] = useState(true);

  return (
    <ModulePage title="Settings & Audit" subtitle="Platform controls and audit preferences." onBack={onBack}>
      <div className="max-w-4xl space-y-4">
        <ToggleRow title="Audit Logging" description="Record investigator actions for accountability." value={audit} setValue={setAudit} />
        <ToggleRow title="Priority Alerts" description="Show high-priority case notifications." value={alerts} setValue={setAlerts} />
        <ToggleRow title="AI Intelligence" description="Enable prototype AI decision-support modules." value={ai} setValue={setAi} />
        <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-6 mt-6">
          <h2 className="font-bold">System Information</h2>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <div className="bg-[#07111f] rounded-xl p-4">
              <p className="text-xs text-slate-500">Environment</p>
              <p className="mt-1">Development</p>
            </div>
            <div className="bg-[#07111f] rounded-xl p-4">
              <p className="text-xs text-slate-500">Backend</p>
              <p className="mt-1 text-green-400">Connected</p>
            </div>
          </div>
        </div>
      </div>
    </ModulePage>
  );
}

function ToggleRow({
  title,
  description,
  value,
  setValue,
}: {
  title: string;
  description: string;
  value: boolean;
  setValue: (value: boolean) => void;
}) {
  return (
    <div className="bg-[#0b1929] border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="text-xs text-slate-500 mt-1">{description}</p>
      </div>
      <button onClick={() => setValue(!value)} className={`w-12 h-6 rounded-full p-1 ${value ? "bg-cyan-500" : "bg-slate-700"}`}>
        <span className={`block w-4 h-4 rounded-full bg-white transition ${value ? "translate-x-6" : ""}`} />
      </button>
    </div>
  );
}
export default App;