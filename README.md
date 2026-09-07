# IT Asset Management (ITAM) - Frontend UI

This is the frontend application for the IT Asset Management (ITAM) system, built with **Angular**. This repository contains the user interface components, views, layouts, and services required to manage and monitor IT assets, assignments, warranties, maintenance, and user permissions.

## 🚀 Tech Stack

- **Framework:** Angular (v21)
- **Styling & UI Library:** 
  - PrimeNG (v21) - Advanced UI components (Tables, Dropdowns, Modals)
  - PrimeFlex - CSS Utility library for responsive grids
  - PrimeIcons - Icon pack
  - SCSS - Custom styling and theme overrides
- **Charting & Data Visualization:** 
  - Chart.js
  - ApexCharts (`ng-apexcharts`)
- **Real-time Communication:** Socket.io-client
- **Exports & Reporting:**
  - `jspdf` & `jspdf-autotable` (PDF Generation)
  - `xlsx` & `file-saver` (Excel Export)
- **Other Utilities:** SweetAlert2 (Alerts), Lodash, Vitest (Testing)

---

## 📂 Project Structure

The source code (`src/`) is organized to promote reusability and clean separation of concerns:

```
src/
└── app/
    ├── core/                # Core configurations, HTTP interceptors, services, and models
    │   ├── config/          # Environment configuration (env.ts generated dynamically)
    │   └── services/        # Singleton services (AuthService, DashboardService, Storage, Socket, Toast)
    │
    ├── layout/              # Structural components of the application
    │   ├── header/          # Top navigation bar (Profile, Notifications)
    │   ├── sidebar/         # Side navigation menu
    │   ├── main-layout/     # Wrapper layout for authenticated views
    │   ├── footer/          # Application footer
    │   └── breadcrumb/      # Breadcrumb navigation
    │
    └── pages/               # Feature modules and views
        ├── auth/            # Authentication pages (Login, Forgot Password)
        ├── shared/          # Shared views like the main Dashboard
        └── ...              # Other entity modules (Asset Info, Master Data, Vendors, Servers, etc.)
```

---

## 🛠️ Installation & Setup

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables (.env):**
   The project uses a custom Node script (`scripts/set-env.js`) to inject environment variables into Angular.
   Create a `.env` file in the root of this project:
   ```env
   APP_NAME=IT Asset Management
   APP_ENV=development
   API_BASE_URL=http://localhost:3000/api/Itam
   TOKEN_KEY=access_token
   TOKEN_PREFIX=Bearer
   ENABLE_LOG=true
   API_TIMEOUT=30000
   ```

3. **Run the Development Server:**
   This command will automatically run the `set-env.js` script to generate `src/app/core/config/env.ts`, and then start the Angular CLI dev server.
   ```bash
   npm start
   ```
   *Navigate to `http://localhost:4200/`.* The application will automatically reload if you change any of the source files.

4. **Production Build:**
   ```bash
   npm run build
   ```
   The build artifacts will be stored in the `dist/it-asset-management-frontend` directory.

---

## 📐 Architecture Highlights

- **Dynamic Environment Variables:** We use `dotenv` combined with a pre-build script (`set-env.js`) to map OS-level variables to Angular's environment dynamically. This prevents hardcoding configurations.
- **Service Layer Pattern:** API calls are abstracted away from components into the `core/services/` directory (e.g., `DashboardService`, `AuthService`). This keeps components focused on data binding and UI rendering.
- **Token-Based Authentication:** Uses `StorageService` to securely handle JWT Access and Refresh tokens. Requests to backend APIs are automatically authenticated.
- **Lazy Loading Strategy:** Feature pages are logically separated into distinct routing modules (e.g., `assetInformation.routes`, `vendorManagement.routes`) enabling chunking and optimized initial load times.

## 👥 Authors
- Pace CRM / Internal IT Team
