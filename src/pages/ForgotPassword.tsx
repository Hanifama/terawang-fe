import { useState, useCallback } from "react";
import { Box, Button, Card, TextField, Typography, Link } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";
import bgImage from "../assets/bg.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      await forgotPassword({ email });
      const updatedError = useAuthStore.getState().error;

      if (error) {
        console.error("Gagal mengirim permintaan lupa password:", error);
        toast.error(error);
        return;
      }

      if (updatedError) {
        toast.error(updatedError, { position: "top-right", autoClose: 3000 });
        return;
      }

      toast.success("Password baru telah dikirim ke email kamu!", {
        position: "top-right",
        autoClose: 3000,
      });

      setEmail("");
    },
    [email, forgotPassword]
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "stretch",
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
          Lupa Password?
        </Typography>
        <Typography variant="body2" sx={{ color: "#000", mb: 3 }}>
          Masukkan email terdaftar untuk mendapatkan password baru.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Masukan Email Anda"
            type="email"
            variant="outlined"
            value={email}
            onChange={handleChange}
            sx={{
              mb: 3,
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
            {isLoading ? "Mengirim..." : "Kirim Password Baru"}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 4, textAlign: "center", color: "#000" }}>
          Sudah ingat password?{" "}
          <Link
            onClick={() => navigate("/")}
            sx={{
              cursor: "pointer",
              color: "#c89b3c",
              fontWeight: "bold",
              "&:hover": { textDecoration: "underline", color: "#c89b3c" },
            }}
          >
            Kembali ke Login
          </Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default ForgotPassword;
