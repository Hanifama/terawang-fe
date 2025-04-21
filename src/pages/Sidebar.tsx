import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, Divider } from "@mui/material";
import { MapOutlined, Logout, GroupOutlined, HistoryEduOutlined } from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../store/useAuthStore";
import logo from "../assets/logo.png";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logoutUser = useAuthStore((state) => state.logoutUser);

  const handleLogout = (): void => {
    logoutUser();
    toast.success("Logout berhasil!");
    setTimeout(() => navigate("/"), 1000);
  };

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FAFAFA",
          color: "#333",
          borderRight: "1px solid #ddd",
        },
      }}
    >
      <ToastContainer />
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 4, mt: 2 }}>
        {/* Logo kiri */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mr: 1,
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.1)" }
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              width: 50,
              height: 50,
            }}
          />
        </Box>

        {/* Teks kanan */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#333",
            fontFamily: "Roboto, sans-serif",
            textTransform: "uppercase",
            letterSpacing: 1.5,
            transition: "color 0.3s ease",
            "&:hover": { color: "secondary.main" }
          }}
        >
          TERAWANG
        </Typography>
      </Box>

      <List>
        {[{ text: "Dashboard", icon: <MapOutlined />, path: "/dashboard" },
        { text: "Riwayat Survey", icon: <HistoryEduOutlined />, path: "/riwayat" },
        { text: "Management User", icon: <GroupOutlined />, path: "/management-user" }].map(({ text, icon, path }) => (
          <ListItem
            key={text}
            component={Link}
            to={path}
            sx={{
              backgroundColor: isActive(path) ? "#4CAF50" : "transparent",
              color: isActive(path) ? "white" : "#555",
              transition: "background-color 0.3s, color 0.3s",
              "&:hover": { backgroundColor: "#66BB6A", color: "white" },
              boxShadow: "none",
            }}
          >
            <ListItemIcon sx={{ color: isActive(path) ? "white" : "#555" }}>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: "#ddd", my: 2 }} />
      <Box sx={{ mt: "auto", mb: 2 }}>
        <ListItem
          onClick={handleLogout}
          sx={{
            "&:hover": { backgroundColor: "#fdd835", color: "white", borderRadius: 1, padding: "12px 16px" },
            borderRadius: 1,
            padding: "12px 16px",
          }}
        >
          <ListItemIcon>
            <Logout sx={{ color: "#333" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ cursor: "pointer", fontWeight: "bold", color: "#333" }} />
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
