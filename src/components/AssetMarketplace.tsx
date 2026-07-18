import React, { useState } from 'react';
import { initialAssets, RentalAsset } from '../utils/MockData';
import { Search, Calendar, MapPin, ShieldAlert, CheckCircle, Clock, Check } from 'lucide-react';

interface AssetMarketplaceProps {
  onAssetsUpdated: (assets: RentalAsset[]) => void;
  savedAssets: RentalAsset[];
  onAddTransaction: (tx: any) => void;
}

export const AssetMarketplace: React.FC<AssetMarketplaceProps> = ({ onAssetsUpdated, savedAssets, onAddTransaction }) => {
  const [assets, setAssets] = useState<RentalAsset[]>(savedAssets.length ? savedAssets : initialAssets);
  const [selectedAsset, setSelectedAsset] = useState<RentalAsset | null>(assets[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Booking UI State
  const [insuranceEnabled, setInsuranceEnabled] = useState(false);
  const [deliveryEnabled, setDeliveryEnabled] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Generate calendar days for the current month representation (e.g. July 2026)
  const generateJulyDays = () => {
    const days = [];
    for (let i = 10; i <= 24; i++) {
      days.push(`2026-07-${i}`);
    }
    return days;
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleAssetSelect = (asset: RentalAsset) => {
    setSelectedAsset(asset);
    setSelectedDates([]);
    setBookingSuccess(false);
  };

  const toggleDateSelection = (date: string, status: string) => {
    if (status !== 'available') return; // Can't select booked/reserved dates
    
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter(d => d !== date));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const handleRentAsset = () => {
    if (!selectedAsset || selectedDates.length === 0) return;

    // Simulate Payment and hold deposit
    const updatedAssets = assets.map(asset => {
      if (asset.id === selectedAsset.id) {
        const updatedBookings = { ...asset.calendarBookings };
        selectedDates.forEach(date => {
          updatedBookings[date] = 'booked';
        });
        return {
          ...asset,
          calendarBookings: updatedBookings
        };
      }
      return asset;
    });

    setAssets(updatedAssets);
    onAssetsUpdated(updatedAssets);

    // Calculate financials
    const baseCost = selectedAsset.pricePerDay * selectedDates.length;
    const insuranceCost = insuranceEnabled ? 10 * selectedDates.length : 0; // Mock flat insurance
    const totalPayment = baseCost + insuranceCost;

    // Trigger transactions
    onAddTransaction({
      id: `tx-rent-${Date.now()}`,
      jobId: selectedAsset.id,
      type: 'payment',
      amount: totalPayment,
      date: '2026-07-13',
      status: 'pending_escrow',
      details: `Rental payment for ${selectedAsset.name} (${selectedDates.length} days)`
    });

    onAddTransaction({
      id: `tx-dep-${Date.now()}`,
      jobId: selectedAsset.id,
      type: 'payment',
      amount: selectedAsset.deposit,
      date: '2026-07-13',
      status: 'pending_escrow',
      details: `Security deposit hold for ${selectedAsset.name}`
    });

    setBookingSuccess(true);
    setSelectedDates([]);
  };

  const categories = ['All', 'DSLR Lens', 'Drone', 'Power Tools', 'Medical Equipment'];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          asset.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || asset.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Category selector and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`text-xs px-4 py-2 rounded-full border shrink-0 transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 border-indigo-500 text-white font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search equipment for rent..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full glass-input rounded-xl py-2 pl-10 pr-4 text-sm text-slate-300 placeholder-slate-600"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-slate-600" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Assets Listings Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAssets.map(asset => {
            const isSelected = selectedAsset?.id === asset.id;
            return (
              <div
                key={asset.id}
                onClick={() => handleAssetSelect(asset)}
                className={`glass-panel rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border hover:shadow-2xl ${
                  isSelected 
                    ? 'border-indigo-500/80 shadow-indigo-950/20 ring-1 ring-indigo-500/30' 
                    : 'border-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="h-44 relative bg-slate-900">
                  <img
                    src={asset.image}
                    alt={asset.name}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-2.5 py-1 rounded-lg">
                    <p className="text-xs font-semibold text-slate-300">
                      <span className="text-indigo-400 font-bold text-sm">${asset.pricePerDay}</span> / day
                    </p>
                  </div>
                  {asset.verified && (
                    <div className="absolute top-3 left-3 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/30 px-2.5 py-0.5 rounded-lg">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                        Ownership Verified
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-200 line-clamp-1">{asset.name}</h3>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{asset.description}</p>
                  
                  <div className="pt-2 flex justify-between items-center border-t border-slate-900/60 text-[11px] text-slate-500">
                    <span>Owner: {asset.ownerName}</span>
                    <span className="text-amber-400">★ {asset.ownerRating}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Booking & Info Panel */}
        {selectedAsset && (
          <div className="w-full lg:w-[450px] glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between shrink-0">
            <div className="space-y-6">
              
              {/* Asset Header */}
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {selectedAsset.category}
                </span>
                <h2 className="text-xl font-bold text-slate-100 mt-2">{selectedAsset.name}</h2>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{selectedAsset.description}</p>
              </div>

              {/* Deposit and Policy Rules */}
              <div className="grid grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Security Deposit</p>
                  <p className="text-lg font-bold text-slate-300">${selectedAsset.deposit}</p>
                  <p className="text-[10px] text-slate-500">Held in escrow & fully refunded</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Late Penalty</p>
                  <p className="text-sm font-semibold text-red-400">$20 / hr late</p>
                  <p className="text-[10px] text-slate-500">Grace period: 30 minutes</p>
                </div>
              </div>

              {/* Damage Policy Alert */}
              <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-850 flex gap-2.5 text-xs text-slate-400">
                <ShieldAlert className="text-amber-400 shrink-0 mt-0.5" size={16} />
                <p>
                  <strong className="text-slate-300">Damage Policy:</strong> {selectedAsset.damagePolicy}
                </p>
              </div>

              {/* Availability Calendar Tracker */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Availability Calendar</span>
                  <span className="text-slate-500">Select dates to rent</span>
                </div>

                <div className="grid grid-cols-5 gap-1.5 bg-slate-950/40 p-3 rounded-xl border border-slate-850">
                  {generateJulyDays().map(dateStr => {
                    const dayNum = dateStr.split('-')[2];
                    const currentStatus = selectedAsset.calendarBookings[dateStr] || 'available';
                    const isSelected = selectedDates.includes(dateStr);
                    
                    let bgClass = 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700';
                    let statusDot = 'bg-emerald-400';
                    
                    if (currentStatus === 'booked') {
                      bgClass = 'bg-red-500/10 border-red-500/20 text-red-500/50 cursor-not-allowed';
                      statusDot = 'bg-red-500';
                    } else if (currentStatus === 'reserved') {
                      bgClass = 'bg-amber-500/10 border-amber-500/20 text-amber-500/50 cursor-not-allowed';
                      statusDot = 'bg-amber-500';
                    } else if (isSelected) {
                      bgClass = 'bg-indigo-600 border-indigo-500 text-white font-bold scale-[1.03] shadow-md shadow-indigo-900/30';
                      statusDot = 'bg-white';
                    }

                    return (
                      <button
                        key={dateStr}
                        onClick={() => toggleDateSelection(dateStr, currentStatus)}
                        disabled={currentStatus !== 'available'}
                        className={`py-2 px-1 text-center rounded-lg border text-xs flex flex-col items-center justify-between h-12 transition-all ${bgClass}`}
                      >
                        <span>Jul {dayNum}</span>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Calendar Legend */}
                <div className="flex gap-4 text-[10px] text-slate-500 justify-center">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Available
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Reserved (Hold)
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Booked
                  </div>
                </div>
              </div>

              {/* Insurance & Pickup Toggles */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Add Equipment Rental Insurance</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={insuranceEnabled}
                      onChange={(e) => setInsuranceEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-950 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-350 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 peer-checked:after:bg-indigo-200"></div>
                  </label>
                </div>
                {insuranceEnabled && (
                  <p className="text-[10px] text-slate-500 bg-indigo-950/20 p-2 rounded border border-indigo-950/40">
                    {selectedAsset.insuranceOption}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Request Home Delivery (within 10km)</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={deliveryEnabled}
                      disabled={selectedAsset.pickupOption === 'pickup'}
                      onChange={(e) => setDeliveryEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-950 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-350 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 peer-checked:after:bg-indigo-200 disabled:opacity-30"></div>
                  </label>
                </div>
              </div>

            </div>

            {/* Price Calculations and Checkout */}
            <div className="pt-6 mt-6 border-t border-slate-900 space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Rental Subtotal ({selectedDates.length} days)</span>
                  <span className="text-slate-300 font-semibold">${selectedAsset.pricePerDay * selectedDates.length}</span>
                </div>
                {insuranceEnabled && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Insurance Cover</span>
                    <span className="text-slate-300 font-semibold">${10 * selectedDates.length}</span>
                  </div>
                )}
                {deliveryEnabled && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Courier Delivery Fee</span>
                    <span className="text-slate-300 font-semibold">$15</span>
                  </div>
                )}
              </div>

              {bookingSuccess ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl p-3 flex items-center justify-center gap-2">
                  <Check size={16} /> Asset Escrow Contract Generated Successfully!
                </div>
              ) : (
                <button
                  onClick={handleRentAsset}
                  disabled={selectedDates.length === 0}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-medium py-3 rounded-xl transition"
                >
                  <Calendar size={18} /> Rent Now (Fund Escrow ${
                    (selectedAsset.pricePerDay * selectedDates.length) + 
                    (insuranceEnabled ? 10 * selectedDates.length : 0) + 
                    (deliveryEnabled ? 15 : 0)
                  })
                </button>
              )}
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
