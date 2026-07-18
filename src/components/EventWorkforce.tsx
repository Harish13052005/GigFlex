import React, { useState } from 'react';
import { Users, Shield, Music, Video, Zap, CheckCircle2 } from 'lucide-react';

export const EventWorkforce: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'packages' | 'custom'>('packages');
  const [hiringProgress, setHiringProgress] = useState<number | null>(null);
  const [hiringLog, setHiringLog] = useState<string[]>([]);
  const [crewRoles, setCrewRoles] = useState<{ [role: string]: number }>({
    volunteers: 15,
    photographers: 3,
    drivers: 8,
    security: 10
  });

  const eventPackages = [
    {
      id: 'pkg1',
      title: 'Grand Wedding Media & Driver Fleet',
      description: 'Bulk workforce package for large-scale wedding operations, managing guest arrivals and capturing all moments.',
      roles: { photographers: 4, videographers: 2, drivers: 10, cleanUp: 5 },
      estimatedCost: 1850,
      icon: <Users size={20} className="text-violet-400" />
    },
    {
      id: 'pkg2',
      title: 'Music Festival Operations Crew',
      description: 'Heavy layout operational crew covering setup, security checkpoints, parking controls, and sound/stage assistance.',
      roles: { stageHelpers: 12, security: 15, volunteers: 20, parkingVolunteers: 8 },
      estimatedCost: 3400,
      icon: <Music size={20} className="text-pink-400" />
    },
    {
      id: 'pkg3',
      title: 'Corporate Summit Coordinator Team',
      description: 'Professional hospitality, presentation assistance, photography, and high-end transit chauffeurs for corporate executives.',
      roles: { hosts: 6, presenters: 2, drivers: 5, photographers: 2 },
      estimatedCost: 1550,
      icon: <Shield size={20} className="text-sky-400" />
    }
  ];

  const simulateHiring = (roles: { [role: string]: number }) => {
    setHiringProgress(0);
    setHiringLog(['Initializing AI matcher engine...', 'Scanning nearby verified providers...']);
    
    let currentProgress = 0;
    const logIntervals = [
      'Filtering based on active calendar availability...',
      'Matching on rating indexes > 4.7...',
      'Matching required equipment ownership proofs...',
      'Pinging local mobile apps...',
      'Received 12 confirmations...',
      'Security checkpoints finalized...',
      'Contract deposits locked in Escrow contracts...',
      'Crew dispatch tokens signed!'
    ];

    const interval = setInterval(() => {
      currentProgress += 10;
      setHiringProgress(currentProgress);

      const logsCount = Math.floor((currentProgress / 100) * logIntervals.length);
      const activeLogs = logIntervals.slice(0, logsCount + 1);
      setHiringLog(['Initializing AI matcher engine...', 'Scanning nearby verified providers...', ...activeLogs]);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setHiringLog(prev => [...prev, '🎉 Event Workforce deployment complete! Contracts released.']);
      }
    }, 400);
  };

  const handleCustomHiring = (e: React.FormEvent) => {
    e.preventDefault();
    simulateHiring(crewRoles);
  };

  const adjustCustomRole = (role: string, delta: number) => {
    setCrewRoles({
      ...crewRoles,
      [role]: Math.max(0, crewRoles[role] + delta)
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Description Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex justify-between items-center relative overflow-hidden">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Users className="text-indigo-400" size={24} /> Event Workforce Solutions
          </h2>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            Need large numbers of temporary staff for festivals, weddings, or corporate events? Define roles, set budgets, and let our instant matching systems dispatch verified volunteers, drivers, or security instantly.
          </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-900 gap-6">
        <button
          onClick={() => setActiveTab('packages')}
          className={`pb-2.5 text-xs font-semibold uppercase tracking-wider transition ${
            activeTab === 'packages' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-500 hover:text-slate-400'
          }`}
        >
          Workforce Packages
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`pb-2.5 text-xs font-semibold uppercase tracking-wider transition ${
            activeTab === 'custom' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-500 hover:text-slate-400'
          }`}
        >
          Custom Deployment
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column: Input Selection */}
        <div className="flex-1 space-y-4">
          {activeTab === 'packages' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eventPackages.map(pkg => (
                <div key={pkg.id} className="glass-panel p-5 rounded-xl border border-slate-850 hover:border-slate-700 transition flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        {pkg.icon}
                      </div>
                      <h3 className="font-bold text-slate-200 text-sm leading-tight">{pkg.title}</h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{pkg.description}</p>
                    
                    <div className="pt-2 border-t border-slate-900/60">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1.5">Required Positions</p>
                      <div className="flex flex-wrap gap-1.5">
                        {Object.entries(pkg.roles).map(([role, qty]) => (
                          <span key={role} className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-900">
                            {qty} {role.replace(/([A-Z])/g, ' $1')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-900 flex justify-between items-center">
                    <div>
                      <span className="block text-[9px] text-slate-500 uppercase font-semibold">Est. Booking Cost</span>
                      <span className="text-sm font-black text-indigo-400">${pkg.estimatedCost}</span>
                    </div>
                    <button
                      onClick={() => simulateHiring(pkg.roles)}
                      disabled={hiringProgress !== null && hiringProgress < 100}
                      className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white px-3.5 py-2 rounded-lg transition"
                    >
                      Instant Hire & Dispatch
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleCustomHiring} className="glass-panel p-6 rounded-xl border border-slate-850 space-y-6">
              <h3 className="font-bold text-slate-200">Configure Custom Workforce Requirements</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(crewRoles).map(([role, qty]) => (
                  <div key={role} className="flex justify-between items-center bg-slate-950/60 p-3 rounded-lg border border-slate-900">
                    <span className="text-xs text-slate-300 capitalize">{role}</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => adjustCustomRole(role, -1)}
                        className="w-7 h-7 bg-slate-900 rounded border border-slate-800 text-slate-400 hover:text-slate-300 flex items-center justify-center font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold text-indigo-300 w-6 text-center">{qty}</span>
                      <button
                        type="button"
                        onClick={() => adjustCustomRole(role, 1)}
                        className="w-7 h-7 bg-slate-900 rounded border border-slate-800 text-slate-400 hover:text-slate-300 flex items-center justify-center font-bold text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-900">
                <div>
                  <span className="block text-[9px] text-slate-500 uppercase font-semibold">Total Crew Positions</span>
                  <span className="text-lg font-black text-slate-300">
                    {Object.values(crewRoles).reduce((a, b) => a + b, 0)} workers
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={hiringProgress !== null && hiringProgress < 100}
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs px-6 py-3 rounded-xl transition"
                >
                  Trigger Instant Matching
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Visual Matching Console */}
        <div className="w-full lg:w-96 glass-panel p-6 rounded-2xl border border-slate-800 shrink-0 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
              <Zap className="text-amber-500" size={16} /> Matching Console
            </h3>
            
            {hiringProgress !== null ? (
              <div className="space-y-4">
                
                {/* Progress Circle or Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Match Completion Rate</span>
                    <span className="text-indigo-400">{hiringProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      style={{ width: `${hiringProgress}%` }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Simulated Log Output */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 h-64 overflow-y-auto space-y-2 font-mono text-[10px] text-slate-400 leading-relaxed scroll-smooth">
                  {hiringLog.map((log, idx) => {
                    const isSuccess = log.includes('🎉') || log.includes('complete');
                    return (
                      <div key={idx} className={`flex gap-2 ${isSuccess ? 'text-indigo-300 font-bold' : ''}`}>
                        <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
                        <p>{log}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-500 space-y-3">
                <Users size={40} className="mx-auto text-slate-700" />
                <p className="text-xs">
                  No active hiring loop. Click "Instant Hire & Dispatch" or start a custom query to trigger matching.
                </p>
              </div>
            )}
          </div>

          {hiringProgress === 100 && (
            <div className="mt-4 pt-4 border-t border-slate-900 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl p-3 flex gap-2">
              <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Workforce Filled!</p>
                <p className="text-[10px] text-emerald-400/80 mt-0.5">All escrow agreements deployed and active. Crew credentials uploaded under Admin panel.</p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
