import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Home as HomeIcon, ErrorOutline as ErrorIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { tokenService } from "../../services/authService";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!tokenService.getUserToken(); 

  const handleBack = () => {
    if (isAuthenticated) {
      navigate("/dashboard"); 
    } else {
      navigate("/login"); 
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
      bgcolor="#f5f5f5"
    >
      <ErrorIcon sx={{ fontSize: 80, color: "#ff6b6b", mb: 2 }} />
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Oops! Halaman Tidak Ditemukan
      </Typography>
      <Typography variant="body1" color="textSecondary" mb={3}>
        Halaman yang kamu cari tidak tersedia silahkan kembali!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<HomeIcon />}
        onClick={handleBack}
      >
        Kembali
      </Button>
    </Box>
  );
};

export default NotFound;
