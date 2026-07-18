import React, { useState, useEffect } from 'react';
import { initialVolunteers, HelperVolunteer } from '../utils/MockData';
import { AlertCircle, Navigation, Phone, Shield, Star, RefreshCw, Check } from 'lucide-react';

export const EmergencyHelpers: React.FC = () => {
  const [emergencyType, setEmergencyType] = useState<string | null>(null);
  const [sosActive, setSosActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [volunteers, setVolunteers] = useState<HelperVolunteer[]>([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState<HelperVolunteer | null>(null);
  const [dispatchProgress, setDispatchProgress] = useState(0);
  const [etaRemaining, setEtaRemaining] = useState(0);

  const emergencyCategories = [
    { name: 'Flat Tyre', icon: '🚗', desc: 'Need help changing tyre or patch kit' },
    { name: 'Battery Jump', icon: '⚡', desc: 'Dead battery. Need jumper cables/booster' },
    { name: 'Locked Out', icon: '🔑', desc: 'Home lock or vehicle lockout emergency' },
    { name: 'Plumbing Leak', icon: '🚰', desc: 'Burst pipe or major active plumbing failure' },
    { name: 'Electrical Fail', icon: '🔌', desc: 'Short circuit, sparking or partial blackouts' },
    { name: 'Medical Transit', icon: '🚑', desc: 'Non-emergency urgent transport to clinic' },
  ];

  // Scan simulation
  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        setIsScanning(false);
        setVolunteers(initialVolunteers);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isScanning]);

  // Dispatch simulation
  useEffect(() => {
    let interval: any;

    if (selectedVolunteer) {
      setEtaRemaining(selectedVolunteer.etaMinutes);
      setDispatchProgress(0);
      
      interval = setInterval(() => {
        setDispatchProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });

        setEtaRemaining(prev => Math.max(1, Math.round(prev - 0.5)));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [selectedVolunteer]);

  const triggerSos = (type: string) => {
    setEmergencyType(type);
    setSosActive(true);
    setIsScanning(true);
    setVolunteers([]);
    setSelectedVolunteer(null);
  };

  const handleHireVolunteer = (vol: HelperVolunteer) => {
    setSelectedVolunteer(vol);
  };

  const resetEmergency = () => {
    setSosActive(false);
    setEmergencyType(null);
    setSelectedVolunteer(null);
    setVolunteers([]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Status Banner */}
      <div className={`p-6 rounded-2xl border flex items-center justify-between relative overflow-hidden transition-all duration-300 ${
        sosActive 
          ? 'bg-red-500/10 border-red-500/30 text-red-300' 
          : 'glass-panel border-slate-800 text-slate-300'
      }`}>
        <div className="space-y-2 z-10">
          <h2 className="text-xl font-bold flex items-center gap-2.5">
            <AlertCircle size={22} className={sosActive ? 'text-red-400' : 'text-indigo-400'} />
            {sosActive ? `SOS Active: ${emergencyType}` : 'Emergency Volunteer Network'}
          </h2>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            {sosActive 
              ? 'Our matching engine is pinging certified neighborhood volunteers with high reputation indexes.'
              : 'Facing an immediate crisis? Trigger an SOS message. Community helpers with tools are active in your area.'
            }
          </p>
        </div>
        {sosActive && (
          <div className="absolute right-0 top-0 bottom-0 w-36 bg-gradient-to-l from-red-500/10 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Main Container */}
      {!sosActive ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyCategories.map(cat => (
            <button
              key={cat.name}
              onClick={() => triggerSos(cat.name)}
              className="glass-panel p-5 rounded-2xl border border-slate-850 hover:border-red-500/40 text-left transition-all hover:bg-slate-900 group relative overflow-hidden flex flex-col justify-between h-40"
            >
              <div className="space-y-2">
                <span className="text-3xl block">{cat.icon}</span>
                <h3 className="font-bold text-slate-200 text-sm group-hover:text-red-400 transition">{cat.name}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">{cat.desc}</p>
              </div>

              <span className="text-[10px] text-red-400/80 font-bold uppercase tracking-wider mt-4 inline-flex items-center gap-1 group-hover:underline">
                Trigger Alert &rarr;
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Column: Match Status */}
          <div className="flex-1 glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            
            {/* Scan animation */}
            {isScanning && (
              <div className="flex flex-col items-center justify-center py-16 space-y-6">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  {/* Radar ripple rings */}
                  <span className="absolute inset-0 rounded-full border border-red-500/20 animate-ping" />
                  <span className="absolute inset-4 rounded-full border border-red-500/30 animate-pulse" />
                  <span className="absolute inset-8 rounded-full border border-red-500/50 animate-ping-slow" />
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-900/30">
                    <RefreshCw className="text-white animate-spin" size={18} />
                  </div>
                </div>
                <div className="text-center space-y-1.5">
                  <p className="font-bold text-slate-200 text-sm">Pinging Neighborhood Volunteers...</p>
                  <p className="text-xs text-slate-400">Filtering coordinates within a 5km radius</p>
                </div>
              </div>
            )}

            {/* List Volunteers */}
            {!isScanning && volunteers.length > 0 && !selectedVolunteer && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-200 text-sm">Nearby Community Volunteers Found</h3>
                <div className="space-y-3">
                  {volunteers.map(vol => (
                    <div key={vol.id} className="bg-slate-950/60 border border-slate-850 rounded-xl p-4 flex justify-between items-center hover:border-slate-700 transition">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-200 text-sm">{vol.name}</h4>
                          <span className="text-[10px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20">
                            ★ {vol.rating}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-semibold">{vol.skill}</p>
                        <p className="text-[10px] text-slate-500">
                          {vol.vehicle} | Distance: <strong className="text-slate-400">{vol.distanceKm} km</strong>
                        </p>
                      </div>

                      <div className="text-right flex flex-col items-end gap-2">
                        <span className="text-xs text-emerald-400 font-black">ETA: {vol.etaMinutes} mins</span>
                        <button
                          onClick={() => handleHireVolunteer(vol)}
                          className="bg-red-600 hover:bg-red-500 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition"
                        >
                          Dispatch
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dispatch Active Screen */}
            {selectedVolunteer && (
              <div className="space-y-6">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex gap-4">
                  <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center text-2xl">
                    🚒
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold text-slate-200 text-sm">{selectedVolunteer.name} is on the way!</h4>
                    <p className="text-xs text-slate-400">{selectedVolunteer.vehicle}</p>
                    <p className="text-[10px] text-slate-500">Contact: {selectedVolunteer.phone}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Helper Transit Status</span>
                    <span className="text-emerald-400 font-bold">ETA: {etaRemaining} mins</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      style={{ width: `${dispatchProgress}%` }}
                      className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                    />
                  </div>
                </div>

                {dispatchProgress === 100 ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-xs flex gap-2">
                    <Check className="shrink-0 mt-0.5" size={16} />
                    <div>
                      <p className="font-bold">Helper Arrived!</p>
                      <p className="text-[10px] text-emerald-400/80 mt-0.5">Please confirm completion and authorize tipping. Escrow is locked for rating feedback.</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <a
                      href={`tel:${selectedVolunteer.phone}`}
                      className="flex-1 bg-slate-850 hover:bg-slate-800 text-slate-350 border border-slate-700 py-3 rounded-xl text-center text-xs font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <Phone size={14} /> Call Helper
                    </a>
                    <button
                      onClick={resetEmergency}
                      className="flex-1 bg-slate-900 border border-slate-800 text-slate-500 py-3 rounded-xl text-center text-xs hover:text-slate-400 transition"
                    >
                      Cancel Alert
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Right Column: Dispatch Radar Map */}
          <div className="w-full lg:w-96 glass-panel p-4 rounded-2xl border border-slate-800 shrink-0 space-y-4">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1"><Navigation size={13} /> Active Dispatch Grid</span>
            </div>

            {/* Custom Dispatch Tracker Map */}
            <div className="h-64 bg-slate-950 border border-slate-850 rounded-xl relative overflow-hidden">
              <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                {/* Topology grid */}
                <defs>
                  <pattern id="radar-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(239, 68, 68, 0.05)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#radar-grid)" />

                {/* Radar target rings */}
                <circle cx="50%" cy="50%" r="50" fill="none" stroke="rgba(239, 68, 68, 0.05)" strokeWidth="1" />
                <circle cx="50%" cy="50%" r="100" fill="none" stroke="rgba(239, 68, 68, 0.03)" strokeWidth="1" />

                {/* Roads */}
                <line x1="0" y1="130" x2="400" y2="130" stroke="rgba(51, 65, 85, 0.25)" strokeWidth="2" />
                <line x1="180" y1="0" x2="180" y2="300" stroke="rgba(51, 65, 85, 0.25)" strokeWidth="2" />

                {/* Dispatch line */}
                {selectedVolunteer && (
                  <line
                    x1={`${selectedVolunteer.coords.x}%`}
                    y1={`${selectedVolunteer.coords.y}%`}
                    x2="50%"
                    y2="50%"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                    className="animate-pulse"
                  />
                )}
              </svg>

              {/* Home SOS Anchor */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <span className="w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-slate-950 flex items-center justify-center animate-ping absolute" />
                <span className="w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-slate-950 flex items-center justify-center z-10" />
                <span className="text-[8px] bg-red-950 text-red-400 font-bold px-1.5 py-0.5 rounded border border-red-500/20 mt-2.5 uppercase z-10">SOS</span>
              </div>

              {/* Scanned Volunteer Marker */}
              {!isScanning && volunteers.map(vol => {
                const isDispatched = selectedVolunteer?.id === vol.id;
                
                // Animate position moving towards center if dispatched
                let leftPct = vol.coords.x;
                let topPct = vol.coords.y;
                if (isDispatched) {
                  const factor = dispatchProgress / 100;
                  leftPct = vol.coords.x + (50 - vol.coords.x) * factor;
                  topPct = vol.coords.y + (50 - vol.coords.y) * factor;
                }

                return (
                  <div
                    key={vol.id}
                    style={{ top: `${topPct}%`, left: `${leftPct}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-linear"
                  >
                    <span className={`w-3.5 h-3.5 rounded-full border-2 border-slate-950 block shadow-lg ${
                      isDispatched ? 'bg-emerald-500' : 'bg-red-500'
                    }`} />
                    <span className="absolute left-4 top-[-6px] bg-slate-900 border border-slate-800 text-[8px] text-slate-350 px-1 py-0.5 rounded shadow-lg whitespace-nowrap z-10">
                      {vol.name.split(' ')[0]} ({vol.etaMinutes}m)
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Safety Badges */}
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-850/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Shield className="text-indigo-400" size={14} /> Trust & Safety Escort
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                All volunteers undergo local DMV checks, biometric identity verification, and hold basic first-aid certifications. Dispatches are monitored by platform security nodes.
              </p>
            </div>
            
            {sosActive && (
              <button
                onClick={resetEmergency}
                className="w-full bg-slate-900 text-slate-400 py-2.5 rounded-xl border border-slate-850 text-xs font-semibold hover:text-slate-300"
              >
                Resolve & Clear Alert
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
