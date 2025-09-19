# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This repository contains multiple client implementations that demonstrate a Service Broker pattern. Each subdirectory is a separate frontend application that communicates with a Spring Boot Service Broker API to perform user management operations (create, retrieve users).

## Project Structure

```
nucleus-client/
├── js-servicebroker/              # Vanilla JavaScript/HTML client
├── nextjs-file-service/           # Next.js + TypeScript with file upload & service broker
├── react-ts-servicebroker/        # React + TypeScript client  
├── solid-ts-servicebroker/        # SolidJS + TypeScript client
├── solid-ts-social/               # SolidJS social app variant
├── svelte-ts-servicebroker/       # Svelte + TypeScript client
└── svelte-ts-file-upload/         # Svelte file upload variant
```

## Common Development Commands

### Project Setup and Dependencies
```bash
# Install dependencies for a specific project
cd <project-name>
npm install

# Install dependencies for all projects (run from root)
foreach ($dir in Get-ChildItem -Directory) { if (Test-Path "$($dir.Name)/package.json") { cd $dir.Name; npm install; cd .. } }
```

### Development Server
```bash
# Start development server for any project
cd <project-name>
npm run dev

# Common dev server URLs:
# http://localhost:5173 (Vite default for most projects)
# http://localhost:9002 (Next.js project - nextjs-file-service)
```

### Building Projects
```bash
# Build for production
cd <project-name>
npm run build

# TypeScript projects (React, Solid, Svelte):
npm run build   # Runs TypeScript compilation + Vite build

# Build output location: dist/ directory in each project
```

### Code Quality and Type Checking
```bash
# Lint code (React project only)
cd react-ts-servicebroker
npm run lint

# Type checking for Svelte projects
cd svelte-ts-servicebroker  # or svelte-ts-file-upload
npm run check

# Type checking for Next.js project
cd nextjs-file-service
npm run typecheck
```

### Preview Production Build
```bash
# Preview built application locally
cd <project-name>
npm run preview
```

## Architecture Overview

### Service Broker Pattern
All client applications implement the same Service Broker communication pattern:

**Core Interfaces:**
- `ServiceRequest`: Standard request format with service, operation, params, and requestId
- `ServiceResponse<T>`: Standard response format with ok status, data, errors, and timestamp
- `submitRequest<T>()`: Core function that communicates with the Spring Boot Service Broker API

**API Endpoint:** All clients expect a Service Broker API at `/api/broker/submitRequest`

**Services:**
- `userService`: User management operations
  - `getById`: Retrieve user by ID
  - `create`: Create new user

### Client-Specific Implementations

**JavaScript Client (`js-servicebroker/`):**
- Vanilla JavaScript implementation
- Direct HTML/CSS/JS with no build process
- Entry points: `index.html`, `brokerClient.js`

**Next.js Client (`nextjs-file-service/`):**
- Next.js 15 + React + TypeScript
- Advanced file upload with service broker integration
- shadcn/ui components with Tailwind CSS
- API routes for service broker proxying
- Comprehensive user management and file processing UI
- Dev server on port 9002

**React Client (`react-ts-servicebroker/`):**
- React 19 + TypeScript + Vite
- TailwindCSS for styling
- Components: `UserBrokerClient.tsx`
- Services: `brokerClient.ts`

**SolidJS Clients:**
- `solid-ts-servicebroker/`: Standard user service client
- `solid-ts-social/`: Social application variant
- Both use SolidJS + TypeScript + Vite
- Minimal dependencies (just solid-js)

**Svelte Clients:**
- `svelte-ts-servicebroker/`: Standard user service client  
- `svelte-ts-file-upload/`: File upload application variant
- Both use Svelte 5 + TypeScript + Vite
- Include `svelte-check` for type checking

### Shared Client Architecture
Each TypeScript client follows this structure:
```
src/
├── components/          # UI components (UserBrokerClient)
├── services/           # API client logic (brokerClient)
├── App.tsx/App.svelte  # Main application component
└── main.tsx/index.tsx  # Application entry point
```

### Development Notes

**Vite Configuration:**
- All TypeScript projects use Vite as the build tool
- Framework-specific plugins: `@vitejs/plugin-react-swc`, `vite-plugin-solid`, `@sveltejs/vite-plugin-svelte`
- Default dev server port: 5173

**TypeScript:**
- All projects use TypeScript ~5.8.3
- Strict type checking enabled
- Shared service interfaces across implementations

**Service Broker Communication:**
- Requests include client identifier for tracking (`react-`, `solid-`, `svelte-`, `js-`)
- Automatic requestId generation using timestamp
- Error handling with null returns on failure
- JSON serialization of requests/responses

**Next.js Specific Notes:**
- Uses Next.js API routes as proxy to service broker
- Requires environment configuration (.env.local)
- Combined user management and file processing in single UI
- Advanced file upload with drag-and-drop support
- Built-in toast notifications for user feedback

**Backend Dependency:**
All clients expect a Spring Boot Service Broker API running (typically on port 8080) with the following endpoints:
- `/api/broker/submitRequest` - Standard requests
- `/api/broker/submitRequestWithFile` - File upload requests

The clients will not function without this backend service.
