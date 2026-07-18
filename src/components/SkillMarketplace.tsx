import React, { useState, useEffect } from 'react';
import { initialSkills, SkillProfile } from '../utils/MockData';
import { Briefcase, Plus, CheckCircle, Sparkles, AlertCircle, DollarSign, Cpu, Trash2 } from 'lucide-react';

interface SkillMarketplaceProps {
  onProfileUpdated: (profiles: SkillProfile[]) => void;
  savedProfiles: SkillProfile[];
}

export const SkillMarketplace: React.FC<SkillMarketplaceProps> = ({ onProfileUpdated, savedProfiles }) => {
  const [profiles, setProfiles] = useState<SkillProfile[]>(savedProfiles.length ? savedProfiles : initialSkills);
  
  // Form State
  const [skillName, setSkillName] = useState('Wedding Photography');
  const [experience, setExperience] = useState(3);
  const [hourlyRate, setHourlyRate] = useState(45);
  const [certificates, setCertificates] = useState('');
  const [equipment, setEquipment] = useState('');
  const [languages, setLanguages] = useState('English');
  const [portfolio, setPortfolio] = useState('https://behance.net/my-work');
  const [availabilities, setAvailabilities] = useState<string[]>(['Weekend Only']);

  // AI Assistant States
  const [aiResume, setAiResume] = useState<string | null>(null);
  const [isGeneratingResume, setIsGeneratingResume] = useState(false);
  const [pricingSuggestion, setPricingSuggestion] = useState<{
    avg: number;
    min: number;
    premium: number;
    suggested: number;
    demand: 'High' | 'Moderate' | 'Low' | 'Peak Season';
    justification: string;
  } | null>(null);

  // Sync back to parent when profiles change
  useEffect(() => {
    onProfileUpdated(profiles);
  }, [profiles]);

  // Update AI Pricing recommendations dynamically when skill name changes
  useEffect(() => {
    calculateAIPricing(skillName);
  }, [skillName]);

  const toggleAvailability = (time: string) => {
    if (availabilities.includes(time)) {
      setAvailabilities(availabilities.filter(t => t !== time));
    } else {
      setAvailabilities([...availabilities, time]);
    }
  };

  const handleAddProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName) return;

    const newProfile: SkillProfile = {
      id: `s-${Date.now()}`,
      skillName,
      rating: 5.0, // New profiles get standard starter perfect rating
      hourlyRate,
      experienceYears: experience,
      certificates: certificates ? certificates.split(',').map(c => c.trim()) : [],
      availability: availabilities,
      languages: languages.split(',').map(l => l.trim()),
      portfolioLink: portfolio,
      verified: false,
      equipmentOwned: equipment ? equipment.split(',').map(eq => eq.trim()) : [],
      reviewsCount: 0
    };

    setProfiles([newProfile, ...profiles]);
    
    // Reset Form (except some defaults)
    setCertificates('');
    setEquipment('');
  };

  const handleDeleteProfile = (id: string) => {
    setProfiles(profiles.filter(p => p.id !== id));
  };

  const generateAIResume = (profile: SkillProfile) => {
    setIsGeneratingResume(true);
    setAiResume(null);
    setTimeout(() => {
      const equipStr = profile.equipmentOwned.length 
        ? `\n* **Equipped with**: ${profile.equipmentOwned.join(', ')}` 
        : '';
      const certStr = profile.certificates.length 
        ? `\n* **Credentials**: ${profile.certificates.join(' | ')}` 
        : '';

      const resumeContent = `
### ⚡ AI-Optimized Professional Summary
**${profile.skillName} Specialist**
*Highly rated provider with **${profile.experienceYears} years** of active execution. Known for an on-time record of exceptional service, fluent in ${profile.languages.join(', ')}.*

---

### 🛠️ Execution Capabilities
* **Core Competency**: Advanced techniques in ${profile.skillName.toLowerCase()}.${equipStr}${certStr}
* **Availability Windows**: ${profile.availability.join(', ')}
* **Portfolio Hub**: [View Live Showcase](${profile.portfolioLink})

---

### 📈 Smart Gig Recommendations
Based on historical platform matching, this profile is a **95%+ match** for:
1. High-tier private clients requesting premium service delivery.
2. Short-notice weekend booking slots at a **1.2x demand multiplier**.
      `;
      setAiResume(resumeContent);
      setIsGeneratingResume(false);
    }, 1200);
  };

  const calculateAIPricing = (skill: string) => {
    // Basic rules to mock intelligent response
    const name = skill.toLowerCase();
    let avg = 45;
    let min = 20;
    let max = 95;
    let demand: 'High' | 'Moderate' | 'Low' | 'Peak Season' = 'Moderate';
    let justification = '';

    if (name.includes('photo') || name.includes('video') || name.includes('drone')) {
      avg = 65;
      min = 35;
      max = 140;
      demand = 'Peak Season';
      justification = 'High volume of weekend events and summer outdoor shoots driving up average photographer bookings by 24%.';
    } else if (name.includes('code') || name.includes('web') || name.includes('dev') || name.includes('program')) {
      avg = 70;
      min = 40;
      max = 160;
      demand = 'High';
      justification = 'Immediate tech support requests and custom React storefront patches are commanding premium rates.';
    } else if (name.includes('drive') || name.includes('chauffeur') || name.includes('delivery')) {
      avg = 28;
      min = 18;
      max = 55;
      demand = 'High';
      justification = 'Fuel index updates and airport transport requests are elevated during peak travel hours (4 PM - 9 PM).';
    } else if (name.includes('repair') || name.includes('plumb') || name.includes('electric') || name.includes('tech')) {
      avg = 55;
      min = 30;
      max = 110;
      demand = 'Moderate';
      justification = 'Steady residential repair demand. Emergency bookings see a standard 1.5x call-out pricing boost.';
    } else {
      // Default
      avg = 35;
      min = 15;
      max = 80;
      demand = 'Moderate';
      justification = 'Stable local market matching rate. Recommend starting at average rates to build up initial platform reviews.';
    }

    const suggested = Math.round(avg * (1 + (experience > 5 ? 0.25 : experience > 2 ? 0.1 : -0.15)));

    setPricingSuggestion({
      avg,
      min,
      premium: max,
      suggested,
      demand,
      justification
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Profile Creator Form */}
        <div className="flex-1 glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
              <Briefcase size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Multi-Service Profile Setup</h2>
              <p className="text-sm text-slate-400">Register your skills to start receiving auto-matched gigs</p>
            </div>
          </div>

          <form onSubmit={handleAddProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Skill or Profession
              </label>
              <select
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                className="w-full glass-input rounded-lg p-2.5 text-slate-200"
              >
                <option value="Wedding Photography">Wedding Photography</option>
                <option value="Drone Operator">Drone Operator</option>
                <option value="Private Chauffeur">Private Chauffeur</option>
                <option value="Website Maintenance">Website Maintenance</option>
                <option value="Computer Repair">Computer Repair</option>
                <option value="Event DJ">Event DJ</option>
                <option value="French Translator">French Translator</option>
                <option value="Fitness Trainer">Fitness Trainer</option>
                <option value="Academic Tutor">Academic Tutor</option>
                <option value="Pet Caretaker">Pet Caretaker</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={experience}
                  onChange={(e) => setExperience(parseInt(e.target.value) || 0)}
                  className="w-full glass-input rounded-lg p-2.5 text-slate-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  min="5"
                  max="500"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseInt(e.target.value) || 0)}
                  className="w-full glass-input rounded-lg p-2.5 text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Certificates / Licenses (Comma separated)
              </label>
              <input
                type="text"
                placeholder="FAA Part 107, CPR Certification, AWS Developer..."
                value={certificates}
                onChange={(e) => setCertificates(e.target.value)}
                className="w-full glass-input rounded-lg p-2.5 text-slate-200 placeholder-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Equipment Owned (Comma separated)
              </label>
              <input
                type="text"
                placeholder="Sony A7 IV, Ladder, Pickup Truck, Toolset..."
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                className="w-full glass-input rounded-lg p-2.5 text-slate-200 placeholder-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Languages Spoken
              </label>
              <input
                type="text"
                placeholder="English, Spanish, Hindi..."
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                className="w-full glass-input rounded-lg p-2.5 text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Digital Portfolio Link
              </label>
              <input
                type="url"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                className="w-full glass-input rounded-lg p-2.5 text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Availability Windows
              </label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {['Available Today', 'Available Tomorrow', 'Weekend Only', 'Evenings', 'Morning'].map((time) => (
                  <button
                    type="button"
                    key={time}
                    onClick={() => toggleAvailability(time)}
                    className={`text-xs py-2 px-3 rounded-lg border transition-all duration-150 ${
                      availabilities.includes(time)
                        ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium py-3 rounded-xl transition shadow-lg shadow-indigo-900/20"
            >
              <Plus size={18} /> Add Skill to Profile
            </button>
          </form>
        </div>

        {/* AI Pricing Assistant Column */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          
          {/* AI PRICING ASSISTANT */}
          <div className="glass-panel-glow p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-indigo-400 fill-indigo-400/20" size={20} />
              <h3 className="font-bold text-slate-200">AI Pricing Assistant</h3>
            </div>

            {pricingSuggestion && (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Suggested Rate</p>
                    <p className="text-2xl font-black text-indigo-300">${pricingSuggestion.suggested}<span className="text-sm font-normal text-slate-500">/hr</span></p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {pricingSuggestion.demand} Demand
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Platform Minimum</span>
                    <span className="text-slate-300 font-semibold">${pricingSuggestion.min}/hr</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Market Average</span>
                    <span className="text-slate-300 font-semibold">${pricingSuggestion.avg}/hr</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Premium / Expert Tier</span>
                    <span className="text-indigo-400 font-semibold">${pricingSuggestion.premium}/hr</span>
                  </div>
                </div>

                <div className="p-3 bg-indigo-950/20 rounded-xl border border-indigo-900/30 text-xs text-slate-300 leading-relaxed flex gap-2">
                  <AlertCircle size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                  <p>{pricingSuggestion.justification}</p>
                </div>
              </div>
            )}
          </div>

          {/* AI RESUME GENERATOR */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="text-violet-400" size={20} />
              <h3 className="font-bold text-slate-200">AI Instant Resume</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Combine your active skills to auto-generate a comprehensive professional profile tailored for clients.
            </p>
            
            {aiResume ? (
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs space-y-3 max-h-60 overflow-y-auto font-sans leading-relaxed text-slate-300">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
                  <span className="text-indigo-400 font-semibold">Generated Resume</span>
                  <button onClick={() => setAiResume(null)} className="text-[10px] text-slate-500 hover:text-slate-400">Clear</button>
                </div>
                {aiResume.split('\n').map((line, idx) => {
                  if (line.startsWith('###')) return <h4 key={idx} className="font-bold text-slate-200 text-sm mt-3 mb-1">{line.replace('###', '')}</h4>;
                  if (line.startsWith('**')) return <p key={idx} className="font-semibold text-slate-100">{line.replace(/\*\*/g, '')}</p>;
                  if (line.startsWith('*')) return <li key={idx} className="list-disc ml-3 my-0.5">{line.replace(/\*/g, '')}</li>;
                  return <p key={idx}>{line}</p>;
                })}
              </div>
            ) : (
              <button
                onClick={() => generateAIResume(profiles[0])}
                disabled={isGeneratingResume || profiles.length === 0}
                className="w-full py-2.5 px-4 bg-slate-850 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-850 text-slate-300 font-medium text-xs rounded-xl transition border border-slate-700 flex items-center justify-center gap-2"
              >
                {isGeneratingResume ? 'Analysing Profiles...' : 'Compile AI Resume Summary'}
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Active Profiles Display */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
          <span>Registered Skill Listings</span>
          <span className="text-xs font-normal text-slate-500">({profiles.length} skills on this account)</span>
        </h3>
        
        {profiles.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            No registered skills. Add a skill above to begin.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profiles.map((prof) => (
              <div key={prof.id} className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-200">{prof.skillName}</h4>
                      {prof.verified && (
                        <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-500/20 flex items-center gap-1">
                          <CheckCircle size={10} className="fill-indigo-400/25" /> Verified
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteProfile(prof.id)}
                      className="text-slate-600 hover:text-red-400 transition p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs py-1 border-y border-slate-900">
                    <div>
                      <span className="block text-slate-500 text-[10px] uppercase">Experience</span>
                      <span className="font-semibold text-slate-300">{prof.experienceYears} Years</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-[10px] uppercase">Rate</span>
                      <span className="font-semibold text-indigo-400">${prof.hourlyRate}/hr</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-[10px] uppercase">Rating</span>
                      <span className="font-semibold text-amber-400">★ {prof.rating}</span>
                    </div>
                  </div>

                  {prof.equipmentOwned.length > 0 && (
                    <p className="text-xs text-slate-400">
                      <strong className="text-slate-500">Gear:</strong> {prof.equipmentOwned.join(', ')}
                    </p>
                  )}
                  {prof.certificates.length > 0 && (
                    <p className="text-xs text-slate-400">
                      <strong className="text-slate-500">Certs:</strong> {prof.certificates.join(', ')}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-900 flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {prof.availability.map(av => (
                      <span key={av} className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded">
                        {av}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => generateAIResume(prof)}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                  >
                    <Sparkles size={10} /> Resume Summary
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
