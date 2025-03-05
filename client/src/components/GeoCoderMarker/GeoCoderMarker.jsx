import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Default Leaflet icon
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState([51.505, -0.09]); // Default to London

  useEffect(() => {
    if (!address) {
      console.warn("No address provided for geocoding.");
      return;
    }

    // Use OpenStreetMap's Nominatim API (no API key required)
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const { lat, lon } = data[0]; // Extract coordinates
          setPosition([parseFloat(lat), parseFloat(lon)]);
          map.flyTo([parseFloat(lat), parseFloat(lon)], 10);
        } else {
          console.warn("No valid results found for address:", address);
        }
      })
      .catch((error) => console.error("Geocoding error:", error));
  }, [address, map]);

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup>{address || "Unknown Location"}</Popup>
    </Marker>
  );
};

export default GeoCoderMarker;
