# Podcast App (DJS05 Submission)

A React podcast browsing application that allows users to discover podcasts, search by title, filter by genre, sort results, and navigate to a dedicated detail page for each show. This project introduces client-side routing, dynamic show pages, and improved application structure using **React Router**.

---

## Features

### Home Page

- Fetches podcast preview data from the API.
- Search podcasts by title (case-insensitive).
- Filter podcasts by genre.
- Sort podcasts by:
  - Default
  - Newest
  - Oldest
  - Title A → Z
  - Title Z → A

### Show Detail Page

- Dynamic routing using React Router (`/show/:id`).
- Fetches full podcast information using the selected show's ID.
- Displays:
  - Podcast title
  - Large cover image
  - Description
  - Genre tags
  - Last updated date
  - Total seasons
  - Total episodes
- Season selector for quickly switching between seasons.
- Displays each episode with:
  - Episode number
  - Episode title
  - Season image
  - Shortened description
- Loading state while data is being fetched.
- Error handling.
- Empty state when a podcast cannot be found.

### Utilities

- Human-readable date formatting.
- Genre ID to genre name mapping.

### Code Quality

- Modular React component structure.
- JSDoc documentation for major functions and modules.
- Consistent formatting and separation of concerns.
- Reusable utility functions.

---

## Technologies Used

- React
- React Router DOM
- Vite
- JavaScript (ES6+)
- CSS Modules

---

## Project Structure

```
src
├── api
├── components
│   ├── layout
│   ├── podcast
│   └── ui
├── context
├── data
├── pages
├── styles
└── utils
```

---

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone (https://github.com/mughammadcase/MUGCAS25563_PTO2508_Mughammad_Case_DJS05.git)
```

Navigate to the project folder:

```
cd MUGCAS25563_PTO2508_Mughammad_Case_DJS05
```

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

Open your browser and navigate to the local development URL displayed in the terminal.

---

## API

This project uses the Podcast API:

- Preview podcasts
- Individual podcast details
- Genre mapping

---

## Learning Outcomes

This project demonstrates:

- React component architecture
- React Router dynamic routing
- Route parameters with `useParams`
- Client-side navigation
- Asynchronous data fetching
- State management with Context API
- Conditional rendering
- Utility function abstraction

---

## Additional Resources

In addition to the course material, the official React Router documentation was used to better understand routing concepts and implement dynamic navigation:

- [https://reactrouter.com/api/components](https://reactrouter.com/api/components/Route)

---
