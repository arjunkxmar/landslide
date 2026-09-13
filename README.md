# 🏔️ LandslideGuard AI

**Geotechnical Early Warning & Geospatial Hazard Intelligence System**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet GIS](https://img.shields.io/badge/Leaflet-1.9.4-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini-3.6_Flash-4285F4?logo=google&logoColor=white)](https://aistudio.google.com/)
[![Open-Meteo](https://img.shields.io/badge/Open--Meteo-NWP_Telemetry-FFA500)](https://open-meteo.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📌 Executive Summary

**LandslideGuard AI** is an advanced geotechnical early warning, numerical simulation, and geospatial intelligence platform engineered to protect vulnerable mountain corridors and communities across India (including the **Garhwal Himalayas**, **Western Ghats**, **Himachal Pradesh**, and **Nilgiris**).

By fusing **real-time atmospheric weather telemetry** (Open-Meteo API) with **in-situ geotechnical sensor vectors** (borehole inclinometer shear shift, piezometric pore water pressure, volumetric soil moisture saturation, and topographic slope gradients), LandslideGuard AI computes physics-informed slope stability metrics (**Factor of Safety $F_s$**) to automate **NDMA / SDRF / Sendai-aligned** disaster early warning protocols.

---

## ✨ Key Features & Capabilities

### 🗺️ 1. Geospatial Risk Cartography
* **Multi-Layer GIS Visualization**: Powered by Leaflet.js with dynamic layer toggles:
  * **CartoDB Dark Matter / Esri Dark Gray**: High-contrast, clean UI cartography.
  * **Esri World Satellite Imagery**: High-resolution photogrammetric terrain inspection.
  * **Topographic Digital Elevation Models (DEM)**: Contour and elevation gradient context.
* **Monitored Strategic Corridors**: Real-time telemetry stations across high-risk sectors (Joshimath, Wayanad, Kedarnath Valley, Dharamshala, Munnar, Nilgiris).
* **Dynamic Hazard Zones**: Color-coded risk clusters based on live computed hazard scores.

### 🌤️ 2. Real-Time Atmospheric & Soil Telemetry
* Direct, automated synchronization with **Open-Meteo Numerical Weather Prediction (NWP)** models:
  * **Rainfall**: Instantaneous rain rate (mm/hr) & 24-hour accumulated precipitation (mm).
  * **Volumetric Soil Moisture Content**: Deep subsoil saturation ($m^3/m^3$ and %).
  * **Atmospheric Vectors**: Surface barometric pressure (hPa), relative humidity (%), and ambient temperature (°C).

### ⚙️ 3. Multi-Factor Geotechnical Risk Engine
* **Physics-Informed Stability Calculation**:
  * Evaluates the **Mohr-Coulomb failure criterion** with transient pore water pressure dissipation.
  * Computes **Factor of Safety ($F_s$)**:
    $$\text{Risk Level} = f(\text{Slope Angle}, \text{Precipitation Load}, \text{Soil Moisture Saturation}, \text{Subsurface Shear Displacement})$$
  * Classifies hazard into 4 standardized operational states: **LOW**, **MODERATE**, **HIGH**, and **CRITICAL**.

### 🧪 4. "What-If" Sensitivity Simulator
* **Interactive Cloudburst Stress Testing**:
  * Allows disaster mitigation officers to inject simulated extreme weather conditions (+50mm flash cloudburst deluge, extreme soil saturation).
  * Live before-and-after comparison of Factor of Safety and failure probability curves.

### 🔬 5. 3D Subsurface Stratigraphy & Borehole Cross-Sections
* Cross-sectional geological profiles visualizing:
  * Weathered colluvium / topsoil overburden depth.
  * Transient phreatic line (water table rise).
  * Active shear slip planes and MEMS inclinometer displacement profiles.

### 🤖 6. AI Risk Intelligence Assistant (Google Gemini 3.x Flash)
* **Context-Aware Geotechnical Copilot**:
  * Embedded bottom-right assistant accessible across the entire application.
  * **Grounding in Live Telemetry**: Automatically ingests active station coordinates, 24h rainfall, soil moisture, shear displacement, and pore pressure to answer specific hazard questions.
  * **Trilingual Communication**: Answers naturally in **English**, **Hindi**, and **Hinglish** (e.g., *"Yaha landslide risk high kyu hai?"*).
  * **Zero-Leak Security Architecture**: API key is managed strictly on the server-side via Vite middleware & Node.js backend; never exposed to browser network calls or client JavaScript bundles.
  * **Resilient Telemetry Fallback**: If network is disconnected or API quotas are exhausted, an internal physics-grounded fallback engine guarantees continuous mission-critical answers.

### 🚗 7. Mountain Highway Transit Status
* Monitors vital transit lifelines (NH-58 Rishikesh–Badrinath, NH-7, Wayanad Ghat Road).
* Live status indicators: **Open & Monitored**, **Active Caution**, **Blocked / Detour Required**.

### 📱 8. Citizen Hazard Reporting Portal
* Crowdsourced community hazard reporting with photo uploads, automatic GPS geolocation, and offline queue synchronization.
* Audio feedback and confirmation synthesized via the Web Audio API.

---

## 🏛️ System Architecture

```mermaid
flowchart TB
    subgraph External_Data [External Data Streams]
        OM[Open-Meteo API<br/>Rainfall, Soil Moisture, Pressure]
        IOT[In-Situ Geotechnical Sensors<br/>Inclinometers, Piezometers, Tilt]
    end

    subgraph Server_Backend [Server & Security Layer]
        VITE_MID[Vite Dev Middleware / Node server.js]
        ENV[(.env Secrets<br/>GEMINI_API_KEY)]
        GEMINI_SVC[Gemini AI Service<br/>Gemini 3.6 / 3.8 Flash]
        FALLBACK_ENG[Local Geotechnical Fallback Engine]
        VITE_MID --- ENV
        VITE_MID --> GEMINI_SVC
        GEMINI_SVC -.->|On Failure / Offline| FALLBACK_ENG
    end

    subgraph Client_App [LandslideGuard Web Application - React 18]
        CTX[LandslideContext<br/>Live Telemetry State]
        GIS[Leaflet GIS Map<br/>Dark Matter, Satellite, DEM]
        DASH[Operational Dashboard<br/>Risk Meters & Telemetry Gauges]
        SIM[What-If Stress Simulator<br/>Cloudburst Testing]
        AI_UI[AI Assistant Copilot<br/>Floating Dialog / Speech / Hinglish]
        CITIZEN[Citizen Hazard Report<br/>Crowdsourcing & Audio Cues]
    end

    OM --> CTX
    IOT --> CTX
    CTX --> GIS
    CTX --> DASH
    CTX --> SIM
    CTX --> AI_UI
    AI_UI <==>|POST /api/chat<br/>(Telemetry + Question)| VITE_MID
```

---

## 📂 Project Structure

```
landslide/
├── .env                              # Local environment variables (Git-ignored)
├── .env.example                      # Template for environment variables
├── .gitignore                        # Git exclusion rules (protects credentials)
├── index.html                        # HTML entry point with meta tags & fonts
├── package.json                      # Node dependencies and project scripts
├── postcss.config.js                 # PostCSS configuration
├── server.js                         # Production Node.js HTTP & API server
├── tailwind.config.js                # Tailwind CSS styling tokens and colors
├── vite.config.js                    # Vite configuration with /api/chat middleware
├── generate_sih_ppt_pdf.py           # SIH 2026 presentation slide generator (ReportLab)
├── LandslideGuard_AI_SIH_Presentation.pdf # Generated SIH slide deck
│
├── server/
│   └── geminiService.js              # Server-side Gemini 3.x Flash handler & fallback engine
│
└── src/
    ├── App.jsx                       # Main application shell with navbar & route views
    ├── main.jsx                      # React 18 DOM mount
    ├── index.css                     # Global design tokens, scrollbars, animations
    │
    ├── components/
    │   ├── AIChatbot/                # AI Risk Intelligence Assistant UI
    │   │   ├── AIChatbot.jsx         # Floating chat dialog, input handling, status pills
    │   │   ├── ChatMessage.jsx       # Markdown message bubble renderer
    │   │   ├── QuickQuestions.jsx    # Pre-configured scenario prompt chips
    │   │   └── TypingIndicator.jsx   # Animated pulsing AI thinking indicator
    │   ├── common/                   # Shared UI primitives (Badges, Buttons, Cards)
    │   ├── dashboard/                # Gauges, sensor graphs, station metrics
    │   ├── landing/                  # Landing page hero, features grid, SIH showcase
    │   ├── layout/                   # Header, navigation bar, and footer
    │   ├── map/                      # Leaflet map instance, layers, markers, popups
    │   └── prediction/               # Stratigraphy borehole visuals, What-if sliders
    │
    ├── context/
    │   └── LandslideContext.jsx      # Global state for stations, telemetry, and alerts
    │
    ├── data/
    │   └── landslideLocations.js     # GeoJSON coordinates, baseline telemetry, thresholds
    │
    ├── pages/
    │   ├── AboutPage.jsx             # Geotechnical methodology, SIH problem statement
    │   ├── AlertsPage.jsx            # NDMA / CAP-India emergency notification center
    │   ├── AnalyticsPage.jsx         # Historical sensor time-series & correlation charts
    │   ├── CitizenReportPage.jsx     # Crowdsourced field incident reporting portal
    │   ├── DashboardPage.jsx         # Real-time multi-station geotechnical telemetry
    │   ├── LandingPage.jsx           # Public presentation hero & executive overview
    │   ├── MapPage.jsx               # Fullscreen GIS risk cartography workspace
    │   ├── PredictionPage.jsx        # Factor of Safety calculator & What-If simulator
    │   └── RoadStatusPage.jsx        # Mountain highway corridor transit advisory
    │
    ├── services/
    │   ├── chatbotService.js         # Client API client calling /api/chat
    │   └── weatherService.js         # Open-Meteo API numerical weather client
    │
    └── utils/                        # Audio synthesis, formatting, calculation helpers
```

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js**: `v18.0.0` or higher (v20+ LTS recommended)
* **npm**: `v9.0.0` or higher

### 1. Clone the Repository
```bash
git clone https://github.com/arjunkxmar/landslide.git
cd landslide
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a local `.env` file in the project root (or copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` to configure your keys:
```env
# Google Gemini API Key for AI Risk Intelligence Assistant
# Get a free key at: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: CARTO Basemaps Key (falls back automatically to Esri Dark Gray if blank)
VITE_CARTO_API_KEY=cb1_3hfl_1_a75355ccc285bca781ca509d
```

> 🔒 **Security Notice**: `.env` is listed in `.gitignore`. Your API keys will **never** be committed to GitHub or bundled into the client browser build.

### 4. Run the Local Development Server
```bash
npm run dev
```
Open your browser at **`http://localhost:5173`**.

---

## 🛠️ Build & Production Deployment

### Build the Static Bundle
```bash
npm run build
```
This generates an optimized production bundle inside the `dist/` directory.

### Run with the Production Node Server
For production environments, you can serve the built frontend and handle `/api/chat` using the standalone server:
```bash
npm run build
node server.js
```
The server will start listening at **`http://localhost:5173`** (or your configured `PORT`).

---

## 🔐 Environment Variables Specification

| Variable Name | Required | Scope | Description |
|---|---|---|---|
| `GEMINI_API_KEY` | Recommended | Server-side only | Google AI Studio API key used to power the AI Risk Intelligence Assistant. |
| `VITE_CARTO_API_KEY` | Optional | Client bundle | Public CARTO basemap API key for Leaflet map tiles. |
| `PORT` | Optional | Server-side only | Custom port for standalone `server.js` (default: `5173`). |

---

## 🎓 Smart India Hackathon (SIH 2026) Context

This platform was developed as an end-to-end solution for:
* **Problem Statement Title**: AI-driven Early Warning & Risk Modeling for Landslide Prone Mountain Corridors
* **Themes**: Disaster Management | Smart Automation | Sustainable Mountain Corridors
* **Target Corridors**: Western Ghats (Kerala), Garhwal Himalayas (Uttarakhand), Lower Himalayas (Himachal)

### Generate Official Submission Presentation PDF
A dedicated Python script is included to generate the official 6-slide SIH idea presentation deck:
```bash
python generate_sih_ppt_pdf.py
```
This will compile and output `LandslideGuard_AI_SIH_Presentation.pdf`.

---

## 🤝 Contributing & Community Safety

Contributions to improve geotechnical accuracy, add new regional mountain corridors, or expand vernacular language support are welcome!

1. Fork the Project repository.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'feat: add landslide sensor telemetry layer'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

**LandslideGuard AI** — *Empowering Mountain Communities with Physics-Informed Geospatial Intelligence.*
