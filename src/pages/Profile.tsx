import { useEffect, useState } from "react";
import { Card, Typography, Avatar, Box, Button, Divider, CircularProgress } from "@mui/material";
import { Edit, Lock } from "@mui/icons-material";
import DashboardLayout from "./DashboardLayout";
import { useAuthStore } from "../store/useAuthStore";
import { Application } from "../interfaces/auth";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");


const ProfilePage: React.FC = () => {
  const { profile, isLoading, error, fetchProfile } = useAuthStore();
  const [userRole, setUserRole] = useState<string>("-");
  const [userStatus, setUserStatus] = useState<string>("-");

  const navigate = useNavigate();

  const joinDate = profile?.createdAt
    ? dayjs(profile.createdAt).format("DD MMMM YYYY")
    : "-";

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile?.applications) {
      const appGuid = import.meta.env.VITE_GUID_APPLICATION;
      const matchedApp = profile.applications.find((app: Application) => app.guidApplication === appGuid);

      if (matchedApp) {
        setUserRole(matchedApp.role);
        setUserStatus(matchedApp.isActive ? "Aktif" : "Non-Aktif");
      }
    }
  }, [profile]);

  return (
    <DashboardLayout>

      {/* Loading State */}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Typography color="error" sx={{ textAlign: "center", my: 2 }}>
          Gagal memuat profil: {error}
        </Typography>
      )}

      {/* Profile Card */}
      {!isLoading && !error && profile && (
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 6,
            overflow: "hidden",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            background: "linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)",
          }}
        >
          {/* Left Side – Avatar & Actions */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #d0f2d0 0%, #e8fbe8 100%)",
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              width: { md: "35%" },
            }}
          >
            <Avatar
              src={profile.imageProfile}
              sx={{
                width: 120,
                height: 120,
                bgcolor: profile.imageProfile ? "transparent" : "primary.main",
                fontSize: 48,
                mb: 2,
              }}
            >
              {!profile.imageProfile && profile.name.charAt(0)}
            </Avatar>
            <Typography variant="h6" fontWeight="bold" textAlign="center">
              {profile.name}
            </Typography>

            <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4CAF50",
                  '&:hover': {
                    backgroundColor: "#43A047",
                  },
                }}
                fullWidth
                startIcon={<Edit />}
                onClick={() => navigate("/update-profile")}
              >
                Edit Profil
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "#4CAF50",
                  borderColor: "#4CAF50",
                  '&:hover': {
                    backgroundColor: "#E8F5E9",
                    borderColor: "#388E3C",
                  },
                }}
                fullWidth
                startIcon={<Lock />}
                onClick={() => navigate("/update-password")}
              >
                Ubah Password
              </Button>
            </Box>
          </Box>

          {/* Right Side – Info */}
          <Box sx={{ p: 4, flexGrow: 1 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Informasi Akun
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                rowGap: 3,
                columnGap: 4,
              }}
            >
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">{profile.email}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Nomor Telepon
                </Typography>
                <Typography variant="body1">{profile.phoneNumber || "-"}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Alamat
                </Typography>
                <Typography variant="body1">{profile.address || "-"}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Role
                </Typography>
                <Typography variant="body1">{userRole}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Status Akun
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: userStatus === "Aktif" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {userStatus}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Bergabung Pada
                </Typography>
                <Typography variant="body1">{joinDate}</Typography>
              </Box>

            </Box>
          </Box>
        </Card>

      )}
    </DashboardLayout>
  );
};

export default ProfilePage;
