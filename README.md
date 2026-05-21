# DriveFleet — Car Rental Platform

**Live Site:**  https://drivefleet-client-rho.vercel.app

DriveFleet is a full-stack car rental platform where users can explore, book, and manage vehicle rentals with a premium glassmorphism UI.

## ✨ Features

- 🔐 **Secure Authentication** — Email/Password & Google Sign-In via Firebase, with JWT stored in HTTPOnly cookies for maximum security
- 🚗 **Full Car Management** — Add, update, and delete your own car listings with real-time availability toggling
- 📅 **Smart Booking System** — Book any car with date selection, driver option, and auto-calculated total pricing
- 🔍 **Search & Filter** — Instant car search using MongoDB `$regex` and type filtering with `$in` operator
- 💎 **Premium Animated UI** — Glassmorphism cards, Framer Motion page transitions, scroll-reveal animations, and floating hero elements

## 🛠️ Tech Stack

- React + Vite, React Router DOM v6
- Tailwind CSS + Framer Motion
- Firebase Auth (Email/Password + Google)
- Axios with cookie credentials
- React Hot Toast, React Hook Form

## 🚀 Getting Started

```bash
git clone 
cd drivefleet-client
npm install
cp .env.example .env   # fill in your Firebase & API values
npm run dev
```
