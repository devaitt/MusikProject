# Musik

Musik is a web application for managing a personal music album collection.

The application allows users to search for albums using the Last.fm API, add albums to their personal collection, view detailed album and track information, manage favorites, and analyze their collection through statistics.

The project was initially developed using JavaScript and was gradually migrated to TypeScript as part of the development process.

## Features

- Search for albums using the Last.fm API
- Add albums to a personal collection
- View detailed information about albums and tracks
- Search albums by title and artist
- Filter albums
- Sort albums by title and release year
- Mark albums and individual tracks as favorites
- View collection statistics
- Store album data in localStorage
- Add and delete albums
- Undo album deletion
- Form validation
- Loading and error states for API requests
- Client-side routing between the collection and individual album pages

## API Integration

The application uses the Last.fm API to search for albums and retrieve additional album information.

The process works as follows:

1. The user enters an album or artist name.
2. The application sends a request to the Last.fm API.
3. Search results are displayed to the user.
4. The user selects an album.
5. The application requests detailed information about the selected album.
6. Album and track data is processed and added to the personal collection.

API responses are typed using TypeScript interfaces to ensure predictable data structures and reduce potential runtime errors.

## TypeScript

The project was gradually migrated from JavaScript to TypeScript.

During the migration, TypeScript was introduced for:

- Album and track data
- React component props
- Application state
- Form data
- API responses
- Functions and their parameters
- Release types

The application uses TypeScript interfaces and types to make the structure of application data more predictable and to detect potential errors during development.

## Routing

The application uses React Router for client-side navigation.

The main routes include:

- Album collection
- Individual album page

Each album has its own route based on its unique identifier.

## Data Persistence

Album collection data is stored in the browser's localStorage.

This allows the application to preserve user data between page reloads without requiring a backend server.

The stored data includes:

- Albums
- Favorite albums
- Favorite tracks
- Album information
- Track information

The application also includes data migration logic to support changes to the structure of previously stored albums.

## Statistics

The application provides statistics based on the user's album collection.

Currently displayed statistics include:

- Total number of albums
- Total number of tracks
- Total number of favorite tracks
- Number of unique artists

## Album Management

Users can add albums to their collection and remove them when needed.

When an album is deleted, the application displays a notification with an Undo action that allows the user to restore the deleted album.

## Form Validation

The album form includes client-side validation to prevent invalid data from being submitted.

The application also handles errors that may occur while communicating with the Last.fm API.

## Technologies

### Frontend

- React
- TypeScript
- JavaScript
- React Router
- HTML5
- CSS3

### API

- Last.fm API
- REST API

### Tools

- Vite
- Git
- GitHub
- npm
- localStorage

## Project Structure

The application follows a component-based React architecture.

The main parts of the project include:

- React components responsible for different parts of the interface
- API functions for communication with Last.fm
- TypeScript types and interfaces
- Application state management
- Routing configuration
- CSS styles

## Development

The project was developed as a personal pet project for practical frontend development experience.

During development, I worked with React functional components, React Hooks, asynchronous API requests, client-side routing, state management, form validation, localStorage and TypeScript.

The project was developed using Git with separate feature branches and Pull Requests for individual features.

## Installation

Clone the repository:

```bash
git clone https://github.com/devaitt/MusikProject.git
```
