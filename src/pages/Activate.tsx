import { useCallback, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActivateAccount: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const { activateUser, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleActivate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, otp } = formData;

    if (!email.trim() || !otp.trim()) {
      toast.error("Email dan Kode OTP harus diisi!", { position: "top-right", autoClose: 3000 });
      return;
    }

    await activateUser({
      email,
      otp,
      guidApplication: import.meta.env.VITE_GUID_APPLICATION,
    });

    const updatedError = useAuthStore.getState().error;

    if (updatedError) {
      toast.error(updatedError, { position: "top-right", autoClose: 3000 });
      return;
    }

    toast.success("Selamat, Anda berhasil mengaktifkan akun!", { position: "top-right", autoClose: 2000 });
    setTimeout(() => navigate("/login"), 2000);
  }, [formData, activateUser, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#fdf6ec",
        px: 2,
      }}
    >
      <ToastContainer />
      <Box
        sx={{
          maxWidth: 420,
          width: "100%",
          p: 5,
          bgcolor: "#fff",
          borderRadius: 2,
          border: "2px solid #d8cfc0",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
          <VerifiedIcon sx={{ fontSize: 50, color: "#c89b3c" }} />
          <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: "Georgia, serif", color: "#5c4b25" }}>
            Aktivasi Akun
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b5e42", mt: 1 }}>
            Verifikasi akunmu dengan kode OTP yang telah dikirimkan ke email.
          </Typography>
        </Box>

        <form onSubmit={handleActivate}>
          <TextField
            label="Email"
            type="email"
            name="email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fcf8f2",
                borderRadius: 2,
              },
            }}
          />
          <TextField
            label="Kode OTP"
            type="text"
            name="otp"
            fullWidth
            variant="outlined"
            margin="normal"
            value={formData.otp}
            onChange={handleChange}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fcf8f2",
                borderRadius: 2,
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "16px",
              backgroundColor: "#c89b3c",
              color: "#fff",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#a4811c",
              },
            }}
          >
            {isLoading ? "Memproses..." : "Aktivasi"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ActivateAccount;
