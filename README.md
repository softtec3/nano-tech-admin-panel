# NanoTech Admin Panel

A React + Vite based administrative dashboard for NanoTech — the Admin Panel UI used to manage products, orders, users, inventory and reports.

This repository contains the frontend admin panel built with React (JSX) and Vite. It includes a collection of pages, shared components, context providers, and utility helpers.

**Quick summary:**

- **Framework:** React 19 + Vite
- **Language:** JavaScript (JSX)
- **Bundler / Dev server:** Vite

**Contents of this README**

- Project overview
- Requirements
- Installation
- Available scripts
- Project structure
- Development notes
- Contributing
- License & contact

**Project Overview**

This admin panel provides UI screens for common administrative tasks such as:

- Dashboard (analytics + quick actions)
- Product management (add, update, view, QR generation)
- Inventory management (add products, low-stock alerts)
- Order management and order rows
- User management
- Role / application lists and forms
- Authentication (login, protected routes)

The UI uses a collection of reusable components in `src/components`, context providers in `src/contexts`, and page views under `src/pages`.

**Requirements**

- Node.js (recommended 16.x or later — Vite works well with Node 16+)
- npm (or yarn/pnpm) installed

**Installation**

Open a terminal (Windows PowerShell) in the project root and run:

```powershell
npm install
```

This installs the dependencies listed in `package.json` (React, Vite, react-router, react-toastify, sweetalert2, swiper, etc.).

**Available scripts**

The project includes the following npm scripts (from `package.json`):

- `npm run dev` — Start Vite dev server (hot reload)
- `npm run build` — Build production assets into `dist/`
- `npm run preview` — Preview built production bundle locally
- `npm run lint` — Run ESLint across the project

Examples (PowerShell):

```powershell
npm run dev       # start development server
npm run build     # create production build
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

**Recommended Node & Environment**

- Node >= 16
- If you use environment variables, place them in `.env` files and ensure they are not checked into source control.

**Project Structure (important files)**

Top-level source layout (high level):

```
src/
	main.jsx                    # app entry — mounts React and router
	index.css                   # global styles
	components/                 # reusable UI components (Button, Popup, LoadingSpinner, etc.)
	contexts/                   # auth context and providers
	hooks/                      # custom hooks (e.g., useAuth)
	layouts/                    # dashboard layout components
	pages/                      # page views (Dashboard, Inventory, Orders, Users...)
	router/                     # `router.jsx` central routes
	routes/                     # route guards (AdminRoute, PrivateRoute)
	utils/                      # helpers (e.g., getFormData)
