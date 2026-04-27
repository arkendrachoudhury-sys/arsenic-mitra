# Arsenic Mitra: West Bengal Risk Navigator

[![Live Demo](https://img.shields.io/badge/Live_Dashboard-Access_Now-BDE0FE?style=for-the-badge&logo=vercel)](https://vercel.com/acs-projects-dc98a426/arsenic-mitra/EfNRnyXbMEba9eC6XiHhV5SFgN8U)
![Project Status](https://img.shields.io/badge/Status-Research_Phase-BDE0FE?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-A2D2FF?style=flat-square)
![Region](https://img.shields.io/badge/Focus-Bengal_Delta-FFC8DD?style=flat-square)
![Stack](https://img.shields.io/badge/Framework-React_19-F8F9FA?labelColor=495057&style=flat-square)

Arsenic Mitra is a geospatial risk inference and decision support platform designed to address the critical challenges of groundwater arsenic contamination in West Bengal, India. The application provides an integrated environment for visualizing hydrogeological risks, monitoring real-time data trends, and facilitating early clinical identification of arsenicosis.

## Scientific and Technical Foundation

The Bengal Delta Plain (BDP) represents one of the most significant environmental health challenges globally. Natural geogenic processes in shallow Holocene aquifers release arsenic at concentrations exceeding 50 micrograms per liter (µg/L) across multiple districts. This platform serves as a Bridge between complex stratigraphic data and public health administration, transitioning from a statistical inference engine to an incipient real-time detection framework.

## Platform Capabilities

### Geospatial Risk Mapping
The engine utilizes high-fidelity spatial data to triage risk zones in high-incidence districts such as Nadia and Murshidabad. Users can navigate from broad district-level insights to localized monitoring stations through adaptive geospatial controls. The system also maps bioremediation efforts, specifically tracking hyperaccumulator species like Pteris vittata.

### Real-time Sensor Emulation
The platform incorporates a live sensor stream interface that simulates continuous data acquisition from groundwater stations. Dynamic risk thresholds provide instantaneous visual feedback, while temporal analysis modules utilize precise charting to illustrate concentration fluctuations over time.

### Public Health and Educational Compendium
A technical yet accessible document repository is integrated into the dashboard, covering:
- **Arsenicosis Identification**: Clinical protocols for the detection of melanosis and keratosis.
- **Deep Aquifer Navigation**: Engineering standards for borehole integrity and the 200m+ depth safety criteria.

### Clinical Assessment Module
An interactive narrative-based medical assessor assists community health workers in the documentation and triage of suspected cases based on longitudinal clinical history.

## Technical Architecture

- **Core**: React 19 with Type-Safe TypeScript
- **Geospatial Engine**: Leaflet with React-Leaflet
- **Data Visualization**: Recharts for temporal analytics
- **Style Layer**: Tailwind CSS 4 utilizing the Serene Minimalist Palette
- **Motion Engine**: Motion for high-performance state transitions

## System Installation

1. **Repository Cloning**
   ```bash
   git clone https://github.com/your-username/arsenic-mitra.git
   cd arsenic-mitra
   ```

2. **Dependency Management**
   ```bash
   npm install
   ```

3. **Development Environment**
   ```bash
   npm run dev
   ```
   The application instance will be served at http://localhost:3000.

4. **Production Build**
   ```bash
   npm run build
   ```

## Repository Structure

- **src/components**: Modular UI components for mapping, diagnostics, and reports.
- **src/services**: Logic for data simulation and geospatial inference.
- **src/types**: Domain-specific TypeScript interfaces.
- **App.tsx**: Central application logic and routing.

## Disclaimer
This platform is a simulation-supported inference engine. All groundwater management decisions must be verified against certified laboratory reports and official PHED/CGWB documentation.

## Deployment
The live instance is hosted on Vercel and can be accessed via the badge at the top of this document or directly at:
[https://vercel.com/acs-projects-dc98a426/arsenic-mitra/EfNRnyXbMEba9eC6XiHhV5SFgN8U](https://vercel.com/acs-projects-dc98a426/arsenic-mitra/EfNRnyXbMEba9eC6XiHhV5SFgN8U)

---
Developed for Public Health Research and Environmental Compliance.
