# Digital Wallet Client

- A modern, responsive frontend application for managing digital wallet operations, built with React, Redux, and Material-UI. This client interfaces seamlessly with the Digital Wallet API, enabling users to perform transactions, view balances, and manage their accounts.

---

## Live Link

```
https://neopay-wallet.vercel.app/
```

## Admin, Agent and Admin Email, Password

```
Admin:
  email: admin@gmail.com,
  password: Admin123@

Agent:
 email: mukithossen7@gmail.com
 password: Agent123@

 User:
 email: hossenmukit7@gmail.com
 password: User123@
```

## Features

- Secure JWT-based login and registration with role selection for Users, Agents, and Admins.
- **Users**, **Agents**, and **Admins** get personalized dashboards with role-specific features.
- **Users** can check real-time wallet balance, deposit, withdraw, and send money.
- **Users** have detailed transaction logs with pagination, filtering, and search options.
- **Agents** can handle cash-in/out operations, track commissions, and view activity summaries.
- **Admins** can manage users and agents, approve/suspend accounts, and monitor all transactions.
- Fully mobile-first and device-friendly layout using Tailwind CSS.
- Robust global state handling and API integration via Redux Toolkit & RTK Query.
- Dynamic charts, tables, and cards provide transaction insights for all roles.
- Enhanced UX with skeleton loaders, toast notifications, guided tour, and light/dark mode toggle.

---

## Technologies Used

- **Frontend**: React.js and TypeScript
- **Routing**: React Router
- **State Management**: Redux
- **UI Framework**: Shadcn
- **API Communication**: Axios
- **Styling**:Tailwind CSS
- **Animation**:Framer-motion
- **Form Validation**: Formik & Yup

## Installation & Setup

```
git clone https://github.com/MukitHossen7/Digital_Wallet_Client
```

```
cd Digital_Wallet_Client
```

```
npm install
```

```
npm run dev
```

## Folder Structure

```bash
digital-wallet-frontend/
│
├── public/
├── src/
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── styles/
│   └── utils/
│
├── .env.example
├── package.json
└── README.md

```

## Author

- Developed by **Mukit Hossen**
- **FullStack Developer**

---

## Dependencies

- "@hookform/resolvers": "^5.2.1",
- "@radix-ui/react-avatar": "^1.1.10",
- "@radix-ui/react-dialog": "^1.1.15",
- "@radix-ui/react-dropdown-menu": "^2.1.16",
- "@radix-ui/react-label": "^2.1.7",
- "@radix-ui/react-select": "^2.2.6",
- "@radix-ui/react-separator": "^1.1.7",
- "@radix-ui/react-slot": "^1.2.3",
- "@radix-ui/react-tabs": "^1.1.13",
- "@radix-ui/react-tooltip": "^1.2.8",
- "@reduxjs/toolkit": "^2.8.2",
- "@tailwindcss/vite": "^4.1.12",
- "@types/react-helmet": "^6.1.11",
- "axios": "^1.11.0",
- "class-variance-authority": "^0.7.1",
- "clsx": "^2.1.1",
- "framer-motion": "^12.23.12",
- "input-otp": "^1.4.2",
- "lucide-react": "^0.541.0",
- "next-themes": "^0.4.6",
- "radix-ui": "^1.4.3",
- "react": "^19.1.0",
- "react-dom": "^19.1.0",
- "react-helmet": "^6.1.0",
- "react-hook-form": "^7.62.0",
- "react-icons": "^5.5.0",
- "react-is": "^19.1.1",
- "react-redux": "^9.2.0",
- "react-router": "^7.8.2",
- "react-router-dom": "^7.8.2",
- "recharts": "^2.15.4",
- "sonner": "^2.0.7",
- "tailwind-merge": "^3.3.1",
- "tailwindcss": "^4.1.12",
- "zod": "^4.1.0"

## DevDependencies

- "@eslint/js": "^9.11.1",
- "@types/node": "^24.3.0",
- "@types/react": "^19.1.8",
- "@types/react-dom": "^19.1.6",
- "@types/react-router-dom": "^5.3.3",
- "@vitejs/plugin-react": "^4.3.2",
- "eslint": "^9.11.1",
- "eslint-plugin-react-hooks": "^5.1.0-rc.0",
- "eslint-plugin-react-refresh": "^0.4.12",
- "globals": "^15.9.0",
- "tw-animate-css": "^1.3.7",
- "typescript": "^5.5.3",
- "typescript-eslint": "^8.7.0",
- "vite": "^5.4.8"
