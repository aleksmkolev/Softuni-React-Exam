# Globe Box

![image](https://github.com/user-attachments/assets/646b7555-c2e1-4512-8c5d-27a4263d1d6c)



An interactive 3D globe application that allows users to explore, create, and manage location markers worldwide.
Created for Softuni React Module 

## 🌟 Features

- **Interactive 3D Globe Visualization**
  - Real-time rotation
  - Day/night cycle visualization
  - Custom marker placement
  - Zoom controls
  - Lat/Long coordinates

- **Marker Management**
  - Create new markers
  - Edit existing markers
  - Delete markers
  - Rate locations
  - Add descriptions and images
  - Quick view markers

- **User Authentication**
  - User registration
  - Login/Logout functionality
  - Protected routes
  - User-specific actions
  - Comment on markers

- **Responsive Design**
  - Mobile-friendly interface
  - Adaptive layouts
  - Touch-friendly controls

## 🛠️ Technologies & Libraries

### Core
- React
- React Router DOM
- Vite

### Map & Globe libraries
- react-globe.gl
- Three.js
- Leaflet

### Styling
- CSS Modules
- Custom CSS with CSS-in-JS

### Authentication
- JWT (JSON Web Tokens)
- Local Storage for persistence

## 📦 Component Structure

```
App
├── Header
├── Routes
│ ├── Home
│ │ └── Globe
│ ├── Markers
│ │ └── MarkerItem
│ ├── MarkerDetails
│ ├── CreateMarker
│ ├── EditMarker
│ ├── Map
│ ├── Login/Register
│ └── PageNotFound
└── Footer
```

## 🔄 Component Interaction Diagram
```
UserContext
    ↓
App (State Management)
    ↓
┌─────────────────────────┐
│  Header ← User Auth     │
│     ↓                   │
│  Routes                 │
│     ↓                   │
│  Components ← API Calls │
└─────────────────────────┘
```

## 🔍 Key Features in Detail

### Globe Interaction
- Auto-rotation
- Custom marker placement
- Interactive zoom
- Atmospheric effects

### Marker Management
- CRUD operations
- Image upload
- Rating system
- Location coordinates

### User Experience
- Smooth transitions
- Loading states
- Error handling
- Form validation

## 🚀 Getting Started

1. Clone the repository
```bash
git clone <repository-url>
```

1. Install dependencies
```bash
cd globe-box
npm install
npm run dev
```

3. Start the development server
```bash
cd server
node server.js

```


