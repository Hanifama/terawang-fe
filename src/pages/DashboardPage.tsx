import DashboardLayout from "./DashboardLayout";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import treeIconUrl from "../assets/icon-tree.png"; 

// Tipe koordinat: selalu [latitude, longitude]
type Location = {
  id: number;
  name: string;
  position: [number, number];
};

// Data lokasi marker di sekitar Bandung
const treeLocations: Location[] = [
  { id: 1, name: "Pohon Beringin - Alun-Alun Bandung", position: [-6.9219, 107.6078] },
  { id: 2, name: "Pohon Mahoni - Gedung Sate", position: [-6.9025, 107.6186] },
  { id: 3, name: "Pohon Tanjung - Gasibu", position: [-6.9003, 107.6181] },
  { id: 4, name: "Pohon Trembesi - Braga", position: [-6.9176, 107.6107] },
  { id: 5, name: "Pohon Ketapang - Taman Lansia", position: [-6.8986, 107.6191] },
  { id: 6, name: "Pohon Tabebuya - Balai Kota", position: [-6.9167, 107.6103] },
  { id: 7, name: "Pohon Palem - Cihampelas Walk", position: [-6.8898, 107.6045] },
  { id: 8, name: "Pohon Angsana - Dago", position: [-6.8837, 107.6111] },
  { id: 9, name: "Pohon Akasia - ITB", position: [-6.8915, 107.6107] },
  { id: 10, name: "Pohon Pinus - Stasiun Bandung", position: [-6.9149, 107.6015] },
];


// Custom icon pohon
const TreeIcon: L.Icon = L.icon({
  iconUrl: treeIconUrl,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -40],
});

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="bg-white shadow-md rounded-xl p-4 relative">
        <MapContainer
          center={[-6.914744, 107.609810]}
          zoom={13}
          scrollWheelZoom={false}
          className="h-[460px] w-full rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {treeLocations.map((location) => (
            <Marker
              key={location.id}
              position={location.position}
              icon={TreeIcon}
            >
              <Popup>{location.name}</Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend Icon Tree */}
        <div className="absolute bottom-4 right-4 z-[1000] bg-white rounded-md shadow-lg p-3 flex items-center gap-3 text-sm">
          <img src={treeIconUrl} alt="Tree Icon" className="w-8 h-8" />
          <span className="text-gray-700 font-medium">
            Pohon Tercatat
          </span>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
