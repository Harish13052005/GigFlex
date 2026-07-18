import React, { useState } from 'react';
import { initialGigs, JobGig, initialSkills } from '../utils/MockData';
import { MapPin, Navigation, DollarSign, Clock, AlertTriangle, Route, Compass, Plus, Fuel } from 'lucide-react';

interface GigMarketplaceProps {
  onGigsUpdated: (gigs: JobGig[]) => void;
  savedGigs: JobGig[];
  onAddTransaction: (tx: any) => void;
}

export const GigMarketplace: React.FC<GigMarketplaceProps> = ({ onGigsUpdated, savedGigs, onAddTransaction }) => {
  const [gigs, setGigs] = useState<JobGig[]>(savedGigs.length ? savedGigs : initialGigs);
  const [selectedGig, setSelectedGig] = useState<JobGig | null>(gigs[0]);
  
  // Gig Creation Form
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newBudget, setNewBudget] = useState(150);
  const [newDuration, setNewDuration] = useState('4 Hours');
  const [newLocation, setNewLocation] = useState('Central Plaza');
  const [newSkills, setNewSkills] = useState('Driving');
  const [newUrgency, setNewUrgency] = useState<'low' | 'medium' | 'high'>('medium');

  // Route Optimizer State
  const [routeOptimizeEnabled, setRouteOptimizeEnabled] = useState(false);
  const [selectedRouteGigs, setSelectedRouteGigs] = useState<string[]>([]);
  
  // Simulated Map Markers (Gig location and Nearby Providers)
  const nearbyProviders = [
    { name: 'Alex M. (Drone Operator)', type: 'drone', coords: { x: 80, y: 70 }, distance: '1.2 km' },
    { name: 'Sarah J. (Photographer)', type: 'photography', coords: { x: 65, y: 30 }, distance: '2.5 km' },
    { name: 'Marcus C. (Chauffeur)', type: 'driver', coords: { x: 35, y: 50 }, distance: '0.8 km' },
    { name: 'Devon P. (Mechanic)', type: 'mechanic', coords: { x: 20, y: 15 }, distance: '3.1 km' }
  ];

  const handlePostGig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDescription) return;

    // Random coordinates for visual map representation
    const randomCoords = {
      x: Math.floor(Math.random() * 70) + 15,
      y: Math.floor(Math.random() * 70) + 15
    };

    const newGig: JobGig = {
      id: `g-${Date.now()}`,
      title: newTitle,
      description: newDescription,
      category: 'gig',
      location: newLocation,
      budget: newBudget,
      duration: newDuration,
      date: new Date().toISOString().split('T')[0],
      urgency: newUrgency,
      requiredSkills: newSkills.split(',').map(s => s.trim()),
      status: 'open',
      ownerName: 'Private Client',
      distanceKm: parseFloat((Math.random() * 10).toFixed(1)),
      coords: randomCoords
    };

    const updatedGigs = [newGig, ...gigs];
    setGigs(updatedGigs);
    onGigsUpdated(updatedGigs);

    // Reset fields
    setNewTitle('');
    setNewDescription('');
    setShowCreateForm(false);
  };

  const handleApplyGig = (gigId: string) => {
    const updatedGigs = gigs.map(gig => {
      if (gig.id === gigId) {
        return { ...gig, status: 'applied' as const };
      }
      return gig;
    });
    setGigs(updatedGigs);
    onGigsUpdated(updatedGigs);

    const targetGig = gigs.find(g => g.id === gigId);
    if (targetGig) {
      // Alert/notification simulated
      onAddTransaction({
        id: `tx-escrow-${Date.now()}`,
        jobId: targetGig.id,
        type: 'earning',
        amount: targetGig.budget,
        date: '2026-07-13',
        status: 'pending_escrow',
        details: `Application submitted for "${targetGig.title}". Funds held in Escrow contract.`
      });
    }
  };

  const toggleGigToRoute = (gigId: string) => {
    if (selectedRouteGigs.includes(gigId)) {
      setSelectedRouteGigs(selectedRouteGigs.filter(id => id !== gigId));
    } else {
      if (selectedRouteGigs.length >= 3) return; // Limit to 3 gigs for routing
      setSelectedRouteGigs([...selectedRouteGigs, gigId]);
    }
  };

  // Route Calculations
  const calculateRouteMetrics = () => {
    const activeGigs = gigs.filter(g => selectedRouteGigs.includes(g.id));
    if (activeGigs.length === 0) return { distance: 0, fuel: 0, fuelCost: 0, profit: 0 };

    // Basic mock travel calculation
    let totalDistance = 0;
    let prevPoint = { x: 50, y: 50 }; // Starting point (e.g. Home)
    let totalBudget = 0;

    activeGigs.forEach(g => {
      const dx = g.coords.x - prevPoint.x;
      const dy = g.coords.y - prevPoint.y;
      const segmentDistance = Math.sqrt(dx * dx + dy * dy) * 0.15; // Map scaling
      totalDistance += segmentDistance;
      totalBudget += g.budget;
      prevPoint = g.coords;
    });

    const averageMpg = 25; // 25 mpg
    const fuelUsedLiters = (totalDistance / 100) * 8.5; // 8.5L per 100km
    const gasPricePerLiter = 1.45; // $1.45
    const fuelCost = fuelUsedLiters * gasPricePerLiter;
    const netProfit = totalBudget - fuelCost;

    return {
      distance: parseFloat(totalDistance.toFixed(1)),
      fuel: parseFloat(fuelUsedLiters.toFixed(1)),
      fuelCost: parseFloat(fuelCost.toFixed(2)),
      profit: parseFloat(netProfit.toFixed(2))
    };
  };

  const routeMetrics = calculateRouteMetrics();

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Upper Options */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setRouteOptimizeEnabled(!routeOptimizeEnabled);
              setSelectedRouteGigs([]);
            }}
            className={`text-xs px-4 py-2.5 rounded-xl border flex items-center gap-2 transition ${
              routeOptimizeEnabled 
                ? 'bg-amber-600 border-amber-500 text-white font-semibold' 
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <Route size={14} /> {routeOptimizeEnabled ? 'Cancel Optimization' : 'AI Route Optimizer'}
          </button>
        </div>

        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="text-xs px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl flex items-center gap-2 font-semibold shadow-lg shadow-indigo-900/25"
        >
          <Plus size={14} /> Post Local Gig
        </button>
      </div>

      {showCreateForm && (
        <form onSubmit={handlePostGig} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 max-w-2xl">
          <h3 className="font-bold text-slate-200">Post a New Gig Listing</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Gig Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Urgent Office Cleaning"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full glass-input rounded-lg p-2 text-slate-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Location / Area</label>
              <input
                type="text"
                required
                placeholder="e.g. West End Plaza"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full glass-input rounded-lg p-2 text-slate-200 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">Gig Description</label>
            <textarea
              required
              rows={3}
              placeholder="Provide a detailed description of the tasks, timelines, and tools required..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full glass-input rounded-lg p-2 text-slate-200 text-sm"
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Budget ($)</label>
              <input
                type="number"
                min="10"
                value={newBudget}
                onChange={(e) => setNewBudget(parseInt(e.target.value) || 0)}
                className="w-full glass-input rounded-lg p-2 text-slate-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Duration</label>
              <input
                type="text"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                className="w-full glass-input rounded-lg p-2 text-slate-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Required Skill</label>
              <select
                value={newSkills}
                onChange={(e) => setNewSkills(e.target.value)}
                className="w-full glass-input rounded-lg p-2 text-slate-200 text-sm"
              >
                <option value="Driving">Driving</option>
                <option value="Photography">Photography</option>
                <option value="Cooking">Cooking</option>
                <option value="Teaching">Teaching</option>
                <option value="Coding">Coding</option>
                <option value="Gardening">Gardening</option>
                <option value="Cleaning">Cleaning</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Urgency</label>
              <select
                value={newUrgency}
                onChange={(e) => setNewUrgency(e.target.value as any)}
                className="w-full glass-input rounded-lg p-2 text-slate-200 text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="text-xs px-4 py-2 border border-slate-800 text-slate-400 rounded-lg hover:border-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-xs px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
            >
              Publish Gig
            </button>
          </div>
        </form>
      )}

      {/* Main Grid View */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left: Job listings */}
        <div className="flex-1 space-y-4">
          {routeOptimizeEnabled && (
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs p-3.5 rounded-xl flex gap-2">
              <Compass size={18} className="shrink-0" />
              <p>
                <strong>Route optimization mode active:</strong> Select up to 3 gigs from the listing below. The system will plot the most profitable loop from your home location.
              </p>
            </div>
          )}

          <div className="space-y-3">
            {gigs.map(gig => {
              const isSelected = selectedGig?.id === gig.id;
              const isAddedToRoute = selectedRouteGigs.includes(gig.id);
              return (
                <div
                  key={gig.id}
                  onClick={() => !routeOptimizeEnabled && setSelectedGig(gig)}
                  className={`glass-panel p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                    isSelected && !routeOptimizeEnabled
                      ? 'border-indigo-500/80 shadow-md shadow-indigo-950/20'
                      : 'border-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1.5 flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${
                        gig.urgency === 'high' 
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                          : gig.urgency === 'medium'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}>
                        {gig.urgency} Urgency
                      </span>
                      <span className="text-[10px] text-slate-500">{gig.location} ({gig.distanceKm} km away)</span>
                    </div>

                    <h4 className="font-bold text-slate-200 text-sm line-clamp-1">{gig.title}</h4>
                    
                    <div className="flex gap-4 text-xs text-slate-400 pt-1">
                      <span className="flex items-center gap-1"><DollarSign size={13} className="text-emerald-500" /> {gig.budget}</span>
                      <span className="flex items-center gap-1"><Clock size={13} className="text-indigo-400" /> {gig.duration}</span>
                      <span className="text-slate-500">Skills: {gig.requiredSkills.join(', ')}</span>
                    </div>
                  </div>

                  {routeOptimizeEnabled ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleGigToRoute(gig.id);
                      }}
                      className={`text-[10px] font-bold px-3 py-2 rounded-lg border transition ${
                        isAddedToRoute
                          ? 'bg-amber-600 border-amber-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {isAddedToRoute ? 'Added' : '+ Add to Loop'}
                    </button>
                  ) : (
                    <div className="text-right">
                      {gig.status === 'open' ? (
                        <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-full border border-indigo-500/25">Available</span>
                      ) : (
                        <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-1 rounded-full border border-slate-800">Applied</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Map Grid + Detail Tracker OR Route Calculator */}
        <div className="w-full lg:w-[450px] shrink-0 space-y-4">
          
          {/* MAP MODULE */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1"><Navigation size={13} /> Live Availability Map</span>
              <span className="text-indigo-400 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" /> Local Radar Active
              </span>
            </div>

            {/* Visual SVG Map */}
            <div className="h-64 bg-slate-950 border border-slate-850 rounded-xl relative overflow-hidden">
              <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                {/* Grid Gridlines */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(51, 65, 85, 0.15)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Radar Grid Circles */}
                <circle cx="50%" cy="50%" r="40" fill="none" stroke="rgba(99, 102, 241, 0.05)" strokeWidth="1" />
                <circle cx="50%" cy="50%" r="80" fill="none" stroke="rgba(99, 102, 241, 0.03)" strokeWidth="1" />
                <circle cx="50%" cy="50%" r="120" fill="none" stroke="rgba(99, 102, 241, 0.02)" strokeWidth="1" />

                {/* Map Roads / Topology */}
                <path d="M 0,100 L 400,140 M 120,0 L 150,250 M 0,220 Q 200,180 400,200" fill="none" stroke="rgba(51, 65, 85, 0.3)" strokeWidth="2" strokeDasharray="4 4" />

                {/* Draw Route Line if Optimizer is active */}
                {routeOptimizeEnabled && selectedRouteGigs.length > 0 && (() => {
                  let prevX = 50;
                  let prevY = 50;
                  return gigs
                    .filter(g => selectedRouteGigs.includes(g.id))
                    .map((g, idx) => {
                      const startX = `${prevX}%`;
                      const startY = `${prevY}%`;
                      const endX = `${g.coords.x}%`;
                      const endY = `${g.coords.y}%`;
                      prevX = g.coords.x;
                      prevY = g.coords.y;

                      return (
                        <g key={idx}>
                          <line
                            x1={startX}
                            y1={startY}
                            x2={endX}
                            y2={endY}
                            stroke="#f59e0b"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray="4 2"
                            className="animate-pulse"
                          />
                        </g>
                      );
                    });
                })()}
              </svg>

              {/* Home Point Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                <span className="w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center shadow-lg" />
                <span className="text-[9px] bg-slate-900/90 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-500/20 mt-1 uppercase">You</span>
              </div>

              {/* Provider Markers */}
              {nearbyProviders.map((p, idx) => (
                <div
                  key={idx}
                  style={{ top: `${p.coords.y}%`, left: `${p.coords.x}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                >
                  <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full border border-slate-950 block shadow-lg shadow-indigo-900/40" />
                  <div className="absolute left-4 top-0 translate-y-[-25%] hidden group-hover:block bg-slate-900 border border-slate-800 text-[10px] text-slate-300 py-1 px-2 rounded-md whitespace-nowrap shadow-xl z-20">
                    <p className="font-semibold text-slate-200">{p.name}</p>
                    <p className="text-slate-500 text-[9px]">{p.distance} away</p>
                  </div>
                </div>
              ))}

              {/* Gig Markers */}
              {gigs.map(g => {
                const isSelected = selectedGig?.id === g.id;
                const isInRoute = selectedRouteGigs.includes(g.id);
                return (
                  <div
                    key={g.id}
                    onClick={() => setSelectedGig(g)}
                    style={{ top: `${g.coords.y}%`, left: `${g.coords.x}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                  >
                    <span className={`w-3.5 h-3.5 rounded-full border-2 border-slate-950 flex items-center justify-center shadow-lg transition-transform ${
                      isInRoute
                        ? 'bg-amber-500 scale-125'
                        : isSelected
                        ? 'bg-indigo-500 scale-125'
                        : 'bg-indigo-900'
                    }`} />
                  </div>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="flex gap-4 text-[9px] text-slate-500 justify-center">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Start (Home)
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-indigo-500" /> Active Gigs
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-indigo-900" /> Other Gigs
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Route Loop Gigs
              </div>
            </div>
          </div>

          {/* DETAIL OR ROUTE CALCS */}
          {routeOptimizeEnabled ? (
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Route className="text-amber-500" size={18} />
                <h3 className="font-bold text-slate-200 text-sm">Route Optimizer Loop Summary</h3>
              </div>

              {selectedRouteGigs.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">
                  Select gigs from the left list by clicking "+ Add to Loop" to calculate optimum routing metrics.
                </p>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850">
                      <span className="text-[10px] text-slate-500 font-semibold block uppercase">Total Distance</span>
                      <span className="text-sm font-bold text-slate-300">{routeMetrics.distance} km</span>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850">
                      <span className="text-[10px] text-slate-500 font-semibold block uppercase">Fuel Estimate</span>
                      <span className="text-sm font-bold text-slate-300">{routeMetrics.fuel} L (~${routeMetrics.fuelCost})</span>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-amber-500 font-semibold uppercase tracking-wider">Estimated Profit</p>
                        <p className="text-2xl font-black text-slate-100">${routeMetrics.profit}</p>
                      </div>
                      <Fuel size={28} className="text-amber-500/40" />
                    </div>
                    <p className="text-[10px] text-amber-400/80 mt-2 leading-relaxed">
                      Calculating optimal route starting from home. Avoids high-traffic zones. Fuel costs factored based on regional gas prices.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Current Loop</p>
                    <div className="space-y-1.5">
                      {gigs
                        .filter(g => selectedRouteGigs.includes(g.id))
                        .map((g, idx) => (
                          <div key={g.id} className="text-xs bg-slate-950/40 p-2 rounded border border-slate-850 flex justify-between items-center">
                            <span className="text-slate-300 font-medium">
                              {idx + 1}. {g.title}
                            </span>
                            <span className="text-slate-500 font-bold text-[10px]">${g.budget}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            selectedGig && (
              <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                <div>
                  <h3 className="font-bold text-slate-200">{selectedGig.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">Posted by: {selectedGig.ownerName}</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-850/60">
                  {selectedGig.description}
                </p>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span className="text-slate-500">Location Details</span>
                    <span className="text-slate-300 font-medium">{selectedGig.location}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span className="text-slate-500">Est. Duration</span>
                    <span className="text-slate-300 font-medium">{selectedGig.duration}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span className="text-slate-500">Distance</span>
                    <span className="text-slate-300 font-medium">{selectedGig.distanceKm} km away</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span className="text-slate-500">Required Skillsets</span>
                    <span className="text-slate-300 font-semibold">{selectedGig.requiredSkills.join(', ')}</span>
                  </div>
                </div>

                {selectedGig.status === 'open' ? (
                  <button
                    onClick={() => handleApplyGig(selectedGig.id)}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition flex items-center justify-center gap-2"
                  >
                    Apply for Gig (Fund Escrow ${selectedGig.budget})
                  </button>
                ) : (
                  <div className="w-full bg-slate-950 border border-slate-850 text-slate-500 font-medium py-3 rounded-xl text-center text-xs">
                    Application Submitted
                  </div>
                )}
              </div>
            )
          )}

        </div>
      </div>

    </div>
  );
};
