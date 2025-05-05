import { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { Delete} from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { useTreeStore } from "../store/useTreeStore";
import CustomTable from "../components/shared/CustomTable";

const TreePage: React.FC = () => {
  // const navigate = useNavigate();
  const {
    trees,
    totalData,
    fetchTrees,
    removeTree,
    loading,
    setPage,
    page,
  } = useTreeStore();

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedTreeGuid, setSelectedTreeGuid] = useState<string | null>(null);

  useEffect(() => {
    fetchTrees(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleDeleteClick = (guid: string) => {
    setSelectedTreeGuid(guid);
    setOpenConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedTreeGuid) {
      await removeTree(selectedTreeGuid);
      fetchTrees(page, rowsPerPage);
    }
    handleCloseConfirm();
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setSelectedTreeGuid(null);
  };

  const columns = [
    { id: "created_dt", label: "Tanggal Dibuat", align: "left" as const, minWidth: 150 },
    { id: "name", label: "Nama Pohon", align: "left" as const, minWidth: 200 },
    { id: "location", label: "Lokasi", align: "left" as const, minWidth: 200 },
    { id: "description", label: "Deskripsi", align: "left" as const, minWidth: 250 },
    { id: "actions", label: "Aksi", align: "center" as const, minWidth: 250 },
  ];

  const data = trees.map((tree) => ({
    created_dt: new Intl.DateTimeFormat("id-ID").format(new Date(tree.created_dt)),
    name: tree.name,
    location: tree.location,
    description: tree.description,
    actions: (
      <>
        {/* <IconButton color="primary" onClick={() => navigate(`/tree/detail/${tree.guidTree}`)}>
          <Info />
        </IconButton>
        <IconButton color="primary" onClick={() => navigate(`/tree/update/${tree.guidTree}`)}>
          <Edit />
        </IconButton> */}
        <IconButton color="error" onClick={() => handleDeleteClick(tree.guidTree)}>
          <Delete />
        </IconButton>
      </>
    ),
  }));

  return (
    <DashboardLayout>
      <section className="min-h-[70vh]">
        {/* <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => navigate("/tree/add")}
          sx={{ mb: 2 }}
        >
          Tambah Data
        </Button> */}

        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        ) : (
          <CustomTable
            columns={columns}
            data={data}
            loading={loading}
            totalCount={totalData}
            page={page - 1}
            limit={rowsPerPage}
            onPageChange={(newPage) => setPage(newPage + 1)}
            onRowsPerPageChange={(newLimit) => {
              setRowsPerPage(newLimit);
              setPage(1);
            }}
          />
        )}

        <Dialog open={openConfirm} onClose={handleCloseConfirm}>
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
          <DialogContent>
            <DialogContentText>Apakah Anda yakin ingin menghapus pohon ini?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm} color="primary">
              Batal
            </Button>
            <Button onClick={handleDeleteConfirm} color="error">
              Hapus
            </Button>
          </DialogActions>
        </Dialog>
      </section>
    </DashboardLayout>
  );
};

export default TreePage;
