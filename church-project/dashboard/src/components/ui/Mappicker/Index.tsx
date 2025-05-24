import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import markerShadow from "/shadow.png";
import customMarker from "/marker.png"; 
import styles from "./index.module.css"; 

// Custom Leaflet Icon
const customIcon = new L.Icon({
  iconUrl: customMarker,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
  shadowUrl: markerShadow,
  shadowSize: [41, 41],
  shadowAnchor: [20, 25],
});

type Props = {
  onLocationChange: (lat: number, lng: number) => void;
};

const SearchControl = ({ onChange }: { onChange: (lat: number, lng: number) => void }) => {
  const map = useMap();
  const controlRef = useRef<any>(null);

  useEffect(() => {
const provider = new OpenStreetMapProvider();

const searchControl = GeoSearchControl({
  provider,
  showMarker: false,
  showPopup: false,
  marker: {
    icon: new L.Icon.Default(),
    draggable: false,
  },
  style: "bar",
  autoClose: true,
  retainZoomLevel: false,
  searchLabel: "Enter location",
  keepResult: true,
});


    map.addControl(searchControl);
    controlRef.current = searchControl;

    map.on("geosearch/showlocation", (result: any) => {
      const { location } = result;
      onChange(location.y, location.x);
    });

    return () => {
      map.removeControl(searchControl);
    };
  }, [map, onChange]);

  return null;
};

const LocationMarker = ({
  position,
}: {
  position: L.LatLng | null;
}) => {
  return position ? <Marker position={position} icon={customIcon} /> : null;
};

const MapPicker: React.FC<Props> = ({ onLocationChange }) => {
  const [markerPosition, setMarkerPosition] = useState<L.LatLng | null>(null);

  const handleMapClick = (lat: number, lng: number) => {
    const newPosition = new L.LatLng(lat, lng);
    setMarkerPosition(newPosition);
    onLocationChange(lat, lng);
  };

  const HandleClick = () => {
    useMapEvents({
      click(e) {
        handleMapClick(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{ height: "300px", width: "100%", borderRadius: "8px" }}
      className={styles.mapContainer}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SearchControl onChange={handleMapClick} />
      <HandleClick />
      <LocationMarker position={markerPosition} />
    </MapContainer>
  );
};

export default MapPicker;