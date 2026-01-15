# Skitii – Adaptive Music Therapy (Frontend Prototype)

## Overview

This is Skitii assignment is a frontend prototype of an adaptive music therapy platform designed for cancer patients.
This project simulates real-time HRV monitoring and adjusts therapeutic music using rule-based logic based on the patient’s stress and relaxation levels.

---

Architecture & Security Thinking

### 1. Token & Authentication Security

Patient PINs are never stored in browser storage. Authentication state is managed in memory using React Context, and only a non-sensitive auth flag or mock token is stored in `localStorage` for session persistence. This reduces XSS risk while still allowing page refreshes. In production, I would use HttpOnly, Secure cookies issued by a backend. In healthcare applications, security is prioritized over convenience.

---

### 2. Data Structure & Scale

HRV data is generated every 3 seconds and stored in React state for the active session to support real-time updates. The UI displays only a rolling window of recent data to avoid memory growth. Historical sessions are loaded from mock data and shown in a limited list. At scale, this data would be paginated from a backend and optionally cached using IndexedDB.

---

### 3. State Management Architecture

React Context API is used for global state such as authentication and active session data. Component-level state is used for UI concerns like playback progress and sliders. This keeps the architecture simple and appropriate for the scope. If the app grew significantly in complexity, a solution like Redux or Zustand could be considered.

---

### 4. Healthcare Data Handling

The UI avoids displaying highly sensitive healthcare data such as detailed diagnoses, treatment plans, or medical notes. Only the patient name, aggregated HRV status, and pain scores are shown. Healthcare data requires stricter handling than fitness data because misuse can cause direct harm, legal issues, and loss of patient trust. Data minimization is especially important in shared-device hospital environments.

---

### 5. Performance Under Stress

Frequent HRV updates can cause UI lag if not handled carefully. To prevent this, real-time charts are isolated into memoized components, and derived values are computed using `useMemo`. Event handlers are memoized with `useCallback`. React DevTools Profiler would be used to verify that renders remain efficient under continuous updates.

---

## Tech Stack (Planned)

* **React 18** (Functional Components, Hooks)
* **TypeScript**
* **Vite** (Fast development & build tooling)
* **React Router** (Authentication flow & protected routes)
* **Context API** (Auth and session state management)
* **Recharts** (Real-time HRV data visualization)
* **Tailwind CSS** (Calm, accessible healthcare-focused UI)
* **ShadCN UI** (Per-made simple components for level UI/UX)

---

## Development Plan

* Initialize GitHub repository and document architecture & security decisions
* Set up React + TypeScript project with routing and global auth context
* Implement mock authentication flow with protected routes
* Build real-time HRV monitoring with simulated data updates
* Implement adaptive music player logic based on HRV ranges
* Add real-time analytics dashboard (HRV chart, pain tracking)
* Display session history using mock historical data
* Optimize performance and polish patient-centric UI