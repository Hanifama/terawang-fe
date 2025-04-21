import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import CustomTable from "../components/shared/CustomTable";
import { useNavigate } from 'react-router-dom';

const columns = [
    { id: "namaPohon", label: "Nama Pohon", minWidth: 120 },
    { id: "surveyor", label: "Surveyor", minWidth: 100 },
    { id: "tanggal", label: "Tanggal Survey", minWidth: 120 },
    { id: "idDevice", label: "ID Device", minWidth: 100 },
    { id: "aksi", label: "Aksi", minWidth: 80 },
];

const dummyData = [
    {
        namaPohon: "Pisang Raja",
        surveyor: "Haris",
        tanggal: "2025-04-20",
        idDevice: "DEV-001",
    },
    {
        namaPohon: "Pisang Ambon",
        surveyor: "Ayu",
        tanggal: "2025-04-19",
        idDevice: "DEV-002",
    },
    {
        namaPohon: "Pisang Kepok",
        surveyor: "Budi",
        tanggal: "2025-04-18",
        idDevice: "DEV-003",
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
            <div style={{ padding: "16px" }}>
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
            </div>
        </DashboardLayout>
    );
};

export default RiwayatPage;
