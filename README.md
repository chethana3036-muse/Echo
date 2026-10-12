# ECHO — Predictive Future Simulation Engine

ECHO is an AI-powered simulation engine that allows users to explore what might happen in the future before making critical decisions. Instead of conventional conversational chatbots, ECHO creates a virtual world simulation of complex situations, modeling chronological phases, statistical outcome distributions, and 1st, 2nd, and 3rd-order causal domino effects.

## Features

- **Chronological Timeline Engine**: Scrub through simulated milestones with real-time indicators for Disruption Level, Infrastructure Strain, Economic Drain Rate, and Civic Safety alerts.
- **Statistical Charts & Probability Explorer**: Interactive charts displaying multi-phase disruption trajectories, Monte Carlo outcome probabilities (Baseline vs. Critical Failure vs. Resilient Mitigation), and sector impact meters.
- **Narrative Intelligence & Audio Briefing**: Executive briefing prose, storytelling chronicles, tipping point alerts, and text-to-speech audio playback.
- **Causal Consequence Graph**: Interactive 3-tier cascade tracking immediate direct impacts (1st order), systemic operational feedback (2nd order), and long-term emergent structural shifts (3rd order).
- **Intervention Lab ("Fork Reality")**: Test mid-simulation decisions at specific timestamps to observe how future realities diverge.
- **Exportable Dossiers**: Download or copy comprehensive Markdown simulation reports.

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons
- **Backend**: Express (Node.js/TSX)
- **AI Core**: Google GenAI SDK (`@google/genai`) using `gemini-3.8-flash`
- **Build Tool**: Vite

## Getting Started

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd echo
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Gemini API key:
```env
GEMINI_API_KEY="your-gemini-api-key"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```
