import React, { useState } from 'react';
import { DollarSign, Clock, Navigation, Star, ShieldAlert, Award, FileText, CheckCircle2 } from 'lucide-react';

export const Dashboards: React.FC = () => {
  const [activeDashboard, setActiveDashboard] = useState<'worker' | 'business' | 'admin'>('worker');
  
  // Tax Estimator state
  const [taxRate, setTaxRate] = useState(15);
  const [grossEarnings, setGrossEarnings] = useState(1480);
  
  // Admin Verification list state
  const [verifications, setVerifications] = useState([
    { id: 'u1', name: 'John Doe (Cleaner)', type: 'Identity Verification', status: 'pending' },
    { id: 'u2', name: 'Sony Mirrorless A7R V', type: 'Asset Ownership Proof', status: 'pending' },
    { id: 'u3', name: 'Alex Mercer (FAA Drone Cert)', type: 'Skill Certification', status: 'pending' },
  ]);

  const handleApproveVerification = (id: string) => {
    setVerifications(verifications.map(v => v.id === id ? { ...v, status: 'approved' } : v));
  };

  // Region Heatmap data
  const heatmapData = [
    { zone: 'Zone A (Downtown)', intensity: 'bg-red-500/80', count: 42 },
    { zone: 'Zone B (Airport)', intensity: 'bg-red-500/60', count: 28 },
    { zone: 'Zone C (Tech Park)', intensity: 'bg-amber-500/70', count: 31 },
    { zone: 'Zone D (North Suburb)', intensity: 'bg-amber-500/40', count: 18 },
    { zone: 'Zone E (East Bay)', intensity: 'bg-slate-800', count: 8 },
    { zone: 'Zone F (University)', intensity: 'bg-red-500/50', count: 22 },
  ];

  // SVG Chart data points for monthly earnings
  const chartData = [
    { month: 'Jan', amount: 450 },
    { month: 'Feb', amount: 620 },
    { month: 'Mar', amount: 890 },
    { month: 'Apr', amount: 780 },
    { month: 'May', amount: 1200 },
    { month: 'Jun', amount: 1480 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Selector Tabs */}
      <div className="flex border-b border-slate-900 gap-6">
        <button
          onClick={() => setActiveDashboard('worker')}
          className={`pb-2.5 text-xs font-semibold uppercase tracking-wider transition ${
            activeDashboard === 'worker' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-500 hover:text-slate-400'
          }`}
        >
          Worker Analytics
        </button>
        <button
          onClick={() => setActiveDashboard('business')}
          className={`pb-2.5 text-xs font-semibold uppercase tracking-wider transition ${
            activeDashboard === 'business' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-500 hover:text-slate-400'
          }`}
        >
          Business Analytics
        </button>
        <button
          onClick={() => setActiveDashboard('admin')}
          className={`pb-2.5 text-xs font-semibold uppercase tracking-wider transition ${
            activeDashboard === 'admin' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-500 hover:text-slate-400'
          }`}
        >
          Admin Command Center
        </button>
      </div>

      {/* WORKER DASHBOARD VIEW */}
      {activeDashboard === 'worker' && (
        <div className="space-y-6">
          {/* Key metrics grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                <DollarSign size={20} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Gross Income</p>
                <p className="text-xl font-bold text-slate-200">${grossEarnings}</p>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
              <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Hours Tracked</p>
                <p className="text-xl font-bold text-slate-200">32.5 hrs</p>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                <Navigation size={20} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Travel Distance</p>
                <p className="text-xl font-bold text-slate-200">142 km</p>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
              <div className="p-3 bg-pink-500/10 rounded-xl text-pink-400">
                <Star size={20} className="fill-pink-400/20" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Avg Rating</p>
                <p className="text-xl font-bold text-slate-200">4.92 ★</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Earnings Growth Chart */}
            <div className="flex-1 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <div>
                <h3 className="font-bold text-slate-200 text-sm">Monthly Earnings Curve</h3>
                <p className="text-[10px] text-slate-500">Track your platform progress since launch</p>
              </div>

              {/* Custom SVG Line Chart */}
              <div className="h-60 w-full pt-4">
                <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(51, 65, 85, 0.15)" strokeWidth="1" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(51, 65, 85, 0.15)" strokeWidth="1" />
                  <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(51, 65, 85, 0.15)" strokeWidth="1" />

                  {/* Gradient Area path */}
                  <defs>
                    <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(99, 102, 241, 0.3)" />
                      <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Area fill */}
                  <path
                    d={`M 0,150 
                       L 83,140 
                       L 166,110 
                       L 249,120 
                       L 332,80 
                       L 415,50 
                       L 415,200 
                       L 0,200 Z`}
                    fill="url(#chart-grad)"
                  />

                  {/* Connecting Line */}
                  <path
                    d={`M 0,150 
                       L 83,140 
                       L 166,110 
                       L 249,120 
                       L 332,80 
                       L 415,50`}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Data Point Dots */}
                  <circle cx="0" cy="150" r="4" fill="#6366f1" stroke="#0f172a" strokeWidth="1" />
                  <circle cx="83" cy="140" r="4" fill="#6366f1" stroke="#0f172a" strokeWidth="1" />
                  <circle cx="166" cy="110" r="4" fill="#6366f1" stroke="#0f172a" strokeWidth="1" />
                  <circle cx="249" cy="120" r="4" fill="#6366f1" stroke="#0f172a" strokeWidth="1" />
                  <circle cx="332" cy="80" r="4" fill="#6366f1" stroke="#0f172a" strokeWidth="1" />
                  <circle cx="415" cy="50" r="4" fill="#6366f1" stroke="#0f172a" strokeWidth="1" />
                </svg>

                {/* X Axis labels */}
                <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-2">
                  <span>Jan ($450)</span>
                  <span>Feb ($620)</span>
                  <span>Mar ($890)</span>
                  <span>Apr ($780)</span>
                  <span>May ($1.2k)</span>
                  <span>Jun ($1.4k)</span>
                </div>
              </div>
            </div>

            {/* Right: Tax Estimator & Skill details */}
            <div className="w-full lg:w-96 flex flex-col gap-6">
              
              {/* Tax Estimator Panel */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="text-indigo-400" size={18} />
                  <h3 className="font-bold text-slate-200 text-sm">Self-Employment Tax Estimator</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Estimated Income Bracket</span>
                      <span className="text-slate-200 font-bold">${grossEarnings}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Withholding Rate (%)</span>
                      <span className="text-indigo-400 font-bold">{taxRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="35"
                      value={taxRate}
                      onChange={(e) => setTaxRate(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500 mt-2"
                    />
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Tax to Withhold</span>
                      <span className="text-red-400 font-bold">${((grossEarnings * taxRate) / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs border-t border-slate-900 pt-2 font-bold">
                      <span className="text-slate-400">Estimated Net Payout</span>
                      <span className="text-emerald-400">${(grossEarnings - (grossEarnings * taxRate) / 100).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profit metrics */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Most Profitable Marketplace</h4>
                <p className="text-lg font-black text-slate-200">Local Gig Marketplace</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Driving skills command higher density bookings, contributing to **64%** of your total monthly earnings.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* BUSINESS DASHBOARD VIEW */}
      {activeDashboard === 'business' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-1">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Booking Spending</p>
              <p className="text-3xl font-black text-indigo-400">$3,420</p>
              <p className="text-[10px] text-slate-500">Across 14 individual workforce contracts</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-1">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Gig Contracts</p>
              <p className="text-3xl font-black text-emerald-400">4 Crews active</p>
              <p className="text-[10px] text-slate-500">Volunteers & Media operators currently in transit</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-200 text-sm">Temporary Staff Hire logs</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 font-semibold">
                    <th className="pb-3">Worker Group / Skill</th>
                    <th className="pb-3">Hired Quantity</th>
                    <th className="pb-3">Hiring Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Escrow Locked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60 text-slate-300">
                  <tr className="hover:bg-slate-900/10">
                    <td className="py-3.5 font-bold">Wedding Photographers</td>
                    <td>4 Workers</td>
                    <td>Jul 12, 2026</td>
                    <td>
                      <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">Active</span>
                    </td>
                    <td className="text-right font-black">$600</td>
                  </tr>
                  <tr className="hover:bg-slate-900/10">
                    <td className="py-3.5 font-bold">Chauffeurs & Chaperones</td>
                    <td>10 Workers</td>
                    <td>Jul 12, 2026</td>
                    <td>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">Completed</span>
                    </td>
                    <td className="text-right font-black">$1,250</td>
                  </tr>
                  <tr className="hover:bg-slate-900/10">
                    <td className="py-3.5 font-bold">Security Guards</td>
                    <td>15 Workers</td>
                    <td>Jul 10, 2026</td>
                    <td>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">Completed</span>
                    </td>
                    <td className="text-right font-black">$1,570</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN DASHBOARD VIEW */}
      {activeDashboard === 'admin' && (
        <div className="flex flex-col lg:flex-row gap-6 animate-fade-in">
          
          {/* Left Column: Heatmaps and Platform stats */}
          <div className="flex-1 space-y-6">
            
            {/* Platform Stats row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-900">
                <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">Reports Logged</span>
                <span className="text-lg font-black text-slate-300">14 pending</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-900">
                <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">System Load</span>
                <span className="text-lg font-black text-indigo-400">Optimal</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-900">
                <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">Total Escrow</span>
                <span className="text-lg font-black text-emerald-400">$24,940</span>
              </div>
            </div>

            {/* Heatmaps */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <div>
                <h3 className="font-bold text-slate-200 text-sm">System Demand Heatmap</h3>
                <p className="text-[10px] text-slate-500">Live monitoring of regional gig request densities</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {heatmapData.map((data, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-slate-350">{data.zone}</p>
                      <p className="text-[10px] text-slate-500 font-semibold">{data.count} matches active</p>
                    </div>
                    <span className={`w-3.5 h-3.5 rounded-full ${data.intensity} shadow-xl shadow-red-950/20`} />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: User Verification Verification Queue */}
          <div className="w-full lg:w-96 glass-panel p-6 rounded-2xl border border-slate-800 shrink-0 space-y-4">
            <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
              <Award className="text-indigo-400" size={16} /> Verification Approvals
            </h3>
            <p className="text-xs text-slate-400">
              Audit requests for identity checks, professional certifications, and asset ownership.
            </p>

            <div className="space-y-3">
              {verifications.map(v => (
                <div key={v.id} className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-200 text-xs">{v.name}</h4>
                      <span className="text-[9px] text-slate-500 font-semibold">{v.type}</span>
                    </div>
                    <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                      v.status === 'approved' 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-indigo-500/10 text-indigo-400'
                    }`}>
                      {v.status}
                    </span>
                  </div>

                  {v.status === 'pending' && (
                    <button
                      onClick={() => handleApproveVerification(v.id)}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] rounded-lg transition flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 size={12} /> Approve Verification
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
