# 🎵Concert App

A modern full-stack web application for discovering, managing, and booking concerts — built with Next.js (frontend) and NestJS (backend).

## Running the Development Servers

### Frontend (Next.js):

From the /concert-app-frontend directory, run:

```bash
npm run dev
```

The frontend will be available at http://localhost:3000

### Backend (NestJS):

From the /concert-app-backend directory, run:

```bash
npm run start:dev
```

The backend will be available at http://localhost:5000

To run unit test

```bash
npm run test
```

Once both servers are running:

- Open your browser and go to http://localhost:3000 to interact with the frontend.
- The frontend will interact with the backend API at http://localhost:5000
- The backend swagger ui also available at http://localhost:5000/api

## Project Structure

### Frontend (/concert-app-frontend)

- app/: Contains main page layouts and components for both admin and user sections.
- (admin)/: Admin-specific pages, like viewing the concert history and delete.
- (user)/: User-specific pages for interacting with concerts (e.g., reserving tickets).
- components/: Reusable UI components across the app (e.g., notification, modal).
- context/: React context to manage global state (e.g., concert data).

### Backend (/concert-app-backend)

- concert/: Concert management logic.
  - concert.controller.ts: API routes for managing concerts.
  - concert.entity.ts: Defines the concert schema for the database.
  - concert.service.ts: Business logic for concert operations.
- reservation/: Handles reservation-related operations.
  - reservation.controller.ts: API routes for managing reservations.
  - reservation.entity.ts: Defines the reservation schema.
  - reservation.service.ts: Business logic for reserving concerts.
- user/: Manages user data.
  - user.controller.ts: API routes for user registration and profile management.
  - user.service.ts: User business logic.
  - user-seeder.service.ts: Service to seed the database with user data.
