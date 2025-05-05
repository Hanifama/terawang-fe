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
import DashboardLayout from "./DashboardLayout";
import { useSurveyStore } from "../store/useSurveyStore";
import CustomTable from "../components/shared/CustomTable";

const SurveyPage: React.FC = () => {
  const {
    surveys,
    totalData,
    fetchSurveys,
    removeSurvey,
    loading,
    setPage,
    page,
  } = useSurveyStore();

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedSurveyGuid, setSelectedSurveyGuid] = useState<string | null>(null);

  useEffect(() => {
    fetchSurveys(page, rowsPerPage);
  }, [page, rowsPerPage, fetchSurveys]);

  const handleDeleteClick = (guid: string) => {
    setSelectedSurveyGuid(guid);
    setOpenConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedSurveyGuid) {
      await removeSurvey(selectedSurveyGuid);
      fetchSurveys(page, rowsPerPage);
    }
    handleCloseConfirm();
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setSelectedSurveyGuid(null);
  };

  const columns = [
    { id: "created_dt", label: "Tanggal Survey", align: "left" as const, minWidth: 150 },
    { id: "guidSurvey", label: "GUID Survey", align: "left" as const, minWidth: 250 },
    { id: "surveyorName", label: "Nama Surveyor", align: "left" as const, minWidth: 150 },
    { id: "actions", label: "Aksi", align: "center" as const, minWidth: 100 },
  ];

  const data = (surveys ?? []).map((survey) => ({
    created_dt: new Intl.DateTimeFormat("id-ID").format(new Date(survey.surveyDate)),
    guidSurvey: survey.guidSurvey,
    surveyorName: survey.surveyorName,
    actions: (
      <IconButton color="error" onClick={() => handleDeleteClick(survey.guidSurvey)}>
        <Delete />
      </IconButton>
    ),
  }));

  return (
    <DashboardLayout>
      <section className="min-h-[70vh]">
        {/* Table */}
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

        {/* Dialog Hapus */}
        <Dialog open={openConfirm} onClose={handleCloseConfirm}>
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
          <DialogContent>
            <DialogContentText>Apakah Anda yakin ingin menghapus survey ini?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm} color="primary">Batal</Button>
            <Button onClick={handleDeleteConfirm} color="error">Hapus</Button>
          </DialogActions>
        </Dialog>
      </section>
    </DashboardLayout>
  );
};

export default SurveyPage;
