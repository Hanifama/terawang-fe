import React from "react";
import DashboardLayout from "./DashboardLayout";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useParams } from 'react-router-dom';
import bgImage from "../assets/bg.jpg";

// Dummy data untuk contoh
const dummyData = [
    {
        namaPohon: "Pisang Raja",
        surveyor: "Haris",
        tanggal: "2025-04-20",
        idDevice: "DEV-001",
        diameterLuar: 60,
        diameterDalam: 40,
        lokasi: [-6.200000, 106.816666],
        image: bgImage,
    },
    {
        namaPohon: "Pisang Ambon",
        surveyor: "Ayu",
        tanggal: "2025-04-19",
        idDevice: "DEV-002",
        diameterLuar: 70,
        diameterDalam: 50,
        lokasi: [-6.201234, 106.817234],
        image: bgImage,
    },
    {
        namaPohon: "Pisang Kepok",
        surveyor: "Budi",
        tanggal: "2025-04-18",
        idDevice: "DEV-003",
        diameterLuar: 80,
        diameterDalam: 55,
        lokasi: [-6.202345, 106.818345],
        image: bgImage,
    },
];

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
                        <Box sx={{ textAlign: "center", mb: 2 }}>
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
                <Box sx={{ mt: 4 }}>
                    <MapContainer
                        center={validLokasi}
                        zoom={13}
                        scrollWheelZoom={false}
                        style={{ height: "400px", width: "100%", borderRadius: "8px" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={validLokasi}>
                            <Popup>{namaPohon}</Popup>
                        </Marker>
                    </MapContainer>
                </Box>
            </Box>
        </DashboardLayout>
    );
};

export default DetailRiwayatPage;
