import { Icon } from 'leaflet';

// Custom marker icon with blue color
export const customIcon = new Icon({
    iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%23646cff' stroke='white' stroke-width='2'/%3E%3Ccircle cx='16' cy='16' r='6' fill='white'/%3E%3C/svg%3E",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
});

// Default marker icon (fallback)
export const defaultIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [41, 41]
});
