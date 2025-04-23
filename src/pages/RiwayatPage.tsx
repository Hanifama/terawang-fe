import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import CustomTable from "../components/shared/CustomTable";
import { useNavigate } from 'react-router-dom';

const columns = [
    { id: "namaPohon", label: "Nama Pohon", minWidth: 120 },
    { id: "surveyor", label: "Surveyor", minWidth: 150 },
    { id: "tanggal", label: "Tanggal Survey", minWidth: 120 },
    { id: "idDevice", label: "ID Device", minWidth: 170 },
    { id: "aksi", label: "Aksi", minWidth: 80 },
];

const dummyData = [
    {
        namaPohon: "Beringin",
        lokasi: "Alun-Alun Bandung",
        surveyor: "Haris",
        tanggal: "2025-04-20",
        idDevice: "DEV-001",
    },
    {
        namaPohon: "Mahoni",
        lokasi: "Gedung Sate",
        surveyor: "Ayu",
        tanggal: "2025-04-19",
        idDevice: "DEV-002",
    },
    {
        namaPohon: "Tanjung",
        lokasi: "Gasibu",
        surveyor: "Budi",
        tanggal: "2025-04-18",
        idDevice: "DEV-003",
    },
    {
        namaPohon: "Trembesi",
        lokasi: "Braga",
        surveyor: "Sari",
        tanggal: "2025-04-18",
        idDevice: "DEV-004",
    },
    {
        namaPohon: "Ketapang",
        lokasi: "Taman Lansia",
        surveyor: "Andi",
        tanggal: "2025-04-17",
        idDevice: "DEV-005",
    },
    {
        namaPohon: "Tabebuya",
        lokasi: "Balai Kota",
        surveyor: "Haris",
        tanggal: "2025-04-17",
        idDevice: "DEV-006",
    },
    {
        namaPohon: "Palem",
        lokasi: "Cihampelas Walk",
        surveyor: "Dina",
        tanggal: "2025-04-16",
        idDevice: "DEV-007",
    },
    {
        namaPohon: "Angsana",
        lokasi: "Dago",
        surveyor: "Budi",
        tanggal: "2025-04-15",
        idDevice: "DEV-008",
    },
    {
        namaPohon: "Akasia",
        lokasi: "ITB",
        surveyor: "Ayu",
        tanggal: "2025-04-14",
        idDevice: "DEV-009",
    },
    {
        namaPohon: "Pinus",
        lokasi: "Stasiun Bandung",
        surveyor: "Harist",
        tanggal: "2025-04-13",
        idDevice: "DEV-010",
    },
];

const RiwayatPage = () => {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const navigate = useNavigate();

    const handleDetailClick = (idDevice: string) => {
        // Mengarahkan ke halaman riwayat-detail dengan idDevice yang dipilih
        navigate(`/riwayat-detail/${idDevice}`);
    };

    return (
        <DashboardLayout>
            <section>
                <CustomTable
                    columns={columns}
                    data={dummyData.slice(page * limit, page * limit + limit).map(item => ({
                        ...item,
                        aksi: (
                            <button
                                style={{
                                    padding: "6px 12px",
                                    backgroundColor: "#388e3c", // Hijau
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s, transform 0.2s",
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2c6c2f")}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#388e3c")}
                                onClick={() => handleDetailClick(item.idDevice)} // Panggil handleDetailClick saat button di-click
                            >
                                Detail
                            </button>
                        ),
                    }))}
                    loading={false}
                    totalCount={dummyData.length}
                    page={page}
                    limit={limit}
                    onPageChange={setPage}
                    onRowsPerPageChange={setLimit}
                />
            </section>
        </DashboardLayout>
    );
};

export default RiwayatPage;