```

Extended source layout

```bash
└── src
    ├── components
    │   ├── Button
    │   │   ├── button.css
    │   │   └── Button.jsx
    │   ├── DashBoardSideBar
    │   │   ├── dashBoardSideBar.css
    │   │   └── DashBoardSideBar.jsx
    │   ├── DashboardTop
    │   │   ├── dashboardtop.css
    │   │   └── DashboardTop.jsx
    │   ├── FormModal
    │   │   ├── formModal.css
    │   │   ├── FormMOdal.jsx
    │   │   └── FormModal2.jsx
    │   ├── LoadingSpinner
    │   │   ├── LoadingSpinner.jsx
    │   │   └── loadingSpninner.css
    │   └── Popup
    │       ├── popup.css
    │       └── Popup.jsx
    ├── contexts
    │   ├── AuthContext.jsx
    │   └── AuthContextProvider.jsx
    ├── hooks
    │   └── useAuth.jsx
    ├── index.css
    ├── layouts
    │   ├── dashBoardLayout.css
    │   └── DashBoardLayout.jsx
    ├── main.jsx
    ├── pages
    │   ├── Banner
    │   │   ├── banner.css
    │   │   └── Banner.jsx
    │   ├── Categories
    │   │   ├── categories.css
    │   │   └── Categories.jsx
    │   ├── Comments
    │   │   ├── comments.css
    │   │   ├── Comments.jsx
    │   │   └── CommentTable.jsx
    │   ├── CreatePost
    │   │   ├── createPost.css
    │   │   └── CreatePost.jsx
    │   ├── CreateReel
    │   │   ├── createReel.css
    │   │   └── CreateReel.jsx
    │   ├── CreateWarehouse
    │   │   ├── createWarehouse.css
    │   │   └── CreateWarehouse.jsx
    │   ├── Dashboard
    │   │   ├── ApplicationList
    │   │   │   ├── applicationList.css
    │   │   │   └── ApplicationList.jsx
    │   │   ├── CreateRole
    │   │   │   ├── createRole.css
    │   │   │   └── CreateRole.jsx
    │   │   ├── dashboard.css
    │   │   └── Dashboard.jsx
    │   ├── Forbidden
    │   │   └── Forbidden.jsx
    │   ├── Inventory
    │   │   ├── AddProducts
    │   │   │   ├── addProducts.css
    │   │   │   └── AddProducts.jsx
    │   │   ├── inventory.css
    │   │   ├── Inventory.jsx
    │   │   ├── UpdateForm
    │   │   │   └── UpdateForm.jsx
    │   │   └── ViewProductCard
    │   │       ├── viewProductCard.css
    │   │       └── ViewProductCard.jsx
    │   ├── Login
    │   │   ├── login.css
    │   │   └── Login.jsx
    │   ├── LowStockAlert
    │   │   ├── lowStockAlert.css
    │   │   └── LowStockAlert.jsx
    │   ├── Orders
    │   │   ├── orders.css
    │   │   ├── Orders.jsx
    │   │   └── OrdersRow.jsx
    │   ├── ProductManagement
    │   │   ├── productManagement.css
    │   │   ├── ProductManagement.jsx
    │   │   ├── ProductManagementTable.jsx
    │   │   └── TableTr.jsx
    │   ├── ProductQrCode
    │   │   ├── productQrCode.css
    │   │   └── ProductQrCode.jsx
    │   ├── SalesPoints
    │   │   ├── salesPoints.css
    │   │   └── SalesPoints.jsx
    │   ├── SalesReport
    │   │   ├── salesReport.css
    │   │   └── SalesReport.jsx
    │   ├── SalesRepresentativeFormDownload
    │   │   └── salesRepresentativeFormDownload.css
    │   └── Users
    │       ├── users.css
    │       └── Users.jsx
    ├── router
    │   └── router.jsx
    ├── routes
    │   ├── AdminRoute.jsx
    │   └── PrivateRoute.jsx
    └── utils
        └── getFormData.jsx


```

Notable files:

- `src/main.jsx` — application bootstrap
- `src/router/router.jsx` — application route definitions
- `src/contexts/AuthContextProvider.jsx` — authentication provider

**Development Notes & Tips**

- The app uses React Router for navigation. Protected routes are implemented in `src/routes` (`AdminRoute.jsx` and `PrivateRoute.jsx`).
- UI components are grouped under `src/components` with individual folders for CSS + component JSX.
- ESLint is configured; run `npm run lint` and fix issues before creating PRs.
- For building and testing the production output: run `npm run build` then `npm run preview` to locally review the optimized bundle.

**How to run locally (quick start)**

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open the URL shown by Vite (usually `http://localhost:5173`) in your browser.

**Contributing**

- Fork the repository and create a feature branch: `git checkout -b feat/your-feature`
- Follow existing code style and component patterns.
- Run `npm run lint` and ensure no lint errors.
- Open a pull request with a clear description of changes.

**License**

No license is specified in this repository. Add a `LICENSE` file if you want to set an explicit license (for example, `MIT`).

**Contact / Issues**

If you find bugs or want enhancements, open an issue in the repository or contact the maintainers.

---

If you'd like, I can also:

- add badges (build / npm version) to the top of this README
- add a short screenshots section with sample images from `public/` (if available)
- create a `CONTRIBUTING.md` or add a license file

Tell me which additions you want and I'll apply them.
