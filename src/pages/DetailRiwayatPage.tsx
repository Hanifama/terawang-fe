import React from "react";
import DashboardLayout from "./DashboardLayout";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useParams } from 'react-router-dom';
import bgImage from "../assets/bg.jpg";

import L from "leaflet";
import treeIconUrl from "../assets/icon-tree.png";

// Dummy data untuk contoh
const dummyData = [
    {
        namaPohon: "Beringin",
        surveyor: "Haris",
        tanggal: "2025-04-20",
        idDevice: "DEV-001",
        diameterLuar: 60,
        diameterDalam: 40,
        lokasi: [-6.9219, 107.6078], // Alun-Alun Bandung
        image: bgImage,
    },
    {
        namaPohon: "Mahoni",
        surveyor: "Ayu",
        tanggal: "2025-04-19",
        idDevice: "DEV-002",
        diameterLuar: 70,
        diameterDalam: 50,
        lokasi: [-6.9025, 107.6186], // Gedung Sate
        image: bgImage,
    },
    {
        namaPohon: "Tanjung",
        surveyor: "Budi",
        tanggal: "2025-04-18",
        idDevice: "DEV-003",
        diameterLuar: 80,
        diameterDalam: 55,
        lokasi: [-6.9003, 107.6181], // Gasibu
        image: bgImage,
    },
    {
        namaPohon: "Trembesi",
        surveyor: "Sari",
        tanggal: "2025-04-17",
        idDevice: "DEV-004",
        diameterLuar: 85,
        diameterDalam: 60,
        lokasi: [-6.9176, 107.6107], // Braga
        image: bgImage,
    },
    {
        namaPohon: "Ketapang",
        surveyor: "Andi",
        tanggal: "2025-04-16",
        idDevice: "DEV-005",
        diameterLuar: 75,
        diameterDalam: 52,
        lokasi: [-6.8986, 107.6191], // Taman Lansia
        image: bgImage,
    },
    {
        namaPohon: "Tabebuya",
        surveyor: "Haris",
        tanggal: "2025-04-15",
        idDevice: "DEV-006",
        diameterLuar: 65,
        diameterDalam: 45,
        lokasi: [-6.9167, 107.6103], // Balai Kota
        image: bgImage,
    },
    {
        namaPohon: "Palem",
        surveyor: "Dina",
        tanggal: "2025-04-14",
        idDevice: "DEV-007",
        diameterLuar: 90,
        diameterDalam: 70,
        lokasi: [-6.8898, 107.6045], // Cihampelas Walk
        image: bgImage,
    },
    {
        namaPohon: "Angsana",
        surveyor: "Budi",
        tanggal: "2025-04-13",
        idDevice: "DEV-008",
        diameterLuar: 78,
        diameterDalam: 55,
        lokasi: [-6.8837, 107.6111], // Dago
        image: bgImage,
    },
    {
        namaPohon: "Akasia",
        surveyor: "Ayu",
        tanggal: "2025-04-12",
        idDevice: "DEV-009",
        diameterLuar: 68,
        diameterDalam: 50,
        lokasi: [-6.8915, 107.6107], // ITB
        image: bgImage,
    },
    {
        namaPohon: "Pinus",
        surveyor: "Haris",
        tanggal: "2025-04-11",
        idDevice: "DEV-010",
        diameterLuar: 85,
        diameterDalam: 60,
        lokasi: [-6.9149, 107.6015], // Stasiun Bandung
        image: bgImage,
    },
];

// Custom icon pohon
const TreeIcon: L.Icon = L.icon({
    iconUrl: treeIconUrl,
    iconSize: [35, 45],
    iconAnchor: [17, 45],
    popupAnchor: [0, -40],
});

