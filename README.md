# 🚀 GigFlex – AI-Enhanced Gig-Economy Marketplace

## 📑 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Architecture & Design System](#-architecture--design-system)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Run the Development Server](#run-the-development-server)
- [Build for Production](#build-for-production)
- [Deploy on Netlify](#-deploy-on-netlify)
- [Screenshots](#-screenshots)
- [Future Scope](#-future-scope)
- [Contributing](#-contributing)
- [License](#-license)

---

# 📌 Overview

**GigFlex** is an AI-enhanced Gig Economy Marketplace that enables freelancers, skilled workers, businesses, event organizers, and asset owners to connect through a single modern platform.

The application combines multiple marketplaces into one ecosystem:

- 💼 Skill Marketplace
- 🛠 Asset Rental Marketplace
- 🎉 Event Workforce Marketplace
- 🤝 Gig Marketplace
- 🤖 AI Pricing Assistant
- 📄 AI Resume Generator
- 📊 Business & Worker Dashboards

GigFlex follows a premium **Glassmorphism UI**, vibrant gradients, dark mode, and smooth micro-interactions to deliver a modern user experience.

The project has been designed as an **AI-ready marketplace**, allowing future integration with OpenAI, Anthropic, Groq, Gemini, or any custom LLM.

---

# 🌐 Live Demo

### 🚀 Explore GigFlex

👉 **https://6a5bb8947ad374f67310ba8c--beamish-custard-5d9808.netlify.app/**

---

# ✨ Features

## 💼 Skill Marketplace

- Create professional worker profiles
- AI-generated pricing suggestions
- Skill categorization
- Experience & portfolio showcase
- Ratings & reviews
- Availability management

---

## 🛠 Asset Marketplace

Rent out personal assets like

- Cameras
- Drones
- Speakers
- Musical Instruments
- Projectors
- Bikes
- Cars
- Laptops
- Power Tools
- Photography Equipment

Features

- Availability Calendar
- Escrow Placeholder
- Insurance Placeholder
- Booking Workflow

---

## 🎉 Event Workforce Marketplace

Hire complete event teams for

- Weddings
- Corporate Events
- College Festivals
- Concerts
- Birthday Parties
- Religious Events

Roles include

- Photographer
- Videographer
- Driver
- Decorator
- DJ
- Event Helpers
- Security
- Caterers

---

## 🤖 AI Assistants

### AI Pricing Assistant

Provides

- Minimum Price
- Average Price
- Premium Price
- Demand Analysis
- Smart Recommendation

---

### AI Resume Generator

Generates

- Professional Resume
- Skill Summary
- Work Experience
- Portfolio Highlights

---

## 📊 Dashboards

### Worker Dashboard

- Earnings
- Upcoming Jobs
- Tax Estimator
- AI Suggestions
- Monthly Analytics

---

### Business Dashboard

- Hiring Pipeline
- Workforce Tracking
- Spending Overview
- Escrow Summary

---

### Admin Dashboard

- User Verification
- Reports
- Analytics
- Marketplace Statistics
- Escrow Monitoring

---

## 🎨 Premium UI

- Glassmorphism
- Dark Mode
- Responsive Layout
- Gradient Cards
- Smooth Animations
- Mobile Friendly
- Interactive Charts

---

## 🧪 Mock Data

Located in

```
src/utils/MockData.ts
```

Provides realistic demo data for

- Workers
- Businesses
- Assets
- Pricing
- AI Responses

---

## 🚀 AI Ready

Future integrations

- OpenAI
- Anthropic Claude
- Gemini
- Groq
- LangChain
- Vector Databases
- Semantic Search

---

# 🏗 Architecture & Design System

## Component-Based Architecture

Every feature is isolated into reusable React components.

```
src/components/
```

Examples

- SkillMarketplace
- AssetMarketplace
- GigMarketplace
- EventWorkforce
- Dashboards

---

## State Management

Current

- React Hooks
- useState
- useEffect

Future Ready

- Redux Toolkit
- Zustand

---

## Styling

TailwindCSS powers

- Colors
- Typography
- Layout
- Animations
- Glassmorphism
- Responsive Design

---

## AI Integration

Current

- Mock AI responses

Future

Replace mock functions with

- OpenAI APIs
- Anthropic APIs
- Groq APIs

---

# 🛠 Tech Stack

| Layer | Technology |
|----------|------------|
| Frontend | React 19 |
| Language | TypeScript |
| Bundler | Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Charts | Recharts |
| State | React Hooks |
| Build Tool | npm |
| Deployment | Netlify |

---

# 📂 Project Structure

```
gigflex/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │
│   ├── utils/
│   │     └── MockData.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
│
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.cjs
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

- Node.js 20+
- npm
- Git

---

## Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/gigflex.git

cd gigflex
```

Install dependencies

```bash
npm install
```

---

## Run the Development Server

```bash
npm run dev
```

Open

```
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# 🌍 Deploy on Netlify

## Method 1 — Drag & Drop

Build the project

```bash
npm run build
```

The build output will be generated inside the `dist` folder.

Go to:

https://app.netlify.com/drop

Drag and drop the **dist** folder.

Netlify will instantly deploy your application.

---

## Method 2 — Deploy from GitHub

1. Push your project to GitHub.
2. Login to Netlify.
3. Click **Add New Site** → **Import an Existing Project**.
4. Connect your GitHub repository.
5. Configure the build settings:

**Build Command**

```bash
npm run build
```

**Publish Directory**

```text
dist
```

6. Click **Deploy Site**.

Netlify will automatically build and deploy your application.

Every push to your GitHub repository will trigger a new deployment.

---

## Netlify Configuration

Create a file named

```
netlify.toml
```

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

# 📷 Screenshots

> Add screenshots inside

```
docs/screenshots/
```

Suggested screenshots

- Home Page
- Skill Marketplace
- Asset Marketplace
- Event Workforce
- Worker Dashboard
- Business Dashboard
- Admin Dashboard
- AI Pricing Assistant
- AI Resume Generator

---

# 🚀 Future Scope

- Backend Integration (FastAPI)
- PostgreSQL Database
- JWT Authentication
- Google Authentication
- Razorpay Payments
- Escrow Transactions
- Real-Time Chat
- Notifications
- Google Maps
- AI Job Matching
- Semantic Search
- Recommendation Engine
- Resume Optimization
- Mobile Application (Flutter)
- Admin Analytics
- Business Portal
- Event Management
- Skill Verification
- Blockchain Escrow (Future)

---

# 🤝 Contributing

Contributions are always welcome.

1. Fork the repository

2. Create your feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push the branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 💡 Development Tips

Run the development server

```bash
npm run dev
```

Build production

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

Tailwind CSS automatically compiles utility classes during development.

Replace the AI mock functions with actual LLM APIs when integrating backend services.

---

# 📄 License

This project is licensed under the **MIT License**.

Feel free to use, modify, and contribute to this project.

---

## 👨‍💻 Developed By

**Harish Kumar**

If you like this project, don't forget to **⭐ Star** the repository and connect with me on LinkedIn.

---

## 🌐 Live Application

🚀 **GigFlex**

**https://6a5bb8947ad374f67310ba8c--beamish-custard-5d9808.netlify.app/**
