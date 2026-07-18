import React, { useState } from 'react';
import { SkillMarketplace } from './components/SkillMarketplace';
import { AssetMarketplace } from './components/AssetMarketplace';
import { GigMarketplace } from './components/GigMarketplace';
import { EventWorkforce } from './components/EventWorkforce';
import { EmergencyHelpers } from './components/EmergencyHelpers';
import { Financials } from './components/Financials';
import { Dashboards } from './components/Dashboards';

import { 
  initialTransactions, 
  initialSkills, 
  initialAssets, 
  initialGigs, 
  Transaction, 
  SkillProfile, 
  RentalAsset, 
  JobGig 
} from './utils/MockData';

import { 
  Briefcase, 
  RotateCw, 
  MapPin, 
  ShieldAlert, 
  DollarSign, 
  TrendingUp, 
  Bell, 
  Check, 
  Layers, 
  Cpu 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'skills' | 'assets' | 'gigs' | 'events' | 'emergency' | 'financials' | 'dashboards'>('gigs');
  
  // Application States
  const [skills, setSkills] = useState<SkillProfile[]>(initialSkills);
  const [assets, setAssets] = useState<RentalAsset[]>(initialAssets);
  const [gigs, setGigs] = useState<JobGig[]>(initialGigs);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  // Notification Queue
  const [notifications, setNotifications] = useState<string[]>([
    'New Drone Videography gig posted 1.2km away matching your profile (98% match)',
    'Sony FE 70-200mm Lens rental request received from Sarah J.',
    'Platform deposit of $300 released successfully'
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Status/Availability Settings
  const [availabilityStatus, setAvailabilityStatus] = useState('Available Today');
  
  // Custom Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddTransaction = (newTx: Transaction) => {
    setTransactions(prev => [newTx, ...prev]);
    triggerToast(`Transaction Logged: ${newTx.details}`);
    
    // Auto-generate system notification for updates
    setNotifications(prev => [
      `System: ${newTx.details} - Payout hold active`,
      ...prev
    ]);
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-900 px-6 py-4 flex items-center justify-between">
        
        {/* Logo and Switcher Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-950/40">
            <Cpu className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
              GigFlex <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Core</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Multi-Marketplace Node</p>
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-6">
          
          {/* Availability Status Bar */}
          <div className="hidden md:flex items-center gap-2 bg-slate-950/60 border border-slate-900 rounded-xl px-3 py-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-400">Availability:</span>
            <select
              value={availabilityStatus}
              onChange={(e) => {
                setAvailabilityStatus(e.target.value);
                triggerToast(`Availability set to: ${e.target.value}`);
              }}
              className="bg-transparent border-none focus:outline-none text-indigo-400 font-bold cursor-pointer"
            >
              <option value="Available Today">Available Today</option>
              <option value="Available Tomorrow">Available Tomorrow</option>
              <option value="Weekend Only">Weekend Only</option>
              <option value="Evenings">Evenings</option>
              <option value="Morning">Morning</option>
            </select>
          </div>

          {/* Notifications bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-xl transition relative"
            >
              <Bell size={16} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-slate-950">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 glass-panel-glow rounded-2xl p-4 border border-indigo-500/10 space-y-3 z-50">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-200">System Notifications</span>
                  <button
                    onClick={() => {
                      setNotifications([]);
                      setShowNotifications(false);
                    }}
                    className="text-[9px] text-slate-500 hover:text-slate-400"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-[10px] text-slate-500 text-center py-4">No new notifications</p>
                  ) : (
                    notifications.map((notif, idx) => (
                      <div key={idx} className="text-[10px] text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-900">
                        {notif}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Main Switcher Bar */}
      <nav className="bg-slate-950 border-b border-slate-900 px-6 py-2.5 flex gap-2 overflow-x-auto justify-start lg:justify-center">
        {[
          { id: 'skills', label: '1. Skill profile', icon: <Briefcase size={13} /> },
          { id: 'assets', label: '2. Asset Rent', icon: <RotateCw size={13} /> },
          { id: 'gigs', label: '3. Local Gigs', icon: <MapPin size={13} /> },
          { id: 'events', label: '4. Event Crew', icon: <Layers size={13} /> },
          { id: 'emergency', label: '5. SOS Helpers', icon: <ShieldAlert size={13} /> },
          { id: 'financials', label: 'Escrow & Safety', icon: <DollarSign size={13} /> },
          { id: 'dashboards', label: 'Analytics Hub', icon: <TrendingUp size={13} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`text-xs px-4 py-2 rounded-xl flex items-center gap-2 border transition shrink-0 ${
              activeTab === tab.id
                ? 'bg-indigo-600/10 border-indigo-500/40 text-indigo-300 font-bold shadow-lg shadow-indigo-950/20'
                : 'bg-slate-900/50 border-slate-900 text-slate-400 hover:border-slate-800'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>

      {/* Floating Notifications Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/90 backdrop-blur border border-indigo-500/30 text-indigo-200 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-in max-w-sm">
          <div className="p-1 bg-indigo-500/20 rounded-lg text-indigo-400">
            <Check size={16} />
          </div>
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Main View Render */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        {activeTab === 'skills' && (
          <SkillMarketplace
            savedProfiles={skills}
            onProfileUpdated={setSkills}
          />
        )}
        {activeTab === 'assets' && (
          <AssetMarketplace
            savedAssets={assets}
            onAssetsUpdated={setAssets}
            onAddTransaction={handleAddTransaction}
          />
        )}
        {activeTab === 'gigs' && (
          <GigMarketplace
            savedGigs={gigs}
            onGigsUpdated={setGigs}
            onAddTransaction={handleAddTransaction}
          />
        )}
        {activeTab === 'events' && (
          <EventWorkforce />
        )}
        {activeTab === 'emergency' && (
          <EmergencyHelpers />
        )}
        {activeTab === 'financials' && (
          <Financials
            transactions={transactions}
            onTransactionsUpdated={setTransactions}
          />
        )}
        {activeTab === 'dashboards' && (
          <Dashboards />
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-900 text-center text-[10px] text-slate-650">
        <p>&copy; 2026 GigFlex Mediate Systems. All rights reserved under Neighborhood Liquidity Index protocols.</p>
      </footer>
    </div>
  );
}