const DetailRiwayatPage: React.FC = () => {
    const { idDevice } = useParams();

    const dataPohon = dummyData.find((item) => item.idDevice === idDevice);

    if (!dataPohon) {
        return <Typography variant="h6">Data tidak ditemukan</Typography>;
    }

    const {
        namaPohon,
        surveyor,
        tanggal,
        diameterLuar,
        diameterDalam,
        lokasi,
        image,
    } = dataPohon;

    const validLokasi: [number, number] = Array.isArray(lokasi) && lokasi.length === 2
        ? (lokasi as [number, number])
        : [-6.200000, 106.816666];

    return (
        <DashboardLayout>
            <Box sx={{ padding: 4 }}>
                <Grid container spacing={4}>
                    {/* Kiri - Gambar & Info Pohon */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ textAlign: "center" }}>
                            <img
                                src={image}
                                alt="Pohon"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                }}
                            />
                        </Box>
                        <h1 className="font-semibold text-xl mb-">Detail Data</h1>
                        {/* Info Dua Kolom */}
                        <Grid container spacing={2}>
                            {/* Baris 1 */}
                            <Grid item xs={6}>
                                <Typography variant="body2" color="textSecondary">
                                    ID Device
                                </Typography>
                                <Typography variant="body1">{dataPohon.idDevice}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="textSecondary">
                                    Nama Pohon
                                </Typography>
                                <Typography variant="body1">{namaPohon}</Typography>
                            </Grid>

                            {/* Baris 2 */}
                            <Grid item xs={6}>
                                <Typography variant="body2" color="textSecondary">
                                    Longitude
                                </Typography>
                                <Typography variant="body1">{dataPohon.lokasi[1]}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="textSecondary">
                                    Latitude
                                </Typography>
                                <Typography variant="body1">{dataPohon.lokasi[0]}</Typography>
                            </Grid>

                            {/* Baris 3 */}
                            <Grid item xs={6}>
                                <Typography variant="body2" color="textSecondary">
                                    Nama Surveyor
                                </Typography>
                                <Typography variant="body1">{surveyor}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="textSecondary">
                                    Tanggal Survey
                                </Typography>
                                <Typography variant="body1">{tanggal}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>


                    {/* Kanan - Diameter & Data Sensor */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ mb: 4 }} elevation={0}>
                            <CardContent
                                sx={{ textAlign: "left" }}>
                                <Typography variant="h6" gutterBottom>
                                    Diameter Pohon
                                </Typography>

                                {/* Ilustrasi Diameter */}
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: `${diameterLuar}px`,
                                        height: `${diameterLuar}px`,
                                        borderRadius: "50%",
                                        backgroundColor: "#8B5E3C", // coklat semu
                                        margin: "0 auto",
                                        mb: 6,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            width: `${diameterDalam}px`,
                                            height: `${diameterDalam}px`,
                                            borderRadius: "50%",
                                            backgroundColor: "#6DB66F", // hijau
                                            transform: "translate(-50%, -50%)",
                                        }}
                                    />
                                </Box>

                                {/* Label Keterangan Diameter */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 2,
                                        px: 2,
                                        textAlign: "left",
                                        borderBottom: "2px solid #8B5E3C",
                                    }}
                                >
                                    {/* Diameter Luar */}
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: "50%",
                                                backgroundColor: "#8B5E3C",
                                            }}
                                        />
                                        <Box>
                                            <Typography variant="body2" color="textSecondary">
                                                Diameter Luar
                                            </Typography>
                                            <Typography variant="body1">{diameterLuar} cm</Typography>
                                        </Box>
                                    </Box>

                                    {/* Diameter Dalam */}
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: "50%",
                                                backgroundColor: "#6DB66F",
                                            }}
                                        />
                                        <Box>
                                            <Typography variant="body2" color="textSecondary">
                                                Diameter Dalam
                                            </Typography>
                                            <Typography variant="body1">{diameterDalam} cm</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Data Sensor */}
                        <Card sx={{ mb: 4 }} elevation={0}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Data Sensor
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 2, // Jarak antar card
                                        flexWrap: 'wrap', // Biar responsif, pindah ke bawah kalau sempit
                                        mt: 2,
                                    }}
                                >
                                    {["Sensor 1", "Sensor 2"].map((sensor, index) => (
                                        <Card key={index} sx={{ flex: 1, minWidth: 150 }}>
                                            <CardContent>
                                                <Typography variant="body1">{sensor}</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Nilai {index === 0 ? "70" : "50"}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>

                    </Grid>
                </Grid>

                {/* Map Section */}
                <Box sx={{ mt: 4, position: "relative" }}>
                    <MapContainer
                        center={validLokasi}
                        zoom={13}
                        scrollWheelZoom={false}
                        style={{
                            height: "400px",
                            width: "100%",
                            borderRadius: "8px",
                            position: "relative",
                        }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker icon={TreeIcon} position={validLokasi}>
                            <Popup>{namaPohon}</Popup>
                        </Marker>
                    </MapContainer>

                    {/* Legenda */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: "0",
                            right: "0",
                            backgroundColor: "white",
                            padding: "10px",
                            borderRadius: "8px",
                            boxShadow: "0 0 6px rgba(0,0,0,0.2)",
                            fontSize: "14px",
                            width: "250px",
                            zIndex: 1000,
                        }}
                    >
                        <div className="flex items-center space-x-2 p-2 bg-white">
                            <img src={treeIconUrl} alt="Tree Icon" className="w-8 h-8" />
                            <strong className="text-sm font-medium text-gray-800">Letak Pohon {namaPohon}</strong>
                        </div>
                    </div>
                </Box>

            </Box>
        </DashboardLayout>
    );
};

export default DetailRiwayatPage;
