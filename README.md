# GlobeBox
![image](https://github.com/user-attachments/assets/34457bda-0701-4b7c-b445-6867433eefad)

GlobeBox is an interactive web application that allows users to discover and share locations around the world. Users can place markers on a map, add details about locations, and interact with other users' discoveries.

## Features

### 🗺️ Map Interaction
- Interactive world map using Leaflet
- Place markers at specific coordinates
- View all shared locations on the map
- Click markers to view location details

### 📍 Location Markers
- Create new location markers
- Add detailed information including:
  - Location name
  - Description
  - Images
  - Rating
  - Country
- Edit your own markers
- Delete markers you've created

### 👤 User Authentication
- User registration with email
- Secure login/logout functionality
- Protected routes for authenticated users
- User-specific actions (create, edit, delete markers)

### ❤️ Social Features
- Like other users' locations
- View how many likes a location has received
- See if you've already liked a location

### 📱 User Interface
- Responsive design
- Navigation header
- Home page with latest additions
- Catalog view of all locations
- Detailed view for each location

## Technical Stack

### Frontend
- React.js
- React Router for navigation
- Leaflet for map functionality
- CSS for styling

### Backend
- RESTful API integration
- JSON-based data storage
- Token-based authentication

## API Endpoints

### Authentication
- `/users/register` - User registration
- `/users/login` - User login
- `/users/logout` - User logout

### Markers
- `/data/markers` - CRUD operations for location markers
- `/jsonstore/likes` - Managing location likes

## Getting Started

1. Clone the repository
3. Install dependencies:
      &npm install in client directory, then npm dev to start the app
      &node server.js in server directory to start server
      
