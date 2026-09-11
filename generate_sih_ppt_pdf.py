"""
Generate SIH 2026 Idea Submission PPT Slides as PDF
Matches the 6-slide format of the official Smart India Hackathon template.
"""

import os
from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

PDF_OUTPUT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "LandslideGuard_AI_SIH_Presentation.pdf")

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        width, height = self._pagesize
        
        # Top banner line
        self.setStrokeColor(colors.HexColor("#06b6d4"))
        self.setLineWidth(2)
        self.line(40, height - 30, width - 40, height - 30)

        # Footer info
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        self.drawString(40, 20, "SMART INDIA HACKATHON 2026 | IDEA SUBMISSION TEMPLATE")
        self.drawRightString(width - 40, 20, f"Slide {self._pageNumber} of {page_count}")


def build_pdf():
    doc = SimpleDocTemplate(
        PDF_OUTPUT_PATH,
        pagesize=landscape(A4),
        leftMargin=40,
        rightMargin=40,
        topMargin=45,
        bottomMargin=35
    )

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=34,
        textColor=colors.HexColor("#0f172a"),
        alignment=1,
        spaceAfter=8
    )
    
    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=13,
        leading=18,
        textColor=colors.HexColor("#0284c7"),
        alignment=1,
        spaceAfter=20
    )

    slide_header_style = ParagraphStyle(
        'SlideHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor("#0f172a"),
        spaceAfter=4
    )

    slide_subheader_style = ParagraphStyle(
        'SlideSubHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor("#0891b2"),
        spaceAfter=12
    )

    card_title_style = ParagraphStyle(
        'CardTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor("#0369a1"),
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#334155")
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=colors.HexColor("#1e293b"),
        leftIndent=10,
        spaceAfter=3
    )

    story = []

    # ==========================================
    # SLIDE 1: TITLE PAGE
    # ==========================================
    story.append(Spacer(1, 20))
    story.append(Paragraph("SMART INDIA HACKATHON 2026", ParagraphStyle('SIHBadge', fontName='Helvetica-Bold', fontSize=12, alignment=1, textColor=colors.HexColor('#ea580c'))))
    story.append(Spacer(1, 10))
    story.append(Paragraph("LandslideGuard AI", title_style))
    story.append(Paragraph("Geotechnical Early Warning & Geospatial Hazard Intelligence System", subtitle_style))
    
    title_data = [
        [Paragraph("<b>Problem Statement ID:</b>", body_style), Paragraph("<b>[Enter Your PS ID e.g., SIH-1642]</b>", body_style)],
        [Paragraph("<b>Problem Statement Title:</b>", body_style), Paragraph("AI-driven Early Warning & Risk Modeling for Landslide Prone Mountain Corridors", body_style)],
        [Paragraph("<b>Theme:</b>", body_style), Paragraph("Disaster Management / Smart Automation / Sustainable Mountain Corridors", body_style)],
        [Paragraph("<b>PS Category:</b>", body_style), Paragraph("Software (with IoT & Numerical Weather Prediction Telemetry)", body_style)],
        [Paragraph("<b>Team ID:</b>", body_style), Paragraph("<b>[Enter Your Registered Team ID]</b>", body_style)],
        [Paragraph("<b>Team Name:</b>", body_style), Paragraph("<b>[Enter Your Team Name Registered on Portal]</b>", body_style)],
        [Paragraph("<b>Target Region:</b>", body_style), Paragraph("Western Ghats (Kerala), Garhwal Himalayas (Uttarakhand), Lower Himalayas (Himachal)", body_style)],
    ]
    
    t_title = Table(title_data, colWidths=[180, 520])
    t_title.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('PADDING', (0,0), (-1,-1), 7),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0,0), (-1,-1), [colors.HexColor("#ffffff"), colors.HexColor("#f1f5f9")]),
    ]))
    story.append(t_title)
    story.append(PageBreak())

    # ==========================================
    # SLIDE 2: PROPOSED SOLUTION
    # ==========================================
    story.append(Paragraph("IDEA TITLE: LandslideGuard AI", slide_header_style))
    story.append(Paragraph("Proposed Solution (Describe your Idea / Solution / Prototype)", slide_subheader_style))

    sol_col1 = [
        Paragraph("<b>1. Detailed Explanation of Proposed Solution</b>", card_title_style),
        Paragraph("• <b>Live Multi-Factor Sensor Fusion:</b> Continuously streams open meteorological telemetry (Open-Meteo precipitation, 24h rainfall load, volumetric soil moisture 0-1cm) synchronized with ground geotechnical telemetry (borehole tilt, pore water pressure, slope angles).", bullet_style),
        Paragraph("• <b>Physics-Informed Safety Engine:</b> Computes slope Factor of Safety (Fs) and hazard scores (0-100%) dynamically to detect slope failure 3+ hours ahead of physical debris flow.", bullet_style),
        Paragraph("• <b>Interactive GIS Cartography:</b> Real-time Leaflet GIS mapping featuring Dark Matter, Esri Satellite, and Topo DEM elevation layers across vulnerable Indian corridors.", bullet_style),
        Spacer(1, 8),
        Paragraph("<b>2. How it Addresses the Problem</b>", card_title_style),
        Paragraph("• <b>Micro-Scale vs Regional:</b> Traditional weather alerts cover entire districts; LandslideGuard AI identifies specific slope sectors and toe-creep fissures.", bullet_style),
        Paragraph("• <b>Automated Early Evacuation:</b> Categorizes hazard into 4 color levels (Low, Moderate, High, Critical) and triggers early warning sirens for village panchayats.", bullet_style),
    ]

    sol_col2 = [
        Paragraph("<b>3. Innovation & Uniqueness of the Solution</b>", card_title_style),
        Paragraph("• <b>What-If Stress Simulator:</b> Interactive sandbox enabling disaster officers to simulate cloudburst surges (+50mm deluge) vs baseline conditions in real time.", bullet_style),
        Paragraph("• <b>3D Borehole Cross-Section Visualizer:</b> Renders subsurface overburden colluvium, phreatic water tables, and potential shear slip planes.", bullet_style),
        Paragraph("• <b>Crowdsourced Citizen Reporting:</b> Citizens snap photos of slope cracks with auto-GPS coordinates and offline report queuing.", bullet_style),
        Paragraph("• <b>Mountain Highway Passability:</b> Live tracking of ghat highway blockages (NH-58, NH-109) with automated detour bypass calculation.", bullet_style),
        Paragraph("• <b>Bilingual Disaster Voice:</b> Native English and Hindi emergency audio siren synthesis and broadcast alerts.", bullet_style),
    ]

    t_sol = Table([[sol_col1, sol_col2]], colWidths=[360, 360])
    t_sol.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (0,0), colors.HexColor("#f8fafc")),
        ('BACKGROUND', (1,0), (1,0), colors.HexColor("#f0fdf4")),
        ('BOX', (0,0), (0,0), 1, colors.HexColor("#cbd5e1")),
        ('BOX', (1,0), (1,0), 1, colors.HexColor("#86efac")),
        ('PADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_sol)
    story.append(PageBreak())

    # ==========================================
    # SLIDE 3: TECHNICAL APPROACH
    # ==========================================
    story.append(Paragraph("TECHNICAL APPROACH", slide_header_style))
    story.append(Paragraph("Technologies Used, Architecture & Implementation Methodology", slide_subheader_style))

    tech_col1 = [
        Paragraph("<b>Technologies & Frameworks Used</b>", card_title_style),
        Paragraph("• <b>Frontend Architecture:</b> React 18, Vite 6, Tailwind CSS, Lucide Icons, Glassmorphism design system.", bullet_style),
        Paragraph("• <b>Mapping & Geospatial GIS:</b> Leaflet.js, CartoDB Dark Matter API, Esri World Imagery (Satellite), OpenTopoMap (DEM).", bullet_style),
        Paragraph("• <b>Telemetry Ingestion:</b> Open-Meteo NWP REST API (Precipitation, 24h rainfall sum, volumetric soil water content, surface air pressure).", bullet_style),
        Paragraph("• <b>Sound & Siren Synthesis:</b> Native Web Audio API dual-frequency oscillator for emergency siren broadcast.", bullet_style),
        Paragraph("• <b>Geotechnical Mathematics:</b> Mohr-Coulomb failure criteria & Bishop's simplified method for Factor of Safety calculation.", bullet_style),
    ]

    tech_col2 = [
        Paragraph("<b>Methodology & Process Flow</b>", card_title_style),
        Paragraph("<b>Step 1: Environmental Telemetry Ingestion</b><br/>Streams real-time rainfall, soil moisture, and ground tilt parameters.", bullet_style),
        Paragraph("<b>Step 2: Physics-Informed Risk Computation</b><br/>Evaluates pore water pressure threshold (>75%) and lateral shear shift (>10mm).", bullet_style),
        Paragraph("<b>Step 3: Multi-Hazard Classification</b><br/>Scores 0-30 (Safe), 31-50 (Watch), 51-75 (Warning), 76-100 (Critical).", bullet_style),
        Paragraph("<b>Step 4: Automated Protocol Dispatch</b><br/>Triggers sirens, alerts SDRF/NDRF, and routes travelers around blocked ghat roads.", bullet_style),
    ]

    t_tech = Table([[tech_col1, tech_col2]], colWidths=[360, 360])
    t_tech.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (0,0), colors.HexColor("#f8fafc")),
        ('BACKGROUND', (1,0), (1,0), colors.HexColor("#eff6ff")),
        ('BOX', (0,0), (0,0), 1, colors.HexColor("#cbd5e1")),
        ('BOX', (1,0), (1,0), 1, colors.HexColor("#93c5fd")),
        ('PADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_tech)
    story.append(PageBreak())

    # ==========================================
    # SLIDE 4: FEASIBILITY AND VIABILITY
    # ==========================================
    story.append(Paragraph("FEASIBILITY AND VIABILITY", slide_header_style))
    story.append(Paragraph("Feasibility Analysis, Potential Challenges & Risk Mitigation Strategies", slide_subheader_style))

    feas_data = [
        [
            Paragraph("<b>Feasibility & Practicality</b>", card_title_style),
            Paragraph("<b>Potential Challenges & Risks</b>", card_title_style),
            Paragraph("<b>Strategies to Overcome</b>", card_title_style)
        ],
        [
            Paragraph("• <b>Zero Cost Barrier:</b> Runs on lightweight client-side React + Vite architecture with open weather API integration.<br/><br/>• <b>Proven Mathematical Models:</b> Integrates standard GSI and NDMA slope equations.<br/><br/>• <b>Plug-and-Play IoT Mesh:</b> Compatible with standard RS485/Modbus borehole tiltmeters and TDR probes.", bullet_style),
            Paragraph("• <b>Remote Network Outages:</b> Mountain landslides often cut off cell towers and fiber connections.<br/><br/>• <b>Sensor False Positives:</b> Heavy rainfall without slope instability causing unnecessary community panic.<br/><br/>• <b>Rough Mountain Terrain:</b> Harsh winter frost and monsoon damage to ground telemetry nodes.", bullet_style),
            Paragraph("• <b>Offline-First Architecture:</b> Service Workers & localStorage queue citizen reports during network blackouts.<br/><br/>• <b>Multi-Factor Cross Validation:</b> Sirens trigger only when rainfall + soil moisture + shear shift all breach thresholds simultaneously.<br/><br/>• <b>Solar + LoRaWAN Redundancy:</b> Low-power 865MHz transmission with local battery backups.", bullet_style)
        ]
    ]

    t_feas = Table(feas_data, colWidths=[235, 235, 250])
    t_feas.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0f172a")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('BACKGROUND', (0,1), (0,1), colors.HexColor("#f8fafc")),
        ('BACKGROUND', (1,1), (1,1), colors.HexColor("#fff7ed")),
        ('BACKGROUND', (2,1), (2,1), colors.HexColor("#f0fdf4")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_feas)
    story.append(PageBreak())

    # ==========================================
    # SLIDE 5: IMPACT AND BENEFITS
    # ==========================================
    story.append(Paragraph("IMPACT AND BENEFITS", slide_header_style))
    story.append(Paragraph("Target Beneficiaries, Social, Economic & Environmental Value", slide_subheader_style))

    imp_col1 = [
        Paragraph("<b>1. Direct Impact on Target Audience</b>", card_title_style),
        Paragraph("• <b>Mountain Communities & Hill Towns:</b> Provides 3.5 hours of advance evacuation warning before sudden debris slides, saving lives during night cloudbursts.", bullet_style),
        Paragraph("• <b>Disaster Response Authorities (NDRF & SDRF):</b> Automated dispatch orders and real-time station metrics enable targeted pre-deployment of rescue teams.", bullet_style),
        Paragraph("• <b>Highway Commuters & Transporters:</b> Live ghat road closure alerts on vital corridors (e.g. NH-58, Badrinath route) prevent vehicles from being trapped under falling boulders.", bullet_style),
        Paragraph("• <b>District Emergency Operation Centers (DEOC):</b> Single-pane dashboard replacing fragmented spreadsheet and phone call communication.", bullet_style),
    ]

    imp_col2 = [
        Paragraph("<b>2. Multi-Dimensional Benefits</b>", card_title_style),
        Paragraph("• <b>Social Impact:</b> Drastically lowers human casualties, injuries, and displacement in high-risk zones like Wayanad and Joshimath.", bullet_style),
        Paragraph("• <b>Economic Value:</b> Reduces economic paralysis caused by days-long highway blockages by rerouting freight traffic onto bypass corridors early.", bullet_style),
        Paragraph("• <b>Environmental & Planning:</b> Generates historical seasonal landslide databases to guide sustainable mountain construction and tree-cover replanting.", bullet_style),
        Paragraph("• <b>National Alignment:</b> Complies directly with UN Sendai Framework (Target G) and NDMA 2023 Early Warning Guidelines.", bullet_style),
    ]

    t_imp = Table([[imp_col1, imp_col2]], colWidths=[360, 360])
    t_imp.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (0,0), colors.HexColor("#f8fafc")),
        ('BACKGROUND', (1,0), (1,0), colors.HexColor("#f0fdf4")),
        ('BOX', (0,0), (0,0), 1, colors.HexColor("#cbd5e1")),
        ('BOX', (1,0), (1,0), 1, colors.HexColor("#86efac")),
        ('PADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_imp)
    story.append(PageBreak())

    # ==========================================
    # SLIDE 6: RESEARCH AND REFERENCES
    # ==========================================
    story.append(Paragraph("RESEARCH AND REFERENCES", slide_header_style))
    story.append(Paragraph("Scientific Literature, Government Guidelines & Telemetry Data Sources", slide_subheader_style))

    ref_data = [
        [
            Paragraph("<b>Category</b>", card_title_style),
            Paragraph("<b>Details & References</b>", card_title_style),
            Paragraph("<b>Application in LandslideGuard AI</b>", card_title_style)
        ],
        [
            Paragraph("<b>Geological Survey of India (GSI)</b>", body_style),
            Paragraph("National Landslide Susceptibility Mapping (NLSM) Programme & National Landslide Compendium (2020-2024).", body_style),
            Paragraph("Baseline slope angles, regional risk scores, and 10-year historical landslide frequencies.", body_style)
        ],
        [
            Paragraph("<b>NDMA Guidelines (2023)</b>", body_style),
            Paragraph("National Disaster Management Guidelines: Management of Landslides and Snow Avalanches.", body_style),
            Paragraph("4-stage warning thresholds (Green, Yellow, Orange, Red) and evacuation protocol trigger criteria.", body_style)
        ],
        [
            Paragraph("<b>Geotechnical Science</b>", body_style),
            Paragraph("Mohr-Coulomb Failure Criteria & Bishop's Simplified Method of Slices (Slope Stability Analysis).", body_style),
            Paragraph("Mathematical Factor of Safety (Fs) calculation based on pore water pressure and soil cohesion.", body_style)
        ],
        [
            Paragraph("<b>Open-Meteo Weather API</b>", body_style),
            Paragraph("Numerical Weather Prediction (NWP) API using high-resolution ECMWF & GFS atmospheric models.", body_style),
            Paragraph("Live precipitation (mm), 24h rain load, and 0-1cm volumetric water content telemetry.", body_style)
        ],
        [
            Paragraph("<b>CartoDB & Esri GIS</b>", body_style),
            Paragraph("CartoDB Basemaps API, Esri World Imagery, and OpenTopoMap elevation contours.", body_style),
            Paragraph("Dark Matter and satellite cartography for geospatial corridor visualization.", body_style)
        ],
        [
            Paragraph("<b>Common Alerting Protocol (CAP)</b>", body_style),
            Paragraph("ITU Recommendation X.1303 / OASIS CAP v1.2 Standardized Emergency Alerting.", body_style),
            Paragraph("Automated dispatch generation for District Emergency Operation Centers (DEOC).", body_style)
        ]
    ]

    t_ref = Table(ref_data, colWidths=[160, 310, 250])
    t_ref.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0f172a")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('PADDING', (0,0), (-1,-1), 6),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor("#ffffff"), colors.HexColor("#f8fafc")]),
    ]))
    story.append(t_ref)

    # Build Document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"SUCCESS: PDF created at {PDF_OUTPUT_PATH}")

if __name__ == "__main__":
    build_pdf()
