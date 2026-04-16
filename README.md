# 🍌 Tripy: Next-Generation Multi-Vendor Booking Platform

![Tripy Platform](https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200)

Welcome to **Tripy**, the ultimate monolithic SaaS architecture masterclass. Tripy is a fully-featured, dual-stack travel booking application engineered for high performance, intense visual fidelity (Glassmorphism), and next-generation Artificial Intelligence integration.

This repository contains the exact source code written in the 24-Part YouTube Masterclass Series.

## 🚀 Architectural Stack

### Frontend (React / Vite)
*   **Vite Engine:** Lightning-fast HMR and compilation.
*   **TypeScript:** Strict static typing for enterprise scalability.
*   **Tailwind CSS:** Comprehensive utility-first styling featuring a custom Dark/Light Mode mutator hook.
*   **Framer Motion:** High-fidelity UI animations, scroll triggers, and active component layout transitions.
*   **Zustand:** Lightweight global state management protecting user authentication states.
*   **React Router v6:** Advanced routing matrix utilizing nested `<ProtectedRoute>` wrappers for strict Role-Based Access Control (RBAC).
*   **Recharts:** Live SVG-rendered dashboard analytics for Super Admins.

### Backend (Java Spring Boot)
*   **Spring Boot 3.x (Java 17):** High-density relational logic and API routing.
*   **Spring Security:** Stateless architecture powered by JSON Web Tokens (JWT).
*   **Spring Data JPA / Hibernate:** Relational mapping to PostgreSQL schemas.
*   **Cloudinary SDK:** Intercepting internal `multipart/form-data` uploads, streaming physical bytes to the Cloudinary vault, and storing secure URL callbacks.
*   **Native RestTemplate Integration:** Direct REST HTTP invocation bounds with the Google Gemini Language Model APIs.

---

## 🌟 Core Features
1. **Multi-Vendor Ecosystem:** Customers browse beautifully animated glass cards. Vendors (Businesses) get dedicated dashboard routing to manage trip uploads. Super Admins receive overarching platform analytics visualizations explicitly restricted from standard users.
2. **Artificial Intelligence Negotiation Agent:** A floating `<AIChatbot>` widget that passes user inputs natively into the Spring backend. The backend prepends secret *System Instructions* directing Google Gemini to act as a travel agent specifically attempting to close the sale of the currently viewed package.
3. **Web-Speech API:** The frontend detects incoming Gemini AI responses and automatically synthesizes it into audible Human Speech using the physical machine's browser audio matrix!
4. **Blob Architecture Receipts:** Checkout sequences construct programmatic JavaScript `Blob` objects out of thin air to generate physical `.txt` receipt files natively on the client's hard drive without touching a backend filesystem!
5. **DevOps CI/CD:** Hardcoded `.github/workflows` to initialize continuous integration tests on both Node and Java environments sequentially on every repository push!

---

## 🛠️ Local Installation Guide

### 1. The PostgreSQL Database
Ensure you have PostgreSQL running locally. Create a database called `tripy` (or match whatever is in your properties file). 

### 2. Spring Boot Initialization
Navigate to the `backend` directory.
You must update `src/main/resources/application.properties` with your actual secure keys:
*   `spring.datasource.password=YOUR_POSTGRES_PASSWORD`
*   `cloudinary.cloud_name`, `api_key`, `api_secret`
*   `gemini.api_key=YOUR_ACTUAL_FREE_GOOGLE_GEMINI_KEY`

Boot the server via maven wrapper:
```bash
cd backend
./mvnw spring-boot:run
```

### 3. React DOM Initialization
Open a second terminal and navigate to the frontend block. Run the npm configuration:
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

Navigate to `http://localhost:5173`. The platform is now fully synchronized and alive.

---

## 📚 Masterclass Educational Resources
If you are an instructor or student, the `tutorial_pdfs/` directory contains 24 highly-detailed, lesson-by-lesson walkthrough scripts. These scripts break down the literal logic frame by frame for live presentation or self-guided absorption. 

*Thank you for contributing, testing, and scaling this project. Keep Coding.*