import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, TextField, Typography, Link } from "@mui/material";
import { useAuthStore } from "../store/useAuthStore";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";
import bgImage from "../assets/bg.jpg";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const guidApplication = import.meta.env.VITE_GUID_APPLICATION;
  const { loginUser, isLoading, error } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    await loginUser({ ...formData, guidApplication });
    const updatedError = useAuthStore.getState().error;

    if (updatedError) {
      toast.error(updatedError, { position: "top-right", autoClose: 3000 });
      return;
    }
    toast.success("Login berhasil, Silahkan Masuk!", { position: "top-right", autoClose: 2000 });
    setTimeout(() => navigate("/dashboard"), 2000);
  }, [formData, loginUser, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "strecth",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "left",
        backdropFilter: "blur(5px)",
      }}
    >
      <ToastContainer />
      <Card
        sx={{
          width: "100%",
          maxWidth: 520,
          p: 4,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "#2e7d32",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img src={logo} alt="Logo" style={{ width: 100, height: 100 }} />
        </Box>

        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, color: "#2e7d32" }}>
          Selamat Datang
        </Typography>
        <Typography variant="body2" sx={{ color: "#000", mb: 3 }}>
          Masuk ke akunmu yang sudah terdaftar.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Masukan Email Anda"
            type="email"
            name="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            sx={{
              mb: 2,
              "& label": {
                color: "#2e7d32", 
              },
              "& label.Mui-focused": {
                color: "#2e7d32", 
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                "& fieldset": {
                  borderColor: "#c89b3c",
                },
                "&:hover fieldset": {
                  borderColor: "#fdd835",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2e7d32",
                },
              },
            }}
            required
          />

          <TextField
            fullWidth
            label="Masukan Password Anda"
            type="password"
            name="password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            sx={{
              mb: 2,
              "& label": {
                color: "#2e7d32",
              },
              "& label.Mui-focused": {
                color: "#2e7d32",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                "& fieldset": {
                  borderColor: "#c89b3c",
                },
                "&:hover fieldset": {
                  borderColor: "#fdd835",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2e7d32",
                },
              },
            }}
            required
          />
          {error && (
            <Typography color="error" textAlign="center" mb={2}>
              {error}
            </Typography>
          )}

          <Box sx={{ textAlign: "right", mb: 3 }}>
            <Link
              onClick={() => navigate("/forgot-password")}
              sx={{
                cursor: "pointer",
                color: "#c89b3c",
                fontWeight: "bold",
                "&:hover": { textDecoration: "underline", color: "#c89b3c" },
              }}
            >
              Lupa Password?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: 2,
              textTransform: "none",
              backgroundColor: "#fdd835",
              color: "#1b1b1b",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#2e7d32",
                color: "#fff",
                transform: "scale(1.05)",
              },
            }}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login Sekarang"}
          </Button>

        </form>

        <Typography variant="body2" color="textSecondary" mt={8} textAlign="center">
          Belum punya akun?{" "}
          <Link
            onClick={() => navigate("/register")}
            sx={{
              cursor: "pointer",
              color: "#333",
              fontWeight: "bold",
              "&:hover": { textDecoration: "underline", color: "#c89b3c" },
            }}
          >
            Buat akun
          </Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default Login;
