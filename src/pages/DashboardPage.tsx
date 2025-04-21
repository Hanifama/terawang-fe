import DashboardLayout from "./DashboardLayout";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom icon default config
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div>
        <div className="bg-white shadow-md rounded-xl p-4">
          <MapContainer
            center={[-6.914744, 107.609810]} 
            zoom={10}
            scrollWheelZoom={false}
            className="h-[460px] w-full rounded-lg"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-6.914744, 107.609810]}>
              <Popup>Bandung nih boss</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
