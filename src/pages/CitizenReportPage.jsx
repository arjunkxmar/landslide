import React, { useState } from 'react';
import { 
  Camera, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Upload, 
  ShieldCheck, 
  Clock, 
  User, 
  FileText, 
  Send, 
  Image as ImageIcon,
  ThumbsUp,
  Radio,
  Crosshair,
  Compass,
  X,
  Sparkles,
  PhoneCall,
  Activity
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export default function CitizenReportPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    locationName: '',
    incidentType: 'Landslide',
    description: '',
    gpsLocation: '',
    photoUrl: null,
    urgency: 'High'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [reportTicket, setReportTicket] = useState(null);
  const [cameraModalOpen, setCameraModalOpen] = useState(false);

  // Sample community reports feed
  const [communityReports, setCommunityReports] = useState([
    {
      id: 'REP-2026-784',
      name: 'Ramesh K. (Tea Plantation Supervisor)',
      location: 'Chooralmala Lower Slope, Wayanad',
      incidentType: 'Ground Crack',
      severity: 'Critical',
      description: 'Noticed a 15-meter long longitudinal tension fissure expanding across tea terrace 4. Muddy water seepage bubbling from lower toe.',
      timestamp: '28 mins ago',
      gps: '11.5512° N, 76.1290° E',
      status: 'VERIFIED BY PATROL',
      statusColor: 'emerald',
      upvotes: 24,
      image: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 'REP-2026-783',
      name: 'Anjali Sharma (Local Resident)',
      location: 'Near Summer Hill Post Office, Shimla',
      incidentType: 'Road Blockage',
      severity: 'High',
      description: 'Fallen pine tree and 50 tons of mud blocking the municipal road. Electricity pole leaning precariously.',
      timestamp: '1 hour ago',
      gps: '31.1032° N, 77.1350° E',
      status: 'ACTION DISPATCHED',
      statusColor: 'amber',
      upvotes: 18,
      image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 'REP-2026-782',
      name: 'Tashi Namgyal (BRO Driver)',
      location: 'NH-10 km 32 Sevoke Corridor, Sikkim',
      incidentType: 'Falling Rocks',
      severity: 'Moderate',
      description: 'Intermittent loose shale rockfall on the mountain-facing lane. Vehicles currently negotiating single file.',
      timestamp: '2 hours ago',
      gps: '26.8912° N, 88.4610° E',
      status: 'UNDER EVALUATION',
      statusColor: 'blue',
      upvotes: 12,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=60'
    }
  ]);

  const incidentTypes = [
    { id: 'Landslide', icon: '⛰️', desc: 'Active slope slide / debris avalanche' },
    { id: 'Road Blockage', icon: '🛣️', desc: 'Mud or boulder obstruction on roadway' },
    { id: 'Ground Crack', icon: '⚡', desc: 'Tension fissure / foundation settlement' },
    { id: 'Falling Rocks', icon: '🪨', desc: 'Spalling boulders from overhang' },
    { id: 'Flooding', icon: '🌊', desc: 'Debris-laden torrent or flash surge' }
  ];

  const handleAutoGPS = () => {
    soundManager?.playClick?.();
    setFormData(prev => ({
      ...prev,
      gpsLocation: '11.5543° N, 76.1264° E (Accuracy: ±4.2m)'
    }));
  };

  const handleCaptureArPhoto = () => {
    soundManager?.playClick?.();
    setFormData(prev => ({
      ...prev,
      photoUrl: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?w=600&auto=format&fit=crop&q=60',
      gpsLocation: '11.5543° N, 76.1264° E (Pitch: +38°, Bearing: 44° NE)'
    }));
    setCameraModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.locationName || !formData.description) {
      alert('Please fill in your Name, Location, and Incident Description.');
      return;
    }

    setIsSubmitting(true);
    soundManager?.playClick?.();

    setTimeout(() => {
      const ticket = 'CITIZEN-REP-' + Math.floor(10000 + Math.random() * 90000);
      setReportTicket(ticket);
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      soundManager?.playAlert?.();

      const newReport = {
        id: ticket,
        name: formData.name,
        location: formData.locationName,
        incidentType: formData.incidentType,
        severity: formData.urgency,
        description: formData.description,
        timestamp: 'Just now',
        gps: formData.gpsLocation || '11.5543° N, 76.1264° E',
        status: 'SUBMITTED TO NDMA',
        statusColor: 'emerald',
        upvotes: 1,
        image: formData.photoUrl || 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop&q=60'
      };

      setCommunityReports(prev => [newReport, ...prev]);
    }, 1000);
  };

  const handleResetForm = () => {
    soundManager?.playClick?.();
    setFormData({
      name: '',
      phone: '',
      locationName: '',
      incidentType: 'Landslide',
      description: '',
      gpsLocation: '',
      photoUrl: null,
      urgency: 'High'
    });
    setSubmittedSuccess(false);
    setReportTicket(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-border pb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              Crowdsourced Field Ground Intelligence
            </span>
            <span className="text-xs text-dark-muted">•</span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Direct NDMA / SDMA Priority Link
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5 mt-1.5 font-display">
            <Camera className="w-7 h-7 text-amber-400" />
            Citizen & Field Incident Reporting Console
          </h1>
          <p className="text-xs sm:text-sm text-dark-muted mt-1 max-w-2xl">
            Empowering residents and ground patrols to log tension cracks, rockfalls, and road blocks with geotagged EXIF verification.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          {/* Button to open AR Viewfinder */}
          <button
            onClick={() => {
              soundManager?.playClick?.();
              setCameraModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-cyan-500/20 text-xs font-mono font-bold transition-all cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.2)]"
          >
            <Crosshair className="w-4 h-4 text-cyan-400" />
            <span>Open AR Geotag Viewfinder</span>
          </button>

          <div className="text-xs font-mono text-dark-muted bg-dark-bg px-3.5 py-2 rounded-xl border border-dark-border">
            🚨 Hotline: 1077 / 112
          </div>
        </div>
      </div>

      {/* Main Grid: Report Form + Community Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Reporting Form */}
        <div className="lg:col-span-6 p-6 rounded-2xl glass-panel border border-dark-border space-y-5">
          {!submittedSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between border-b border-dark-border pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Submit Hazardous Incident Report</span>
                </h3>
                <span className="text-xs font-mono text-dark-muted">All submissions encrypted</span>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-xs text-white placeholder-dark-muted focus:outline-none focus:border-amber-400 transition-colors font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Contact Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-xs text-white placeholder-dark-muted focus:outline-none focus:border-amber-400 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Location Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Incident Location / Landmark *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meppadi-Chooralmala Link Bridge near Tea Estate"
                  value={formData.locationName}
                  onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-xs text-white placeholder-dark-muted focus:outline-none focus:border-amber-400 transition-colors font-mono"
                />
              </div>

              {/* Incident Type Selectors */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Incident Classification *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {incidentTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        soundManager?.playClick?.();
                        setFormData({ ...formData, incidentType: type.id });
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        formData.incidentType === type.id
                          ? 'bg-amber-500/15 border-amber-400 text-white shadow-sm'
                          : 'bg-dark-bg/80 border-dark-border text-dark-muted hover:border-dark-hover'
                      }`}
                    >
                      <div className="text-base">{type.icon}</div>
                      <div className="text-xs font-bold mt-1 font-mono">{type.id}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* GPS Geolocation with Auto-Detect Simulator */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-300">GPS Coordinates</label>
                  <button
                    type="button"
                    onClick={handleAutoGPS}
                    className="text-cyan-400 font-mono hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Auto-Detect My GPS</span>
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="e.g. 11.5543° N, 76.1264° E"
                  value={formData.gpsLocation}
                  onChange={(e) => setFormData({ ...formData, gpsLocation: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-xs font-mono text-white placeholder-dark-muted focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              {/* Incident Description */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Description of Hazard / Visual Signs *</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Describe slope cracks, mud consistency, road obstacles, sound of cracking trees, or bubbling water..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-xs text-white placeholder-dark-muted focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Photo Upload with live preview & AR camera trigger */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-300">Field Photo Upload</label>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager?.playClick?.();
                      setCameraModalOpen(true);
                    }}
                    className="text-cyan-400 text-[11px] font-mono hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Crosshair className="w-3 h-3" />
                    <span>Launch Geotag Camera</span>
                  </button>
                </div>

                {formData.photoUrl ? (
                  <div className="relative rounded-xl overflow-hidden border border-dark-border h-36">
                    <img
                      src={formData.photoUrl}
                      alt="Field Sighting"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, photoUrl: null })}
                      className="absolute top-2 right-2 px-2.5 py-1 rounded bg-black/80 text-rose-400 text-xs font-mono cursor-pointer border border-rose-500/30"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => {
                      soundManager?.playClick?.();
                      setCameraModalOpen(true);
                    }}
                    className="border-2 border-dashed border-dark-border hover:border-amber-400/60 rounded-xl p-5 text-center cursor-pointer bg-dark-bg/60 transition-colors"
                  >
                    <Camera className="w-6 h-6 text-dark-muted mx-auto mb-1.5" />
                    <span className="text-xs text-slate-300 block font-semibold">Click to open AR Viewfinder or attach photo</span>
                    <span className="text-[10px] text-dark-muted block mt-0.5 font-mono">(Includes automatic compass & slope pitch timestamp)</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:from-amber-500 hover:via-orange-500 hover:to-rose-500 text-white font-black text-xs tracking-wide shadow-lg shadow-orange-950/40 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 font-mono"
                >
                  {isSubmitting ? (
                    <>
                      <Radio className="w-4 h-4 animate-spin text-white" />
                      <span>TRANSMITTING REPORT TO NDMA CONTROL...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>SUBMIT FIELD HAZARD REPORT</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Submission Confirmation Screen */
            <div className="text-center py-8 space-y-5 animate-fadeIn">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white font-display">
                  Report Successfully Logged
                </h3>
                <p className="text-xs text-dark-muted max-w-md mx-auto mt-2 leading-relaxed">
                  Your ground observation has been logged into the National Disaster Response Force (NDRF) & District Emergency Operations Center (DEOC) queue for immediate verification.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-dark-bg border border-emerald-500/30 max-w-sm mx-auto text-left font-mono text-xs space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-dark-muted">Tracking Ref:</span>
                  <span className="text-emerald-400 font-bold">{reportTicket}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-muted">Incident Category:</span>
                  <span className="text-white">{formData.incidentType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-muted">Location:</span>
                  <span className="text-white truncate max-w-[160px]">{formData.locationName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-muted">Status:</span>
                  <span className="text-cyan-400 font-bold">DISPATCHED TO FIELD PATROL</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-6 py-2.5 rounded-xl bg-dark-card hover:bg-dark-hover text-white font-semibold text-xs border border-dark-border transition-colors cursor-pointer font-mono"
                >
                  Submit Another Incident Report
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Community Sightings & Verification Feed */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-2xl glass-panel border border-dark-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="text-sm font-bold text-white font-display">Recent Community Field Sightings</h3>
                <p className="text-[11px] text-dark-muted">Crowdsourced reports verified by local panchayats & PWD</p>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
              Live Feed
            </span>
          </div>

          {/* Feed List */}
          <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
            {communityReports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-2xl glass-panel border border-dark-border space-y-3 hover:border-dark-hover transition-all text-left"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        {report.incidentType}
                      </span>
                      <span className="text-xs font-mono text-dark-muted">{report.id}</span>
                      <span className="text-xs font-mono text-dark-muted">• {report.timestamp}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1 font-display">{report.location}</h4>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                    {report.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  "{report.description}"
                </p>

                {report.image && (
                  <div className="relative rounded-xl overflow-hidden h-36 border border-dark-border">
                    <img
                      src={report.image}
                      alt="Hazard Evidence"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-slate-300 backdrop-blur-sm border border-dark-border">
                      {report.gps}
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-dark-border flex items-center justify-between text-xs font-mono text-dark-muted">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-dark-muted" />
                    <span>Reported by {report.name}</span>
                  </div>

                  <button
                    onClick={() => soundManager?.playClick?.()}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-bg border border-dark-border hover:border-dark-hover text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-3 h-3 text-cyan-400" />
                    <span>Confirm Sighting ({report.upvotes})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AR Geotagged Camera Viewfinder Modal */}
      {cameraModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl glass-panel border border-cyan-500/40 p-5 space-y-4 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
            <div className="flex items-center justify-between border-b border-dark-border pb-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
                <Crosshair className="w-4 h-4" />
                <span>FIELD AR GEOTAG VIEWFINDER</span>
              </div>
              <button
                onClick={() => setCameraModalOpen(false)}
                className="p-1.5 text-dark-muted hover:text-white cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Viewfinder Screen */}
            <div className="relative rounded-2xl overflow-hidden h-72 border-2 border-cyan-500/50 bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1516214104703-d870798883c5?w=800&auto=format&fit=crop&q=80"
                alt="Camera Feed"
                className="w-full h-full object-cover opacity-80"
              />

              {/* HUD Reticle Overlay */}
              <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                <div className="flex justify-between text-[11px] font-mono text-cyan-300 bg-black/70 backdrop-blur-sm p-2 rounded-lg border border-cyan-500/30">
                  <div>
                    <span>LAT: 11.5543° N</span> <br />
                    <span>LNG: 76.1264° E</span>
                  </div>
                  <div className="text-right">
                    <span>ALT: 1,120m MSL</span> <br />
                    <span>HEADING: 44° NE</span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-2 border-dashed border-cyan-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300 bg-black/80 px-2 py-0.5 rounded mt-2 border border-cyan-500/30">
                    SLOPE PITCH: +38° (STEEP)
                  </span>
                </div>

                <div className="flex justify-between text-[10px] font-mono text-dark-muted bg-black/70 p-1.5 rounded border border-dark-border">
                  <span>WATERMARK: NDMA-GEO-VERIFIED</span>
                  <span>{new Date().toLocaleTimeString()} IST</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-dark-muted font-mono">
                Auto-calibrates EXIF slope pitch & location
              </span>
              <button
                type="button"
                onClick={handleCaptureArPhoto}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-950/50 cursor-pointer transition-all font-mono"
              >
                <Camera className="w-4 h-4" />
                <span>CAPTURE & EMBED GEOTAG</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
