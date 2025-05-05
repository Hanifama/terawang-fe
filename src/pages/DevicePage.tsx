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
import { Delete } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { useDeviceStore } from "../store/useDeviceStore";
import CustomTable from "../components/shared/CustomTable";
import { useTreeStore } from "../store/useTreeStore";

const DevicePage: React.FC = () => {
  // const navigate = useNavigate();
  const {
    devices,
    totalData,
    fetchDevices,
    removeDevice,
    loading,
    setPage,
    page,
  } = useDeviceStore();

  const { trees, fetchTrees } = useTreeStore();
  const [guidTree, setGuidTree] = useState<string | null>(null);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedDeviceGuid, setSelectedDeviceGuid] = useState<string | null>(null);

  useEffect(() => {
    if (trees.length === 0) {
      fetchTrees();
    }
  }, [trees, fetchTrees]);

  useEffect(() => {
    if (guidTree) {
      fetchDevices(page, rowsPerPage, guidTree);
    } else {
      fetchDevices(page, rowsPerPage);
    }
  }, [guidTree, page, rowsPerPage, fetchDevices]);

  const handleDeleteClick = (guid: string) => {
    setSelectedDeviceGuid(guid);
    setOpenConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedDeviceGuid) {
      await removeDevice(selectedDeviceGuid);
      fetchDevices(page, rowsPerPage);
    }
    handleCloseConfirm();
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setSelectedDeviceGuid(null);
  };

  const handleTreeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGuidTree(event.target.value as string);
  };

  const columns = [
    { id: "created_dt", label: "Tanggal Dibuat", align: "left" as const, minWidth: 150 },
    { id: "guidDevice", label: "GUID Device", align: "left" as const, minWidth: 250 },
    { id: "device_type", label: "Tipe Device", align: "left" as const, minWidth: 150 },
    // { id: "additional_info", label: "Info Tambahan", align: "left" as const, minWidth: 250 },
    // { id: "value", label: "Nilai", align: "left" as const, minWidth: 100 },
    // { id: "description", label: "Deskripsi", align: "left" as const, minWidth: 200 },
    { id: "actions", label: "Aksi", align: "center" as const, minWidth: 100 },
  ];

  const data = (devices ?? []).map((device) => ({
    created_dt: new Intl.DateTimeFormat("id-ID").format(new Date(device.timestamp)),
    guidDevice: device.guidDevice,
    device_type: device.device_type,
    // additional_info: device.additional_info,
    // value: device.value,
    // description: device.description,
    actions: (
      <>
        {/* <IconButton color="primary" onClick={() => navigate(`/device/detail/${device.guidDevice}`)}> */}
        {/*   <Info /> */}
        {/* </IconButton> */}
        <IconButton color="error" onClick={() => handleDeleteClick(device.guidDevice)}>
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
          onClick={() => navigate("/device/add")}
          sx={{ mb: 2 }}
        >
          Tambah Data
        </Button> */}

        <div className="mb-4">
          <select
            onChange={handleTreeChange}
            value={guidTree || ""}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Pohon</option>
            {trees.map((tree) => (
              <option key={tree._id} value={tree.guidTree}>
                {tree.name}
              </option>
            ))}
          </select>
        </div>


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
            <DialogContentText>Apakah Anda yakin ingin menghapus device ini?</DialogContentText>
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

export default DevicePage;
