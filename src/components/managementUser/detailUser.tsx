import { useEffect } from "react";
import {
  Typography,
  Paper,
  Grid,
  Button,
  CircularProgress,
  Avatar,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Event as EventIcon,
  Update as UpdateIcon,
  Apps as AppsIcon,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../pages/DashboardLayout";
import { useAuthStore } from "../../store/useAuthStore";

const DetailUser: React.FC = () => {
  const navigate = useNavigate();
  const { guid } = useParams();
  const { fetchUserDetails, selectedUser, isLoading, error } = useAuthStore();

  useEffect(() => {
    if (guid) {
      fetchUserDetails(guid);
    }
  }, [guid, fetchUserDetails]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
        Detail User
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 5, maxWidth: 800, mx: "auto", bgcolor: "#f9f9f9" }}>
        {isLoading ? (
          <CircularProgress sx={{ display: "block", mx: "auto" }} />
        ) : error ? (
          <Typography color="error" textAlign="center">Gagal mengambil data user: {error}</Typography>
        ) : selectedUser ? (
          <Grid container spacing={4} alignItems="center">
            {/* Avatar di kiri */}
            <Grid item xs={12} md={4} textAlign="center">
              <Avatar
                src={selectedUser.imageProfile}
                alt={selectedUser.name}
                sx={{ width: 200, height: 200, border: "3px solid #3f51b5", mx: "auto", borderRadius: 2 }}
              />
            </Grid>

            {/* Informasi di kanan */}
            <Grid item xs={12} md={8}>
              <Box>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>{selectedUser.name}</Typography>
                <Typography variant="body1">
                  <EmailIcon sx={{ verticalAlign: "middle", mr: 1 }} /> <strong>Email:</strong> {selectedUser.email}
                </Typography>
                <Typography variant="body1">
                  <PhoneIcon sx={{ verticalAlign: "middle", mr: 1 }} /> <strong>Nomor Telepon:</strong> {selectedUser.phoneNumber}
                </Typography>
                <Typography variant="body1">
                  <HomeIcon sx={{ verticalAlign: "middle", mr: 1 }} /> <strong>Alamat:</strong> {selectedUser.address}
                </Typography>
                <Typography variant="body1">
                  <EventIcon sx={{ verticalAlign: "middle", mr: 1 }} /> <strong>Dibuat:</strong> {formatDate(selectedUser.createdAt)}
                </Typography>
                <Typography variant="body1">
                  <UpdateIcon sx={{ verticalAlign: "middle", mr: 1 }} /> <strong>Terakhir Diperbarui:</strong> {formatDate(selectedUser.updatedAt)}
                </Typography>
              </Box>
            </Grid>

            {/* Aplikasi Terdaftar */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
                <AppsIcon sx={{ mr: 1 }} /> Aplikasi Terdaftar:
              </Typography>
              {selectedUser.applications.length > 0 ? (
                <List>
                  {selectedUser.applications.map((app: any) => (
                    <Card key={app.guidApplication} sx={{ mb: 2, boxShadow: 3, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
                      <CardContent>
                        <ListItem>
                          <ListItemText
                            primary={app.name}
                            secondary={
                              <>
                                <Typography variant="body2"><strong>Role:</strong> {app.role}</Typography>
                                <Typography variant="body2"><strong>Status:</strong> {app.isActive ? "Aktif" : "Tidak Aktif"}</Typography>
                              </>
                            }
                          />
                        </ListItem>
                      </CardContent>
                    </Card>
                  ))}
                </List>
              ) : (
                <Typography sx={{ textAlign: "center", fontStyle: "italic" }}>Tidak ada aplikasi yang terdaftar.</Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth sx={{ py: 1.5, fontSize: "1rem" }} onClick={() => navigate(-1)}>
                Kembali
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Typography textAlign="center">Data user tidak ditemukan.</Typography>
        )}
      </Paper>
    </DashboardLayout>
  );
};

export default DetailUser;