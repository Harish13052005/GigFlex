import React, { useState } from 'react';
import { initialDisputes, initialTransactions, Dispute, Transaction } from '../utils/MockData';
import { ShieldCheck, MessageSquare, Scale, Upload, AlertCircle, TrendingUp, Check, X, ShieldAlert, RefreshCw } from 'lucide-react';


interface FinancialsProps {
  transactions: Transaction[];
  onTransactionsUpdated: (txs: Transaction[]) => void;
}

export const Financials: React.FC<FinancialsProps> = ({ transactions, onTransactionsUpdated }) => {
  const [disputes, setDisputes] = useState<Dispute[]>(initialDisputes);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(disputes[0]);
  const [evidenceInput, setEvidenceInput] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [verdictLog, setVerdictLog] = useState<string | null>(null);
  const [verdictWinner, setVerdictWinner] = useState<'worker' | 'employer' | null>(null);
  const [isResolving, setIsResolving] = useState(false);

  // Send dispute message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDispute || !chatInput) return;

    const newMessage = {
      sender: 'Worker (You)',
      message: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedDisputes = disputes.map(d => {
      if (d.id === selectedDispute.id) {
        return {
          ...d,
          chatHistory: [...d.chatHistory, newMessage]
        };
      }
      return d;
    });

    setDisputes(updatedDisputes);
    const matchedDisp = updatedDisputes.find(d => d.id === selectedDispute.id);
    if (matchedDisp) setSelectedDispute(matchedDisp);
    setChatInput('');
  };

  // Add evidence Link
  const handleAddEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDispute || !evidenceInput) return;

    const updatedDisputes = disputes.map(d => {
      if (d.id === selectedDispute.id) {
        return {
          ...d,
          evidence: [...d.evidence, evidenceInput]
        };
      }
      return d;
    });

    setDisputes(updatedDisputes);
    const matchedDisp = updatedDisputes.find(d => d.id === selectedDispute.id);
    if (matchedDisp) setSelectedDispute(matchedDisp);
    setEvidenceInput('');
  };

  // Simulate platform ruling
  const handleSimulateRuling = (winner: 'worker' | 'employer') => {
    if (!selectedDispute) return;
    setIsResolving(true);
    setVerdictLog(null);

    setTimeout(() => {
      setIsResolving(false);
      setVerdictWinner(winner);

      const decisionLog = winner === 'worker'
        ? `Platform Admin Verdict: Resolving dispute dsp1 in favor of Worker John Doe. Evidence shows description did not mandate baseboard detail cleaning, and the worker completed the documented 6-hour vacuum and wash. Releasing $300 to worker wallet.`
        : `Platform Admin Verdict: Resolving dispute dsp1 in favor of Employer Smith Builders. Photographic evidence indicates residual masonry dust and paint residue which constitutes safety violations. Releasing $300 refund to employer.`;

      setVerdictLog(decisionLog);

      // Create transaction reflecting ruling
      const transactionId = `tx-dispute-resolve-${Date.now()}`;
      const newTx: Transaction = {
        id: transactionId,
        jobId: selectedDispute.jobId,
        type: winner === 'worker' ? 'earning' : 'refund',
        amount: selectedDispute.amount,
        date: new Date().toISOString().split('T')[0],
        status: 'released',
        details: winner === 'worker' 
          ? `Payout released from dispute resolution (Favor of Worker)` 
          : `Refund issued from dispute resolution (Favor of Employer)`
      };

      onTransactionsUpdated([newTx, ...transactions]);

      // Update dispute status
      const updatedDisputes = disputes.map(d => {
        if (d.id === selectedDispute.id) {
          return {
            ...d,
            status: winner === 'worker' ? ('resolved_worker' as const) : ('resolved_employer' as const)
          };
        }
        return d;
      });
      setDisputes(updatedDisputes);
      const matched = updatedDisputes.find(d => d.id === selectedDispute.id);
      if (matched) setSelectedDispute(matched);

    }, 2000);
  };

  const getEscrowTotal = () => {
    return transactions
      .filter(tx => tx.status === 'pending_escrow')
      .reduce((sum, tx) => sum + tx.amount, 0);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Financial overview row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-indigo-500/5 to-transparent pointer-events-none" />
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Escrow Holdings</p>
          <p className="text-3xl font-black text-indigo-400">${getEscrowTotal()}</p>
          <p className="text-[10px] text-slate-500 flex items-center gap-1">
            <ShieldCheck size={12} className="text-indigo-400" /> Funds protected under smart mediation
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Disbursed Earnings</p>
          <p className="text-3xl font-black text-emerald-400">
            ${transactions
              .filter(tx => tx.type === 'earning' && tx.status === 'released')
              .reduce((sum, tx) => sum + tx.amount, 0)}
          </p>
          <p className="text-[10px] text-slate-500">Processed directly to linked bank accounts</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Disputes</p>
          <p className="text-3xl font-black text-amber-500">
            {disputes.filter(d => d.status === 'pending').length}
          </p>
          <p className="text-[10px] text-slate-500">Milestones held pending platform resolution</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left: Transaction Logs */}
        <div className="flex-1 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-200 text-sm">Escrow & Wallet Transactions</h3>
          
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {transactions.map(tx => (
              <div key={tx.id} className="bg-slate-950/40 border border-slate-850 rounded-xl p-3.5 flex justify-between items-center text-xs">
                <div className="space-y-1">
                  <p className="font-bold text-slate-200">{tx.details}</p>
                  <p className="text-[10px] text-slate-500">{tx.date} | ID: {tx.id}</p>
                </div>
                <div className="text-right space-y-1 shrink-0">
                  <p className={`font-black text-sm ${
                    tx.type === 'earning' ? 'text-emerald-400' : 'text-slate-350'
                  }`}>
                    {tx.type === 'earning' ? '+' : '-'}${tx.amount}
                  </p>
                  <span className={`inline-block text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${
                    tx.status === 'released'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : tx.status === 'pending_escrow'
                      ? 'bg-indigo-500/10 text-indigo-400'
                      : 'bg-slate-900 text-slate-500'
                  }`}>
                    {tx.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Dispute Resolution Center */}
        <div className="w-full lg:w-[480px] glass-panel p-6 rounded-2xl border border-slate-800 shrink-0 space-y-5">
          <div className="flex items-center gap-2">
            <Scale className="text-amber-500" size={18} />
            <h3 className="font-bold text-slate-200 text-sm">Escrow Dispute Mediation</h3>
          </div>

          {selectedDispute ? (
            <div className="space-y-4">
              
              {/* Dispute Metadata */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-200 text-xs">{selectedDispute.jobTitle}</h4>
                    <p className="text-[10px] text-slate-500">Mediation ID: {selectedDispute.id}</p>
                  </div>
                  <span className="text-xs font-black text-amber-500">${selectedDispute.amount}</span>
                </div>
                <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded border border-slate-900 leading-relaxed">
                  {selectedDispute.details}
                </p>
              </div>

              {/* Chat Log History */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Mediation Chat Logs</p>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 h-32 overflow-y-auto space-y-2 text-xs">
                  {selectedDispute.chatHistory.map((msg, idx) => (
                    <div key={idx} className={`space-y-0.5 ${msg.sender.includes('You') ? 'text-right' : 'text-left'}`}>
                      <span className="text-[9px] text-slate-500 font-bold block">{msg.sender} • {msg.time}</span>
                      <span className={`inline-block px-2.5 py-1.5 rounded-lg ${
                        msg.sender.includes('You') 
                          ? 'bg-indigo-600/25 border border-indigo-500/20 text-indigo-300'
                          : 'bg-slate-900 border border-slate-800 text-slate-350'
                      }`}>
                        {msg.message}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Send message form */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter response message to employer..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 glass-input rounded-lg text-xs p-2 text-slate-200"
                />
                <button type="submit" className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-4 rounded-lg font-bold">
                  Send
                </button>
              </form>

              {/* Evidence Upload Simulator */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Submitted Proof/Files</p>
                <div className="flex flex-wrap gap-2">
                  {selectedDispute.evidence.map((ev, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="text-[10px] bg-slate-950 text-indigo-400 hover:underline px-2.5 py-1.5 rounded border border-slate-850 block max-w-full truncate"
                    >
                      📄 Proof {idx + 1} ({ev.split('/').pop()?.slice(0, 15)}...)
                    </a>
                  ))}
                </div>

                <form onSubmit={handleAddEvidence} className="flex gap-2 pt-1">
                  <input
                    type="url"
                    placeholder="Paste URL link of invoice, photo, or contract proof..."
                    value={evidenceInput}
                    onChange={(e) => setEvidenceInput(e.target.value)}
                    className="flex-1 glass-input rounded-lg text-xs p-2 text-slate-200"
                  />
                  <button type="submit" className="bg-slate-850 border border-slate-700 text-slate-400 hover:text-slate-300 text-xs p-2 rounded-lg flex items-center gap-1">
                    <Upload size={12} /> Submit
                  </button>
                </form>
              </div>

              {/* Verdict actions */}
              <div className="pt-4 border-t border-slate-900 space-y-4">
                {selectedDispute.status === 'pending' ? (
                  <div className="space-y-2.5">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">
                      AI Arbitrage Mediation Panel (Platform Override)
                    </p>
                    
                    {isResolving ? (
                      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 py-3">
                        <RefreshCw className="animate-spin text-amber-500" size={16} /> Evaluating evidence documents...
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSimulateRuling('worker')}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl transition"
                        >
                          Rule for Worker
                        </button>
                        <button
                          onClick={() => handleSimulateRuling('employer')}
                          className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-2.5 rounded-xl transition"
                        >
                          Rule for Employer
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-emerald-500/10 border border-emerald-500/25 p-3.5 rounded-xl flex gap-2 text-xs text-emerald-400">
                    <ShieldCheck size={16} className="shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Dispute Resolved</p>
                      <p className="text-[10px] text-emerald-400/80 mt-0.5 uppercase">
                        Status: {selectedDispute.status.replace('resolved_', 'Winner: ')}
                      </p>
                    </div>
                  </div>
                )}

                {verdictLog && (
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 text-[11px] text-slate-400 leading-relaxed flex gap-2">
                    <AlertCircle size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                    <p>{verdictLog}</p>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <p className="text-xs text-slate-500 text-center py-10">No disputed contracts found.</p>
          )}
        </div>

      </div>

    </div>
  );
};
