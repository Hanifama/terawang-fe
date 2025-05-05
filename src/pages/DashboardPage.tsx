import DashboardLayout from "./DashboardLayout";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import treeIconUrl from "../assets/icon-tree.png";
import { useEffect } from "react";
import { useTreeStore } from "../store/useTreeStore";

// Custom icon pohon
const TreeIcon: L.Icon = L.icon({
  iconUrl: treeIconUrl,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -40],
});

const DashboardPage = () => {
  const {
    trees,
    fetchTrees,
    loading,
  } = useTreeStore();

  useEffect(() => {
    fetchTrees(1, 10);
  }, [fetchTrees]);

  return (
    <DashboardLayout>
      <div className="bg-white shadow-md rounded-xl p-4 relative">
        {loading ? (
          <div className="h-[460px] flex items-center justify-center text-gray-600">
            Loading...
          </div>
        ) : (
          <MapContainer
            center={[-2.5489, 118.0149]} 
            zoom={5}

            scrollWheelZoom={false}
            className="h-[460px] w-full rounded-lg"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {trees.map((tree) => (
              <Marker
                key={tree._id}
                position={[tree.lat, tree.lng]}
                icon={TreeIcon}
              >
                <Popup>{tree.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        {/* Legend Icon Tree */}
        <div className="absolute bottom-4 right-4 z-[1000] bg-white rounded-md shadow-lg p-3 flex items-center gap-3 text-sm">
          <img src={treeIconUrl} alt="Tree Icon" className="w-8 h-8" />
          <span className="text-gray-700 font-medium">Pohon Tercatat</span>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
