# Navigator MVP
### Modern HotSpot Management for MikroTik Routers 🚀

Navigator MVP is a robust HotSpot management system designed for MikroTik routers, featuring a seamless and user-friendly web interface for WiFi hotspot authentication, user onboarding, and package selection. The project is split into a Next.js frontend and an Express.js backend, ensuring a modern, scalable, and maintainable architecture.

## ✨ Features

- 📱 Seamless user login with phone number authentication
- ⚡ Automatic user creation and activation on MikroTik routers
- 🎯 Customizable package selection for end-users
- 💎 Responsive, glassmorphism-inspired UI with dark mode support
- 🛡️ Robust logging and error handling for backend operations
- 🔗 Full-stack integration with RESTful APIs and real-time communication

## 🏆 Achievements

- 🚀 Reduced user onboarding time by automating authentication and activation processes
- 🎨 Enhanced user experience with a modern, responsive interface and intuitive package selection
- 🔒 Increased system security with phone number-based authentication
- 🛠️ Improved system reliability and maintainability through robust error handling and logging
- 🌐 Enabled seamless integration with MikroTik routers, streamlining network management for administrators
- 📈 Successfully delivered a scalable solution adopted by multiple users and network admins

## 🗂️ Project Structure

- **navigator-consumer-client/**: Next.js frontend for the login portal, onboarding, and package selection  
  - `/src/app/api/capture/route.js`: Configure redirectUrl for hotspot capture
  - `/src/actions/login.jsx`: Handles login and server communication
- **navigator-consumer-api/**: Express.js backend that communicates with MikroTik routers using the RouterOS API  
  - `/src/config/mikrotik.config.js`: Configure MikroTik router connection

## 🚀 Getting Started

### navigator-consumer-api

```bash
cd navigator-consumer-api
npm install
npm run dev
```

### navigator-consumer-client

```bash
cd navigator-consumer-client
npm install
npm run dev
```

---

Whether you are a network administrator, ISP, or developer looking to modernize MikroTik HotSpot management, this project serves as a practical, production-ready resource and learning guide. Happy networking!! 🌐
