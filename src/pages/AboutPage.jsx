import React, { useState } from 'react';
import { 
  Info, 
  Cpu, 
  Layers, 
  Compass, 
  CloudRain, 
  ShieldCheck, 
  Award, 
  Globe, 
  Radio, 
  ExternalLink,
  Zap,
  CheckCircle2,
  Users,
  Target,
  Presentation,
  X,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Activity
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export default function AboutPage({ setActivePage }) {
  const [pitchModalOpen, setPitchModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const technologies = [
    {
      title: 'Artificial Intelligence & Machine Learning',
      desc: 'Predictive time-series algorithms and gradient boosted risk classification calibrated on multi-decade geotechnical records.',
      icon: Cpu,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/30'
    },
    {
      title: 'Geographic Information Systems (GIS)',
      desc: 'High-resolution geospatial hazard cartography, topographic digital elevation models (DEM), and interactive polygon overlays.',
      icon: Compass,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/30'
    },
    {
      title: 'Automated Weather APIs & Satellite Telemetry',
      desc: 'Integration with Open-Meteo Global Forecast API, IMD Doppler radar grids, and automated tipping bucket rain gauges.',
      icon: CloudRain,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/30'
    },
    {
      title: 'Real-Time IoT Sensor Mesh',
      desc: 'Continuous geotechnical streaming from borehole tiltmeters, vibrating wire piezometers, and soil volumetric water content probes.',
      icon: Radio,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30'
    },
    {
      title: 'Common Alerting Protocol (CAP-India)',
      desc: 'Direct compliance with National Disaster Management Authority (NDMA) standards for synchronized sirens, SMS, and emergency broadcasts.',
      icon: ShieldCheck,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/30'
    },
    {
      title: 'Cloud Edge Computing & Resilient Ops',
      desc: 'Fault-tolerant distributed edge nodes designed to operate even during mountain cellular disruptions via local siren triggers.',
      icon: Zap,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/30'
    }
  ];

  const pitchSlides = [
    {
      title: '1. The Problem Statement & National Crisis',
      subtitle: 'Mountain Disasters in India (Wayanad, Joshimath, Himachal)',
      content: 'In 2024 alone, landslides in Wayanad and Himachal caused hundreds of preventable deaths. Existing early warnings rely purely on broad regional weather forecasts with zero ground-level geotechnical slope stability telemetry. Communities often have under 15 minutes of warning before deep-seated debris flows occur.',
      metric: 'Over 12.6% of India’s landmass across 19 States/UTs is prone to landslides (GSI Data).',
      badge: 'PROBLEM'
    },
    {
      title: '2. The LandslideGuard AI Solution',
      subtitle: 'Multi-Factor Sensor Fusion + Machine Learning',
      content: 'LandslideGuard AI connects automated rain gauges, borehole tiltmeters, and TDR soil moisture sensors into a continuous IoT mesh. Our neural risk engine analyzes pore water saturation, slope shear strain, and historical slip planes to classify risk from LOW to CRITICAL before physical collapse.',
      metric: 'Generates up to 3.5 hours of early evacuation lead time.',
      badge: 'SOLUTION'
    },
    {
      title: '3. Technical Novelty & Edge Resilience',
      subtitle: 'Physics-Informed Geotechnical AI + LoRaWAN Mesh',
      content: 'Unlike black-box models, LandslideGuard AI models hydraulic liquefaction thresholds and overburden shear strength (Factor of Safety < 1.0). In remote Himalayan canyons without cellular towers, our solar LiFePO4 nodes use LoRaWAN mesh fallback (865 MHz) to trigger 120dB acoustic village sirens directly.',
      metric: 'Operates 100% off-grid with 99.8% network uptime.',
      badge: 'NOVELTY'
    },
    {
      title: '4. Disaster Management Authority (NDMA) Alignment',
      subtitle: 'Common Alerting Protocol (CAP-India) Compliance',
      content: 'When a sector reaches CRITICAL status (>75%), LandslideGuard AI automatically formats OASIS CAP v1.2 XML alerts to trigger geofenced cell-broadcast SMS, notify NDRF rescue battalions, alert district magistrates, and guide travelers onto alternative detour bypasses.',
      metric: '100% compliant with NDMA 2023 Guidelines and UN Sendai Target G.',
      badge: 'IMPACT'
    },
    {
      title: '5. Scalability & National Deployment',
      subtitle: 'Phased Rollout Across Himalayan & Western Ghats Belts',
      content: 'Deployable in local village panchayats, Border Roads Organisation (BRO) highway corridors, Indian Railways mountain tracks, and hydroelectric dam slopes. Open API architecture ready for IMD Doppler and ISRO Bhuvan satellite DEM ingestion.',
      metric: 'Scalable to 1,500+ critical hazard points at 1/10th the cost of proprietary European radar rigs.',
      badge: 'DEPLOYMENT'
    }
  ];

  const handleNextSlide = () => {
    soundManager?.playClick?.();
    setCurrentSlide(prev => (prev + 1) % pitchSlides.length);
  };

  const handlePrevSlide = () => {
    soundManager?.playClick?.();
    setCurrentSlide(prev => (prev - 1 + pitchSlides.length) % pitchSlides.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fadeIn">
      {/* Top Header */}
      <div className="border-b border-dark-border pb-6 text-left flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>NATIONAL GEOTECHNICAL DISASTER MITIGATION PLATFORM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
            About LandslideGuard AI
          </h1>
          <p className="text-base sm:text-lg text-cyan-400 font-mono mt-2">
            Predict. Monitor. Alert. Protect Lives.
          </p>
        </div>

        <button
          onClick={() => {
            soundManager?.playClick?.();
            setPitchModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs font-mono shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer self-start md:self-auto"
        >
          <Presentation className="w-4 h-4" />
          <span>OPEN PROJECT PRESENTATION</span>
        </button>
      </div>

      {/* Core Project Definition */}
      <div className="p-8 rounded-3xl glass-panel-glow border border-cyan-500/30 space-y-4 text-left">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
          What is LandslideGuard AI?
        </h2>
        <p className="text-base text-slate-200 leading-relaxed max-w-4xl">
          <strong className="text-cyan-400">LandslideGuard AI</strong> is an intelligent disaster-monitoring command center that combines environmental sensor fusion, machine learning, GIS cartography, and community reporting to provide life-saving early warnings for potential landslides in mountainous and high-risk regions.
        </p>
        <p className="text-sm text-dark-muted leading-relaxed max-w-4xl">
          By synthesizing precipitation intensity, pore water saturation, slope inclinometry, ambient temperature, humidity, and historical fault-line records, our platform moves disaster response from <em className="text-slate-300">reactive rescue</em> to <strong className="text-white">proactive, life-saving evacuation</strong>.
        </p>
      </div>

      {/* Technologies Section */}
      <div className="space-y-6 text-left">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">
            Technical Architecture
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 font-display">
            Core Technology Stack
          </h3>
          <p className="text-xs text-dark-muted mt-1">
            Engineered for high reliability under adverse monsoon and mountain conditions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel border border-dark-border hover:border-dark-hover transition-all space-y-3"
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${tech.bg}`}>
                  <Icon className={`w-6 h-6 ${tech.color}`} />
                </div>
                <h4 className="text-base font-bold text-white font-display">{tech.title}</h4>
                <p className="text-xs text-dark-muted leading-relaxed">{tech.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Geotechnical Hardware & AI Pipeline Diagram */}
      <div className="p-8 rounded-3xl glass-panel border border-dark-border space-y-6 text-left">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">
            Data Pipeline Architecture
          </span>
          <h3 className="text-2xl font-black text-white mt-1 font-display">
            From IoT Ground Sensing to Municipal Broadcast
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-dark-bg border border-dark-border space-y-2">
            <div className="text-cyan-400 font-bold uppercase">1. Field Sensor Mesh</div>
            <p className="text-slate-300 font-sans">
              TDR soil moisture probes, borehole tiltmeters, tipping rain gauges, and acoustic crack sensors.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-dark-bg border border-dark-border space-y-2">
            <div className="text-purple-400 font-bold uppercase">2. AI Predictive Engine</div>
            <p className="text-slate-300 font-sans">
              Weighted multi-factor matrix and dynamic neural scoring to assign 0-100% hazard probability.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-dark-bg border border-dark-border space-y-2">
            <div className="text-blue-400 font-bold uppercase">3. Geospatial GIS Layer</div>
            <p className="text-slate-300 font-sans">
              Spatial cross-referencing with highway corridors, digital terrain elevations, and village boundaries.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-dark-bg border border-rose-500/40 bg-rose-950/20 space-y-2">
            <div className="text-rose-400 font-bold uppercase">4. Life-Safety CAP Dispatch</div>
            <p className="text-slate-300 font-sans">
              Direct triggers to NDRF rescue teams, 120dB village sirens, highway roadblocks, and cell-broadcast SMS.
            </p>
          </div>
        </div>
      </div>

      {/* Alignment with NDMA & UN Sendai Framework */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="p-6 rounded-2xl glass-panel border border-dark-border space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h4 className="text-base font-bold text-white font-display">National Disaster Management Authority (NDMA)</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            LandslideGuard AI implements official NDMA Guidelines on Management of Landslides and Snow Avalanches (2009 & 2023 updates). It strictly adheres to Common Alerting Protocol (CAP-India) message structures for multi-agency interoperability.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-dark-border space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            <h4 className="text-base font-bold text-white font-display">UN Sendai Framework Target G</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Substantially increases the availability of and access to multi-hazard early warning systems and disaster risk information and assessments to the people by 2030, with special focus on vulnerable mountain settlements.
          </p>
        </div>
      </div>

      {/* Target Beneficiaries & Presentation CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-dark-card via-dark-surface to-dark-card border border-cyan-500/40 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-black text-white font-display">
            Ready for Live System Evaluation
          </h3>
          <p className="text-xs text-dark-muted max-w-xl">
            Test the live interactive GIS map, run real-time environmental simulations in the AI sandbox, or test emergency broadcast sirens.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 font-mono text-xs">
          <button
            onClick={() => {
              soundManager?.playClick?.();
              setActivePage('map');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors cursor-pointer"
          >
            Launch Risk Map
          </button>
          <button
            onClick={() => {
              soundManager?.playClick?.();
              setActivePage('prediction');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-xl bg-dark-card hover:bg-dark-hover text-white font-bold border border-dark-border transition-colors cursor-pointer"
          >
            Run AI Prediction
          </button>
        </div>
      </div>

      {/* Interactive SIH 2026 Pitch Deck Modal */}
      {pitchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl glass-panel border border-cyan-500/50 p-6 space-y-6 shadow-[0_0_60px_rgba(6,182,212,0.3)]">
            <div className="flex items-center justify-between border-b border-dark-border pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30">
                  {pitchSlides[currentSlide].badge}
                </span>
                <span className="text-xs font-mono text-dark-muted">
                  Slide {currentSlide + 1} of {pitchSlides.length}
                </span>
              </div>
              <button
                onClick={() => {
                  soundManager?.playClick?.();
                  setPitchModalOpen(false);
                }}
                className="p-1.5 text-dark-muted hover:text-white cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Content */}
            <div className="space-y-4 text-left py-4 min-h-[220px]">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight font-display">
                  {pitchSlides[currentSlide].title}
                </h3>
                <h4 className="text-sm font-bold font-mono text-cyan-400 mt-1">
                  {pitchSlides[currentSlide].subtitle}
                </h4>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed">
                {pitchSlides[currentSlide].content}
              </p>

              <div className="p-3.5 rounded-xl bg-dark-bg border border-dark-border text-xs font-mono text-emerald-400 font-bold">
                💡 Key Indicator: {pitchSlides[currentSlide].metric}
              </div>
            </div>

            {/* Slide Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-dark-border">
              <div className="flex items-center gap-1.5">
                {pitchSlides.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      soundManager?.playClick?.();
                      setCurrentSlide(i);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentSlide === i ? 'w-8 bg-cyan-400' : 'w-2 bg-dark-border hover:bg-dark-hover'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <button
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                  className="p-2 rounded-xl bg-dark-bg border border-dark-border text-dark-muted hover:text-white disabled:opacity-30 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextSlide}
                  disabled={currentSlide === pitchSlides.length - 1}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold disabled:opacity-30 cursor-pointer transition-colors"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
