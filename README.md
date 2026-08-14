<div align="center">

  # ✈️ AI Travel System

  **An intelligent travel planning, budgeting, and booking management ecosystem powered by Python Flask AI microservices, Node.js, Express, MongoDB, and live weather APIs.**

  [![Node.js](https://img.shields.io/badge/Node.js-18.x+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
  [![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_7-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![NLP](https://img.shields.io/badge/NLP-TextBlob_&_NLTK-FF6F00?style=for-the-badge&logo=python&logoColor=white)](https://textblob.readthedocs.io/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 📑 Table of Contents

- [About The Project](#-about-the-project)
- [System Architecture](#-system-architecture)
- [Key Features](#-key-features)
  - [🤖 AI-Powered Intelligence Modules](#-ai-powered-intelligence-modules)
  - [🧳 Trip & Booking Management](#-trip--booking-management)
  - [🛡️ Admin Backoffice](#️-admin-backoffice)
- [Tech Stack](#-tech-stack)
- [Directory Structure](#-directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Setup Python AI Microservice](#2-setup-python-ai-microservice)
  - [3. Setup Node.js Web Application](#3-setup-nodejs-web-application)
  - [4. Environment Variables](#4-environment-variables)
  - [5. Seed the Database](#5-seed-the-database)
  - [6. Run the Application](#6-run-the-application)
- [Default Test Credentials](#-default-test-credentials)
- [API Reference](#-api-reference)
  - [Python AI Service Endpoints (:5001)](#python-ai-service-endpoints-5001)
  - [Node.js Gateway Endpoints (:3000 / :5000)](#nodejs-gateway-endpoints-3000--5000)
- [Contributing](#-contributing)
- [License](#-license)

---

## 💡 About The Project

The **AI Travel System** is an end-to-end smart travel companion designed to eliminate the friction of vacation planning, itinerary scheduling, expense forecasting, and reservation tracking. 

Built on a decoupled microservices architecture, the platform pairs an **Express.js web application** for authentication, state, and booking CRUD with a **Flask AI microservice** equipped with specialized algorithms for dynamic cost prediction, natural language sentiment evaluation, multi-language translation, seasonal factor analysis, and live weather-based packing insights.

---

## 🏗️ System Architecture

 ┌────────────────────────────────────────────────────────┐
 │                   User Browser / Client                │
 │   - Responsive EJS Views + Custom Modern CSS Theme      │
 │   - Real-Time AI Generation & Interactive Dashboard    │
 └───────────────────────────┬────────────────────────────┘
                             │ HTTP / JSON / Form Actions
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │           Node.js & Express Web Core (:3000/:5000)     │
 │   - Session Auth (Bcrypt + Connect-Mongo)              │
 │   - Role-Based Access Control (Traveler vs. Admin)     │
 │   - Itinerary & Multi-Modal Booking Aggregations       │
 └─────────────┬────────────────────────────┬─────────────┘
               │                            │
               ▼ REST API Proxies           ▼ Database Driver
 ┌───────────────────────────┐   ┌───────────────────────────┐
 │   Python Flask AI (:5001) │   │     MongoDB Database      │
 │  - Itinerary Generator    │   │  - Users & Preferences    │
 │  - Cost & Budget Engine   │   │  - Multi-Day Itineraries  │
 │  - Recommendation Ranker  │   │  - Reservation Bookings   │
 │  - TextBlob Sentiment     │   │  - Session Store          │
 │  - Translation Service    │   └───────────────────────────┘
 └─────────────┬─────────────┘
               │ External Geocoding & Weather Requests
               ▼
 ┌───────────────────────────┐
 │    Open-Meteo Live API    │
 └───────────────────────────┘


## ✨ Key Features

### 🤖 AI-Powered Intelligence Modules
1. **Intelligent Itinerary Generator:** Automatically creates day-by-day travel schedules matching specific travel styles (*budget, luxury, adventure, cultural, relaxation*), interests, and party sizes with estimated costs and time allocations.
2. **Predictive Cost & Budget Engine:** Analyzes destination cost indices, seasonal multipliers (*spring, summer, autumn, winter*), and travel styles to estimate daily expenditures and optimize category budgets.
3. **Smart Recommendation Engine:** Scores and ranks worldwide destinations by user preferences, climate choices, budget constraints, and travel history.
4. **Sentiment Analyzer:** Evaluates travel feedback and hotel reviews using a hybrid rule-based lexicon and `TextBlob` NLP polarity/subjectivity analysis.
5. **Live Weather & Packing Assistant:** Connects to the Open-Meteo API to provide 7-day live weather forecasts, WMO code interpretation, tailored packing checklists, and activity suggestions.
6. **Translation & Phrasebook Service:** Language detection, essential travel phrase packs, and pronunciation guides across 15+ global languages (*French, Japanese, Spanish, German, Thai, and more*).

### 🧳 Trip & Booking Management
- **Multi-Modal Booking Tracking:** Manage flights, hotels, excursions, and transport bookings with automatic reference ID generation, pricing totals, and status tracking (*pending, confirmed, cancelled, completed*).
- **Personalized Travel Dashboard:** Quick visual KPI cards for active itineraries, total bookings, cumulative spend, and upcoming trips.
- **One-Click Itinerary Save:** Convert AI-generated trial itineraries directly into saved database trips.

### 🛡️ Admin Backoffice
- System-wide metric summaries (Total Users, Registered Itineraries, Active Bookings).
- Global user management with role controls (`admin` vs `user`).
- Centralized itinerary and booking inspection panels.

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technologies |
|---|---|
| **Web Server & Backend** | Node.js, Express.js 4.18, `express-session`, `connect-mongo`, `cors` |
| **Frontend & UI** | EJS Templating, `express-ejs-layouts`, Custom CSS, FontAwesome 6, Inter Font |
| **Database & ORM** | MongoDB, Mongoose 7.5 |
| **Authentication** | Session-based with `bcryptjs` encryption |
| **AI / ML Microservice** | Python 3.8+, Flask, Blueprint Routes, `flask-cors`, Gunicorn |
| **Data & NLP Libraries** | Pandas, NumPy, Scikit-Learn, TextBlob, NLTK, Geopy |
| **External APIs** | Open-Meteo Geocoding & Forecast APIs |

</div>

---

## 📂 Directory Structure


abdulwahabsaim-ai-travel-system/
├── ai_service/                      # Python Flask AI Microservice
│   ├── ai_modules/                  # Modular AI logic
│   │   ├── cost_predictor.py        # Seasonal expense estimation & budget optimization
│   │   ├── itinerary_generator.py   # Multi-day itinerary synthesis & travel tips
│   │   ├── recommendation_engine.py # Weighted destination preference scoring
│   │   ├── sentiment_analyzer.py    # Review NLP polarity & subjectivity analyzer
│   │   ├── translation_service.py   # Phrase generator & pronunciation guide
│   │   └── weather_analyzer.py      # Open-Meteo API live forecast integration
│   ├── routes/                      # Flask Blueprint route handlers
│   │   ├── cost_routes.py
│   │   ├── itinerary_routes.py
│   │   ├── main_routes.py
│   │   ├── recommendation_routes.py
│   │   └── utility_routes.py
│   ├── app.py                       # Flask server entry point (:5001)
│   ├── requirements.txt             # Python dependencies
│   └── start_ai_service.bat         # Windows AI service startup script
│
├── models/                          # Mongoose Schemas
│   ├── Booking.js                   # Flights, hotels, activities, transport schema
│   ├── Itinerary.js                 # Multi-day itinerary schema with cost calculations
│   └── User.js                      # User profile, role, preferences & password hashing
│
├── public/                          # Static UI assets
│   ├── css/style.css                # Custom responsive design & gradient styling
│   └── js/main.js                   # Client-side validation, search, sorting & toasts
│
├── routes/                          # Express.js Application Routers
│   ├── admin.js                     # Admin backoffice routes
│   ├── ai.js                        # Proxy router connecting Express to Python AI
│   ├── auth.js                      # Login, registration, and logout
│   ├── booking.js                   # Booking CRUD & aggregations
│   └── itinerary.js                 # Itinerary CRUD & day management
│
├── views/                           # EJS Views & Layouts
│   ├── admin/                       # Admin dashboard, users, itineraries, bookings
│   ├── auth/                        # Login and registration templates
│   ├── booking/                     # Booking create, edit, list, and detail views
│   ├── itinerary/                   # Itinerary create, edit, list, and detail views
│   ├── dashboard.ejs                # User home dashboard with AI assistant widgets
│   ├── index.ejs                    # Public landing page with live AI demo
│   └── layout.ejs                   # Master layout with navigation bar & footer
│
├── env.example                      # Sample environment variables
├── package.json                     # Node.js project metadata & dependencies
├── seed.js                          # Database seeder (Sample users, itineraries, bookings)
├── server.js                        # Node.js Express server entry point (:3000 / :5000)
├── start_both_services.bat          # Windows script to launch both services simultaneously
└── SETUP_GUIDE.md                   # Step-by-step setup documentation

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:
- **Node.js**: `v14.x` or higher (Recommended: `v18.x`+)
- **Python**: `v3.8` or higher
- **MongoDB**: Local instance running on `mongodb://localhost:27017` or MongoDB Atlas URI
- **Git**

---

### 1. Clone Repository

```bash
git clone https://github.com/abdulwahabsaim/ai-travel-system.git
cd ai-travel-system
```

---

### 2. Setup Python AI Microservice

Open a terminal to install Python dependencies in a virtual environment:

```bash
cd ai_service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows (PowerShell / CMD):
.\venv\Scripts\activate
# macOS / Linux:
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt
cd ..
```

---

### 3. Setup Node.js Web Application

In the root directory, install npm packages:

```bash
npm install
```

---

### 4. Environment Variables

Copy `env.example` to `.env` in the root directory:

```bash
cp env.example .env
```

Configure your `.env` settings:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/ai-travel-system

# Session Encryption Key
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# Node.js Server Port
PORT=3000

# Python AI Service Location
AI_SERVICE_URL=http://localhost:5001
```

---

### 5. Seed the Database

Populate sample users, itineraries, and booking records:

```bash
npm run seed
# or
node seed.js
```

---

### 6. Run the Application

#### Option A: One-Click Startup (Windows)
Run the automated launcher batch script:
```bash
start_both_services.bat
```

#### Option B: Manual Startup (Two Terminals)

**Terminal 1 — Python AI Microservice:**
```bash
cd ai_service
# Ensure virtual environment is active
python app.py
# Running on http://localhost:5001
```

**Terminal 2 — Node.js Web Core:**
```bash
npm run dev
# or: npm start
# Running on http://localhost:3000
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser!

---

## 👥 Default Test Credentials

After running `node seed.js`, you can log in with these pre-configured accounts:

| Role | Email | Password | Travel Style / Notes |
|---|---|---|---|
| 👑 **Admin** | `moiz@gmail.com` | `moiz123` | Full administrative backoffice privileges |
| 🧳 **User** | `ali@gmail.com` | `ali123` | Luxury traveler (Caribbean, Europe) |
| 🎒 **User** | `rehan@gmail.com` | `rehan123` | Budget explorer (South America, SE Asia) |
| 🏛️ **User** | `wahab@gmail.com` | `wahab123` | Cultural traveler (Japan, Italy) |

---

## 📡 API Reference

### Python AI Service Endpoints (`:5001`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Service health status check |
| `POST` | `/generate-itinerary` | Synthesizes a structured daily itinerary with estimated activity costs |
| `POST` | `/generate-travel-tips` | Generates tailored advice based on experience level and travel style |
| `POST` | `/predict-costs` | Returns daily and total cost predictions factoring in seasonal variance |
| `POST` | `/optimize-budget` | Rebalances budget allocations across accommodation, food, and activities |
| `POST` | `/get-recommendations` | Computes weighted destination scores based on user preferences |
| `POST` | `/analyze-sentiment` | Analyzes reviews for NLP sentiment polarity, subjectivity, and travel keywords |
| `POST` | `/get-weather-insights` | Fetches live 7-day forecast from Open-Meteo and generates packing tips |
| `POST` | `/translate` | Translates text, generates pronunciation guides, and returns common phrases |

### Node.js Gateway Endpoints (`:3000` / `:5000`)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | User account registration |
| `POST` | `/auth/login` | Session authentication |
| `GET` | `/itinerary` | View all user itineraries |
| `POST` | `/itinerary/create` | Create new itinerary (supports AJAX and form posts) |
| `GET` | `/booking` | View all user bookings |
| `POST` | `/booking/create` | Create flight, hotel, transport, or activity reservation |
| `GET` | `/admin` | Admin dashboard and platform metrics *(Admin only)* |
| `POST` | `/ai/*` | Proxy endpoints forwarding requests directly to the Python AI engine |

---

## 🤝 Contributing

Contributions are always welcome!

1. Fork the Repository (`https://github.com/abdulwahabsaim/ai-travel-system/fork`)
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

<div align="center">
  <sub>Developed with ❤️ by <a href="https://github.com/abdulwahabsaim">Abdul Wahab Saim</a></sub>
</div>
