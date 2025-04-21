import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Card,
    TextField,
    Typography,
    Link,
    MenuItem,
} from "@mui/material";
import logo from "../assets/logo.png";
import bgImage from "../assets/bg.jpg";
import { useAuthStore } from "../store/useAuthStore";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        companyGuid: "",
        role: "user",
    });

    const navigate = useNavigate();
    const { registerUser, fetchCompanies, companies, isLoading, error } =
        useAuthStore();

    useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            phoneNumber: "",
            companyGuid: "",
            role: "user",
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await registerUser({
            ...formData,
            guidApplication: import.meta.env.VITE_GUID_APPLICATION,
        });

        const updatedError = useAuthStore.getState().error;

        if (updatedError) {
            toast.error(updatedError);
            return;
        }

        toast.success("Selamat anda berhasil mendaftar!");
        resetForm();

        setTimeout(() => {
            navigate("/activate");
        }, 1000);
    };

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
            <ToastContainer position="top-right" autoClose={3000} />
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
                <Typography variant="h5" fontWeight="bold" sx={{ color: "#2e7d32", mb: 1 }}>
                    Daftar Akun Baru
                </Typography>
                <Typography variant="body2" sx={{ color: "#000", mb: 3 }}>
                    Buat akunmu sekarang dan mulai menikmati fitur kami dengan mudah!
                </Typography>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                        select
                        fullWidth
                        label="Perusahaan"
                        name="companyGuid"
                        value={formData.companyGuid}
                        onChange={handleChange}
                        required
                        sx={{
                            mb: 1,
                            "& label": { color: "#2e7d32" },
                            "& label.Mui-focused": { color: "#2e7d32" },
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                "& fieldset": { borderColor: "#c89b3c" },
                                "&:hover fieldset": { borderColor: "#fdd835" },
                                "&.Mui-focused fieldset": { borderColor: "#2e7d32" },
                            },
                        }}
                    >
                        {companies.map((company) => (
                            <MenuItem key={company.guid} value={company.guid}>
                                {company.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Baris kedua: 2 kolom */}
                    <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField
                            fullWidth
                            label="Nama Lengkap"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            sx={commonFieldStyle}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            sx={commonFieldStyle}
                        />
                    </Box>

                    {/* Baris ketiga: 2 kolom */}
                    <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <TextField
                            fullWidth
                            label="Nomor HP"
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            sx={commonFieldStyle}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            sx={commonFieldStyle}
                        />
                    </Box>

                    {error && (
                        <Typography color="error" textAlign="center" mt={2}>
                            {error}
                        </Typography>
                    )}

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
                        {isLoading ? "Mendaftarkan..." : "Daftar Sekarang"}
                    </Button>
                </form>


                <Typography variant="body2" sx={{ textAlign: "center", mt: 1, color: "#000" }}>
                    Sudah punya akun?{" "}
                    <Link
                        onClick={() => navigate("/")}
                        sx={{
                            color: "#c89b3c",
                            fontWeight: "bold",
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                        }}
                    >
                        Masuk di sini
                    </Link>
                </Typography>
            </Card>
        </Box>
    );
};

const commonFieldStyle = {
    mb: 1,
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
};

export default Register;
