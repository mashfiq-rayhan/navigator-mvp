## Project Description
Navigator MVP is a full-stack HotSpot management system designed for MikroTik routers. It provides a modern, user-friendly web interface for managing user authentication, session control, and package selection for WiFi hotspot users.

### The project consists of two main components:
- navigator-consumer-client: A Next.js-based frontend that offers a responsive login portal, user onboarding, and package selection UI. It uses Tailwind CSS for styling and supports dynamic theming.
- navigator-consumer-api: An Express.js backend that communicates with MikroTik routers via the RouterOS API. It handles user creation, authentication, and session management, ensuring secure and efficient hotspot access.
### Key Features
- Seamless user login with phone number authentication
- Automatic user creation and activation on MikroTik routers
- Customizable package selection for end-users
- Responsive, glassmorphism-inspired UI with dark mode support
- Robust logging and error handling for backend operations
This system is ideal for ISPs, network administrators, or businesses looking to modernize and simplify their MikroTik HotSpot user experience.

# Navigator MVP

Navigator MVP is a modern HotSpot management system for MikroTik routers. It provides a user-friendly web interface for WiFi hotspot authentication, user onboarding, and package selection.

## Features

- Seamless user login with phone number authentication
- Automatic user creation and activation on MikroTik routers
- Customizable package selection for end-users
- Responsive, glassmorphism-inspired UI with dark mode support
- Robust logging and error handling for backend operations

## Project Structure

- **navigator-consumer-client**: Next.js frontend for the login portal, onboarding, and package selection.
- **navigator-consumer-api**: Express.js backend that communicates with MikroTik routers using the RouterOS API.

## Getting Started

### navigator-consumer-client

```bash
cd navigator-consumer-client
npm install
npm run dev
```

### navigator-consumer-api

```bash
cd navigator-consumer-api
npm install
npm run dev
```

## Usage

1. Connect your MikroTik router and configure the API credentials in [`src/config/mikrotik.config.js`](navigator-consumer-api/src/config/mikrotik.config.js).
2. Start both the client and API servers.
3. Access the login portal and authenticate users via phone number.
4. Users are created and activated automatically on the MikroTik router.

---

This system is ideal for ISPs, network administrators, or businesses looking to modernize and simplify their MikroTik HotSpot user experience.

## :hash: navigator-consumer-api
  #### :one: \src\config\mikrotik.config.js - config connect router

```bash
npm install
npm run dev
```

## :hash: navigator-consumer-client
  #### :one: \src\app\api\capture\route.js - config redirectUrl
  #### :two: \src\actions\login.jsx - Url to send data to server

```bash
npm install
npm run dev
```
