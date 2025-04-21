import { useState } from "react";
import { TextField, Button, Typography, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../pages/DashboardLayout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../../store/useAuthStore";

const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const { addUser, isLoading } = useAuthStore();

  const guidApplication = import.meta.env.VITE_GUID_APPLICATION;

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "", 
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userData.name || !userData.email || !userData.password || !userData.role || !userData.phoneNumber) {
      toast.error("Semua kolom wajib diisi!", { position: "top-right" });
      return;
    }

    try {
      await addUser({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        phoneNumber: userData.phoneNumber,
        guidApplication,
      });

      toast.success("User berhasil ditambahkan!", { position: "top-right" });

      setUserData({
        name: "",
        email: "",
        password: "",
        role: "",
        phoneNumber: "",
      });

      setTimeout(() => navigate("/management-user"), 2000);
    } catch (error) {
      toast.error("Gagal menambahkan user", { position: "top-right" });
    }
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Tambah User
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3, maxWidth: 600, mx: "auto" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Nama Lengkap" name="name" value={userData.name} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Email" name="email" type="email" value={userData.email} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Password" name="password" type="password" value={userData.password} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Role" name="role" value={userData.role} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Nomor Telepon" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate(-1)}>
                Kembali
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
                {isLoading ? "Menambahkan..." : "Tambah User"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </DashboardLayout>
  );
};

export default AddUser;
