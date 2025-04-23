import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../../store/useAuthStore";
import DashboardLayout from "../../pages/DashboardLayout";
import { TextField, Button, CircularProgress } from "@mui/material";

const UpdatePassword = () => {
    const { changePassword, isLoading, error } = useAuthStore();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: "",
        currentPassword: "",
        newPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await changePassword(formData);

            toast.success("Password berhasil diperbarui!", {
                autoClose: 1000,
            });

            setFormData({ email: "", currentPassword: "", newPassword: "" });

            setTimeout(() => {
                navigate("/profile");
            }, 1000);
        } catch (error) {
            toast.error("Gagal memperbarui password. Coba lagi!");
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-lg mx-auto bg-white p-10 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
                    Update Password
                </h2>

                {error && (
                    <p className="text-red-500 text-center mb-6">{error}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Current Password"
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="New Password"
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center gap-4 mt-8">
                        <Button 
                            variant="outlined" 
                            color="secondary" 
                            onClick={() => navigate(-1)}
                            fullWidth
                        >
                            Kembali
                        </Button>
                        
                        <Button 
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isLoading}
                            fullWidth
                        >
                            {isLoading ? <CircularProgress size={24} /> : "Update Password"}
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default UpdatePassword;
