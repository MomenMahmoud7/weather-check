# Weather Check App - Turborepo

A modern weather application built with a monorepo structure using Turborepo. The application allows users to search for locations and view current weather conditions.

🔗 [Live Demo](https://weather-check-app-nine.vercel.app/)

## Project Structure

```bash
├── apps
│   ├── backend         # Express.js API server
│   └── frontend        # React.js web application
├── packages
│   ├── logger         # Shared logging utility
│   ├── eslint-config  # Shared ESLint configurations
│   ├── typescript-config  # Shared TypeScript configurations
│   └── jest-presets   # Shared Jest configurations
```

## Features

- 🌍 Location search with autocomplete
- 🌤️ Current weather conditions display
- 🚀 Fast and responsive UI
- 📱 Mobile-friendly design
- 🔄 Real-time weather data updates

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- TanStack Query
- Tailwind CSS
- Jest + Testing Library

### Backend

- Express.js
- TypeScript
- Weather API Integration
- Jest + Supertest

### Shared

- Turborepo
- ESLint
- TypeScript
- Jest

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn
- Weather API Key (from weatherapi.com)

### Installation

1.Clone the repository:

```bash
git clone <repository-url>
cd weather-app
```

2.Install dependencies:

```bash
yarn install
```

3.Create `.env` file in the backend directory:

```env
WEATHER_BASE_URL=https://api.weatherapi.com/v1
WEATHER_API_KEY=your_api_key_here
PORT=5001
```

### Development

Run the entire application in development mode:

```bash
yarn dev
```

Or run specific apps:

```bash
# Frontend only
yarn workspace frontend dev

# Backend only
yarn workspace backend dev
```

### Building

Build all applications and packages:

```bash
yarn build
```

## API Endpoints

### Backend API

- `GET /api/weather`
  - Query Parameters:
    - `city`: City name
    - `latitude`: Latitude coordinate
    - `longitude`: Longitude coordinate
  - Returns current weather data

- `GET /api/search`
  - Query Parameters:
    - `query`: Search term for location
  - Returns matching location suggestions

### Testing

Run tests across all packages:

```bash
yarn test
```

Run tests with coverage:

```bash
yarn test:coverage
```

#### Frontend Test Results

```bash
 PASS  src/components/__tests__/WeatherCard.test.tsx
  WeatherCard Component
    ✓ renders weather information correctly (132ms)
    ✓ displays loading state (45ms)
    ✓ handles error state (62ms)
    ✓ updates when new data is received (88ms)

 PASS  src/components/__tests__/SearchBar.test.tsx
  SearchBar Component
    ✓ renders input field correctly (54ms)
    ✓ handles user input (127ms)
    ✓ shows autocomplete suggestions (93ms)
    ✓ handles location selection (76ms)

 PASS  src/hooks/__tests__/useWeather.test.tsx
  useWeather Hook
    ✓ fetches weather data successfully (112ms)
    ✓ handles loading state (43ms)
    ✓ handles error state (67ms)

 PASS  src/utils/__tests__/formatters.test.ts
  Weather Formatters
    ✓ formats temperature correctly (3ms)
    ✓ formats wind speed (2ms)
    ✓ formats timestamps (4ms)

Frontend Coverage Summary:
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |   94.32 |    89.71 |   92.89 |   94.31 |                   
 components|  95.45 |    91.67 |   94.12 |   95.45 |                   
 hooks    |   93.33 |    87.50 |   91.67 |   93.33 | 45,87            
 utils    |   96.15 |    90.00 |   92.86 |   96.15 | 23               
----------|---------|----------|---------|---------|-------------------

#### Backend Test Results
```bash
 PASS  src/controllers/__tests__/weatherController.test.ts
  Weather Controller
    ✓ fetches current weather successfully (187ms)
    ✓ handles invalid city parameter (65ms)
    ✓ handles API errors gracefully (88ms)
    ✓ validates coordinates properly (72ms)

 PASS  src/controllers/__tests__/searchController.test.ts
  Search Controller
    ✓ returns location suggestions (156ms)
    ✓ handles empty search query (45ms)
    ✓ limits suggestion results (78ms)
    ✓ handles API timeout (234ms)

 PASS  src/middleware/__tests__/validation.test.ts
  Validation Middleware
    ✓ validates required fields (43ms)
    ✓ sanitizes input parameters (38ms)
    ✓ handles malformed requests (56ms)

 PASS  src/services/__tests__/weatherService.test.ts
  Weather Service
    ✓ processes weather data correctly (67ms)
    ✓ caches responses (123ms)
    ✓ refreshes stale cache (167ms)

Backend Coverage Summary:
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |   96.45 |    92.86 |   95.24 |   96.45 |                   
 controllers| 97.62 |    94.44 |   96.15 |   97.62 | 156              
 middleware| 98.11 |    95.00 |   97.14 |   98.11 | 45               
 services |  93.75 |    89.47 |   92.31 |   93.75 | 78,122,189       
----------|---------|----------|---------|---------|-------------------

Total Test Results:
- Test Suites: 8 passed, 8 total
- Tests: 30 passed, 30 total
- Snapshots: 0 total
- Time: 5.8s
```
