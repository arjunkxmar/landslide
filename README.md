# 🏔️ LandslideGuard AI

**Geotechnical Early Warning & Geospatial Hazard Intelligence System**

LandslideGuard AI is an advanced geotechnical landslide early warning and risk simulation web application designed to monitor vulnerable mountainous corridors across India (Western Ghats, Himalayas, Garhwal, Nilgiris).

The system continuously pairs real-time atmospheric observations with geotechnical telemetry (pore water pressure, borehole inclinometer shear shift, soil moisture saturation, and topographic slope angles) to compute multi-factor failure risks and automate NDMA/Sendai-aligned early evacuation protocols.

---

## ⚡ Key Capabilities

* **Geospatial Risk Cartography**: Interactive Leaflet GIS mapping with dark matter, satellite, and topographic digital elevation models (DEM).
* **Live Open-Meteo API Synchronized**: Real-time atmospheric telemetry streamed directly for any coordinate or station:
  * Precipitation & Rain rate (mm) + 24-hour accumulated load
  * Soil moisture saturation (0-1cm depth) in volumetric water content ($m^3/m^3$)
  * Atmospheric relative humidity (%)
  * Surface barometric pressure (hPa)
  * Ambient temperature (°C)
* **Multi-Factor Risk Engine**: Physics-informed geotechnical model calculating Factor of Safety ($F_s$), risk scores (0-100%), and alert levels (*Low*, *Moderate*, *High*, *Critical*).
* **What-If Sensitivity Testing**: Comparative stress testing to simulate cloudburst surges (+50mm deluge) vs baseline conditions.
* **3D Borehole Cross-Sections**: Visual cross-section profiles displaying overburden colluvium, phreatic water tables, and potential shear slip planes.
* **Citizen Hazard Reporting**: Crowdsourced landslide incident reporting portal with offline queuing and sound effects.
* **Bilingual Interface**: Seamless English and Hindi localized disaster alerts.

---

## 🛠️ Technology Stack

* **Frontend**: React 18, Vite 6
* **Mapping / GIS**: Leaflet.js, CartoDB Dark Matter, Esri Satellite Imagery
* **Styling**: Tailwind CSS, Lucide Icons, Glassmorphic Dark Design System
* **Weather Telemetry**: Open-Meteo Numerical Weather Prediction API
* **Sound Design**: Web Audio API synthesized alert chimes and warning sirens

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18+ or v20+ LTS
* **npm**: v9+ or v10+

### Installation & Local Run

```bash
# 1. Clone repository
git clone https://github.com/arjunkxmar/landslide.git
cd landslide

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit **http://localhost:5173** in your web browser.

### Building for Production

```bash
npm run build
```

---

## 🛰️ Architecture & Data Separation

```
[ Open-Meteo Weather API ] ────► Atmospheric Vectors (Rain, VWC Soil Moisture, Barometric Pressure)
                                             │
                                             ▼
[ LandslideGuard AI Engine ] ◄── Geotechnical Vectors (Slope Angle, Borehole Tilt, Shear Shift)
           │
           ▼
[ Landslide Risk Index (0-100%) ] ──► Common Alerting Protocol (CAP-India / NDRF Dispatch)
```

> **Note**: Open-Meteo provides real-time environmental observations; landslide hazard probability and evacuation recommendations are computed exclusively by LandslideGuard AI's geotechnical risk engine.

---

## 📄 License

MIT License. Designed for community safety and disaster mitigation.
