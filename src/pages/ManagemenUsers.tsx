import { useEffect, useState } from "react";
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Delete, Add, Info } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../store/useAuthStore";
import { User } from "../interfaces/auth";
import CustomTable from "../components/shared/CustomTable";

const ManagementUserPage: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { fetchUsers, users, isLoading, deleteUser } = useAuthStore();
    const totalUsers = useAuthStore((state) => state.users.pagination.total);
    const navigate = useNavigate();

    // State untuk modal konfirmasi delete
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers(page + 1, rowsPerPage);
    }, [page, rowsPerPage, fetchUsers]);

    const handleDeleteClick = (userId: string) => {
        setSelectedUserId(userId);
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
        setSelectedUserId(null);
    };

    const handleConfirmDelete = async () => {
        if (selectedUserId) {
            try {
                await deleteUser(selectedUserId);
                toast.success("Pengguna berhasil dihapus", { autoClose: 1000 });
            } catch (error) {
                toast.error("Gagal menghapus pengguna", { autoClose: 2000 });
            }
        }
        handleCloseConfirm();
    };

    const columns = [
        { id: "guid", label: "ID Pengguna", align: "left" as "left", minWidth: 250 },
        { id: "name", label: "Nama", align: "left" as "left", minWidth: 200 },
        { id: "email", label: "Email", align: "left" as "left", minWidth: 250 },
        { id: "phoneNumber", label: "Kontak", align: "left" as "left", minWidth: 150 },
        { id: "address", label: "Alamat", align: "left" as "left", minWidth: 250 },
        { id: "actions", label: "Aksi", align: "center" as "center", minWidth: 150 },
    ];


    const data = users.users.map((user: User) => ({
        guid: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address || "-",
        actions: (
            <>
                <IconButton color="primary" onClick={() => navigate(`/user/detail/${user.guid}`)}>
                    <Info />
                </IconButton>
                <IconButton color="error" onClick={() => handleDeleteClick(user.guid)}>
                    <Delete />
                </IconButton>
            </>
        )
    }));

    return (
        <DashboardLayout>
            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => navigate("/user/add")}
                sx={{ mb: 2 }}
            >
                Tambah Pengguna
            </Button>

            <CustomTable
                columns={columns}
                data={data}
                loading={isLoading}
                totalCount={totalUsers}
                page={page}
                limit={rowsPerPage}
                onPageChange={setPage}
                onRowsPerPageChange={setRowsPerPage}
            />

            <Dialog open={openConfirm} onClose={handleCloseConfirm}>
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                <DialogContent>
                    <DialogContentText>Apakah Anda yakin ingin menghapus pengguna ini?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm} color="primary">
                        Batal
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        Hapus
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
};

export default ManagementUserPage;
