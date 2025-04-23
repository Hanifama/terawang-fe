import { useState } from "react";
import {
  TextField, Button, Box, Typography, Avatar, IconButton, Paper
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../pages/DashboardLayout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  const { updateUserProfile, uploadUserProfileImage, profile } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newName: profile?.name || "",
    newPhoneNumber: profile?.phoneNumber || "",
    newAddress: profile?.address || "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(profile?.imageProfile || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let profileUpdated = false;
    let imageUpdated = false;

    try {
      if (
        formData.newName !== profile?.name ||
        formData.newPhoneNumber !== profile?.phoneNumber ||
        formData.newAddress !== profile?.address
      ) {
        await updateUserProfile(formData);
        profileUpdated = true;
      }

      if (selectedFile) {
        await uploadUserProfileImage(selectedFile);
        imageUpdated = true;
      }

      if (profileUpdated && imageUpdated) {
        toast.success("Profil dan foto berhasil diperbarui!");
      } else if (profileUpdated) {
        toast.success("Profil berhasil diperbarui!");
      } else if (imageUpdated) {
        toast.success("Foto profil berhasil diperbarui!");
      }

      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {
      toast.error("Gagal memperbarui profil!");
    }
  };

  return (
    <DashboardLayout>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            width: "100%",
            borderRadius: 4,
            background: "linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#3b5f4b" }} // hijau lebih gelap untuk teks
          >
            Perbarui Profil Anda
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={4}>
            Lengkapi informasi pribadi dan perbarui foto profil Anda.
          </Typography>

          <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
            {/* Avatar */}
            <Box position="relative" display="flex" flexDirection="column" alignItems="center">
              <Avatar
                src={previewImage}
                sx={{
                  width: 200,
                  height: 200,
                  fontSize: 40,
                  borderRadius: 3,
                  boxShadow: 3,
                  border: "4px solid #8DB697",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                  bgcolor: "#dcebe1",
                }}
              >
                {!previewImage && profile?.name?.charAt(0)}
              </Avatar>
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  bgcolor: "#8DB697",
                  color: "white",
                  borderRadius: "50%",
                  p: 1.2,
                  "&:hover": {
                    bgcolor: "#7aa687",
                  },
                }}
              >
                <PhotoCamera />
                <input type="file" accept="image/*" hidden onChange={handleFileChange} />
              </IconButton>
            </Box>

            {/* Form */}
            <Box flex={1}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Nama Lengkap"
                  name="newName"
                  value={formData.newName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Nomor Telepon"
                  name="newPhoneNumber"
                  value={formData.newPhoneNumber}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Alamat"
                  name="newAddress"
                  value={formData.newAddress}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                />

                <Box display="flex" gap={2} mt={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate(-1)}
                    sx={{
                      borderColor: "#8DB697",
                      color: "#8DB697",
                      "&:hover": {
                        backgroundColor: "#f0f8f3",
                        borderColor: "#7aa687",
                      },
                    }}
                  >
                    Kembali
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#8DB697",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#7aa687",
                      },
                    }}
                  >
                    Simpan Perubahan
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Paper>
      </Box>
    </DashboardLayout>
  );
};

export default UpdateProfile;
