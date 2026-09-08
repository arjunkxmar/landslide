import React, { useState } from 'react';
import { 
  AlertTriangle, 
  BellRing, 
  CheckCircle2, 
  Radio, 
  Send, 
  ShieldAlert, 
  X, 
  Volume2, 
  Smartphone, 
  Code2, 
  Layers,
  Copy,
  Check
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

export default function EmergencyModal({ isOpen, onClose, alertData }) {
  const [activeTab, setActiveTab] = useState('dispatch'); // 'dispatch' | 'mobile_preview' | 'cap_xml'
  const [copiedCode, setCopiedCode] = useState(false);

  const [selectedChannels, setSelectedChannels] = useState({
    smsBroadcast: true,
    ndrfMobilize: true,
    sirenActivate: true,
    policeBarricades: true,
    districtCollector: true
  });

  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchedSuccess, setDispatchedSuccess] = useState(false);
  const [dispatchTicket, setDispatchTicket] = useState(null);

  if (!isOpen) return null;

  const defaultData = {
    title: alertData?.title || 'CRITICAL LANDSLIDE EVACUATION DISPATCH',
    location: alertData?.location || 'Wayanad Meppadi Ridge (Sector 4), Kerala',
    riskScore: alertData?.riskScore || 92,
    riskLevel: alertData?.riskLevel || 'CRITICAL'
  };

  const handleToggle = (key) => {
    setSelectedChannels(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDispatch = () => {
    setIsDispatching(true);
    soundManager.playCriticalWarning();

    setTimeout(() => {
      setIsDispatching(false);
      setDispatchedSuccess(true);
      const ticketId = 'NDMA-CAP-DISPATCH-' + Math.floor(100000 + Math.random() * 900000);
      setDispatchTicket(ticketId);
    }, 1200);
  };

  const handleClose = () => {
    setDispatchedSuccess(false);
    setIsDispatching(false);
    setDispatchTicket(null);
    onClose();
  };

  const capXmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
<alert xmlns="urn:oasis:names:tc:emergency:cap:1.2">
  <identifier>NDMA-LANDSLIDEGUARD-2026-0908</identifier>
  <sender>deoc@ndma.gov.in</sender>
  <sent>${new Date().toISOString()}</sent>
  <status>Actual</status>
  <msgType>Alert</msgType>
  <scope>Public</scope>
  <info>
    <category>Geo</category>
    <event>Debris Avalanche & Landslide Surge</event>
    <urgency>Immediate</urgency>
    <severity>Extreme</severity>
    <certainty>Observed</certainty>
    <headline>${defaultData.title}</headline>
    <description>Hydraulic pore saturation exceeds 94% with progressive shear strain along slope. Mandatory Stage-2 evacuation active.</description>
    <area>
      <areaDesc>${defaultData.location}</areaDesc>
      <circle>11.5543,76.1264,15.0</circle>
    </area>
  </info>
</alert>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(capXmlPayload);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl glass-panel border border-rose-500/40 shadow-[0_0_60px_rgba(239,68,68,0.3)]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-rose-500/20 bg-gradient-to-r from-rose-950/60 via-slate-900/80 to-transparent">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono tracking-wider uppercase text-rose-400 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30">
                  SIH 2026 NDMA Command
                </span>
                <span className="text-[10px] font-mono text-cyan-400">CAP-India v1.2</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">Emergency Command Dispatch Center</h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/40 px-6 pt-2 gap-4 text-xs font-mono">
          <button
            onClick={() => setActiveTab('dispatch')}
            className={`pb-2.5 font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'dispatch'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Notification Vectors
          </button>
          <button
            onClick={() => setActiveTab('mobile_preview')}
            className={`pb-2.5 font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'mobile_preview'
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Broadcast Mockup</span>
          </button>
          <button
            onClick={() => setActiveTab('cap_xml')}
            className={`pb-2.5 font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'cap_xml'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>CAP-India OASIS XML</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* TAB 1: Dispatch View */}
          {activeTab === 'dispatch' && (
            <>
              {!dispatchedSuccess ? (
                <>
                  {/* Danger Zone Overview */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Target Danger Zone</span>
                        <h4 className="text-base font-bold text-white mt-0.5">{defaultData.location}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono text-rose-400 font-bold">Threat: {defaultData.riskScore}%</span>
                        <div className="text-[11px] text-slate-400">{defaultData.riskLevel}</div>
                      </div>
                    </div>
                  </div>

                  {/* Channels Selection */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                      Select Emergency Notification Vectors (CAP-India Compliant)
                    </label>
                    <div className="space-y-2.5">
                      {[
                        {
                          id: 'smsBroadcast',
                          title: 'Common Alerting Protocol (CAP) SMS Geo-Broadcast',
                          desc: 'Instant cell-broadcast SMS alert to all mobile devices within 15 km radius.'
                        },
                        {
                          id: 'ndrfMobilize',
                          title: 'NDRF 4th Battalion & State SDRF Mobilization',
                          desc: 'Direct dispatch order to District Incident Commander & rapid rescue platoon.'
                        },
                        {
                          id: 'sirenActivate',
                          title: 'Acoustic Disaster Siren Cluster Activation (120 dB)',
                          desc: 'Triggers synchronized warning sirens in downstream villages for evacuation.'
                        },
                        {
                          id: 'policeBarricades',
                          title: 'Ghat Highway Barricades & Traffic Police Diversion',
                          desc: 'Automated notification to BRO and Highway Police to seal high-risk entry points.'
                        },
                        {
                          id: 'districtCollector',
                          title: 'Priority Hotline to District Magistrate / DDMA',
                          desc: 'Emergency priority ping to District Control Room & disaster helplines.'
                        }
                      ].map((item) => (
                        <label
                          key={item.id}
                          onClick={() => handleToggle(item.id)}
                          className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                            selectedChannels[item.id]
                              ? 'bg-rose-500/10 border-rose-500/40 text-slate-200'
                              : 'bg-slate-900/40 border-slate-800 text-slate-500 hover:border-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={!!selectedChannels[item.id]}
                            onChange={() => {}}
                            className="mt-1 rounded accent-rose-500 cursor-pointer"
                          />
                          <div className="flex-1 text-sm">
                            <div className="font-semibold text-slate-100">{item.title}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={isDispatching}
                      onClick={handleDispatch}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(239,68,68,0.4)] disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {isDispatching ? (
                        <>
                          <Radio className="w-4 h-4 animate-spin text-white" />
                          <span>Transmitting Broadcast...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>TRANSMIT EMERGENCY BROADCAST</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                /* Success View */
                <div className="text-center py-6 space-y-4 animate-fadeIn">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Emergency Broadcast Successfully Transmitted</h4>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-1.5 leading-relaxed">
                      Authorities, district emergency operations centers, NDRF units, and downstream communities have been alerted under CAP protocol guidelines.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 max-w-md mx-auto text-left font-mono text-xs space-y-1 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Official Tracking ID:</span>
                      <span className="text-emerald-400 font-bold">{dispatchTicket}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Timestamp:</span>
                      <span>{new Date().toLocaleTimeString()} IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Vectors Triggered:</span>
                      <span className="text-cyan-400">
                        {Object.values(selectedChannels).filter(Boolean).length} / 5 Active
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-emerald-900/40 cursor-pointer"
                    >
                      Return to Command Console
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB 2: Mobile Citizen Alert Notification Mockup */}
          {activeTab === 'mobile_preview' && (
            <div className="py-2 space-y-4">
              <div className="text-center space-y-1">
                <h4 className="text-sm font-bold text-white">Citizen Cell-Broadcast Display Mockup</h4>
                <p className="text-xs text-slate-400">How affected citizens receive the high-priority geofenced alert</p>
              </div>

              <div className="max-w-xs mx-auto p-4 rounded-3xl bg-slate-950 border-4 border-slate-800 shadow-2xl space-y-3">
                <div className="w-16 h-1 bg-slate-800 rounded-full mx-auto mb-2" />
                <div className="text-center text-[10px] font-mono text-slate-500">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • NDMA EMERGENCY
                </div>

                {/* English Notification Banner */}
                <div className="p-3 rounded-2xl bg-rose-600 text-white shadow-lg space-y-1.5 text-left animate-pulse">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-black uppercase tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>EMERGENCY DISASTER ALERT</span>
                  </div>
                  <div className="text-xs font-bold leading-tight">
                    CRITICAL LANDSLIDE EVACUATION: {defaultData.location}
                  </div>
                  <p className="text-[10px] text-rose-100 leading-snug">
                    Torrential rain triggered soil liquefaction. Evacuate downstream areas immediately to nearest relief camp.
                  </p>
                </div>

                {/* Hindi Notification Banner */}
                <div className="p-3 rounded-2xl bg-slate-900 border border-rose-500/40 text-slate-200 space-y-1 text-left">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-rose-400 font-bold">
                    <span>🚨 राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA)</span>
                  </div>
                  <div className="text-xs font-bold text-white">
                    आपातकालीन भूस्खलन चेतावनी
                  </div>
                  <p className="text-[10px] text-slate-300 leading-snug">
                    अत्यधिक बारिश के कारण भूस्खलन का गंभीर खतरा। निचले इलाकों से तुरंत सुरक्षित राहत शिविरों की ओर जाएं।
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-400 text-center">
                  Emergency Call: 112 / 1077
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CAP-India OASIS XML Payload */}
          {activeTab === 'cap_xml' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">OASIS CAP v1.2 Compliant XML Payload</span>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'Copied' : 'Copy XML'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-72 leading-relaxed">
                {capXmlPayload}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
